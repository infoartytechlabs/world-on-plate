import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send, ChefHat, Users, Building2, Store, Music4,
  ArrowLeft, ShieldCheck, Loader2, Mail, CheckCircle2,
  Paperclip, X, FileText, ImageIcon, File, UploadCloud,
} from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPlLgi6oxU46-hYekAGX8-za66A5SCt1C6eivsh9YDPl6IC5zdYBRdcH4EkPRKjfIpDA/exec";
const ADMIN_SESSION_KEY = "wop_admin_session";
const MAX_FILE_BYTES  = 5  * 1024 * 1024;  // 5 MB per file
const MAX_TOTAL_BYTES = 15 * 1024 * 1024;  // 15 MB total
const MAX_FILE_COUNT  = 5;
const ACCEPTED_TYPES  = [
  "application/pdf",
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain", "text/csv",
];

const GROUPS = [
  { key: "culinary",   label: "Culinary Partners", icon: ChefHat,   color: "#8A2A2A", lightBg: "#FBF0EE" },
  { key: "volunteers", label: "Volunteers",         icon: Users,     color: "#2A3C8A", lightBg: "#EEF1FB" },
  { key: "sponsors",   label: "Sponsors",           icon: Building2, color: "#2A6B3C", lightBg: "#E8F4EC" },
  { key: "vendors",    label: "Vendors",            icon: Store,     color: "#633806", lightBg: "#FAEEDA" },
  { key: "musicians",  label: "Musicians",          icon: Music4,    color: "#533AB7", lightBg: "#EEEDFE" },
];

/* ─── helpers ─── */
function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readAsBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload  = () => resolve(r.result.split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function FileTypeIcon({ mimeType }) {
  if (mimeType.startsWith("image/"))
    return <ImageIcon size={18} color="#2A3C8A" />;
  if (mimeType === "application/pdf")
    return <FileText size={18} color="#8A2A2A" />;
  if (mimeType.includes("sheet") || mimeType.includes("excel") || mimeType === "text/csv")
    return <FileText size={18} color="#2A6B3C" />;
  if (mimeType.includes("word") || mimeType.includes("document"))
    return <FileText size={18} color="#2A6B3C" />;
  return <File size={18} color="#6B6B5A" />;
}

/* ─── sub-components ─── */
function Toast({ message, type, visible }) {
  const map = {
    success: { bg: "#E8F4EC", color: "#27500A", border: "#97C459" },
    error:   { bg: "#FCEBEB", color: "#791F1F", border: "#F09595" },
    info:    { bg: "#F8F0E4", color: "#5D3519", border: "#C8993A" },
  };
  const c = map[type] || map.info;
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%",
      transform: "translateX(-50%)",
      padding: "13px 24px", borderRadius: 10,
      border: `1px solid ${c.border}`,
      background: c.bg, color: c.color,
      fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15,
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      opacity: visible ? 1 : 0,
      pointerEvents: "none", transition: "opacity 0.3s",
      zIndex: 9999, whiteSpace: "nowrap",
    }}>
      {message}
    </div>
  );
}

function GroupCard({ group, selected, onToggle }) {
  const Icon = group.icon;
  return (
    <button
      type="button"
      onClick={() => onToggle(group.key)}
      style={{
        display: "flex", alignItems: "center", gap: 11,
        padding: "15px 18px", borderRadius: 14,
        border: `2px solid ${selected ? group.color : "rgba(0,0,0,0.09)"}`,
        background: selected ? group.lightBg : "#FAFAFA",
        color: selected ? group.color : "#6B6B5A",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15, fontWeight: selected ? 700 : 500,
        cursor: "pointer", transition: "all 0.15s",
        textAlign: "left", width: "100%",
      }}
    >
      <Icon size={18} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{group.label}</span>
      {selected && <CheckCircle2 size={17} style={{ flexShrink: 0 }} />}
    </button>
  );
}

