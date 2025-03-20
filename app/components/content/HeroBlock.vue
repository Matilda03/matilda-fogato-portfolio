<template>
  <section ref="heroSection" class="relative flex flex-col items-center justify-center min-h-screen px-3">
    <canvas ref="networkCanvas" class="absolute inset-0"></canvas>
    <div class=" relative z-10 flex flex-col items-center justify-start">
    <h1 class="text-7xl font-bold text-center mb-2 ">
      Hi there, I'm <span class="text-primary-500">Mati</span>
    </h1>

    <p class="my-2 text-lg text-center max-w-xl " >
      Developer, Researcher, Writer
    </p>

    <UButton to="/#about-me" color="primary" variant="soft" size="xl" class="rounded-full py-3 px-4 z-20">
      More About Me
    </UButton>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
/* class="hover:bg-sky-600 hover:text-white my-2 px-6 py-2 rounded-full font-medium transition-colors bg-sky-500 text-white" */
const networkCanvas = ref(null);
const heroSection = ref(null);
let animationFrame;

function generateNetwork(ctx, width, height) {
  const nodes = [];
  const maxNodes = 45;
  const connections = [];
  let frameCount = 0;

  function addNode() {
    if (nodes.length === 0 || (nodes.length < maxNodes && frameCount % 45 === 0)) {
      let newNode;
      if (nodes.length === 0) {
        newNode = {
          x: width / 2,
          y: height / 2,
          vx: 0,
          vy: 0,
          radius: 2
        };
      } else {
        const connectedNode = nodes[Math.floor(Math.random() * nodes.length)];
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 20;
        newNode = {
          x: connectedNode.x + Math.cos(angle) * distance,
          y: connectedNode.y + Math.sin(angle) * distance,
          vx: 0,
          vy: 0,
          radius: 2
        };
      }
      nodes.push(newNode);
    }
  }

  function connectNodes() {
    connections.length = 0;
    nodes.forEach((node, index) => {
      nodes.slice(index + 1).forEach(otherNode => {
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        if (Math.sqrt(dx * dx + dy * dy) < 120) {
          connections.push([node, otherNode]);
        }
      });
    });
  }

  function applyForces() {
    nodes.forEach(node => {
      nodes.forEach(otherNode => {
        if (node !== otherNode) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80 && dist > 0) {
            const force = (80 - dist) / 2000;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }
      });

      node.x += node.vx;
      node.y += node.vy;

      node.vx *= 0.95;
      node.vy *= 0.95;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
    });
  }

  function draw() {
    const styles = getComputedStyle(document.documentElement);
    const nodeColor = styles.getPropertyValue('--node-color').trim();
    const edgeColor = styles.getPropertyValue('--edge-color').trim();

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = edgeColor;
    connections.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    ctx.fillStyle = nodeColor;
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function animate() {
    frameCount++;
    addNode();
    connectNodes();
    applyForces();
    draw();
    animationFrame = requestAnimationFrame(animate);
  }

  animate();
}

function resizeCanvas(canvas, ctx, section) {
  const { width, height } = section.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

onMounted(() => {
  const canvas = networkCanvas.value;
  const ctx = canvas.getContext('2d');
  const section = heroSection.value;
  resizeCanvas(canvas, ctx, section);

  generateNetwork(ctx, canvas.width, canvas.height);

  window.addEventListener('resize', () => resizeCanvas(canvas, ctx, section));
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
});
</script>

<style>
:root {
  --node-color: rgba(0, 0, 0, 0.5);
  --edge-color: rgba(0, 0, 0, 0.2);
}

.dark {
  --node-color: rgba(255, 255, 255, 0.5);
  --edge-color: rgba(255, 255, 255, 0.2);
}
</style>