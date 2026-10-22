import type { Config } from "tailwindcss";

/**
 * Design tokens live HERE (not in a giant stylesheet):
 * colours, fonts, keyframes and animations. Components style themselves with utilities.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#faf6ec",
        ink: {
          DEFAULT: "#121009",
          2: "#1b1811",
          70: "rgba(18,16,9,0.78)",
          50: "rgba(18,16,9,0.62)", // 0.58 was 4.39:1 on beige, just under the WCAG AA 4.5:1 minimum
        },
        line: "rgba(18,16,9,0.14)",
        beige: { DEFAULT: "#e7dab8", dk: "#cbb585", soft: "#f1e9d6" },
        "on-ink": {
          DEFAULT: "#f3eee0",
          60: "rgba(243,238,224,0.66)",
          30: "rgba(243,238,224,0.22)",
        },
        wa: "#25d366",
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
        oswald: ["Oswald", "Anton", "sans-serif"],
        anton: ["Anton", "Oswald", "sans-serif"],
      },
      maxWidth: { wrap: "1240px" },
      transitionTimingFunction: {
        snap: "cubic-bezier(0.2,0.8,0.3,1)",
        reveal: "cubic-bezier(0.2,0.7,0.2,1)",
      },
      keyframes: {
        marqueeLeft: { from: { transform: "translate3d(0,0,0)" }, to: { transform: "translate3d(-50%,0,0)" } },
        marqueeRight: { from: { transform: "translate3d(-50%,0,0)" }, to: { transform: "translate3d(0,0,0)" } },
        hfBreathe: {
          "0%,100%": { transform: "translateX(-50%) scale(1)" },
          "50%": { transform: "translateX(-50%) scale(1.035)" },
        },
        hfSpin: { to: { transform: "rotate(360deg)" } },
        hfFloat: {
          "0%,100%": { transform: "rotate(45deg) translateY(0)" },
          "50%": { transform: "rotate(45deg) translateY(-16px)" },
        },
        whyProgress: { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        waPulse: { from: { transform: "scale(1)", opacity: "0.55" }, to: { transform: "scale(1.6)", opacity: "0" } },
        cardIn: {
          from: { opacity: "0", transform: "perspective(1100px) rotateX(16deg) rotateY(-8deg) translateY(60px)" },
        },
        liIn: { from: { opacity: "0", transform: "perspective(700px) rotateY(-28deg) translateX(-24px)" } },
        fieldIn: { from: { opacity: "0", transform: "translateY(18px) translateZ(-20px)" } },
      },
      animation: {
        "marquee-left": "marqueeLeft 30s linear infinite",
        "marquee-right": "marqueeRight 20s linear infinite",
        "marquee-ticker": "marqueeLeft 30s linear infinite",
        "hf-breathe": "hfBreathe 8s ease-in-out infinite",
        "hf-spin": "hfSpin 55s linear infinite",
        "hf-float": "hfFloat 6s ease-in-out infinite",
        "why-progress": "whyProgress 7s linear forwards",
        "wa-pulse": "waPulse 2.2s ease-out infinite",
        "card-in": "cardIn 1s cubic-bezier(0.2,0.7,0.2,1) 0.15s backwards",
        "li-in": "liIn 0.8s cubic-bezier(0.2,0.7,0.2,1) backwards",
        "field-in": "fieldIn 0.6s cubic-bezier(0.2,0.7,0.2,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
