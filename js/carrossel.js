
function montarCarrossel(carrossel) {
  const trilho = carrossel.querySelector(".carrossel-trilho");
  const slides = Array.from(trilho.querySelectorAll(".slide"));
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  
  trilho.tabIndex = 0;
  trilho.setAttribute("aria-label", carrossel.dataset.rotulo);

  
  const controles = document.createElement("div");
  controles.className = "carrossel-controles";

  const anterior = document.createElement("button");
  anterior.className = "carrossel-botao";
  anterior.textContent = "‹";
  anterior.setAttribute("aria-label", "Anterior");

  const proximo = document.createElement("button");
  proximo.className = "carrossel-botao";
  proximo.textContent = "›";
  proximo.setAttribute("aria-label", "Próximo");

  const pontos = slides.map(function (slide, i) {
    const ponto = document.createElement("button");
    ponto.className = "carrossel-ponto";
    ponto.setAttribute("aria-label", "Ir para " + slide.querySelector("h3").textContent);
    ponto.addEventListener("click", function () { irPara(i); });
    return ponto;
  });

  controles.append(anterior, ...pontos, proximo);
  carrossel.appendChild(controles);


  function indiceAtual() {
    const centro = trilho.scrollLeft + trilho.clientWidth / 2;
    let melhor = 0;
    slides.forEach(function (slide, i) {
      const distancia = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - centro);
      const distanciaMelhor = Math.abs(slides[melhor].offsetLeft + slides[melhor].offsetWidth / 2 - centro);
      if (distancia < distanciaMelhor) melhor = i;
    });
    return melhor;
  }


  function irPara(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const alvo = slides[i].offsetLeft + slides[i].offsetWidth / 2 - trilho.clientWidth / 2;
    trilho.scrollTo({ left: alvo, behavior: reduzirMovimento ? "auto" : "smooth" });
  }


  function atualizar() {
    const atual = indiceAtual();
    slides.forEach(function (slide, i) { slide.classList.toggle("ativo", i === atual); });
    pontos.forEach(function (ponto, i) { ponto.setAttribute("aria-current", i === atual); });
    anterior.disabled = atual === 0;
    proximo.disabled = atual === slides.length - 1;
  }

  anterior.addEventListener("click", function () { irPara(indiceAtual() - 1); });
  proximo.addEventListener("click", function () { irPara(indiceAtual() + 1); });
  slides.forEach(function (slide, i) { slide.addEventListener("click", function () { irPara(i); }); });

  trilho.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowRight") { evento.preventDefault(); irPara(indiceAtual() + 1); }
    if (evento.key === "ArrowLeft")  { evento.preventDefault(); irPara(indiceAtual() - 1); }
  });

  trilho.addEventListener("scroll", function () { requestAnimationFrame(atualizar); });
  window.addEventListener("resize", atualizar);

  carrossel.classList.add("pronto");
  irPara(0);
  atualizar();
}


function tratarFotos() {
  document.querySelectorAll(".foto img").forEach(function (img) {
    function semFoto() { img.parentElement.classList.add("sem-foto"); }
    img.addEventListener("error", semFoto);
    if (img.complete && img.naturalWidth === 0) semFoto();
  });
}

document.querySelectorAll(".carrossel").forEach(montarCarrossel);
tratarFotos();
