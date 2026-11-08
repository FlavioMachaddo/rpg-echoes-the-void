// Guarda o mundo escolhido (localStorage) e leva o jogador para a página Jogar.
document.querySelectorAll(".botao-escolher-mundo").forEach(function (botao) {
  botao.addEventListener("click", function () {
    try { localStorage.setItem("mundoEscolhido", botao.dataset.mundo); } catch (erro) {}
    window.location.href = "jogar.html";
  });
});
