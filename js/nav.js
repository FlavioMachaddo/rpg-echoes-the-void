
const paginas = [
  { id: "index",      texto: "Home",       arquivo: "index.html" },
  { id: "regras",     texto: "Regras",     arquivo: "regras.html" },
  { id: "personagem", texto: "Personagem", arquivo: "personagem.html" },
  { id: "mundos",     texto: "Mundos",     arquivo: "mundos.html" },
  { id: "jogar",      texto: "Jogar",      arquivo: "jogar.html" }
];


function montarMenu() {
  const menu = document.getElementById("menu");
  const paginaAtual = document.body.dataset.pagina;

  paginas.forEach(function (pagina) {
    const link = document.createElement("a");
    link.href = pagina.arquivo;
    link.textContent = pagina.texto;

    if (pagina.id === paginaAtual) {
      link.classList.add("ativo");
    }

    menu.appendChild(link);
  });
}

montarMenu();
