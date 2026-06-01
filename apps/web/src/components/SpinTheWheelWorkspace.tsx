"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

const SpeakerWave = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
);
const SpeakerX = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const TrashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
);
const TargetIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
const ShuffleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const ArrowUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
);
const ArrowDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
);

interface Palette {
  name: string;
  colors: [string, string][];
}

const PALETTES: Palette[] = [
  {
    name: "Neon Pulse",
    colors: [
      ["#FF3366", "#CC0033"], ["#FFB800", "#E69600"], ["#00D084", "#00A86B"],
      ["#5850EC", "#4038C8"], ["#FF6B35", "#E05520"], ["#00BCD4", "#0097A7"],
      ["#AB47BC", "#8E24AA"], ["#26A69A", "#00897B"], ["#EC407A", "#D81B60"],
      ["#5C6BC0", "#3949AB"], ["#8D6E63", "#6D4C41"], ["#78909C", "#546E7A"],
    ],
  },
  {
    name: "Sunset Glow",
    colors: [
      ["#FF1744", "#D50000"], ["#FF3D00", "#DD2C00"], ["#FF6D00", "#E65100"],
      ["#FF9100", "#FF6D00"], ["#FFAB00", "#FF8F00"], ["#FFD600", "#FFC400"],
      ["#F9A825", "#F57F17"], ["#E65100", "#BF360C"], ["#D50000", "#B71C1C"],
      ["#C62828", "#8E0000"], ["#AD1457", "#6A1B9A"], ["#4A148C", "#311B92"],
    ],
  },
  {
    name: "Deep Ocean",
    colors: [
      ["#01579B", "#002F6C"], ["#0277BD", "#01579B"], ["#0288D1", "#0277BD"],
      ["#039BE5", "#0288D1"], ["#00ACC1", "#00838F"], ["#0097A7", "#006064"],
      ["#00897B", "#004D40"], ["#00695C", "#003D33"], ["#2E7D32", "#1B5E20"],
      ["#1B5E20", "#0D3300"], ["#33691E", "#1B3D00"], ["#004D40", "#00251A"],
    ],
  },
  {
    name: "Midnight Velvet",
    colors: [
      ["#1A237E", "#0D0D4B"], ["#283593", "#0D0D4B"], ["#311B92", "#1A0A4B"],
      ["#4A148C", "#2A0054"], ["#6A1B9A", "#4A0054"], ["#880E4F", "#4A001F"],
      ["#B71C1C", "#7F0000"], ["#BF360C", "#870000"], ["#004D40", "#00251A"],
      ["#0D47A1", "#002171"], ["#33691E", "#002200"], ["#3E2723", "#1B0000"],
    ],
  },
  {
    name: "Pastel Garden",
    colors: [
      ["#EF9A9A", "#E57373"], ["#FFCC80", "#FFB74D"], ["#FFF59D", "#FFF176"],
      ["#A5D6A7", "#81C784"], ["#90CAF9", "#64B5F6"], ["#81D4FA", "#4FC3F7"],
      ["#CE93D8", "#BA68C8"], ["#B39DDB", "#9575CD"], ["#F48FB1", "#F06292"],
      ["#80DEEA", "#4DD0E1"], ["#C8E6C9", "#A5D6A7"], ["#FFE0B2", "#FFCC80"],
    ],
  },
  {
    name: "Aurora",
    colors: [
      ["#E040FB", "#AA00FF"], ["#7C4DFF", "#651FFF"], ["#448AFF", "#2979FF"],
      ["#00BCD4", "#00E5FF"], ["#1DE9B6", "#00BFA5"], ["#00E676", "#00C853"],
      ["#76FF03", "#64DD17"], ["#C6FF00", "#AEEA00"], ["#FFEA00", "#FFD600"],
      ["#FF9100", "#FF6D00"], ["#FF3D00", "#DD2C00"], ["#D500F9", "#AA00FF"],
    ],
  },
  {
    name: "Earth Tones",
    colors: [
      ["#795548", "#5D4037"], ["#8D6E63", "#6D4C41"], ["#A1887F", "#8D6E63"],
      ["#BCAAA4", "#A1887F"], ["#6D4C41", "#4E342E"], ["#4E342E", "#3E2723"],
      ["#558B2F", "#33691E"], ["#689F38", "#558B2F"], ["#7CB342", "#689F38"],
      ["#F57F17", "#E65100"], ["#E65100", "#BF360C"], ["#BF360C", "#870000"],
    ],
  },
  {
    name: "Sakura",
    colors: [
      ["#FCE4EC", "#F8BBD0"], ["#F8BBD0", "#F48FB1"], ["#F48FB1", "#F06292"],
      ["#F06292", "#E91E63"], ["#E91E63", "#C2185B"], ["#C2185B", "#AD1457"],
      ["#CE93D8", "#AB47BC"], ["#AB47BC", "#8E24AA"], ["#8E24AA", "#6A1B9A"],
      ["#FFF3E0", "#FFE0B2"], ["#FFE0B2", "#FFCC80"], ["#81C784", "#66BB6A"],
    ],
  },
];

