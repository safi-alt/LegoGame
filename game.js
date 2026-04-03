(() => {
  "use strict";

  const CELL = 28;
  const STUD_R = 5;
  const COLS = 40;
  const ROWS = 32;

  const COLORS = {
    petals: [
      "#e05a9c", "#f48fb1", "#ff6f61", "#ff8a65", "#ffb74d",
      "#fff176", "#e6ee9c", "#aed581", "#81c784", "#4db6ac",
      "#4fc3f7", "#7986cb", "#ba68c8", "#f06292", "#ffffff",
      "#ef5350",
    ],
    stems: ["#43a047", "#66bb6a", "#388e3c", "#2e7d32", "#8bc34a", "#689f38"],
    leaves: ["#43a047", "#66bb6a", "#388e3c", "#81c784", "#aed581"],
    centers: ["#fdd835", "#ffb300", "#ff8f00", "#795548", "#4e342e", "#ffffff"],
    pots: ["#8d6e63", "#a1887f", "#6d4c41", "#d7ccc8", "#ef9a9a", "#ce93d8"],
    extras: ["#e05a9c", "#7b1fa2", "#4fc3f7", "#ffb74d", "#ffffff", "#263238"],
  };

  const BRICK_DEFS = {
    petals: [
      { id: "petal_1x1", name: "1x1", w: 1, h: 1, shape: "round" },
      { id: "petal_2x1", name: "2x1", w: 2, h: 1, shape: "round" },
      { id: "petal_1x2", name: "1x2", w: 1, h: 2, shape: "round" },
      { id: "petal_2x2", name: "2x2", w: 2, h: 2, shape: "round" },
      { id: "petal_3x1", name: "3x1", w: 3, h: 1, shape: "round" },
      { id: "petal_drop", name: "Drop", w: 2, h: 3, shape: "petal_drop" },
      { id: "petal_fan", name: "Fan", w: 3, h: 2, shape: "petal_fan" },
      { id: "petal_curve", name: "Curve", w: 2, h: 2, shape: "petal_curve" },
      { id: "petal_point", name: "Point", w: 1, h: 3, shape: "petal_point" },
    ],
    centers: [
      { id: "center_1x1", name: "1x1", w: 1, h: 1, shape: "stud" },
      { id: "center_2x2", name: "2x2", w: 2, h: 2, shape: "stud" },
      { id: "center_3x3", name: "3x3", w: 3, h: 3, shape: "stud" },
      { id: "center_round", name: "Round", w: 2, h: 2, shape: "circle" },
      { id: "center_dome", name: "Dome", w: 3, h: 2, shape: "dome" },
    ],
    stems: [
      { id: "stem_1x1", name: "1x1", w: 1, h: 1, shape: "rect" },
      { id: "stem_1x2", name: "1x2", w: 1, h: 2, shape: "rect" },
      { id: "stem_1x3", name: "1x3", w: 1, h: 3, shape: "rect" },
      { id: "stem_1x4", name: "1x4", w: 1, h: 4, shape: "rect" },
      { id: "stem_1x6", name: "1x6", w: 1, h: 6, shape: "rect" },
      { id: "stem_2x1", name: "2x1", w: 2, h: 1, shape: "rect" },
      { id: "stem_angle", name: "Angle", w: 2, h: 3, shape: "stem_angle" },
      { id: "stem_fork", name: "Fork", w: 3, h: 3, shape: "stem_fork" },
    ],
    leaves: [
      { id: "leaf_sm", name: "Small", w: 2, h: 1, shape: "leaf" },
      { id: "leaf_md", name: "Medium", w: 3, h: 2, shape: "leaf" },
      { id: "leaf_lg", name: "Large", w: 4, h: 2, shape: "leaf_lg" },
      { id: "leaf_round", name: "Round", w: 2, h: 2, shape: "leaf_round" },
    ],
    pots: [
      { id: "pot_sm", name: "Small", w: 3, h: 2, shape: "pot" },
      { id: "pot_md", name: "Medium", w: 5, h: 3, shape: "pot" },
      { id: "pot_lg", name: "Large", w: 7, h: 4, shape: "pot" },
      { id: "pot_round", name: "Round", w: 4, h: 3, shape: "pot_round" },
      { id: "pot_rect", name: "Box", w: 5, h: 2, shape: "rect" },
    ],
    extras: [
      { id: "x_1x1", name: "1x1", w: 1, h: 1, shape: "rect" },
      { id: "x_2x2", name: "2x2", w: 2, h: 2, shape: "rect" },
      { id: "x_2x4", name: "2x4", w: 2, h: 4, shape: "rect" },
      { id: "x_star", name: "Star", w: 3, h: 3, shape: "star" },
      { id: "x_heart", name: "Heart", w: 3, h: 3, shape: "heart" },
      { id: "x_butterfly", name: "Butterfly", w: 3, h: 2, shape: "butterfly" },
    ],
  };

  const PRESETS = [
    {
      name: "Rose",
      bricks: [
        { id: "stem_1x4", x: 19, y: 20, color: "#43a047", rot: 0, flip: false },
        { id: "stem_1x4", x: 19, y: 24, color: "#43a047", rot: 0, flip: false },
        { id: "leaf_md", x: 20, y: 22, color: "#66bb6a", rot: 0, flip: false },
        { id: "leaf_md", x: 16, y: 24, color: "#66bb6a", rot: 0, flip: true },
        { id: "center_2x2", x: 18, y: 16, color: "#fdd835", rot: 0, flip: false },
        { id: "petal_2x2", x: 16, y: 14, color: "#e05a9c", rot: 0, flip: false },
        { id: "petal_2x2", x: 20, y: 14, color: "#e05a9c", rot: 0, flip: false },
        { id: "petal_2x2", x: 16, y: 18, color: "#f48fb1", rot: 0, flip: false },
        { id: "petal_2x2", x: 20, y: 18, color: "#f48fb1", rot: 0, flip: false },
        { id: "petal_2x2", x: 18, y: 12, color: "#ff6f61", rot: 0, flip: false },
        { id: "petal_2x1", x: 16, y: 16, color: "#f06292", rot: 0, flip: false },
        { id: "petal_2x1", x: 20, y: 16, color: "#f06292", rot: 0, flip: false },
        { id: "pot_sm", x: 18, y: 28, color: "#8d6e63", rot: 0, flip: false },
      ],
    },
    {
      name: "Sunflower",
      bricks: [
        { id: "stem_1x6", x: 19, y: 20, color: "#388e3c", rot: 0, flip: false },
        { id: "leaf_md", x: 20, y: 23, color: "#66bb6a", rot: 0, flip: false },
        { id: "leaf_md", x: 16, y: 21, color: "#43a047", rot: 0, flip: true },
        { id: "center_3x3", x: 18, y: 15, color: "#795548", rot: 0, flip: false },
        { id: "petal_drop", x: 17, y: 12, color: "#fdd835", rot: 0, flip: false },
        { id: "petal_drop", x: 21, y: 13, color: "#ffb300", rot: 1, flip: false },
        { id: "petal_drop", x: 16, y: 13, color: "#ffb300", rot: 3, flip: false },
        { id: "petal_drop", x: 17, y: 18, color: "#fdd835", rot: 2, flip: false },
        { id: "petal_2x1", x: 18, y: 12, color: "#fdd835", rot: 0, flip: false },
        { id: "pot_md", x: 17, y: 26, color: "#a1887f", rot: 0, flip: false },
      ],
    },
    {
      name: "Tulip",
      bricks: [
        { id: "stem_1x4", x: 19, y: 20, color: "#43a047", rot: 0, flip: false },
        { id: "stem_1x3", x: 19, y: 24, color: "#43a047", rot: 0, flip: false },
        { id: "leaf_sm", x: 20, y: 23, color: "#66bb6a", rot: 0, flip: false },
        { id: "petal_drop", x: 18, y: 14, color: "#ef5350", rot: 0, flip: false },
        { id: "petal_drop", x: 20, y: 14, color: "#ff6f61", rot: 0, flip: false },
        { id: "petal_1x2", x: 19, y: 13, color: "#ef5350", rot: 0, flip: false },
        { id: "pot_sm", x: 18, y: 27, color: "#8d6e63", rot: 0, flip: false },
      ],
    },
    {
      name: "Daisy",
      bricks: [
        { id: "stem_1x4", x: 19, y: 20, color: "#66bb6a", rot: 0, flip: false },
        { id: "stem_1x3", x: 19, y: 24, color: "#66bb6a", rot: 0, flip: false },
        { id: "leaf_round", x: 20, y: 22, color: "#81c784", rot: 0, flip: false },
        { id: "center_round", x: 18, y: 16, color: "#fdd835", rot: 0, flip: false },
        { id: "petal_1x2", x: 18, y: 14, color: "#ffffff", rot: 0, flip: false },
        { id: "petal_1x2", x: 19, y: 14, color: "#ffffff", rot: 0, flip: false },
        { id: "petal_1x2", x: 18, y: 18, color: "#ffffff", rot: 0, flip: false },
        { id: "petal_1x2", x: 19, y: 18, color: "#ffffff", rot: 0, flip: false },
        { id: "petal_2x1", x: 16, y: 16, color: "#ffffff", rot: 0, flip: false },
        { id: "petal_2x1", x: 16, y: 17, color: "#ffffff", rot: 0, flip: false },
        { id: "petal_2x1", x: 20, y: 16, color: "#ffffff", rot: 0, flip: false },
        { id: "petal_2x1", x: 20, y: 17, color: "#ffffff", rot: 0, flip: false },
        { id: "pot_round", x: 17, y: 27, color: "#ce93d8", rot: 0, flip: false },
      ],
    },
    {
      name: "Cactus",
      bricks: [
        { id: "x_2x4", x: 19, y: 18, color: "#43a047", rot: 0, flip: false },
        { id: "x_2x4", x: 19, y: 22, color: "#388e3c", rot: 0, flip: false },
        { id: "stem_1x3", x: 21, y: 20, color: "#66bb6a", rot: 0, flip: false },
        { id: "stem_1x3", x: 17, y: 22, color: "#66bb6a", rot: 0, flip: false },
        { id: "petal_1x1", x: 19, y: 17, color: "#ff6f61", rot: 0, flip: false },
        { id: "petal_1x1", x: 20, y: 17, color: "#ffb74d", rot: 0, flip: false },
        { id: "pot_md", x: 17, y: 26, color: "#8d6e63", rot: 0, flip: false },
      ],
    },
    {
      name: "Lavender",
      bricks: [
        { id: "stem_1x6", x: 19, y: 20, color: "#388e3c", rot: 0, flip: false },
        { id: "leaf_sm", x: 20, y: 24, color: "#66bb6a", rot: 0, flip: false },
        { id: "leaf_sm", x: 17, y: 22, color: "#66bb6a", rot: 0, flip: true },
        { id: "petal_1x1", x: 19, y: 13, color: "#ba68c8", rot: 0, flip: false },
        { id: "petal_1x1", x: 19, y: 14, color: "#ba68c8", rot: 0, flip: false },
        { id: "petal_1x1", x: 19, y: 15, color: "#7b1fa2", rot: 0, flip: false },
        { id: "petal_1x1", x: 19, y: 16, color: "#ba68c8", rot: 0, flip: false },
        { id: "petal_1x1", x: 19, y: 17, color: "#7b1fa2", rot: 0, flip: false },
        { id: "petal_1x1", x: 19, y: 18, color: "#ba68c8", rot: 0, flip: false },
        { id: "petal_1x1", x: 19, y: 19, color: "#7b1fa2", rot: 0, flip: false },
        { id: "petal_1x1", x: 18, y: 14, color: "#ce93d8", rot: 0, flip: false },
        { id: "petal_1x1", x: 20, y: 14, color: "#ce93d8", rot: 0, flip: false },
        { id: "petal_1x1", x: 18, y: 16, color: "#ce93d8", rot: 0, flip: false },
        { id: "petal_1x1", x: 20, y: 16, color: "#ce93d8", rot: 0, flip: false },
        { id: "petal_1x1", x: 18, y: 18, color: "#ce93d8", rot: 0, flip: false },
        { id: "petal_1x1", x: 20, y: 18, color: "#ce93d8", rot: 0, flip: false },
        { id: "pot_sm", x: 18, y: 26, color: "#d7ccc8", rot: 0, flip: false },
      ],
    },
  ];

  // ── State ──
  let state = {
    grid: new Array(COLS * ROWS).fill(null),
    placedBricks: [],
    selectedBrick: null,
    selectedColor: "#e05a9c",
    category: "petals",
    rotation: 0,
    flipped: false,
    eraser: false,
    zoom: 1,
    showGrid: true,
    panX: 0,
    panY: 0,
    panning: false,
    panStart: null,
  };

  let refState = {
    bricks: [],
    zoom: 1,
    panX: 0,
    panY: 0,
    panning: false,
    panStart: null,
    showGrid: true,
    active: false,
    name: "",
  };

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const wrapper = document.getElementById("canvas-wrapper");
  const previewEl = document.getElementById("brick-preview");

  const refCanvas = document.getElementById("ref-canvas");
  const refCtx = refCanvas.getContext("2d");
  const refWrapper = document.getElementById("ref-canvas-wrapper");
  const refPane = document.getElementById("ref-pane");

  // ── Helpers ──
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function darken(hex, amount = 30) {
    const { r, g, b } = hexToRgb(hex);
    return `rgb(${Math.max(0, r - amount)},${Math.max(0, g - amount)},${Math.max(0, b - amount)})`;
  }

  function lighten(hex, amount = 40) {
    const { r, g, b } = hexToRgb(hex);
    return `rgb(${Math.min(255, r + amount)},${Math.min(255, g + amount)},${Math.min(255, b + amount)})`;
  }

  function getBrickDef(id) {
    for (const cat of Object.values(BRICK_DEFS)) {
      const found = cat.find((b) => b.id === id);
      if (found) return found;
    }
    return null;
  }

  function getEffectiveSize(def, rot) {
    if (rot % 2 === 1) return { w: def.h, h: def.w };
    return { w: def.w, h: def.h };
  }

  // ── Drawing Primitives ──
  function drawStud(ctx, cx, cy, color) {
    const r = STUD_R;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = lighten(color, 30);
    ctx.fill();
    ctx.strokeStyle = darken(color, 40);
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  function drawBrickShape(ctx, x, y, def, color, rot, flip) {
    const { w, h } = getEffectiveSize(def, rot);
    const px = x * CELL;
    const py = y * CELL;
    const pw = w * CELL;
    const ph = h * CELL;

    ctx.save();

    if (flip) {
      ctx.translate(px + pw, py);
      ctx.scale(-1, 1);
      ctx.translate(-px, -py);
    }

    const shape = def.shape;
    const br = 4;

    ctx.fillStyle = color;
    ctx.strokeStyle = darken(color, 50);
    ctx.lineWidth = 1.5;

    if (shape === "rect" || shape === "stud") {
      roundRect(ctx, px + 1, py + 1, pw - 2, ph - 2, br);
      ctx.fill();
      ctx.stroke();
    } else if (shape === "round") {
      roundRect(ctx, px + 1, py + 1, pw - 2, ph - 2, Math.min(pw, ph) * 0.35);
      ctx.fill();
      ctx.stroke();
    } else if (shape === "circle") {
      ctx.beginPath();
      ctx.ellipse(px + pw / 2, py + ph / 2, pw / 2 - 2, ph / 2 - 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (shape === "petal_drop") {
      drawPetalDrop(ctx, px, py, pw, ph, rot);
    } else if (shape === "petal_fan") {
      drawPetalFan(ctx, px, py, pw, ph, rot);
    } else if (shape === "petal_curve") {
      drawPetalCurve(ctx, px, py, pw, ph, rot);
    } else if (shape === "petal_point") {
      drawPetalPoint(ctx, px, py, pw, ph, rot);
    } else if (shape === "leaf" || shape === "leaf_lg") {
      drawLeaf(ctx, px, py, pw, ph);
    } else if (shape === "leaf_round") {
      ctx.beginPath();
      ctx.ellipse(px + pw / 2, py + ph / 2, pw / 2 - 2, ph / 2 - 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (shape === "pot") {
      drawPot(ctx, px, py, pw, ph);
    } else if (shape === "pot_round") {
      drawPotRound(ctx, px, py, pw, ph);
    } else if (shape === "dome") {
      drawDome(ctx, px, py, pw, ph);
    } else if (shape === "stem_angle") {
      drawStemAngle(ctx, px, py, pw, ph, rot);
    } else if (shape === "stem_fork") {
      drawStemFork(ctx, px, py, pw, ph, rot);
    } else if (shape === "star") {
      drawStar(ctx, px + pw / 2, py + ph / 2, Math.min(pw, ph) / 2 - 2, 5);
    } else if (shape === "heart") {
      drawHeart(ctx, px, py, pw, ph);
    } else if (shape === "butterfly") {
      drawButterfly(ctx, px, py, pw, ph);
    } else {
      roundRect(ctx, px + 1, py + 1, pw - 2, ph - 2, br);
      ctx.fill();
      ctx.stroke();
    }

    for (let sy = 0; sy < h; sy++) {
      for (let sx = 0; sx < w; sx++) {
        drawStud(ctx, px + sx * CELL + CELL / 2, py + sy * CELL + CELL / 2, color);
      }
    }

    ctx.restore();
  }

  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function drawPetalDrop(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + 2);
    ctx.bezierCurveTo(x + w + 4, y + h * 0.3, x + w + 4, y + h * 0.7, x + w / 2, y + h - 2);
    ctx.bezierCurveTo(x - 4, y + h * 0.7, x - 4, y + h * 0.3, x + w / 2, y + 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawPetalFan(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + h - 2);
    ctx.quadraticCurveTo(x - 2, y + h - 2, x + 2, y + 2);
    ctx.quadraticCurveTo(x + w / 2, y - 4, x + w - 2, y + 2);
    ctx.quadraticCurveTo(x + w + 2, y + h - 2, x + w / 2, y + h - 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawPetalCurve(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x + 2, y + h - 2);
    ctx.quadraticCurveTo(x - 2, y - 2, x + w / 2, y + 2);
    ctx.quadraticCurveTo(x + w + 2, y - 2, x + w - 2, y + h / 2);
    ctx.quadraticCurveTo(x + w, y + h + 2, x + 2, y + h - 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawPetalPoint(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + 2);
    ctx.bezierCurveTo(x + w + 6, y + h * 0.4, x + w + 6, y + h * 0.6, x + w / 2, y + h - 2);
    ctx.bezierCurveTo(x - 6, y + h * 0.6, x - 6, y + h * 0.4, x + w / 2, y + 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawLeaf(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x + 2, y + h / 2);
    ctx.quadraticCurveTo(x + w * 0.3, y - 4, x + w - 2, y + 2);
    ctx.quadraticCurveTo(x + w + 4, y + h * 0.5, x + w - 2, y + h - 2);
    ctx.quadraticCurveTo(x + w * 0.5, y + h + 4, x + 2, y + h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 4, y + h / 2);
    ctx.quadraticCurveTo(x + w * 0.5, y + h * 0.35, x + w - 4, y + h * 0.3);
    ctx.strokeStyle = darken(ctx.fillStyle.toString(), 20);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawPot(ctx, x, y, w, h) {
    const rimH = Math.max(CELL * 0.4, 8);
    ctx.beginPath();
    ctx.moveTo(x + 2, y + 2);
    ctx.lineTo(x + w - 2, y + 2);
    ctx.lineTo(x + w - 2, y + rimH);
    ctx.lineTo(x + 2, y + rimH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const taper = w * 0.12;
    ctx.beginPath();
    ctx.moveTo(x + 2, y + rimH);
    ctx.lineTo(x + w - 2, y + rimH);
    ctx.lineTo(x + w - 2 - taper, y + h - 2);
    ctx.lineTo(x + 2 + taper, y + h - 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawPotRound(ctx, x, y, w, h) {
    const rimH = Math.max(CELL * 0.3, 6);
    roundRect(ctx, x + 1, y + 1, w - 2, rimH, 3);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + rimH, w / 2 - 2, h - rimH - 2, 0, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawDome(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h - 1, w / 2 - 2, h - 3, 0, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, x + 2, y + h * 0.5, w - 4, h * 0.5 - 1, 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawStemAngle(ctx, x, y, w, h) {
    const sw = CELL;
    roundRect(ctx, x + 1, y + 1, sw - 2, h - 2, 3);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, x + sw - 2, y + h - CELL, w - sw, CELL - 2, 3);
    ctx.fill();
    ctx.stroke();
  }

  function drawStemFork(ctx, x, y, w, h) {
    const cx = x + w / 2;
    const sw = CELL;
    roundRect(ctx, cx - sw / 2, y + CELL, sw, h - CELL - 1, 3);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, x + 1, y + 1, w - 2, CELL - 2, 3);
    ctx.fill();
    ctx.stroke();
  }

  function drawStar(ctx, cx, cy, r, points) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.45;
      const px = cx + Math.cos(angle) * rad;
      const py = cy + Math.sin(angle) * rad;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawHeart(ctx, x, y, w, h) {
    const cx = x + w / 2;
    const top = y + h * 0.3;
    ctx.beginPath();
    ctx.moveTo(cx, y + h - 4);
    ctx.bezierCurveTo(x - 4, y + h * 0.55, x - 2, y, cx, top);
    ctx.bezierCurveTo(x + w + 2, y, x + w + 4, y + h * 0.55, cx, y + h - 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawButterfly(ctx, x, y, w, h) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    ctx.beginPath();
    ctx.ellipse(cx - w * 0.22, cy, w * 0.28, h * 0.42, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + w * 0.22, cy, w * 0.28, h * 0.42, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, cx - 2, y + 2, 4, h - 4, 2);
    ctx.fillStyle = darken(ctx.fillStyle.toString(), 30);
    ctx.fill();
  }

  // ── Rendering ──
  function resize() {
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    render();

    if (refState.active) {
      resizeRef();
    }
  }

  function resizeRef() {
    const rect = refWrapper.getBoundingClientRect();
    refCanvas.width = rect.width;
    refCanvas.height = rect.height;
    renderRef();
  }

  function render() {
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    ctx.save();
    ctx.translate(state.panX, state.panY);
    ctx.scale(state.zoom, state.zoom);

    if (state.showGrid) {
      drawGrid(ctx);
    }

    for (const brick of state.placedBricks) {
      const def = getBrickDef(brick.id);
      if (def) {
        drawBrickShape(ctx, brick.x, brick.y, def, brick.color, brick.rot, brick.flip);
      }
    }

    if (state.hoverCell && state.selectedBrick && !state.eraser) {
      const def = getBrickDef(state.selectedBrick);
      if (def) {
        ctx.globalAlpha = 0.5;
        drawBrickShape(
          ctx,
          state.hoverCell.x,
          state.hoverCell.y,
          def,
          state.selectedColor,
          state.rotation,
          state.flipped
        );
        ctx.globalAlpha = 1;
      }
    }

    ctx.restore();
  }

  function renderRef() {
    if (!refState.active) return;
    const cw = refCanvas.width;
    const ch = refCanvas.height;
    refCtx.clearRect(0, 0, cw, ch);

    refCtx.save();
    refCtx.translate(refState.panX, refState.panY);
    refCtx.scale(refState.zoom, refState.zoom);

    if (refState.showGrid) {
      drawGrid(refCtx);
    }

    for (const brick of refState.bricks) {
      const def = getBrickDef(brick.id);
      if (def) {
        drawBrickShape(refCtx, brick.x, brick.y, def, brick.color, brick.rot, brick.flip);
      }
    }

    refCtx.restore();
  }

  function drawGrid(c) {
    c.strokeStyle = "rgba(0,0,0,0.06)";
    c.lineWidth = 0.5;

    for (let x = 0; x <= COLS; x++) {
      c.beginPath();
      c.moveTo(x * CELL, 0);
      c.lineTo(x * CELL, ROWS * CELL);
      c.stroke();
    }

    for (let y = 0; y <= ROWS; y++) {
      c.beginPath();
      c.moveTo(0, y * CELL);
      c.lineTo(COLS * CELL, y * CELL);
      c.stroke();
    }

    c.strokeStyle = "rgba(0,0,0,0.12)";
    c.lineWidth = 1;
    c.strokeRect(0, 0, COLS * CELL, ROWS * CELL);
  }

  // ── Palette UI ──
  function renderBrickPalette() {
    const palette = document.getElementById("brick-palette");
    palette.innerHTML = "";
    const bricks = BRICK_DEFS[state.category] || [];

    for (const def of bricks) {
      const item = document.createElement("div");
      item.className = "brick-item" + (state.selectedBrick === def.id ? " selected" : "");

      const c = document.createElement("canvas");
      const size = Math.max(def.w, def.h) * CELL + 16;
      c.width = size;
      c.height = size;
      const bctx = c.getContext("2d");
      bctx.translate((size - def.w * CELL) / 2, (size - def.h * CELL) / 2);
      drawBrickShape(bctx, 0, 0, def, state.selectedColor, 0, false);
      item.appendChild(c);

      const label = document.createElement("div");
      label.className = "brick-label";
      label.textContent = def.name;
      item.appendChild(label);

      item.addEventListener("click", () => {
        state.selectedBrick = def.id;
        state.eraser = false;
        document.getElementById("btn-eraser").classList.remove("active");
        renderBrickPalette();
      });

      palette.appendChild(item);
    }
  }

  function renderColorPalette() {
    const palette = document.getElementById("color-palette");
    palette.innerHTML = "";
    const colors = COLORS[state.category] || COLORS.petals;

    for (const color of colors) {
      const swatch = document.createElement("div");
      swatch.className = "color-swatch" + (state.selectedColor === color ? " selected" : "");
      swatch.style.background = color;
      if (color === "#ffffff") {
        swatch.style.border = "2px solid #ccc";
      }
      swatch.addEventListener("click", () => {
        state.selectedColor = color;
        renderColorPalette();
        renderBrickPalette();
      });
      palette.appendChild(swatch);
    }
  }

  // ── Category Tabs ──
  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.category = btn.dataset.category;
      state.selectedColor = COLORS[state.category]?.[0] || "#e05a9c";
      state.selectedBrick = BRICK_DEFS[state.category]?.[0]?.id || null;
      renderColorPalette();
      renderBrickPalette();
    });
  });

  // ── Canvas Interaction ──
  function screenToGrid(mx, my) {
    const rect = canvas.getBoundingClientRect();
    const x = (mx - rect.left - state.panX) / state.zoom;
    const y = (my - rect.top - state.panY) / state.zoom;
    return {
      x: Math.floor(x / CELL),
      y: Math.floor(y / CELL),
    };
  }

  canvas.addEventListener("mousemove", (e) => {
    if (state.panning) {
      state.panX += e.clientX - state.panStart.x;
      state.panY += e.clientY - state.panStart.y;
      state.panStart = { x: e.clientX, y: e.clientY };
      render();
      return;
    }

    const cell = screenToGrid(e.clientX, e.clientY);
    state.hoverCell = cell;
    render();
  });

  canvas.addEventListener("mousedown", (e) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      state.panning = true;
      state.panStart = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing";
      return;
    }

    if (e.button === 0) {
      const cell = screenToGrid(e.clientX, e.clientY);
      if (state.eraser) {
        eraseBrickAt(cell.x, cell.y);
      } else if (state.selectedBrick) {
        placeBrick(cell.x, cell.y);
      }
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (state.panning) {
      state.panning = false;
      canvas.style.cursor = "crosshair";
    }
  });

  canvas.addEventListener("mouseleave", () => {
    state.hoverCell = null;
    state.panning = false;
    canvas.style.cursor = "crosshair";
    render();
  });

  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(state.zoom + delta, e.clientX, e.clientY);
  }, { passive: false });

  // ── Placement ──
  function placeBrick(gx, gy) {
    const def = getBrickDef(state.selectedBrick);
    if (!def) return;

    const { w, h } = getEffectiveSize(def, state.rotation);

    if (gx < 0 || gy < 0 || gx + w > COLS || gy + h > ROWS) return;

    state.placedBricks.push({
      id: state.selectedBrick,
      x: gx,
      y: gy,
      color: state.selectedColor,
      rot: state.rotation,
      flip: state.flipped,
    });

    playClickSound();
    render();
  }

  function eraseBrickAt(gx, gy) {
    for (let i = state.placedBricks.length - 1; i >= 0; i--) {
      const brick = state.placedBricks[i];
      const def = getBrickDef(brick.id);
      if (!def) continue;
      const { w, h } = getEffectiveSize(def, brick.rot);
      if (gx >= brick.x && gx < brick.x + w && gy >= brick.y && gy < brick.y + h) {
        state.placedBricks.splice(i, 1);
        render();
        return;
      }
    }
  }

  // ── Sound ──
  function playClickSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, actx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, actx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.1);
      osc.start(actx.currentTime);
      osc.stop(actx.currentTime + 0.1);
    } catch (_) {}
  }

  // ── Zoom ──
  function setZoom(newZoom, pivotX, pivotY) {
    newZoom = Math.max(0.3, Math.min(3, newZoom));
    if (pivotX !== undefined) {
      const rect = canvas.getBoundingClientRect();
      const mx = pivotX - rect.left;
      const my = pivotY - rect.top;
      state.panX = mx - ((mx - state.panX) / state.zoom) * newZoom;
      state.panY = my - ((my - state.panY) / state.zoom) * newZoom;
    }
    state.zoom = newZoom;
    document.getElementById("zoom-label").textContent = Math.round(state.zoom * 100) + "%";
    render();
  }

  document.getElementById("btn-zoom-in").addEventListener("click", () => setZoom(state.zoom + 0.15));
  document.getElementById("btn-zoom-out").addEventListener("click", () => setZoom(state.zoom - 0.15));

  // ── Tool buttons ──
  document.getElementById("btn-rotate").addEventListener("click", () => {
    state.rotation = (state.rotation + 1) % 4;
    render();
  });

  document.getElementById("btn-flip").addEventListener("click", () => {
    state.flipped = !state.flipped;
    render();
  });

  document.getElementById("btn-eraser").addEventListener("click", () => {
    state.eraser = !state.eraser;
    document.getElementById("btn-eraser").classList.toggle("active", state.eraser);
    if (state.eraser) state.selectedBrick = null;
    renderBrickPalette();
  });

  document.getElementById("btn-grid-toggle").addEventListener("click", (e) => {
    state.showGrid = !state.showGrid;
    e.currentTarget.classList.toggle("active", state.showGrid);
    render();
  });

  document.getElementById("btn-clear").addEventListener("click", () => {
    if (state.placedBricks.length === 0) return;
    if (confirm("Clear all bricks?")) {
      state.placedBricks = [];
      render();
    }
  });

  document.getElementById("btn-save").addEventListener("click", () => {
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = COLS * CELL;
    exportCanvas.height = ROWS * CELL;
    const ectx = exportCanvas.getContext("2d");

    ectx.fillStyle = "#fdf6f0";
    ectx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    for (const brick of state.placedBricks) {
      const def = getBrickDef(brick.id);
      if (def) drawBrickShape(ectx, brick.x, brick.y, def, brick.color, brick.rot, brick.flip);
    }

    const link = document.createElement("a");
    link.download = "floral-lego.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  });

  // ── Reference pane interactions ──
  refCanvas.addEventListener("mousemove", (e) => {
    if (refState.panning) {
      refState.panX += e.clientX - refState.panStart.x;
      refState.panY += e.clientY - refState.panStart.y;
      refState.panStart = { x: e.clientX, y: e.clientY };
      renderRef();
    }
  });

  refCanvas.addEventListener("mousedown", (e) => {
    if (e.button === 0 || e.button === 1) {
      refState.panning = true;
      refState.panStart = { x: e.clientX, y: e.clientY };
      refCanvas.style.cursor = "grabbing";
    }
  });

  refCanvas.addEventListener("mouseup", () => {
    refState.panning = false;
    refCanvas.style.cursor = "grab";
  });

  refCanvas.addEventListener("mouseleave", () => {
    refState.panning = false;
    refCanvas.style.cursor = "grab";
  });

  refCanvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.3, Math.min(3, refState.zoom + delta));
    const rect = refCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    refState.panX = mx - ((mx - refState.panX) / refState.zoom) * newZoom;
    refState.panY = my - ((my - refState.panY) / refState.zoom) * newZoom;
    refState.zoom = newZoom;
    renderRef();
  }, { passive: false });

  document.getElementById("btn-close-ref").addEventListener("click", closeRefPane);

  function openRefPane(preset) {
    refState.active = true;
    refState.bricks = JSON.parse(JSON.stringify(preset.bricks));
    refState.name = preset.name;
    refState.zoom = 1;
    refState.panX = 0;
    refState.panY = 0;

    refPane.classList.remove("hidden");
    document.getElementById("ref-title").textContent = "Reference: " + preset.name;
    refCanvas.style.cursor = "grab";

    requestAnimationFrame(() => {
      resizeRef();
      refState.panX = (refCanvas.width - COLS * CELL * refState.zoom) / 2;
      refState.panY = (refCanvas.height - ROWS * CELL * refState.zoom) / 2;
      renderRef();
      resize();
    });
  }

  function closeRefPane() {
    refState.active = false;
    refState.bricks = [];
    refPane.classList.add("hidden");
    requestAnimationFrame(() => resize());
  }

  // ── Gallery ──
  const galleryModal = document.getElementById("gallery-modal");
  document.getElementById("btn-gallery").addEventListener("click", () => {
    renderGallery();
    galleryModal.classList.remove("hidden");
  });

  document.querySelector(".modal-close").addEventListener("click", () => {
    galleryModal.classList.add("hidden");
  });

  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) galleryModal.classList.add("hidden");
  });

  function renderGallery() {
    const grid = document.getElementById("gallery-grid");
    grid.innerHTML = "";

    for (const preset of PRESETS) {
      const card = document.createElement("div");
      card.className = "gallery-card";

      const c = document.createElement("canvas");
      c.width = COLS * CELL;
      c.height = ROWS * CELL;
      const gctx = c.getContext("2d");

      gctx.fillStyle = "#fdf6f0";
      gctx.fillRect(0, 0, c.width, c.height);

      for (const brick of preset.bricks) {
        const def = getBrickDef(brick.id);
        if (def) drawBrickShape(gctx, brick.x, brick.y, def, brick.color, brick.rot, brick.flip);
      }

      card.appendChild(c);

      const label = document.createElement("div");
      label.className = "gallery-label";
      label.textContent = preset.name;
      card.appendChild(label);

      const actions = document.createElement("div");
      actions.className = "gallery-actions";

      const loadBtn = document.createElement("button");
      loadBtn.className = "gallery-btn load-btn";
      loadBtn.textContent = "Load";
      loadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.placedBricks.length > 0 && !confirm("Load this preset? Current work will be replaced.")) return;
        state.placedBricks = JSON.parse(JSON.stringify(preset.bricks));
        galleryModal.classList.add("hidden");
        render();
      });

      const alongsideBtn = document.createElement("button");
      alongsideBtn.className = "gallery-btn alongside-btn";
      alongsideBtn.textContent = "Build Alongside";
      alongsideBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openRefPane(preset);
        galleryModal.classList.add("hidden");
      });

      actions.appendChild(loadBtn);
      actions.appendChild(alongsideBtn);
      card.appendChild(actions);

      grid.appendChild(card);
    }
  }

  // ── Keyboard Shortcuts ──
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    switch (e.key.toLowerCase()) {
      case "r":
        state.rotation = (state.rotation + 1) % 4;
        render();
        break;
      case "f":
        state.flipped = !state.flipped;
        render();
        break;
      case "e":
        document.getElementById("btn-eraser").click();
        break;
      case "z":
        if ((e.metaKey || e.ctrlKey) && state.placedBricks.length > 0) {
          e.preventDefault();
          state.placedBricks.pop();
          render();
        }
        break;
      case "escape":
        state.selectedBrick = null;
        state.eraser = false;
        document.getElementById("btn-eraser").classList.remove("active");
        renderBrickPalette();
        render();
        break;
    }
  });

  // ── Init ──
  function init() {
    state.selectedBrick = BRICK_DEFS.petals[0].id;
    state.selectedColor = COLORS.petals[0];

    renderBrickPalette();
    renderColorPalette();
    document.getElementById("btn-grid-toggle").classList.add("active");

    resize();

    state.panX = (canvas.width - COLS * CELL * state.zoom) / 2;
    state.panY = (canvas.height - ROWS * CELL * state.zoom) / 2;

    render();
  }

  window.addEventListener("resize", resize);
  init();
})();
