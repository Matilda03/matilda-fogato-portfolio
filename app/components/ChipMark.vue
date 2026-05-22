<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number
  animated?: boolean
  wordmark?: boolean
}>(), {
  size: 48,
  animated: false,
  wordmark: false,
})
</script>

<template>
  <span v-if="wordmark" class="chip-lockup">
    <svg
      :width="size" :height="size"
      viewBox="0 0 48 48"
      fill="none"
      :class="['chip-svg', { 'is-anim': animated }]"
      aria-label="Matilda Fogato logo mark"
    >
      <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
        <path class="pin pin-1" d="M17 3v5"/>
        <path class="pin pin-2" d="M24 3v5"/>
        <path class="pin pin-3" d="M31 3v5"/>
        <path class="pin pin-4" d="M40 17h5"/>
        <path class="pin pin-5" d="M40 24h5"/>
        <path class="pin pin-6" d="M40 31h5"/>
        <path class="pin pin-7" d="M31 40v5"/>
        <path class="pin pin-8" d="M24 40v5"/>
        <path class="pin pin-9" d="M17 40v5"/>
        <path class="pin pin-10" d="M3 31h5"/>
        <path class="pin pin-11" d="M3 24h5"/>
        <path class="pin pin-12" d="M3 17h5"/>
      </g>
      <rect class="body" x="8" y="8" width="32" height="32" rx="7" stroke="currentColor" stroke-width="2.4"/>
      <rect class="core" x="18" y="18" width="12" height="12" rx="2" fill="#f59e0b"/>
    </svg>
    <span class="chip-word">Matilda Fogato</span>
  </span>

  <svg
    v-else
    :width="size" :height="size"
    viewBox="0 0 48 48"
    fill="none"
    :class="['chip-svg', { 'is-anim': animated }]"
    aria-label="Matilda Fogato logo mark"
  >
    <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
      <path class="pin pin-1" d="M17 3v5"/>
      <path class="pin pin-2" d="M24 3v5"/>
      <path class="pin pin-3" d="M31 3v5"/>
      <path class="pin pin-4" d="M40 17h5"/>
      <path class="pin pin-5" d="M40 24h5"/>
      <path class="pin pin-6" d="M40 31h5"/>
      <path class="pin pin-7" d="M31 40v5"/>
      <path class="pin pin-8" d="M24 40v5"/>
      <path class="pin pin-9" d="M17 40v5"/>
      <path class="pin pin-10" d="M3 31h5"/>
      <path class="pin pin-11" d="M3 24h5"/>
      <path class="pin pin-12" d="M3 17h5"/>
    </g>
    <rect class="body" x="8" y="8" width="32" height="32" rx="7" stroke="currentColor" stroke-width="2.4"/>
    <rect class="core" x="18" y="18" width="12" height="12" rx="2" fill="#f59e0b"/>
  </svg>
</template>

<style scoped>
.chip-lockup {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: currentColor;
}

.chip-word {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: currentColor;
}

.chip-svg { flex-shrink: 0; }

/* Pin ripple — staggered clockwise */
.chip-svg.is-anim .pin       { opacity: 0.30; animation: chip-pin 2.4s cubic-bezier(.4,0,.6,1) infinite; }
.chip-svg.is-anim .body      { animation: chip-body 2.4s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
.chip-svg.is-anim .core      { transform-origin: center; transform-box: fill-box; animation: chip-core 2.4s ease-in-out infinite; }

.chip-svg.is-anim .pin-1  { animation-delay: 0.00s; }
.chip-svg.is-anim .pin-2  { animation-delay: 0.08s; }
.chip-svg.is-anim .pin-3  { animation-delay: 0.16s; }
.chip-svg.is-anim .pin-4  { animation-delay: 0.24s; }
.chip-svg.is-anim .pin-5  { animation-delay: 0.32s; }
.chip-svg.is-anim .pin-6  { animation-delay: 0.40s; }
.chip-svg.is-anim .pin-7  { animation-delay: 0.48s; }
.chip-svg.is-anim .pin-8  { animation-delay: 0.56s; }
.chip-svg.is-anim .pin-9  { animation-delay: 0.64s; }
.chip-svg.is-anim .pin-10 { animation-delay: 0.72s; }
.chip-svg.is-anim .pin-11 { animation-delay: 0.80s; }
.chip-svg.is-anim .pin-12 { animation-delay: 0.88s; }

@keyframes chip-pin {
  0%, 70%, 100% { opacity: 0.28; }
  12% { opacity: 1; }
}
@keyframes chip-core {
  0%, 100% { transform: scale(1);    opacity: 0.92; }
  50%       { transform: scale(1.12); opacity: 1; }
}
@keyframes chip-body {
  0%, 100% { opacity: 0.62; }
  50%       { opacity: 1; }
}
</style>
