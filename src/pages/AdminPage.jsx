import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChefHat, Users, Building2, Store, Music4,
  RefreshCw, Download, CheckCircle2, XCircle, X,
  RotateCcw, Search, Loader2, ShieldCheck, CreditCard,
  Lock, LockOpen, ChevronDown, ChevronUp, Send,
} from "lucide-react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec";
const ADMIN_SESSION_KEY = "wop_admin_session";

const TABS = [
  {
    key: "culinary",
    label: "Culinary Partners",
    icon: ChefHat,
    sheetName: "CulinaryPartners",
    color: "#8A2A2A",
    lightBg: "#FBF0EE",
    columns: ["ID No", "First Name", "Last Name", "Professional Title", "Institution/Business", "Phone", "Email"],
  },
  {
    key: "volunteers",
    label: "Volunteers",
    icon: Users,
    sheetName: "Volunteers",
    color: "#2A3C8A",
    lightBg: "#EEF1FB",
    columns: ["ID No", "First Name", "Last Name", "Phone", "Email"],
  },
  {
    key: "sponsors",
    label: "Sponsors",
    icon: Building2,
    sheetName: "Sponsors",
    color: "#2A6B3C",
    lightBg: "#E8F4EC",
    columns: ["First Name", "Last Name", "Professional Title", "Institution/Business", "Phone", "Email"],
  },
  {
    key: "vendors",
    label: "Vendors",
    icon: Store,
    sheetName: "Vendors",
    color: "#633806",
    lightBg: "#FAEEDA",
    columns: ["ID No", "First Name", "Last Name", "Institution/Business", "Phone", "Email"],
    hasPayment: true,
  },
  {
    key: "musicians",
    label: "Musicians",
    icon: Music4,
    sheetName: "Musicians",
    color: "#533AB7",
    lightBg: "#EEEDFE",
    columns: ["ID No", "First Name", "Last Name", "Performer/Group", "Phone", "Email"],
  },
];

const rowId = (r) =>
  `${r["Email"] || r["email"] || ""}_${r["Timestamp"] || ""}_${r._rowIndex || ""}`;

const fmtDate = (ts) => {
  if (!ts) return "—";
  const d = new Date(ts);
  if (isNaN(d)) return ts;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getVal = (row, keys) => {
  for (const k of keys) {
    const v = row[k];
    if (v !== undefined && v !== "") return String(v);
  }
  return "";
};

function StatusBadge({ status }) {
  const map = {
    pending: { label: "● Pending", bg: "#FAEEDA", color: "#633806", border: "#EF9F27" },
    accepted: { label: "✔ Accepted", bg: "#EAF3DE", color: "#27500A", border: "#97C459" },
    declined: { label: "✗ Declined", bg: "#FCEBEB", color: "#791F1F", border: "#F09595" },
    cancelled: { label: "✕ Cancelled", bg: "#F3F3F3", color: "#4A4A4A", border: "#BBBBBB" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "4px 10px", borderRadius: 20,
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      fontSize: 14, fontWeight: 600,
      textTransform: "uppercase", letterSpacing: "0.06em",
      whiteSpace: "nowrap",
    }}>
      {s.label}
    </span>
  );
}

function PaymentBadge({ paid }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "4px 10px", borderRadius: 20,
      background: paid ? "#EAF3DE" : "#FAEEDA",
      color: paid ? "#27500A" : "#633806",
      border: `1px solid ${paid ? "#97C459" : "#EF9F27"}`,
      fontSize: 14, fontWeight: 600,
      textTransform: "uppercase", letterSpacing: "0.06em",
      whiteSpace: "nowrap",
    }}>
      {paid ? "✔ Paid" : "● Pending"}
    </span>
  );
}

