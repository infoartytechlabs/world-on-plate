import { useEffect } from "react";

const DOT_CONFIG = [
  { ease: 0.18, size: 22, alpha: 1.00 },
  { ease: 0.14, size: 18, alpha: 0.85 },
  { ease: 0.10, size: 14, alpha: 0.60 },
  { ease: 0.07, size: 10, alpha: 0.35 },
];
const BORDER = 9;

export default function CursorTrail({ images = [] }) {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      pointerEvents: "none",
      zIndex: "99999",
    });
    document.body.appendChild(canvas);
    document.body.style.cursor = "none";
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const imgs = images.map((src) => {
      if (!src) return null;
      const el = new Image();
      el.crossOrigin = "anonymous";
      el.src = src;
      return el;
    });

    const mouse = { x: -999, y: -999 };
    const dots  = DOT_CONFIG.map(d => ({ ...d, x: -999, y: -999 }));
    let moved = false;
    let hidden = false;

    const INTERACTIVE = "a, button, input, select, textarea, label, nav, [role='button'], [data-cursor-hide]";

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!moved) {
        dots.forEach(d => { d.x = e.clientX; d.y = e.clientY; });
        moved = true;
      }
      const over = document.elementFromPoint(e.clientX, e.clientY);
      hidden = !!(over && over.closest(INTERACTIVE));
      document.body.style.cursor = hidden ? "" : "none";
      canvas.style.opacity = hidden ? "0" : "1";
    };
    document.addEventListener("mousemove", onMove);

    const drawDot = (x, y, size, alpha, imgEl) => {
      ctx.save();

      // outer ring at 50% of original alpha
      ctx.globalAlpha = alpha * 0.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = "#E86635";
      ctx.fill();

      // restore full alpha for image
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.arc(x, y, size - BORDER, 0, Math.PI * 2);
      ctx.clip();

      if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
        const d = (size - BORDER) * 2;
        ctx.drawImage(imgEl, x - (size - BORDER), y - (size - BORDER), d, d);
      } else {
        ctx.fillStyle = "#cccccc";
        ctx.fill();
      }

      ctx.restore();
    };

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (moved) {
        const targets = [mouse, ...dots];
        dots.forEach((d, i) => {
          d.x += (targets[i].x - d.x) * d.ease;
          d.y += (targets[i].y - d.y) * d.ease;
        });

        const pts = [mouse, ...dots];
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 0; i < pts.length - 1; i++) {
          const mx = (pts[i].x + pts[i + 1].x) / 2;
          const my = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        ctx.strokeStyle = "rgba(232,102,53,0.45)";
        ctx.lineWidth   = 1.5;
        ctx.lineJoin    = "round";
        ctx.lineCap     = "round";
        ctx.stroke();

        for (let i = dots.length - 1; i >= 0; i--) {
          drawDot(dots[i].x, dots[i].y, dots[i].size, dots[i].alpha, imgs[i] ?? null);
        }

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,102,53,0.9)";
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      canvas.remove();
      document.body.style.cursor = "";
    };
  }, [images]);

  return null;
}
