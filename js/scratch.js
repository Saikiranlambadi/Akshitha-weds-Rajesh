const scratchRadius = 24;
const thresholdFraction = 0.45;
const scratchData = new WeakMap();

function setupCanvas(canvas) {
  const parent = canvas.parentElement;
  const rect = parent.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#d76a96";
  ctx.fillRect(0, 0, rect.width, rect.height);

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "700 14px Poppins, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
 
  ctx.font = "12px Poppins, sans-serif";
  

  scratchData.set(canvas, {
    ctx,
    active: false,
    scratchedArea: 0,
    totalArea: rect.width * rect.height,
  });
}

function getPointerPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const point = event.touches ? event.touches[0] : event;
  return {
    x: point.clientX - rect.left,
    y: point.clientY - rect.top,
  };
}

function completeScratch(canvas) {
  canvas.parentElement.classList.add("revealed");
  canvas.style.transition = "opacity 0.3s ease";
  canvas.style.opacity = "0";
  setTimeout(() => {
    canvas.style.display = "none";
    scratchData.delete(canvas);
    checkScratchCompletion();
  }, 300);
}

function checkScratchCompletion() {
  const total = document.querySelectorAll(".scratch-canvas").length;
  const revealed = document.querySelectorAll(".circle.revealed").length;
  if (total > 0 && revealed === total) {
    startHeartAnimation();
  }
}

let heartAnimationStarted = false;
function startHeartAnimation() {
  if (heartAnimationStarted) return;
  heartAnimationStarted = true;

  const count = 18;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤";
    heart.style.left = `${10 + Math.random() * 80}vw`;
    heart.style.animationDuration = `${4 + Math.random() * 4}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(heart);
  }
}

function scratch(canvas, event) {
  const data = scratchData.get(canvas);
  if (!data || !data.active) return;
  event.preventDefault();
  const { x, y } = getPointerPosition(canvas, event);
  data.ctx.globalCompositeOperation = "destination-out";
  data.ctx.beginPath();
  data.ctx.arc(x, y, scratchRadius, 0, Math.PI * 2);
  data.ctx.fill();
  data.ctx.closePath();
  data.scratchedArea += Math.PI * scratchRadius * scratchRadius;

  if (data.scratchedArea >= data.totalArea * thresholdFraction) {
    completeScratch(canvas);
  }
}

function addScratchEvents(canvas) {
  canvas.addEventListener("mousedown", () => {
    const data = scratchData.get(canvas);
    if (data) data.active = true;
  });

  canvas.addEventListener("mouseup", () => {
    const data = scratchData.get(canvas);
    if (data) data.active = false;
  });

  canvas.addEventListener("mouseleave", () => {
    const data = scratchData.get(canvas);
    if (data) data.active = false;
  });

  canvas.addEventListener("mousemove", (event) => scratch(canvas, event));

  canvas.addEventListener("touchstart", (event) => {
    const data = scratchData.get(canvas);
    if (data) {
      data.active = true;
      scratch(canvas, event);
    }
  });

  canvas.addEventListener("touchmove", (event) => scratch(canvas, event), {
    passive: false,
  });

  canvas.addEventListener("touchend", () => {
    const data = scratchData.get(canvas);
    if (data) data.active = false;
  });

  canvas.addEventListener("touchcancel", () => {
    const data = scratchData.get(canvas);
    if (data) data.active = false;
  });
}

function initScratchCanvases() {
  const canvases = document.querySelectorAll(".scratch-canvas");
  canvases.forEach((canvas) => {
    setupCanvas(canvas);
    addScratchEvents(canvas);
  });
}

function resizeScratchCanvases() {
  const canvases = document.querySelectorAll(".scratch-canvas");
  canvases.forEach((canvas) => {
    if (canvas.parentElement.classList.contains("revealed")) return;
    setupCanvas(canvas);
  });
}

window.addEventListener("load", initScratchCanvases);
window.addEventListener("resize", resizeScratchCanvases);
