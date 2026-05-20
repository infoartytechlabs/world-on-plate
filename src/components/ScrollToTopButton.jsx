import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ScrollToTopButton.css";

const hiddenRoutes = ["/admin", "/auth", "/culinary"];

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const hidden = hiddenRoutes.some((route) => location.pathname.startsWith(route));

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {!hidden && visible && (
        <motion.button
          type="button"
          className="scroll-top-btn"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.9 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
