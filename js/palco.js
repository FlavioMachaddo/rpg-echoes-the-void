
const LARG = 480, ALT = 270, CHAO = 175, PES = 238;
const canvas = document.getElementById("palco");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;


const sprites = {};
let ultimaCena = null;
["engenheiro", "atleta", "bombeiro"].forEach(function (id) {
  const img = new Image();
  img.onload = function () { if (ultimaCena) desenharPalco(ultimaCena); };
  img.src = "img/sprite-" + id + ".png";
  sprites[id] = img;
});

function ret(cor, x, y, w, h) { ctx.fillStyle = cor; ctx.fillRect(x, y, w, h); }


function tri(cor, cx, base, larg, alt) {
  const n = Math.floor(alt / 4);
  for (let i = 0; i < n; i++) {
    const w = Math.max(4, Math.round(larg * (i + 1) / n / 4) * 4);
    ret(cor, cx - w / 2, base - alt + i * 4, w, 4);
  }
}


const VISUAL = {
  frostgard: { ceu: ["#0b1d3a", "#a6d8ff"], chao: "#e2f3ff", faixa: "#9cc8e8" },
  thalassia: { ceu: ["#3fa8f5", "#d8f3ff"], chao: "#f2dca0", faixa: "#2ab8d8" },
  terrazero: { ceu: ["#3a1c3f", "#e0824a"], chao: "#4a3a2e", faixa: "#2e2420" }
};


const PECAS = {
  frostgard: [
    function (x, b) { ret("#4b3a2a", x - 3, b - 14, 6, 14); tri("#2f6f7a", x, b - 10, 44, 66); tri("#eaf7ff", x, b - 40, 28, 28); },
    function (x, b) { ret("#7a5230", x - 28, b - 36, 56, 36); tri("#eaf7ff", x, b - 34, 76, 26); ret("#ffd36b", x - 6, b - 26, 12, 12); ret("#3b2a1a", x + 12, b - 24, 10, 24); },
    function (x, b) { ret("#8a9bb0", x - 30, b - 64, 12, 64); ret("#8a9bb0", x + 18, b - 44, 12, 44); ret("#a9bad0", x - 30, b - 74, 60, 10); }
  ],
  thalassia: [
    function (x, b) { ret("#8a5a2b", x - 3, b - 60, 6, 60); ret("#2f9e4f", x - 24, b - 66, 48, 8); ret("#2f9e4f", x - 16, b - 74, 32, 8); ret("#46c26a", x - 8, b - 80, 16, 6); },
    function (x, b) { ret("#ff7aa8", x - 20, b - 24, 8, 24); ret("#ff7aa8", x - 6, b - 36, 8, 36); ret("#ffb35a", x + 8, b - 28, 8, 28); ret("#b06bff", x + 22, b - 16, 8, 16); },
    function (x, b) { ret("#6b4423", x - 40, b - 24, 80, 24); ret("#4a2d14", x - 2, b - 74, 5, 52); ret("#e8e0d0", x + 4, b - 72, 28, 30); }
  ],
  terrazero: [
    function (x, b) { ret("#4a2d5e", x - 4, b - 50, 8, 50); ret("#5fbf4a", x - 22, b - 64, 44, 16); ret("#a35bd6", x - 12, b - 74, 24, 10); },
    function (x, b) { ret("#7a3b2e", x - 30, b - 18, 60, 18); ret("#5a2a20", x - 16, b - 32, 32, 14); ret("#111111", x - 24, b - 4, 12, 8); ret("#111111", x + 12, b - 4, 12, 8); },
    function (x, b) { ret("#2b2530", x - 24, b - 110, 48, 110); ret("#ffcf5a", x - 14, b - 94, 8, 8); ret("#ffcf5a", x + 6, b - 66, 8, 8); ret("#3d4a30", x - 24, b - 12, 48, 12); }
  ]
};


const imgsMonstros = {};
Object.keys(HISTORIAS).forEach(function (id) {
  HISTORIAS[id].monstros.concat(HISTORIAS[id].chefes).forEach(function (alvo) {
    const img = new Image();
    img.onload = function () { if (ultimaCena) desenharPalco(ultimaCena); };
    img.src = alvo.imagem;
    imgsMonstros[alvo.imagem] = img;
  });
});

function desenharMonstro(alvo, xCentro) {
  const img = imgsMonstros[alvo.imagem];
  if (img && img.complete && img.naturalWidth) ctx.drawImage(img, xCentro - img.naturalWidth / 2, PES - img.naturalHeight);
}

function acampamento() {
  tri("#d9a441", 250, PES, 80, 56);
  ret("#3b2a1a", 244, PES - 20, 12, 20);
  ret("#6b4423", 300, PES - 4, 28, 4);
  ret("#ff9a2e", 306, PES - 18, 16, 14);
  ret("#ffe066", 311, PES - 12, 6, 8);
}


function desenharPalco(cena) {
  ultimaCena = cena;
  const v = VISUAL[cena.mundo];
  const g = ctx.createLinearGradient(0, 0, 0, CHAO);
  g.addColorStop(0, v.ceu[0]);
  g.addColorStop(1, v.ceu[1]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, LARG, CHAO);
  ret(v.chao, 0, CHAO, LARG, ALT - CHAO);
  ret(v.faixa, 0, CHAO, LARG, 6);

  const peca = PECAS[cena.mundo][cena.local.cenario];
  [70, 210, 330, 440].forEach(function (x, i) { peca(x, CHAO + 28 + (i % 2) * 14); });
  if (cena.abrigo) acampamento();
  if (cena.noite) ret("rgba(8,4,40,0.5)", 0, 0, LARG, ALT);

  const img = sprites[cena.classe];
  if (img && img.complete && img.naturalWidth) {
    ctx.drawImage(img, 30, PES - 140, img.naturalWidth * 140 / img.naturalHeight, 140);
  }
  if (cena.alvo) desenharMonstro(cena.alvo, cena.alvo.hp > 60 ? 355 : 375);

  ret("rgba(0,0,0,0.55)", 8, 8, 200, 24);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(cena.local.nome, 16, 25);
}