/* ─── main page ─── */
export default function AdminUpdates() {
  const navigate = useNavigate();

  const [adminSession] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY) || "null"); }
    catch { return null; }
  });

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [subject,  setSubject]  = useState("");
  const [message,  setMessage]  = useState("");
  const [attachments, setAttachments] = useState([]);  // { id, name, size, type, base64 }
  const [dragOver, setDragOver] = useState(false);
  const [sending,  setSending]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });
  const toastTimer  = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!adminSession) navigate("/admin", { replace: true });
  }, [adminSession, navigate]);

  const showToast = useCallback((msg, type = "info") => {
    setToast({ visible: true, message: msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })), 4000
    );
  }, []);

  /* ── file handling ── */
  const addFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList);
    const current = attachments;

    for (const file of files) {
      if (current.length + attachments.length >= MAX_FILE_COUNT) {
        showToast(`Max ${MAX_FILE_COUNT} files allowed.`, "error");
        break;
      }
      if (!ACCEPTED_TYPES.includes(file.type)) {
        showToast(`"${file.name}" — unsupported file type.`, "error");
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        showToast(`"${file.name}" exceeds the 5 MB per-file limit.`, "error");
        continue;
      }
      const totalNow = attachments.reduce((s, a) => s + a.size, 0) + file.size;
      if (totalNow > MAX_TOTAL_BYTES) {
        showToast("Total attachments exceed 15 MB limit.", "error");
        break;
      }
      const base64 = await readAsBase64(file);
      setAttachments((prev) => [
        ...prev,
        { id: `${file.name}_${Date.now()}`, name: file.name, size: file.size, type: file.type, base64 },
      ]);
    }
  }, [attachments, showToast]);

  const removeAttachment = (id) =>
    setAttachments((prev) => prev.filter((a) => a.id !== id));

  const handleFileInput = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDragOver  = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = ()  => setDragOver(false);
  const handleDrop      = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  /* ── group selection ── */
  const toggleGroup = (key) =>
    setSelectedGroups((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const allSelected    = selectedGroups.length === GROUPS.length;
  const handleSelectAll = () =>
    setSelectedGroups(allSelected ? [] : GROUPS.map((g) => g.key));

  const totalAttachSize = attachments.reduce((s, a) => s + a.size, 0);

  const canSend =
    selectedGroups.length > 0 &&
    subject.trim().length > 0 &&
    message.trim().length > 0 &&
    !sending;

  /* ── send ── */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!canSend) return;

    setSending(true);

    const groupLabels = selectedGroups
      .map((k) => GROUPS.find((g) => g.key === k)?.label)
      .filter(Boolean)
      .join(", ");

    const baseParams = {
      action:      "sendUpdate",
      groups:      selectedGroups.join(","),
      groupLabels,
      subject:     subject.trim(),
      message:     message.trim(),
      senderName:  adminSession.name || adminSession.email,
      senderEmail: adminSession.email,
    };

    const resetForm = () => {
      setSubject("");
      setMessage("");
      setSelectedGroups([]);
      setAttachments([]);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    };

    // ── Text-only: GET request (CORS-safe, returns readable JSON) ──
    if (attachments.length === 0) {
      try {
        const params = new URLSearchParams({ ...baseParams, t: Date.now() });
        const res  = await fetch(`${SCRIPT_URL}?${params.toString()}`);
        const json = await res.json();
        if (json.success) {
          showToast(`Update sent to ${selectedGroups.length} group${selectedGroups.length > 1 ? "s" : ""}!`, "success");
          resetForm();
        } else {
          showToast(json.message || "Failed to send. Please try again.", "error");
        }
      } catch {
        showToast("Network error. Check your connection and try again.", "error");
      } finally {
        setSending(false);
      }
      return;
    }

    // ── With attachments: POST JSON body ──
    // Apps Script reads this from e.postData.contents
    try {
      const payload = {
        ...baseParams,
        fileCount: attachments.length,
      };
      attachments.forEach((att, i) => {
        payload[`file_${i}_name`] = att.name;
        payload[`file_${i}_type`] = att.type;
        payload[`file_${i}_data`] = att.base64;
      });

      // Apps Script Web Apps require the request to come without CORS preflight
      // for no-cors mode — but we need to read the response too.
      // Solution: encode everything as a GET param called "payload" on a GET request.
      // This avoids the no-cors blind POST problem entirely.
      const encoded = encodeURIComponent(JSON.stringify(payload));
      const url = `${SCRIPT_URL}?payload=${encoded}&t=${Date.now()}`;

      const res  = await fetch(url);
      const json = await res.json();

      if (json.success) {
        showToast(
          `Update with ${attachments.length} attachment${attachments.length > 1 ? "s" : ""} sent to ${selectedGroups.length} group${selectedGroups.length > 1 ? "s" : ""}!`,
          "success"
        );
        resetForm();
      } else {
        showToast(json.message || "Failed to send. Please try again.", "error");
      }
    } catch {
      showToast("Network error. Check your connection and try again.", "error");
    } finally {
      setSending(false);
    }
  };

  if (!adminSession) return null;

  const recipientSummary =
    selectedGroups.length === 0 ? "No groups selected" :
    selectedGroups.length === GROUPS.length ? "All groups selected" :
    selectedGroups.map((k) => GROUPS.find((g) => g.key === k)?.label).filter(Boolean).join(", ");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wop-updates-card { animation: fadeSlideUp 0.35s ease both; }
        .wop-group-card:hover { transform: translateY(-1px); }
        .wop-send-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 48px rgba(232,123,50,0.38) !important;
        }
        .wop-send-btn { transition: all 0.2s; }
        .wop-back-btn:hover { background: #FBF4E8 !important; border-color: #C8993A !important; }
        .wop-drop-zone { transition: all 0.2s; }
        .wop-drop-zone:hover { border-color: #C8993A !important; background: #FBF4E8 !important; }
        .wop-att-row:hover .wop-att-remove { opacity: 1 !important; }
        .wop-att-remove { transition: opacity 0.15s; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 80% 10%, rgba(232,123,50,0.06), transparent 40%), #FAFAF7",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "120px 24px 80px" }}>

          {/* ── Header ── */}
          <div style={{
            borderBottom: "1px solid rgba(200,153,58,0.2)",
            paddingBottom: 22, marginBottom: 36,
            display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
          }}>
            <button
              type="button"
              className="wop-back-btn"
              onClick={() => navigate("/admin")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "8px 16px", borderRadius: 999,
                border: "1px solid rgba(200,153,58,0.28)",
                background: "#fff", color: "#1A1A14",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              }}
            >
              <ArrowLeft size={15} /> Back to Admin
            </button>

            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8993A", marginBottom: 2 }}>
                World on a Plate
              </div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, lineHeight: 1.1, color: "#1A1A14", margin: 0, letterSpacing: "-0.02em" }}>
                Send <em style={{ fontStyle: "italic", color: "#C8993A" }}>Updates</em>
              </h1>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldCheck size={16} color="#C8993A" />
              <span style={{ color: "#6B6B5A", fontSize: 14 }}>
                Signed in as <strong style={{ color: "#1A1A14" }}>{adminSession.name || adminSession.email}</strong>
              </span>
            </div>
          </div>

          <form onSubmit={handleSend} style={{ display: "grid", gap: 24 }}>

            {/* ── Recipients Card ── */}
            <div
              className="wop-updates-card"
              style={{
                background: "#fff", borderRadius: 20,
                border: "1px solid rgba(200,153,58,0.16)",
                padding: "28px 32px",
                boxShadow: "0 4px 28px rgba(0,0,0,0.04)",
                animationDelay: "0ms",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1A1A14" }}>Select Recipients</h2>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9B9B8A" }}>Choose one or more groups to notify</p>
                </div>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  style={{
                    padding: "8px 18px", borderRadius: 999,
                    border: `1.5px solid ${allSelected ? "#C8993A" : "rgba(200,153,58,0.35)"}`,
                    background: allSelected ? "#FBF4E8" : "#fff",
                    color: allSelected ? "#8A5F00" : "#6B6B5A",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {allSelected ? "Deselect All" : "Select All Groups"}
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                {GROUPS.map((group) => (
                  <div key={group.key} className="wop-group-card" style={{ transition: "transform 0.15s" }}>
                    <GroupCard group={group} selected={selectedGroups.includes(group.key)} onToggle={toggleGroup} />
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 18, padding: "11px 18px", borderRadius: 10,
                background: selectedGroups.length > 0 ? "#F8F0E4" : "#F5F5F0",
                color: selectedGroups.length > 0 ? "#8A5F00" : "#9B9B8A",
                fontSize: 14, fontWeight: selectedGroups.length > 0 ? 600 : 500,
                display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
              }}>
                <Mail size={15} style={{ flexShrink: 0 }} />
                <span><strong>To:</strong> {recipientSummary}</span>
              </div>
            </div>

            {/* ── Compose Card ── */}
            <div
              className="wop-updates-card"
              style={{
                background: "#fff", borderRadius: 20,
                border: "1px solid rgba(200,153,58,0.16)",
                padding: "28px 32px",
                boxShadow: "0 4px 28px rgba(0,0,0,0.04)",
                animationDelay: "60ms",
              }}
            >
              <h2 style={{ margin: "0 0 22px", fontSize: 18, fontWeight: 700, color: "#1A1A14" }}>
                Compose Message
              </h2>

              {/* Subject */}
              <label style={{ display: "grid", gap: 8, marginBottom: 20 }}>
                <span style={{ color: "#5D3519", fontSize: 12, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Subject
                </span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Important update about World on a Plate 2025"
                  maxLength={150}
                  style={{
                    padding: "12px 16px", borderRadius: 12,
                    border: "1px solid rgba(16,23,40,0.12)",
                    background: "#FAFAF7", color: "#101728",
                    fontSize: 16, fontFamily: "'DM Sans', sans-serif",
                    outline: "none", width: "100%", boxSizing: "border-box",
                  }}
                />
              </label>

              {/* Message */}
              <label style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#5D3519", fontSize: 12, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Message
                  </span>
                  <span style={{ fontSize: 12, color: message.length > 1800 ? "#8A2A2A" : "#9B9B8A", fontWeight: message.length > 1800 ? 700 : 400 }}>
                    {message.length} / 2000
                  </span>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your update here. Include event details, schedule changes, instructions, or any relevant information..."
                  maxLength={2000}
                  rows={9}
                  style={{
                    padding: "14px 16px", borderRadius: 12,
                    border: "1px solid rgba(16,23,40,0.12)",
                    background: "#FAFAF7", color: "#101728",
                    fontSize: 16, fontFamily: "'DM Sans', sans-serif",
                    outline: "none", resize: "vertical", lineHeight: 1.7,
                    width: "100%", boxSizing: "border-box",
                  }}
                />
              </label>
            </div>

            {/* ── Attachments Card ── */}
            <div
              className="wop-updates-card"
              style={{
                background: "#fff", borderRadius: 20,
                border: "1px solid rgba(200,153,58,0.16)",
                padding: "28px 32px",
                boxShadow: "0 4px 28px rgba(0,0,0,0.04)",
                animationDelay: "120ms",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1A1A14", display: "flex", alignItems: "center", gap: 8 }}>
                    <Paperclip size={18} color="#C8993A" />
                    Attachments
                    {attachments.length > 0 && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 22, height: 22, borderRadius: "50%",
                        background: "#F8F0E4", color: "#8A5F00",
                        fontSize: 12, fontWeight: 800,
                      }}>
                        {attachments.length}
                      </span>
                    )}
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9B9B8A" }}>
                    PDF, images, Word, Excel · max 5 MB each · {fmtSize(MAX_TOTAL_BYTES)} total
                  </p>
                </div>
                {attachments.length > 0 && (
                  <span style={{ fontSize: 13, color: totalAttachSize > MAX_TOTAL_BYTES * 0.8 ? "#8A2A2A" : "#9B9B8A", fontWeight: 600 }}>
                    {fmtSize(totalAttachSize)} / {fmtSize(MAX_TOTAL_BYTES)} used
                  </span>
                )}
              </div>

              {/* Drop zone */}
              <div
                className="wop-drop-zone"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? "#C8993A" : "rgba(200,153,58,0.3)"}`,
                  borderRadius: 14,
                  padding: "28px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: dragOver ? "#FBF4E8" : "#FAFAF7",
                  marginBottom: attachments.length > 0 ? 16 : 0,
                  userSelect: "none",
                }}
              >
                <UploadCloud size={32} color={dragOver ? "#C8993A" : "#C8B98A"} style={{ margin: "0 auto 10px" }} />
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#5D3519" }}>
                  Drag & drop files here, or <span style={{ color: "#C8993A", textDecoration: "underline" }}>browse</span>
                </p>
                <p style={{ margin: "6px 0 0", fontSize: 13, color: "#9B9B8A" }}>
                  Up to {MAX_FILE_COUNT} files · 5 MB each
                </p>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ACCEPTED_TYPES.join(",")}
                onChange={handleFileInput}
                style={{ display: "none" }}
              />

              {/* File list */}
              {attachments.length > 0 && (
                <div style={{ display: "grid", gap: 8 }}>
                  {attachments.map((att) => (
                    <div
                      key={att.id}
                      className="wop-att-row"
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "11px 14px", borderRadius: 12,
                        border: "1px solid rgba(200,153,58,0.16)",
                        background: "#FAFAF7",
                        position: "relative",
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: "#F0F0EA",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <FileTypeIcon mimeType={att.type} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 14, fontWeight: 600, color: "#1A1A14",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {att.name}
                        </div>
                        <div style={{ fontSize: 12, color: "#9B9B8A", marginTop: 2 }}>
                          {fmtSize(att.size)}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="wop-att-remove"
                        onClick={() => removeAttachment(att.id)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: 28, height: 28, borderRadius: "50%",
                          border: "none", background: "#FCEBEB", color: "#791F1F",
                          cursor: "pointer", flexShrink: 0,
                          opacity: 0.7,
                        }}
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Send Button Row ── */}
            <div
              className="wop-updates-card"
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap", gap: 16,
                animationDelay: "180ms",
              }}
            >
              <div style={{ fontSize: 14, color: "#9B9B8A" }}>
                {!canSend && !sending && (
                  selectedGroups.length === 0
                    ? "Select at least one recipient group to continue."
                    : !subject.trim()
                    ? "Add a subject line to continue."
                    : !message.trim()
                    ? "Write a message to continue."
                    : null
                )}
                {sent && (
                  <span style={{ color: "#27500A", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle2 size={16} /> Update sent successfully!
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSend}
                className="wop-send-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 32px", borderRadius: 14, border: "none",
                  background: canSend ? "linear-gradient(135deg, #E87B32, #B83B2F)" : "rgba(0,0,0,0.08)",
                  color: canSend ? "#fff" : "#9B9B8A",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16, fontWeight: 700,
                  cursor: canSend ? "pointer" : "not-allowed",
                  boxShadow: canSend ? "0 10px 32px rgba(232,123,50,0.28)" : "none",
                }}
              >
                {sending
                  ? <Loader2 size={18} style={{ animation: "spin 0.8s linear infinite" }} />
                  : <Send size={18} />}
                {sending
                  ? "Sending..."
                  : `Send to ${selectedGroups.length || 0} Group${selectedGroups.length !== 1 ? "s" : ""}${attachments.length > 0 ? ` · ${attachments.length} file${attachments.length > 1 ? "s" : ""}` : ""}`}
              </button>
            </div>

          </form>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </>
  );
}
