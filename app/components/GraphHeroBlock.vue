<template>
  <section class="fd-hero">
    <canvas ref="networkCanvas" class="fd-hero-canvas" />

    <div class="fd-hero-content">
      <!-- Status pill -->
<!--      <div class="fd-status-pill" aria-label="status">-->
<!--        <span class="fd-status-dot"><span class="fd-status-dot-core" /></span>-->
<!--        <span class="fd-status-text">Available for collabs</span>-->
<!--        <span class="fd-status-sep">·</span>-->
<!--        <UIcon name="i-lucide-map-pin" class="w-3 h-3" />-->
<!--        <span class="fd-status-loc">Eindhoven, NL</span>-->
<!--      </div>-->

      <!-- Hero chip with amber halo -->
      <div class="fd-hero-mark">
        <div class="fd-hero-mark-halo" />
        <ChipMark :size="112" animated />
      </div>

      <!-- Title -->
      <h1 class="fd-hero-title">
        Hi there, I'm <span class="fd-hero-name">Mati</span>
      </h1>

      <!-- Cycling subtitle -->
      <p class="fd-hero-sub">
        <span class="fd-role-stack">
          <span
            v-for="(role, i) in roles"
            :key="role"
            class="fd-role"
            :class="{
              'is-on':   i === roleIdx,
              'is-past': i < roleIdx,
              'is-next': i > roleIdx,
            }"
          >{{ role }}</span>
        </span>
      </p>

      <!-- CTAs -->
      <div class="fd-hero-cta">
        <UButton color="primary" variant="soft" size="xl" class="rounded-full py-3 px-6" @click="scrollToAbout">
          More About Me
        </UButton>
        <UButton
          to="mailto:fogatom03@gmail.com"
          color="neutral"
          variant="subtle"
          size="xl"
          icon="i-lucide-mail"
          class="rounded-full py-3 px-6"
        >
          Get in Touch
        </UButton>
      </div>

      <!-- NOW strip -->
<!--      <div class="fd-now-strip">-->
<!--        <span class="fd-now-label">-->
<!--          <span class="fd-now-bullet" />NOW-->
<!--        </span>-->
<!--        <div class="fd-now-items">-->
<!--          <span class="fd-now-item">-->
<!--            <span class="fd-now-kicker">Building</span>-->
<!--            <span class="fd-now-title">Digital-twin sim engine</span>-->
<!--            <span class="fd-now-tag">EAISI Lab</span>-->
<!--          </span>-->
<!--          <span class="fd-now-divider" />-->
<!--          <span class="fd-now-item">-->
<!--            <span class="fd-now-kicker">Writing</span>-->
<!--            <span class="fd-now-title">Notes on agent UX</span>-->
<!--            <span class="fd-now-tag">/blog</span>-->
<!--          </span>-->
<!--          <span class="fd-now-divider" />-->
<!--          <span class="fd-now-item">-->
<!--            <span class="fd-now-kicker">Reading</span>-->
<!--            <span class="fd-now-title">Thinking, Fast and Slow</span>-->
<!--            <span class="fd-now-tag">📖</span>-->
<!--          </span>-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <!-- Scroll affordance -->
    <a href="#about-me" class="fd-hero-scroll" aria-label="Scroll to about">
      <span class="fd-hero-scroll-line" />
      <span class="fd-hero-scroll-label">scroll</span>
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const networkCanvas = ref<HTMLCanvasElement | null>(null)
let animationFrame = 0
let scrollOffset = 0

// Cycling roles
const roles = ['Developer', 'Researcher', 'Writer', 'Developer · Researcher · Writer']
const roleIdx = ref(0)
let roleTimer: ReturnType<typeof setTimeout> | null = null

function advanceRole() {
  if (roleIdx.value < roles.length - 1) {
    roleIdx.value++
    roleTimer = setTimeout(advanceRole, 1400)
  }
}

const handleScroll = () => { scrollOffset = window.scrollY }

function scrollToAbout() {
  document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' })
}