function StatCard({ label, value, variant = "default", color, lightBg }) {
  const variants = {
    default: { bg: "#FFFFFF", border: "rgba(200,153,58,0.2)", num: "#1A1A14" },
    accepted: { bg: "#EAF3DE", border: "#97C459", num: "#27500A" },
    declined: { bg: "#FCEBEB", border: "#F09595", num: "#791F1F" },
    tab: { bg: lightBg || "#F5E6C8", border: color || "#C8993A", num: color || "#C8993A" },
  };
  const v = variants[variant] || variants.default;
  return (
    <div style={{ background: v.bg, border: `1px solid ${v.border}`, borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 14, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.09em", color: "#6B6B5A", marginBottom: 5 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, lineHeight: 1, color: v.num }}>
        {value}
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 15px", borderRadius: 20,
        border: active ? "1px solid #1A1A14" : "1px solid rgba(200,153,58,0.2)",
        background: active ? "#1A1A14" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#6B6B5A",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 16, fontWeight: 500,
        cursor: "pointer", transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function ActionBtn({ label, icon, bg, color, border, hoverBg, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "5px 10px", borderRadius: 5,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14, fontWeight: 600,
        cursor: "pointer",
        border: `1px solid ${border}`,
        background: hovered ? hoverBg : bg,
        color,
        textTransform: "uppercase", letterSpacing: "0.05em",
        whiteSpace: "nowrap", transition: "background 0.15s",
      }}
    >
      {icon}{label}
    </button>
  );
}

function Toast({ message, type, visible }) {
  const colors = { info: "#1A1A14", accept: "#27500A", decline: "#791F1F", undo: "#6B6B5A", error: "#8A2A2A" };
  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%",
      transform: "translateX(-50%)",
      background: colors[type] || colors.info,
      color: "#fff", padding: "11px 22px",
      borderRadius: 8, fontSize: 17, fontWeight: 500,
      opacity: visible ? 1 : 0,
      pointerEvents: "none",
      transition: "opacity 0.3s",
      zIndex: 9999, whiteSpace: "nowrap",
      boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
    }}>
      {message}
    </div>
  );
}

function EmptyState({ icon: Icon, title, sub, color }) {
  return (
    <tr>
      <td colSpan={10}>
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#6B6B5A" }}>
          <div style={{ marginBottom: 12, opacity: 0.3, color: color || "#C8993A" }}>
            <Icon size={40} />
          </div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#1A1A14", marginBottom: 6 }}>{title}</div>
          <div style={{ fontSize: 17 }}>{sub}</div>
        </div>
      </td>
    </tr>
  );
}

