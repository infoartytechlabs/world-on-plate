import { motion } from "framer-motion";

function AnimatedLogo() {
  return (
    <div className="animated-logo">
      <motion.svg
        width="78"
        height="46"
        viewBox="0 0 78 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="78" y2="46">
            <stop stopColor="#f7d774" />
            <stop offset="0.45" stopColor="#d4af37" />
            <stop offset="1" stopColor="#8f6b18" />
          </linearGradient>
        </defs>

        <motion.text
          x="0"
          y="34"
          fontSize="30"
          fontWeight="800"
          fill="white"
          fontFamily="Georgia, serif"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          W
        </motion.text>

        <motion.circle
          cx="39"
          cy="23"
          r="15"
          stroke="url(#gold)"
          strokeWidth="3"
          fill="rgba(212,175,55,0.08)"
          initial={{ pathLength: 0, rotate: -120 }}
          animate={{ pathLength: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        <motion.circle
          cx="39"
          cy="23"
          r="7"
          fill="url(#gold)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.15, 1] }}
          transition={{ delay: 0.65, duration: 0.6 }}
        />

        <motion.path
          d="M25 23C33 13 45 13 53 23C45 33 33 33 25 23Z"
          stroke="url(#gold)"
          strokeWidth="1.4"
          fill="none"
          opacity="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.75, duration: 1 }}
        />

        <motion.text
          x="57"
          y="34"
          fontSize="30"
          fontWeight="800"
          fill="white"
          fontFamily="Georgia, serif"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          P
        </motion.text>
      </motion.svg>

    
    </div>
  );
}

export default AnimatedLogo;