function generateNetwork(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const nodes: { x: number; y: number; vx: number; vy: number; life: number }[] = []
  const maxNodes = 45
  let frameCount = 0

  function addNode() {
    if (nodes.length === 0 || (nodes.length < maxNodes && frameCount % 45 === 0)) {
      let n: typeof nodes[0]
      if (nodes.length === 0) {
        n = { x: canvas.width / 2, y: canvas.height / 2, vx: 0, vy: 0, life: 1 }
      } else if (Math.random() < 0.2) {
        n = { x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: 0, vy: 0, life: 1 }
      } else {
        const c = nodes[Math.floor(Math.random() * nodes.length)]
        const a = Math.random() * Math.PI * 2
        const d = Math.random() * 100 + 20
        n = { x: c.x + Math.cos(a) * d, y: c.y + Math.sin(a) * d, vx: 0, vy: 0, life: 1 }
      }
      nodes.push(n)
    }
  }

  function tick() {
    frameCount++
    addNode()
    for (let i = nodes.length - 1; i >= 0; i--) if (nodes[i].life <= 0) nodes.splice(i, 1)
    for (const n of nodes) {
      if (Math.random() < 0.005) n.life -= 0.1
      for (const o of nodes) {
        if (n === o) continue
        const dx = n.x - o.x, dy = n.y - o.y
        const dist = Math.hypot(dx, dy)
        if (dist < 80 && dist > 0) { const f = (80 - dist) / 2000; n.vx += (dx / dist) * f; n.vy += (dy / dist) * f }
      }
      n.x += n.vx; n.y += n.vy; n.vx *= 0.95; n.vy *= 0.95
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1
    }

    const styles = getComputedStyle(document.documentElement)
    const nodeColor = styles.getPropertyValue('--node-color').trim() || 'rgba(0,0,0,.5)'
    const edgeColor = styles.getPropertyValue('--edge-color').trim() || 'rgba(0,0,0,.2)'

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = edgeColor
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j]
        if (Math.hypot(a.x - b.x, a.y - b.y) < 120) {
          ctx.globalAlpha = Math.min(a.life, b.life)
          ctx.beginPath(); ctx.moveTo(a.x, a.y - scrollOffset); ctx.lineTo(b.x, b.y - scrollOffset); ctx.stroke()
        }
      }
    }
    ctx.fillStyle = nodeColor
    for (const n of nodes) { ctx.globalAlpha = n.life; ctx.beginPath(); ctx.arc(n.x, n.y - scrollOffset, 2, 0, Math.PI * 2); ctx.fill() }
    ctx.globalAlpha = 1
    animationFrame = requestAnimationFrame(tick)
  }
  tick()
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

