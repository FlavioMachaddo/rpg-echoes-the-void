
const botoesClasse = document.querySelectorAll(".botao-escolher");
const statusClasse = document.getElementById("status-classe");

function marcarClasse(id) {
  botoesClasse.forEach(function (botao) {
    const ativo = botao.dataset.classe === id;
    botao.textContent = ativo ? "Escolhido" : "Escolher";
    botao.classList.toggle("escolhido", ativo);
  });
  if (id) {
    const nome = document.getElementById(id).querySelector("h3").textContent;
    statusClasse.innerHTML = "Classe escolhida: <strong>" + nome + "</strong>. <a href=\"jogar.html\">Ir para Jogar</a>";
  }
}

botoesClasse.forEach(function (botao) {
  botao.addEventListener("click", function () {
    try { localStorage.setItem("classeEscolhida", botao.dataset.classe); } catch (erro) {}
    marcarClasse(botao.dataset.classe);
  });
});

try { marcarClasse(localStorage.getItem("classeEscolhida")); } catch (erro) {}