const RIM_GRADIENT_START = "#3a3a3a";
const RIM_GRADIENT_END = "#1a1a1a";
const RIM_HIGHLIGHT = "#555555";


function drawWheelFace(
  ctx: CanvasRenderingContext2D,
  items: string[],
  size: number,
  colors: [string, string][],
  highlightIndex?: number
) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 2;
  const slice = (2 * Math.PI) / items.length;
  const innerRadius = radius * 0.22;

  ctx.clearRect(0, 0, size, size);

  // ── Outer Rim Shadow ──
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = "transparent";
  ctx.fill();
  ctx.restore();

  // ── Outer Rim ──
  ctx.save();
  const rimGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
  rimGrad.addColorStop(0, RIM_GRADIENT_START);
  rimGrad.addColorStop(0.5, RIM_HIGHLIGHT);
  rimGrad.addColorStop(1, RIM_GRADIENT_END);
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
  ctx.fillStyle = rimGrad;
  ctx.fill();
  ctx.restore();

  // ── Outer Rim Inner Edge (bevel) ──
  ctx.save();
  const bevelGrad = ctx.createRadialGradient(cx, cy, radius - 10, cx, cy, radius + 2);
  bevelGrad.addColorStop(0, "rgba(0,0,0,0)");
  bevelGrad.addColorStop(0.7, "rgba(0,0,0,0)");
  bevelGrad.addColorStop(1, "rgba(0,0,0,0.3)");
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
  ctx.fillStyle = bevelGrad;
  ctx.fill();
  ctx.restore();

  // ── Rim Dots (decorative) ──
  const dotCount = items.length * 3;
  for (let i = 0; i < dotCount; i++) {
    const angle = (i / dotCount) * Math.PI * 2;
    const dx = cx + (radius - 5) * Math.cos(angle);
    const dy = cy + (radius - 5) * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)";
    ctx.fill();
  }

  // ── Segments ──
  items.forEach((item, i) => {
    const startAngle = i * slice - Math.PI / 2;
    const endAngle = startAngle + slice;
    const [mainColor, darkColor] = colors[i % colors.length];

    // Segment fill with gradient
    ctx.save();
    const midAngle = startAngle + slice / 2;
    const gx = cx + radius * 0.5 * Math.cos(midAngle);
    const gy = cy + radius * 0.5 * Math.sin(midAngle);
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
    grad.addColorStop(0, mainColor);
    grad.addColorStop(1, darkColor);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius - 2, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Segment separator line
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + (radius - 2) * Math.cos(startAngle),
      cy + (radius - 2) * Math.sin(startAngle)
    );
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Text — rotated to read from center outward
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(midAngle);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const fontSize = Math.max(11, Math.min(18, (radius * 0.55) / items.length * 1.8));
    ctx.font = `700 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;

    // Text shadow for readability
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillText(item, radius - 14, 1);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 4;
    ctx.fillText(item, radius - 14, 0);
    ctx.restore();
  });

  // ── Inner Ring (transition to hub) ──
  ctx.save();
  const innerRingGrad = ctx.createRadialGradient(cx, cy, innerRadius - 4, cx, cy, innerRadius + 6);
  innerRingGrad.addColorStop(0, "rgba(255,255,255,0.1)");
  innerRingGrad.addColorStop(0.5, "rgba(0,0,0,0.05)");
  innerRingGrad.addColorStop(1, "rgba(0,0,0,0.2)");
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius + 6, 0, Math.PI * 2);
  ctx.fillStyle = innerRingGrad;
  ctx.fill();
  ctx.restore();

  // ── Center Hub (glass) ──
  ctx.save();
  const hubGrad = ctx.createRadialGradient(cx - innerRadius * 0.2, cy - innerRadius * 0.2, 2, cx, cy, innerRadius + 4);
  hubGrad.addColorStop(0, "rgba(255,255,255,0.5)");
  hubGrad.addColorStop(0.3, "rgba(255,255,255,0.15)");
  hubGrad.addColorStop(0.7, "rgba(255,255,255,0.05)");
  hubGrad.addColorStop(1, "rgba(255,255,255,0.1)");
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius + 4, 0, Math.PI * 2);
  ctx.fillStyle = hubGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  // ── Hub center dot ──
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fill();
  ctx.restore();

  // ── Glossy sheen overlay ──
  ctx.save();
  const sheenGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 5, cx, cy, radius * 0.85);
  sheenGrad.addColorStop(0, "rgba(255,255,255,0.08)");
  sheenGrad.addColorStop(0.4, "rgba(255,255,255,0.03)");
  sheenGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
  ctx.fillStyle = sheenGrad;
  ctx.fill();
  ctx.restore();

  // ── Winner highlight glow ──
  if (highlightIndex !== undefined && highlightIndex >= 0) {
    const slice = (2 * Math.PI) / items.length;
    const startAngle = highlightIndex * slice - Math.PI / 2;
    const endAngle = startAngle + slice;
    const midAngle = startAngle + slice / 2;

    ctx.save();
    
    // Outer glow
    ctx.shadowColor = colors[highlightIndex % colors.length][0];
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius - 2, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fill();
    ctx.shadowBlur = 0;

    // Radial highlight overlay on segment
    const glowGrad = ctx.createRadialGradient(
      cx + (radius * 0.35) * Math.cos(midAngle),
      cy + (radius * 0.35) * Math.sin(midAngle),
      3, cx, cy, radius
    );
    glowGrad.addColorStop(0, "rgba(255,255,255,0.18)");
    glowGrad.addColorStop(0.5, "rgba(255,255,255,0.06)");
    glowGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius - 2, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Segment border glow
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "rgba(255,255,255,0.4)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius - 2, startAngle, endAngle);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  life: number;
}

function spawnConfetti(cx: number, cy: number, colors: [string, string][]): Particle[] {
  const flatColors = colors.map(c => c[0]);
  const particles: Particle[] = [];
  for (let i = 0; i < 80; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 4 + Math.random() * 6,
      color: flatColors[Math.floor(Math.random() * flatColors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      life: 1,
    });
  }
  return particles;
}

class TickSound {
  private ctx: AudioContext | null = null;
  private lastTick = 0;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch { return null; }
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  playTick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = Date.now();
    if (now - this.lastTick < 40) return;
    this.lastTick = now;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }

  playResult() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  }
}

const tickSound = new TickSound();

const FRICTION = 0.978;
const MIN_SPEED = 0.001;
const SETTLE_THRESHOLD = 0.006;
const SPRING_STIFFNESS = 0.08;
const SPRING_DAMPING = 0.72;
const SETTLE_COMPLETE_EPSILON = 0.0008;

export default function SpinTheWheelWorkspace() {
  const t = useWorkspaceTranslation();

  const [items, setItems] = useState<string[]>(["Option 1", "Option 2", "Option 3", "Option 4"]);
  const [inputValue, setInputValue] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [settling, setSettling] = useState(false);
  const [winnerHighlight, setWinnerHighlight] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"options" | "history">("options");
  const [paletteIndex, setPaletteIndex] = useState(0);

  const currentColors = PALETTES[paletteIndex].colors;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const segmentPassedRef = useRef(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const settlingRef = useRef(false);
  const settleTargetRef = useRef(0);
  const settleVelocityRef = useRef(0);
  const winnerIdxRef = useRef(-1);
  const speedRef = useRef(0);

  const [particles, setParticles] = useState<Particle[]>([]);
  const confettiRafRef = useRef<number | null>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);

  const wheelSize = 400;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = wheelSize * dpr;
    canvas.height = wheelSize * dpr;
    ctx.scale(dpr, dpr);
    drawWheelFace(ctx, items, wheelSize, currentColors);
  }, [items, wheelSize, currentColors]);

  const spinWheel = useCallback(() => {
    if (spinning || items.length < 2) return;
    setResult(null);
    setWinnerHighlight(null);

    settlingRef.current = false;
    setSettling(false);
    setSpinning(true);
    segmentPassedRef.current = -1;
    speedRef.current = 1;
    setSpeed(1);

    const initialVel = (0.35 + Math.random() * 0.28) * (Math.random() > 0.5 ? 1 : -1);
    velocityRef.current = initialVel;

    const animate = () => {
      if (settlingRef.current) {
        // Phase 2: Spring settle — overshoot and bounce to final position
        const currentAngle_ = angleRef.current;
        const target = settleTargetRef.current;
        const displacement = target - currentAngle_;

        settleVelocityRef.current += displacement * SPRING_STIFFNESS;
        settleVelocityRef.current *= (1 - SPRING_DAMPING * 0.1);

        angleRef.current += settleVelocityRef.current;
        setCurrentAngle(angleRef.current * (180 / Math.PI));

        const speedVal = Math.min(1, Math.abs(settleVelocityRef.current) * 80);
        speedRef.current = speedVal;
        setSpeed(speedVal);

        if (Math.abs(displacement) < SETTLE_COMPLETE_EPSILON && Math.abs(settleVelocityRef.current) < SETTLE_COMPLETE_EPSILON) {
          // Snap to exact target
          angleRef.current = target;
          setCurrentAngle(target * (180 / Math.PI));

          settlingRef.current = false;
          setSettling(false);
          setSpinning(false);
          setSpeed(0);
          speedRef.current = 0;

          const winner = items[winnerIdxRef.current];
          setResult(winner);
          setWinnerHighlight(winnerIdxRef.current);
          setHistory(prev => [winner, ...prev].slice(0, 20));

          // Redraw canvas with winner highlight
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const dpr = window.devicePixelRatio || 1;
              canvas.width = wheelSize * dpr;
              canvas.height = wheelSize * dpr;
              ctx.scale(dpr, dpr);
              drawWheelFace(ctx, items, wheelSize, currentColors, winnerIdxRef.current);
            }
          }

          if (soundEnabled) tickSound.playResult();

          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            setParticles(spawnConfetti(cx, cy, currentColors));
          }

          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        } else {
          rafRef.current = requestAnimationFrame(animate);
        }
        return;
      }

      // Phase 1: Normal friction-based spin
      velocityRef.current *= FRICTION;

      const speedVal = Math.min(1, Math.abs(velocityRef.current) * 80);
      speedRef.current = speedVal;
      setSpeed(speedVal);

      if (Math.abs(velocityRef.current) < SETTLE_THRESHOLD) {
        // Transition to settle phase — determine winner first
        const finalAngle = angleRef.current % (Math.PI * 2);
        const normalized = ((finalAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const slice = (Math.PI * 2) / items.length;
        let segmentIndex = Math.floor(((Math.PI * 2 - normalized) % (Math.PI * 2)) / slice);
        segmentIndex = ((segmentIndex % items.length) + items.length) % items.length;
        winnerIdxRef.current = segmentIndex;

        // Calculate target angle: winner segment center aligns with pointer (top)
        const targetMod = ((-(segmentIndex + 0.5) * slice) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const currentMod = ((angleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        let diff = targetMod - currentMod;
        if (diff > Math.PI) diff -= 2 * Math.PI;
        if (diff < -Math.PI) diff += 2 * Math.PI;

        settleTargetRef.current = angleRef.current + diff;
        settleVelocityRef.current = velocityRef.current * 0.4;

        settlingRef.current = true;
        setSettling(true);
        velocityRef.current = 0;

        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      angleRef.current += velocityRef.current;
      setCurrentAngle(angleRef.current * (180 / Math.PI));

      const slice = (Math.PI * 2) / items.length;
      const segIdx = Math.floor(((angleRef.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / slice);
      if (segIdx !== segmentPassedRef.current) {
        segmentPassedRef.current = segIdx;
        if (soundEnabled) tickSound.playTick();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [spinning, items, soundEnabled, currentColors]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (confettiRafRef.current) cancelAnimationFrame(confettiRafRef.current);
    };
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const animateConfetti = () => {
      setParticles(prev => {
        const updated = prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            rotation: p.rotation + p.rotSpeed,
            life: p.life - 0.012,
          }))
          .filter(p => p.life > 0);
        return updated;
      });
      confettiRafRef.current = requestAnimationFrame(animateConfetti);
    };

    confettiRafRef.current = requestAnimationFrame(animateConfetti);
    return () => {
      if (confettiRafRef.current) cancelAnimationFrame(confettiRafRef.current);
    };
  }, [particles.length > 0]);

  const addItem = () => {
    const val = inputValue.trim();
    if (!val) return;
    setItems(prev => [...prev, val]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addItem();
  };

  const removeItem = (idx: number) => {
    if (items.length <= 2) return;
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  const shuffleItems = () => {
    setItems(prev => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  };

  const sortAscending = () => {
    setItems(prev => [...prev].sort((a, b) => a.localeCompare(b)));
  };

  const sortDescending = () => {
    setItems(prev => [...prev].sort((a, b) => b.localeCompare(a)));
  };

  const prevItemsLengthRef = useRef(items.length);
  useEffect(() => {
    if (items.length > prevItemsLengthRef.current && optionsListRef.current) {
      optionsListRef.current.scrollTop = optionsListRef.current.scrollHeight;
    }
    prevItemsLengthRef.current = items.length;
  }, [items]);

  const spinButtonLabel = spinning
    ? t("wheel_spinning", "Spinning...")
    : result
    ? t("wheel_spin_again", "Spin Again")
    : t("wheel_spin", "Spin the Wheel");

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-surface-elevated border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between mb-6 sm:mb-8 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <TargetIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                {t("wheel_spin", "Spin the Wheel")}
              </h2>
            </div>
            <p className="text-sm text-ink-muted ml-[52px]">
              {items.length >= 2
                ? t("wheel_add_options_hint", "Add at least 2 options to spin")
                : t("wheel_add_options", "Add Options")}
            </p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 text-ink-secondary hover:text-ink hover:bg-surface rounded-xl transition-colors border border-border/30 shadow-sm shrink-0"
            title={soundEnabled ? "Mute Sound" : "Enable Sound"}
          >
            {soundEnabled ? <SpeakerWave className="w-5 h-5" /> : <SpeakerX className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 relative z-10">
          
          <div className="lg:col-span-3 flex flex-col items-center" ref={containerRef}>
            
            <div
              className="relative"
              style={{
                perspective: "900px",
                perspectiveOrigin: "50% 35%",
              }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{
                  width: wheelSize * 0.82,
                  height: wheelSize * 0.18,
                  bottom: -wheelSize * 0.04,
                  background: "radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, transparent 70%)",
                  filter: "blur(14px)",
                }}
              />

              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-200"
                style={{
                  width: wheelSize + 24,
                  height: wheelSize + 24,
                  opacity: Math.min(0.5, speed * 0.5),
                  boxShadow: speed > 0.05
                    ? `0 0 ${30 + speed * 45}px ${12 + speed * 20}px rgba(255,255,255,0.05)`
                    : "none",
                  background: speed > 0.05
                    ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 65%)"
                    : "none",
                }}
              />
              
              <div
                ref={wheelRef}
                className="relative"
                style={{
                  transform: `rotateX(17deg) rotate(${currentAngle}deg) translateY(-5px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <canvas
                  ref={canvasRef}
                  className="block rounded-full select-none"
                  style={{
                    width: wheelSize,
                    height: wheelSize,
                    filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.22))",
                  }}
                />
                
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)",
                    mixBlendMode: "overlay",
                  }}
                />

                <div
                  className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-200"
                  style={{
                    opacity: Math.min(1, speed * 0.8),
                    background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)`,
                    boxShadow: speed > 0.1
                      ? `inset 0 0 ${20 + speed * 30}px ${10 + speed * 20}px rgba(255,255,255,0.06)`
                      : "none",
                    transition: "opacity 0.2s, box-shadow 0.15s",
                  }}
                />

                <div
                  className="absolute left-0 right-0 rounded-full pointer-events-none"
                  style={{
                    height: 14,
                    bottom: -10,
                    background: "linear-gradient(to bottom, #3a3a3a 0%, #1a1a1a 40%, #0a0a0a 100%)",
                    transform: "rotateX(-90deg)",
                    transformOrigin: "top center",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                />
              </div>

              <button
                onClick={spinWheel}
                disabled={spinning || items.length < 2}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full flex items-center justify-center select-none transition-all active:scale-90 disabled:cursor-not-allowed"
                style={{
                  width: 86,
                  height: 86,
                  background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.15) 100%)",
                  backdropFilter: "blur(2px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: spinning
                    ? "0 2px 12px rgba(0,0,0,0.2)"
                    : "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
                  cursor: spinning ? "default" : "pointer",
                  opacity: spinning ? 0.5 : 1,
                }}
              >
                <span
                  className="font-extrabold tracking-[0.15em] select-none"
                  style={{
                    fontSize: 18,
                    color: "#fff",
                    textShadow: "0 1px 4px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.1)",
                  }}
                >
                  SPIN
                </span>
              </button>

              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                style={{
                  filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(255,255,255,0.08))",
                  marginTop: -7,
                }}
              >
                <svg width="34" height="38" viewBox="0 0 34 38" fill="none">
                  <defs>
                    <linearGradient id="ptr-body" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f0f0f0" />
                      <stop offset="40%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#c0c0c0" />
                    </linearGradient>
                    <linearGradient id="ptr-edge" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d0d0d0" />
                      <stop offset="100%" stopColor="#909090" />
                    </linearGradient>
                    <linearGradient id="ptr-highlight" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                  <path d="M17 38L0 2L17 8L34 2L17 38Z" fill="url(#ptr-edge)" />
                  <path d="M17 36L2 3L17 9L32 3L17 36Z" fill="url(#ptr-body)" />
                  <path d="M17 36L2 3L17 9L17 36Z" fill="url(#ptr-highlight)" opacity="0.5" />
                  <rect x="14.5" y="0" width="5" height="8" rx="2.5" fill="url(#ptr-body)" stroke="url(#ptr-edge)" strokeWidth="0.5" />
                  <rect x="15.5" y="1" width="1.5" height="6" rx="0.75" fill="rgba(255,255,255,0.5)" />
                  <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.4)" />
                </svg>
              </div>
            </div>

            <button
              onClick={spinWheel}
              disabled={spinning || items.length < 2}
              className="mt-6 sm:mt-8 w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-3 py-3.5 px-8 rounded-2xl bg-accent text-white dark:text-black font-extrabold text-base uppercase tracking-widest hover:bg-accent/90 active:scale-[0.97] transition-all shadow-xl shadow-accent/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {spinning ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {spinButtonLabel}
                </>
              ) : (
                <>
                  <ShuffleIcon className="w-5 h-5" />
                  {spinButtonLabel}
                </>
              )}
            </button>

            <div className="mt-4 h-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {result && !spinning && (
                  <motion.div
                    key={result}
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-accent/10 border border-accent/20"
                  >
                    <TargetIcon className="w-5 h-5 text-accent" />
                    <span className="font-bold text-lg text-ink">
                      {t("wheel_result", "Result")}: <span className="text-accent">{result}</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            
            <div className="flex gap-1 p-0.5 bg-surface border border-border/40 rounded-xl">
              <button
                onClick={() => setActiveTab("options")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "options"
                    ? "bg-accent text-white dark:text-black shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {t("wheel_tab_options", "Options")}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "history"
                    ? "bg-accent text-white dark:text-black shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {t("wheel_history", "History")}
                {history.length > 0 && (
                  <span className="ml-1.5 text-[10px] opacity-70">({history.length})</span>
                )}
              </button>
            </div>

            {activeTab === "options" ? (
              <>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("wheel_type_option", "Type an option...")}
                    disabled={spinning}
                    className="flex-1 px-4 py-2.5 bg-surface border border-border/60 rounded-xl text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all disabled:opacity-50"
                  />
                  <button
                    onClick={addItem}
                    disabled={spinning || !inputValue.trim()}
                    className="px-4 py-2.5 rounded-xl bg-accent text-white dark:text-black font-semibold hover:bg-accent/90 active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{t("wheel_add_options", "Add")}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                    {t("wheel_items_count", "{count} options — min 2 required").replace("{count}", String(items.length))}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={shuffleItems}
                      disabled={spinning}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface border border-border/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Shuffle"
                    >
                      <ShuffleIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={sortAscending}
                      disabled={spinning}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface border border-border/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Sort A-Z"
                    >
                      <ArrowUpIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={sortDescending}
                      disabled={spinning}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface border border-border/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Sort Z-A"
                    >
                      <ArrowDownIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div ref={optionsListRef} className="flex-1 space-y-1.5 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                  {items.map((item, i) => {
                    const colorPair = currentColors[i % currentColors.length];
                    return (
                      <motion.div
                        key={`${item}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-2.5 group"
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0 ring-1 ring-black/10"
                          style={{ background: `linear-gradient(135deg, ${colorPair[0]}, ${colorPair[1]})` }}
                        />
                        <span className="flex-1 text-sm font-medium text-ink truncate py-1.5">
                          {item}
                        </span>
                        <button
                          onClick={() => removeItem(i)}
                          disabled={spinning || items.length <= 2}
                          className="p-1.5 rounded-lg text-ink-muted/40 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0"
                          title={t("wheel_remove", "Remove")}
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar" style={{ maxHeight: "360px" }}>
                {history.length > 0 ? (
                  <div className="space-y-1">
                    {history.map((h, i) => (
                      <motion.div
                        key={`${h}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-accent/5 border border-accent/10"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-extrabold shrink-0">
                          {i + 1}
                        </span>
                        <span className="flex-1 text-sm font-semibold text-ink truncate">{h}</span>
                        <ClockIcon className="w-3 h-3 text-ink-muted/40 shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <ClockIcon className="w-10 h-10 text-ink-muted/20 mb-3" />
                    <p className="text-sm font-medium text-ink-muted/50">
                      {t("wheel_no_history", "No spins yet")}
                    </p>
                    <p className="text-xs text-ink-muted/30 mt-1">
                      Spin the wheel to see results here
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="pt-3 border-t border-border/40">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block mb-2.5">
                {t("wheel_color_theme", "Color Theme")}
              </span>
              <div className="flex gap-2 flex-wrap">
                {PALETTES.map((palette, i) => (
                  <button
                    key={i}
                    onClick={() => setPaletteIndex(i)}
                    disabled={spinning}
                    className="w-7 h-7 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, ${palette.colors[0][0]}, ${palette.colors[3][0]})`,
                      boxShadow: paletteIndex === i
                        ? `0 0 0 2px var(--color-bg-surface-elevated, #fff), 0 0 0 4px ${palette.colors[0][0]}`
                        : "0 1px 3px rgba(0,0,0,0.15)",
                      transform: paletteIndex === i ? "scale(1.15)" : "scale(1)",
                    }}
                    title={palette.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {particles.length > 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <svg className="w-full h-full">
              {particles.map((p, i) => (
                <rect
                  key={i}
                  x={p.x - p.size / 2}
                  y={p.y - p.size / 2}
                  width={p.size}
                  height={p.size * 0.6}
                  fill={p.color}
                  rx={1}
                  transform={`rotate(${p.rotation}, ${p.x}, ${p.y})`}
                  opacity={Math.max(0, p.life)}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.12);
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }
        @keyframes rim-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