onMounted(() => {
  const canvas = networkCanvas.value!
  const ctx = canvas.getContext('2d')!
  resizeCanvas(canvas)
  window.addEventListener('resize', () => resizeCanvas(canvas))
  window.addEventListener('scroll', handleScroll)
  generateNetwork(ctx, canvas)

  roleTimer = setTimeout(advanceRole, 1400)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  if (roleTimer) clearTimeout(roleTimer)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* ===== Hero layout ===== */
.fd-hero {
  position: relative;
  min-height: calc(100vh - 80px);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 96px 16px 64px;
}
.fd-hero-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.fd-hero-content {
  position: relative; z-index: 10;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  gap: 18px; max-width: 56rem; width: 100%;
}

/* ===== Status pill ===== */
.fd-status-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px 6px 10px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.60);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.20);
  color: #71717a;
  font-size: 0.8125rem; font-weight: 500;
  box-shadow: 0 10px 30px -5px rgb(24 24 27 / 0.05);
  animation: pill-rise 600ms cubic-bezier(0.4,0,0.2,1) both;
}
.dark .fd-status-pill {
  background: rgba(24,24,27,0.55);
  border-color: rgba(255,255,255,0.08);
  color: #a1a1aa;
}
@keyframes pill-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.fd-status-dot {
  position: relative; display: inline-flex; width: 8px; height: 8px;
}
.fd-status-dot::before {
  content: ""; position: absolute; inset: -3px; border-radius: 9999px;
  background: rgb(34 197 94 / 0.30); animation: dot-pulse 2.4s ease-out infinite;
}
.fd-status-dot-core {
  width: 8px; height: 8px; border-radius: 9999px; background: #22c55e;
  box-shadow: 0 0 0 1.5px white; position: relative; z-index: 1;
}
.dark .fd-status-dot-core { box-shadow: 0 0 0 1.5px #09090b; }
@keyframes dot-pulse { 0% { transform: scale(0.6); opacity: 1; } 70%, 100% { transform: scale(2.4); opacity: 0; } }
.fd-status-text { color: #18181b; }
.dark .fd-status-text { color: #ffffff; }
.fd-status-sep { opacity: 0.45; }
.fd-status-loc { color: #71717a; }
.dark .fd-status-loc { color: #a1a1aa; }

/* ===== Hero chip (large) ===== */
.fd-hero-mark {
  position: relative; display: inline-flex; align-items: center; justify-content: center;
  width: 112px; height: 112px; margin: 4px 0 -4px;
  color: #18181b;
  animation: pill-rise 700ms cubic-bezier(0.4,0,0.2,1) both 80ms;
}
.dark .fd-hero-mark { color: #ffffff; }
.fd-hero-mark-halo {
  position: absolute; inset: -12px;
  background: radial-gradient(closest-side, rgba(245,158,11,0.25), rgba(245,158,11,0) 70%);
  filter: blur(8px);
  animation: halo-breathe 3.6s ease-in-out infinite;
}
@keyframes halo-breathe { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }

/* ===== Hero title ===== */
.fd-hero-title {
  font-size: clamp(2.5rem, 7vw + 1rem, 5rem);
  font-weight: 700; margin: 0; letter-spacing: -0.025em; line-height: 1.02;
  color: #18181b;
}
.dark .fd-hero-title { color: #ffffff; }
.fd-hero-name { color: #0ea5e9; }
.dark .fd-hero-name { color: #38bdf8; }

/* ===== Cycling subtitle ===== */
.fd-hero-sub {
  margin: 0; font-size: 1.25rem; color: #71717a;
  min-height: 1.6em; line-height: 1.4;
}
.dark .fd-hero-sub { color: #a1a1aa; }
.fd-role-stack {
  display: inline-block; position: relative; min-width: 22ch; text-align: center;
}
.fd-role {
  position: absolute; inset: 0;
  opacity: 0;
  transition: opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1);
  transform: translateY(6px);
}
.fd-role.is-on   { opacity: 1; transform: translateY(0); position: relative; }
.fd-role.is-past { opacity: 0; transform: translateY(-6px); }
.fd-role.is-next { opacity: 0; transform: translateY(6px); }

/* ===== CTAs ===== */
.fd-hero-cta {
  display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
}

/* ===== NOW strip ===== */
.fd-now-strip {
  display: flex; align-items: center; gap: 20px;
  padding: 12px 18px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.60);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.20);
  box-shadow: 0 10px 30px -5px rgb(24 24 27 / 0.05);
  font-size: 0.8125rem;
  max-width: min(820px, 100%);
  animation: pill-rise 700ms cubic-bezier(0.4,0,0.2,1) both 200ms;
}
.dark .fd-now-strip {
  background: rgba(24,24,27,0.55);
  border-color: rgba(255,255,255,0.08);
}
.fd-now-label {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 600; font-size: 0.6875rem; letter-spacing: 0.14em;
  color: #a1a1aa; flex-shrink: 0;
}
.fd-now-bullet {
  width: 6px; height: 6px; border-radius: 9999px; background: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245,158,11,0.18);
}
.fd-now-items { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: center; }
.fd-now-item { display: inline-flex; align-items: baseline; gap: 8px; }
.fd-now-kicker { color: #a1a1aa; font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; }
.fd-now-title { color: #18181b; font-weight: 500; }
.dark .fd-now-title { color: #ffffff; }
.fd-now-tag {
  color: #71717a; font-size: 0.6875rem; padding: 2px 6px; border-radius: 6px;
  background: #fafafa; border: 1px solid #e4e4e7;
}
.dark .fd-now-tag { background: #27272a; border-color: #3f3f46; color: #a1a1aa; }
.fd-now-divider { width: 1px; height: 16px; background: #e4e4e7; flex-shrink: 0; }
.dark .fd-now-divider { background: #3f3f46; }

@media (max-width: 720px) {
  .fd-now-strip { border-radius: 20px; flex-direction: column; align-items: flex-start; padding: 12px 16px; gap: 8px; }
  .fd-now-items { flex-direction: column; align-items: flex-start; gap: 8px; }
  .fd-now-divider { display: none; }
}

/* ===== Scroll affordance ===== */
.fd-hero-scroll {
  position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  color: #a1a1aa;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.6875rem; letter-spacing: 0.18em; text-transform: uppercase;
  opacity: 0.7; transition: opacity 200ms; text-decoration: none; z-index: 10;
}
.fd-hero-scroll:hover { opacity: 1; }
.fd-hero-scroll-line {
  width: 1px; height: 28px; background: linear-gradient(to bottom, transparent, #a1a1aa);
  animation: scroll-pulse 2s ease-in-out infinite;
}
@keyframes scroll-pulse { 0%, 100% { transform: scaleY(0.6); transform-origin: top; opacity: 0.4; } 50% { transform: scaleY(1); opacity: 1; } }

/* ===== Canvas colors ===== */
:root {
  --node-color: rgba(0, 0, 0, 0.5);
  --edge-color: rgba(0, 0, 0, 0.2);
}
.dark {
  --node-color: rgba(255, 255, 255, 0.5);
  --edge-color: rgba(255, 255, 255, 0.2);
}
</style>