function RegistrationGate({ showToast }) {
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wop_reg_closed") || "{}"); }
    catch { return {}; }
  });

  const toggle = (key, label, color) => {
    const next = { ...closed, [key]: !closed[key] };
    setClosed(next);
    localStorage.setItem("wop_reg_closed", JSON.stringify(next));
    showToast(`${label} registration ${next[key] ? "closed" : "reopened"}`, next[key] ? "decline" : "accept");
  };

  const closedCount = Object.values(closed).filter(Boolean).length;

  return (
    <div style={{ marginBottom: 28, border: "1px solid rgba(200,153,58,0.2)", borderRadius: 12, background: "#FFFFFF", overflow: "hidden" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px", background: "transparent", border: "none",
          fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Lock size={16} color="#C8993A" />
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A1A14" }}>
            Close Registration
          </span>
          {closedCount > 0 && (
            <span style={{ background: "#FCEBEB", color: "#791F1F", border: "1px solid #F09595", borderRadius: 20, padding: "2px 10px", fontSize: 13, fontWeight: 600 }}>
              {closedCount} closed
            </span>
          )}
        </div>
        {open ? <ChevronUp size={16} color="#6B6B5A" /> : <ChevronDown size={16} color="#6B6B5A" />}
      </button>

      {open && (
        <div style={{ borderTop: "1px solid rgba(200,153,58,0.15)", padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 12 }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isClosed = !!closed[tab.key];
            return (
              <div
                key={tab.key}
                style={{
                  flex: "1 1 160px", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px", borderRadius: 10,
                  border: `1px solid ${isClosed ? "#F09595" : "rgba(200,153,58,0.2)"}`,
                  background: isClosed ? "#FEF7F7" : tab.lightBg,
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={15} color={isClosed ? "#791F1F" : tab.color} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: isClosed ? "#791F1F" : tab.color, whiteSpace: "nowrap" }}>
                    {tab.label}
                  </span>
                </div>
                <button
                  onClick={() => toggle(tab.key, tab.label)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 20,
                    border: `1px solid ${isClosed ? "#F09595" : "#97C459"}`,
                    background: isClosed ? "#FCEBEB" : "#EAF3DE",
                    color: isClosed ? "#791F1F" : "#27500A",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    transition: "all 0.15s", whiteSpace: "nowrap",
                  }}
                >
                  {isClosed ? <><Lock size={12} /> Closed</> : <><LockOpen size={12} /> Open</>}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SheetPanel({ tab, showToast }) {
  const [allData, setAllData] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [payments, setPayments] = useState({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "ts", dir: -1 });

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getSheet&sheet=${encodeURIComponent(tab.sheetName)}&t=${Date.now()}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setAllData(json.data);
        setLoaded(true);
        const nextStatuses = {};
        const nextPayments = {};
        json.data.forEach(r => {
          const id = rowId(r);
          const sv = (r["Approved"] || r["Status"] || "").toString().toLowerCase().trim();
          nextStatuses[id] = sv === "accepted" ? "accepted" : sv === "declined" ? "declined" : sv === "cancelled" ? "cancelled" : "pending";
          if (tab.hasPayment) {
            const pv = (r["Payment"] || "").toString().toLowerCase().trim();
            nextPayments[id] = pv === "paid";
          }
        });
        setStatuses(nextStatuses);
        setPayments(nextPayments);
        showToast(`Loaded ${json.data.length} ${tab.label.toLowerCase()}`, "info");
      } else {
        setLoaded(true);
        showToast(`No data found in ${tab.label}`, "info");
      }
    } catch {
      setLoadError(true);
      showToast("Could not reach the script — check your connection", "error");
    } finally {
      setLoading(false);
    }
  }, [tab, showToast]);

  useEffect(() => { if (!loaded) loadData(); }, []);

  const setApproval = async (id, value) => {
    const row = allData.find(r => rowId(r) === id);
    if (!row) return;
    setStatuses(prev => ({ ...prev, [id]: value }));
    const label = value === "accepted" ? "Accepted" : value === "declined" ? "Declined" : value === "cancelled" ? "Cancelled" : "Reset to pending";
    const type = value === "accepted" ? "accept" : value === "declined" ? "decline" : value === "cancelled" ? "decline" : "undo";
    showToast(label, type);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          sheet: tab.sheetName,
          rowIndex: row._rowIndex,
          approved: value === "pending" ? "Pending" : value.charAt(0).toUpperCase() + value.slice(1),
        }),
      });
    } catch {
      showToast("Saved locally — sheet sync failed", "error");
    }
  };

  const setPayment = async (id, paid) => {
    const row = allData.find(r => rowId(r) === id);
    if (!row) return;
    setPayments(prev => ({ ...prev, [id]: paid }));
    showToast(paid ? "Marked as Paid" : "Marked as Pending", paid ? "accept" : "undo");
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          sheet: tab.sheetName,
          rowIndex: row._rowIndex,
          paymentColumn: "Payment",
          paymentValue: paid ? "Paid" : "Pending",
        }),
      });
    } catch {
      showToast("Saved locally — sheet sync failed", "error");
    }
  };

  const exportCSV = () => {
    if (!allData.length) return;
    const headers = [...tab.columns, "Approved", "Timestamp"];
    const rows = allData.map(r => {
      const id = rowId(r);
      const st = statuses[id] || "pending";
      return [
        ...tab.columns.map(c => r[c] || ""),
        st === "accepted" ? "Accepted" : st === "declined" ? "Declined" : "Pending",
        r["Timestamp"] || "",
      ].map(v => `"${String(v).replace(/"/g, '""')}"`);
    });
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
      download: `wop-${tab.key}.csv`,
    });
    a.click();
    showToast("CSV downloaded", "info");
  };

  const handleSort = (key) =>
    setSort(prev => ({ key, dir: prev.key === key ? prev.dir * -1 : 1 }));

  const counts = {
    total: allData.length,
    pending: Object.values(statuses).filter(s => s === "pending").length,
    accepted: Object.values(statuses).filter(s => s === "accepted").length,
    declined: Object.values(statuses).filter(s => s === "declined").length,
  };

  const filtered = allData
    .filter(r => {
      const id = rowId(r);
      const st = statuses[id] || "pending";
      if (filter === "pending" && st !== "pending") return false;
      if (filter === "accepted" && st !== "accepted") return false;
      if (filter === "declined" && st !== "declined") return false;
      if (!search) return true;
      return Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      const aid = rowId(a), bid = rowId(b);
      let av, bv;
      if (sort.key === "name") {
        av = `${a["First Name"] || ""} ${a["Last Name"] || ""}`.toLowerCase();
        bv = `${b["First Name"] || ""} ${b["Last Name"] || ""}`.toLowerCase();
      } else if (sort.key === "status") {
        av = statuses[aid] || "pending"; bv = statuses[bid] || "pending";
      } else {
        av = a["Timestamp"] || ""; bv = b["Timestamp"] || "";
      }
      return av < bv ? -sort.dir : av > bv ? sort.dir : 0;
    });

  const SortArrow = ({ k }) => (
    <span style={{ opacity: sort.key === k ? 1 : 0.35, color: sort.key === k ? "#C8993A" : "inherit", marginLeft: 3 }}>
      {sort.key === k ? (sort.dir === 1 ? "↑" : "↓") : "↕"}
    </span>
  );

  const th = {
    padding: "11px 13px", textAlign: "left",
    fontSize: 14, fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.09em",
    color: "#6B6B5A", whiteSpace: "nowrap",
    cursor: "pointer", userSelect: "none",
    background: "#FAFAF4",
    borderBottom: "1px solid rgba(200,153,58,0.2)",
  };
  const td = { padding: "10px 13px", verticalAlign: "middle" };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 22 }}>
        <StatCard label="Total" value={counts.total || "—"} variant="tab" color={tab.color} lightBg={tab.lightBg} />
        <StatCard label="Pending" value={counts.pending || "—"} />
        <StatCard label="Accepted" value={counts.accepted || "—"} variant="accepted" />
        <StatCard label="Declined" value={counts.declined || "—"} variant="declined" />
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#6B6B5A", pointerEvents: "none" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${tab.label.toLowerCase()}…`}
            style={{ width: "100%", padding: "9px 13px 9px 32px", border: "1px solid rgba(200,153,58,0.2)", borderRadius: 7, fontFamily: "'DM Sans', sans-serif", fontSize: 17, background: "#FFFFFF", color: "#1A1A14", outline: "none" }}
          />
        </div>
        {["all", "pending", "accepted", "declined"].map(f => (
          <FilterPill key={f} label={f.charAt(0).toUpperCase() + f.slice(1)} active={filter === f} onClick={() => setFilter(f)} />
        ))}
        <button
          onClick={exportCSV}
          disabled={!allData.length}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 7, border: "1px solid rgba(200,153,58,0.2)", background: "#FFFFFF", fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 500, cursor: allData.length ? "pointer" : "not-allowed", color: "#1A1A14", opacity: allData.length ? 1 : 0.4 }}
        >
          <Download size={14} /> Export
        </button>
        <button
          onClick={loadData}
          disabled={loading}
          style={{ display: "inline-flex", alignItems: "center", gap: 7, background: loading ? "#888" : "#1A1A14", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 7, fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? <Loader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} /> : <RefreshCw size={14} />}
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {allData.length > 0 && (
        <div style={{ fontSize: 16, color: "#6B6B5A", marginBottom: 10 }}>
          {filtered.length === allData.length
            ? `${filtered.length} record${filtered.length !== 1 ? "s" : ""}`
            : `Showing ${filtered.length} of ${allData.length}`}
        </div>
      )}

      <div style={{ background: "#FFFFFF", border: "1px solid rgba(200,153,58,0.2)", borderRadius: 12, overflow: "hidden", overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 1200, borderCollapse: "collapse", fontSize: 17 }}>
          <thead>
            <tr>
              {tab.columns.includes("ID No") && (
                <th style={{ ...th, minWidth: 90 }} onClick={() => handleSort("id")}>
                  ID No <SortArrow k="id" />
                </th>
              )}
              <th style={th} onClick={() => handleSort("name")}>Name <SortArrow k="name" /></th>
              <th style={{ ...th, minWidth: 180 }}>Email</th>
              <th style={{ ...th, minWidth: 120 }}>Phone</th>
              {tab.columns.includes("Professional Title") && <th style={th}>Title</th>}
              {tab.columns.includes("Institution/Business") && <th style={th}>Institution / Business</th>}
              {tab.columns.includes("Performer/Group") && <th style={th}>Performer / Group</th>}
              <th style={{ ...th, cursor: "default" }}>Submitted</th>
              <th style={th} onClick={() => handleSort("status")}>Approval <SortArrow k="status" /></th>
              {tab.hasPayment && <th style={{ ...th, cursor: "default" }}>Payment</th>}
              <th style={{ ...th, cursor: "default", minWidth: 200 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadError ? (
              <EmptyState icon={tab.icon} color="#8A2A2A" title="Failed to load data" sub="Could not reach Google Sheets — check your connection and click Refresh" />
            ) : !loaded ? (
              <EmptyState icon={tab.icon} color={tab.color} title={`No ${tab.label} loaded yet`} sub="Click Refresh to pull data from Google Sheets" />
            ) : !filtered.length ? (
              <EmptyState icon={tab.icon} color={tab.color} title="No matches found" sub="Try adjusting your search or filter" />
            ) : (
              filtered.map((row, i) => {
                const id = rowId(row);
                const status = statuses[id] || "pending";
                const paid = payments[id] || false;
                const idNo = row["ID No"] || "";
                const name = `${row["First Name"] || ""} ${row["Last Name"] || ""}`.trim() || "—";
                const email = getVal(row, ["Email", "email"]);
                const phone = getVal(row, ["Phone", "phone"]);
                const title = row["Professional Title"] || "";
                const biz = row["Institution/Business"] || "";
                const performer = row["Performer/Group"] || row["performerName"] || "";
                const ts = fmtDate(row["Timestamp"]);
                const rowBg = status === "accepted" ? "#F5FBF0"
                  : status === "declined" ? "#FEF7F7"
                    : i % 2 === 0 ? "#FFFFFF" : "#FDFDFB";

                return (
                  <tr key={id} style={{ background: rowBg, borderBottom: "1px solid rgba(200,153,58,0.07)", transition: "background 0.1s" }}>
                    {tab.columns.includes("ID No") && (
                      <td style={{ ...td, fontSize: 13, fontWeight: 700, color: tab.color, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
                        {idNo || "—"}
                      </td>
                    )}
                    <td style={td}>
                      <div style={{ fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 160 }}>{name}</div>
                    </td>
                    <td style={{ ...td, fontSize: 16, color: "#6B6B5A", minWidth: 180, maxWidth: 220, wordBreak: "break-all", lineHeight: 1.5 }}>
                      {email || "—"}
                    </td>
                    <td style={{ ...td, fontSize: 16, color: "#6B6B5A", whiteSpace: "nowrap" }}>
                      {phone || "—"}
                    </td>
                    {tab.columns.includes("Professional Title") && (
                      <td style={{ ...td, fontSize: 16, color: "#1A1A14", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 150 }}>{title || "—"}</td>
                    )}
                    {tab.columns.includes("Institution/Business") && (
                      <td style={{ ...td, fontSize: 16, color: "#6B6B5A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 170 }}>{biz || "—"}</td>
                    )}
                    {tab.columns.includes("Performer/Group") && (
                      <td style={{ ...td, fontSize: 16, color: "#6B6B5A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 170 }}>{performer || "—"}</td>
                    )}
                    <td style={{ ...td, fontSize: 14, color: "#9B9B8A", whiteSpace: "nowrap" }}>{ts}</td>
                    <td style={td}><StatusBadge status={status} /></td>

                    {tab.hasPayment && (
                      <td style={td}>
                        {status === "accepted" ? (
                          <PaymentBadge paid={paid} />
                        ) : (
                          <span style={{ fontSize: 14, color: "#9B9B8A" }}>—</span>
                        )}
                      </td>
                    )}

                    <td style={{ ...td, whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "nowrap" }}>
                        {status === "pending" ? (
                          <>
                            <ActionBtn label="Accept" icon={<CheckCircle2 size={16} />} bg="#EAF3DE" color="#27500A" border="#97C459" hoverBg="#d6ecbc" onClick={() => setApproval(id, "accepted")} />
                            <ActionBtn label="Decline" icon={<XCircle size={16} />} bg="#FCEBEB" color="#791F1F" border="#F09595" hoverBg="#fad8d8" onClick={() => setApproval(id, "declined")} />
                            <span style={{ marginLeft: "auto" }}><ActionBtn label="Cancel" icon={<X size={16} />} bg="#F3F3F3" color="#4A4A4A" border="#BBBBBB" hoverBg="#E5E5E5" onClick={() => setApproval(id, "cancelled")} /></span>
                          </>
                        ) : status === "accepted" ? (
                          <>
                            <ActionBtn label="Undo" icon={<RotateCcw size={16} />} bg="#FFFFFF" color="#6B6B5A" border="rgba(200,153,58,0.3)" hoverBg="#F5E6C8" onClick={() => setApproval(id, "pending")} />
                            {tab.hasPayment && (
                              <ActionBtn
                                label={paid ? "Unpaid" : "Mark Paid"}
                                icon={<CreditCard size={16} />}
                                bg={paid ? "#FAEEDA" : "#EAF3DE"}
                                color={paid ? "#633806" : "#27500A"}
                                border={paid ? "#EF9F27" : "#97C459"}
                                hoverBg={paid ? "#f5ddb5" : "#d6ecbc"}
                                onClick={() => setPayment(id, !paid)}
                              />
                            )}
                            <span style={{ marginLeft: "auto" }}><ActionBtn label="Cancel" icon={<X size={16} />} bg="#F3F3F3" color="#4A4A4A" border="#BBBBBB" hoverBg="#E5E5E5" onClick={() => setApproval(id, "cancelled")} /></span>
                          </>
                        ) : (
                          <ActionBtn label="Undo" icon={<RotateCcw size={16} />} bg="#FFFFFF" color="#6B6B5A" border="rgba(200,153,58,0.3)" hoverBg="#F5E6C8" onClick={() => setApproval(id, "pending")} />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminLoginGate({ onLogin }) {
  const [form, setForm] = useState({ email: "", accessCode: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    const accessCode = form.accessCode.trim();

    if (!email || !accessCode) {
      setStatus("Enter your admin email and access code.");
      return;
    }

    setLoading(true);
    setStatus("Checking access...");

    try {
      const url = `${SCRIPT_URL}?action=adminLogin&email=${encodeURIComponent(email)}&accessCode=${encodeURIComponent(accessCode)}&t=${Date.now()}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!json.success || json.authenticated !== true) {
        setStatus(json.message || "Invalid admin access.");
        return;
      }

      const session = {
        email,
        name: json.name || email,
        role: json.role || "admin",
        ts: Date.now(),
      };
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      onLogin(session);
    } catch {
      setStatus("Login check failed. Confirm Apps Script supports adminLogin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="wop-page inner-page" style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "130px 20px 70px",
      background:
        "radial-gradient(circle at 16% 18%, rgba(232,123,50,0.18), transparent 32%), linear-gradient(135deg, #fffaf1, #f8ead4)",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <section style={{
        width: "min(1080px, 100%)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 430px",
        gap: 34,
        alignItems: "stretch",
      }}>
        <div style={{
          minHeight: 520,
          padding: "44px",
          borderRadius: 24,
          color: "#fff",
          background:
            "linear-gradient(135deg, rgba(16,23,40,0.94), rgba(28,39,64,0.9)), radial-gradient(circle at 80% 20%, rgba(232,123,50,0.28), transparent 32%)",
          boxShadow: "0 34px 100px rgba(63,35,14,0.14)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 13px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "rgba(255,255,255,0.78)",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              <ShieldCheck size={15} />
              Admin Control
            </div>

            <h1 style={{
              margin: "24px 0 0",
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(48px, 6vw, 82px)",
              lineHeight: 0.92,
              letterSpacing: "-0.055em",
            }}>
              Secure access for event operations.
            </h1>

            <p style={{
              margin: "22px 0 0",
              maxWidth: 560,
              color: "rgba(255,255,255,0.68)",
              fontSize: 18,
              lineHeight: 1.75,
            }}>
              Review submissions, approve partners, export records, and manage registration gates from one protected admin workspace.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 10,
          }}>
            {["Sheets data", "Access code", "Admin session"].map(item => (
              <div key={item} style={{
                minHeight: 82,
                padding: 14,
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.78)",
                fontSize: 13,
                fontWeight: 800,
              }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{
          padding: 30,
          borderRadius: 24,
          background: "rgba(255,255,255,0.82)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 28px 90px rgba(63,35,14,0.13)",
          backdropFilter: "blur(22px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div style={{
            width: 62,
            height: 62,
            display: "grid",
            placeItems: "center",
            borderRadius: 18,
            color: "#fff",
            background: "linear-gradient(135deg, #E87B32, #B83B2F)",
            boxShadow: "0 18px 42px rgba(232,123,50,0.3)",
            marginBottom: 22,
          }}>
            <Lock size={24} />
          </div>

          <h2 style={{
            margin: 0,
            color: "#101728",
            fontFamily: "'DM Serif Display', serif",
            fontSize: 38,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}>
            Admin Login
          </h2>

          <p style={{
            margin: "12px 0 24px",
            color: "#6D6255",
            lineHeight: 1.65,
          }}>
            Use the admin email and access code stored in your Google Sheet.
          </p>

          <label style={{ display: "grid", gap: 8, marginBottom: 14 }}>
            <span style={{ color: "#5D3519", fontSize: 12, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Email
            </span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              autoComplete="email"
              style={{
                minHeight: 52,
                padding: "0 15px",
                borderRadius: 14,
                border: "1px solid rgba(16,23,40,0.12)",
                background: "#fff",
                color: "#101728",
                fontSize: 16,
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8, marginBottom: 18 }}>
            <span style={{ color: "#5D3519", fontSize: 12, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Access Code
            </span>
            <input
              name="accessCode"
              type="password"
              value={form.accessCode}
              onChange={handleChange}
              placeholder="Enter access code"
              autoComplete="current-password"
              style={{
                minHeight: 52,
                padding: "0 15px",
                borderRadius: 14,
                border: "1px solid rgba(16,23,40,0.12)",
                background: "#fff",
                color: "#101728",
                fontSize: 16,
                outline: "none",
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="wop-btn wop-btn-primary"
            style={{ width: "100%" }}
          >
            {loading ? "Checking..." : "Enter Admin"}
            {loading ? <Loader2 size={18} style={{ animation: "spin 0.8s linear infinite" }} /> : <ShieldCheck size={18} />}
          </button>

          {status && (
            <p style={{
              minHeight: 24,
              margin: "16px 0 0",
              color: status.includes("failed") || status.includes("Invalid") ? "#8A2A2A" : "#6D6255",
              fontSize: 14,
              lineHeight: 1.5,
            }}>
              {status}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default function AdminPage() {
  useEffect(() => { document.title = "Admin | World on a Plate"; }, []);
  const navigate = useNavigate();
  const [adminSession, setAdminSession] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY) || "null"); }
    catch { return null; }
  });
  const [activeTab, setActiveTab] = useState("culinary");
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });
  const toastTimer = useRef(null);

  const showToast = useCallback((message, type = "info") => {
    setToast({ visible: true, message, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  const currentTab = TABS.find(t => t.key === activeTab);

  const logout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminSession(null);
  };

  if (!adminSession) {
    return <AdminLoginGate onLogin={setAdminSession} />;
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "120px 24px 64px" }}>

          <div style={{ borderBottom: "1px solid rgba(200,153,58,0.2)", paddingBottom: 22, marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
            <ShieldCheck size={22} color="#C8993A" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8993A", marginBottom: 2 }}>
                World on a Plate
              </div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, lineHeight: 1.15, color: "#1A1A14" }}>
                Partnership <em style={{ fontStyle: "italic", color: "#C8993A" }}>Admin</em>
              </h1>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <span style={{ color: "#6B6B5A", fontSize: 14 }}>
                Signed in as <strong style={{ color: "#1A1A14" }}>{adminSession.name || adminSession.email}</strong>
              </span>
              <button
                type="button"
                onClick={() => navigate("/admin/updates")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  minHeight: 38,
                  padding: "0 16px",
                  borderRadius: 999,
                  border: "none",
                  background: "linear-gradient(135deg, #E87B32, #B83B2F)",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(232,123,50,0.28)",
                }}
              >
                <Send size={14} />
                Send Updates
              </button>
              <button
                type="button"
                onClick={logout}
                style={{
                  minHeight: 38,
                  padding: "0 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(200,153,58,0.28)",
                  background: "#fff",
                  color: "#1A1A14",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>

          <RegistrationGate showToast={showToast} />

          <div style={{ display: "flex", gap: 4, marginBottom: 28, flexWrap: "wrap", borderBottom: "1px solid rgba(200,153,58,0.15)" }}>
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "10px 16px",
                    border: "none",
                    borderBottom: isActive ? `2px solid ${tab.color}` : "2px solid transparent",
                    background: isActive ? tab.lightBg : "transparent",
                    color: isActive ? tab.color : "#6B6B5A",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 17, fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    borderRadius: "6px 6px 0 0",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {currentTab && (
            <SheetPanel
              key={activeTab}
              tab={currentTab}
              showToast={showToast}
            />
          )}

        </div>
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </>
  );
}
