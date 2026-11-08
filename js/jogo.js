// Motor do jogo de sobrevivência. Lê a classe (localStorage) e os mundos (historia.js).
const DIVISOR = 5;                  // bônus de teste = atributo ÷ DIVISOR
const FASES = ["Manhã", "Tarde", "Noite"];
const PROGRESSO_CHEFE = [3, 6];     // explorações necessárias para o chefe menor e o final

// Mesmos números da página Personagem. Se mudar lá, mude aqui.
const CLASSES = {
  engenheiro: { nome: "Engenheiro", hp: 80,  defesa: 30, ataque: 10, agilidade: 15, bonusArma: 5, cura: 20 },
  atleta:     { nome: "Atleta",     hp: 90,  defesa: 10, ataque: 20, agilidade: 20, bonusArma: 3, cura: 20 },
  bombeiro:   { nome: "Bombeiro",   hp: 100, defesa: 50, ataque: 20, agilidade: 12, bonusArma: 8, cura: 35 }
};

let estado = null;
const $ = function (id) { return document.getElementById(id); };
const mundo = function () { return HISTORIAS[estado.mundo]; };

function classeEscolhida() {
  try { return localStorage.getItem("classeEscolhida"); } catch (erro) { return null; }
}

// Bônus de um atributo. O Atleta ganha agilidade quanto menos vida tiver.
function bonus(attr) {
  let valor = estado[attr];
  if (attr === "ataque") valor += estado.bonusArma;
  let b = Math.floor(valor / DIVISOR);
  if (attr === "agilidade" && estado.classe === "atleta") b += Math.floor((1 - estado.hp / estado.hpMax) * 5);
  return b;
}

// Rola d20 + bônus contra uma dificuldade. 20 natural sempre passa; 1 natural sempre falha.
function rolar(attr, dif) {
  const d20 = Math.floor(Math.random() * 20) + 1;
  const b = bonus(attr);
  const total = d20 + b;
  const ok = d20 === 20 || (d20 !== 1 && total >= dif);
  return { d20: d20, ok: ok, texto: "d20 (" + d20 + ") + " + b + " = " + total + " contra " + dif + ": " + (ok ? "sucesso" : "falha") };
}

function aplicar(res) {
  estado.hp = Math.min(estado.hpMax, estado.hp + (res.hp || 0));
  estado.sup = Math.max(0, estado.sup + (res.sup || 0));
}

function mostrar(msgs) {
  $("resultado").textContent = msgs.join(" ");
  desenhar();
}

// ----- Tela inicial -----
function mundoEscolhido() {
  try { return localStorage.getItem("mundoEscolhido"); } catch (erro) { return null; }
}

function mostrarInicio() {
  $("tela-jogo").hidden = true;
  $("tela-inicio").hidden = false;
  const classe = CLASSES[classeEscolhida()];
  const idMundo = mundoEscolhido();
  const mundoEsc = HISTORIAS[idMundo];
  const linhas = [];
  linhas.push(classe
    ? "Classe: <strong>" + classe.nome + "</strong> (<a href=\"personagem.html\">trocar</a>)"
    : "Você ainda não escolheu uma classe. <a href=\"personagem.html\">Escolha na página Personagem</a>.");
  linhas.push(mundoEsc
    ? "Mundo: <strong>" + mundoEsc.nome + "</strong> (<a href=\"mundos.html\">trocar</a>)"
    : "Você ainda não escolheu um mundo. <a href=\"mundos.html\">Escolha na página Mundos</a>.");
  $("aviso-classe").innerHTML = linhas.join("<br>");
  const lista = $("lista-mundos");
  lista.innerHTML = "";
  lista.appendChild(novoBotao("Começar aventura", function () { iniciar(idMundo); }, !classe || !mundoEsc));
}

function iniciar(idMundo) {
  const id = classeEscolhida();
  const c = CLASSES[id];
  estado = { classe: id, nomeClasse: c.nome, mundo: idMundo, hp: c.hp, hpMax: c.hp, defesa: c.defesa,
    ataque: c.ataque, agilidade: c.agilidade, bonusArma: c.bonusArma, cura: c.cura,
    sup: 3, dia: 1, fase: 0, abrigo: false, progresso: 0, chefe: 0, luta: null, vitoria: false, local: null };
  $("tela-inicio").hidden = true;
  $("tela-jogo").hidden = false;
  mostrar(["Sobreviva e derrote os dois chefes de " + mundo().nome + "."]);
}

// ----- Tempo: cada ação gasta uma fase do dia (Manhã, Tarde, Noite) -----
function passarFase(msgs) {
  estado.fase++;
  if (estado.fase > 2) {
    estado.fase = 0;
    estado.dia++;
    estado.abrigo = false;
    if (estado.sup > 0) { estado.sup--; msgs.push("Novo dia: você consome 1 suprimento."); }
    else { estado.hp -= 15; msgs.push("Novo dia sem suprimentos: a fome custa 15 HP."); }
  }
  if (estado.fase === 2 && !estado.abrigo) {
    estado.hp -= mundo().noite.dano;
    msgs.push(mundo().noite.texto + " (-" + mundo().noite.dano + " HP)");
  }
}

// ----- Ações de sobrevivência -----
// Explorar um dos 3 locais do mundo: pode surgir um monstro ou um evento.
function explorar(i) {
  const m = mundo();
  const local = m.locais[i];
  const msgs = ["Você explora: " + local.nome + "."];
  estado.local = local;
  estado.progresso++;
  if (Math.random() < local.perigo) {
    const mon = m.monstros[Math.floor(Math.random() * m.monstros.length)];
    estado.luta = { alvo: mon, hp: mon.hp, defendendo: false, chefe: false, turno: 0 };
    msgs.push(mon.nome + " aparece!");
  } else {
    const ev = m.eventos[Math.floor(Math.random() * m.eventos.length)];
    let res = ev.ok;
    msgs.push(ev.texto);
    if (ev.teste) {
      const r = rolar(ev.teste[0], ev.teste[1]);
      msgs.push("Teste de " + ev.teste[0] + ": " + r.texto + ".");
      if (!r.ok) res = ev.falha;
    }
    msgs.push(res.texto);
    aplicar(res);
    if (local.bonus) { estado.sup += local.bonus; msgs.push("Neste local você acha mais " + local.bonus + " suprimento(s)."); }
  }
  passarFase(msgs);
  mostrar(msgs);
}

function descansar() {
  const cura = 20 + (estado.abrigo ? 10 : 0);
  estado.hp = Math.min(estado.hpMax, estado.hp + cura);
  const msgs = ["Você descansa e recupera " + cura + " HP."];
  passarFase(msgs);
  mostrar(msgs);
}

function montarAcampamento() {
  estado.sup--;
  estado.abrigo = true;
  const msgs = ["Você gasta 1 suprimento e monta o acampamento. A noite de hoje será segura."];
  passarFase(msgs);
  mostrar(msgs);
}

// Ação livre (não gasta fase). Em luta, gasta o turno.
function usarSuprimento() {
  estado.sup--;
  estado.hp = Math.min(estado.hpMax, estado.hp + estado.cura);
  const msgs = ["Você usa um suprimento e recupera até " + estado.cura + " HP."];
  if (estado.luta) inimigoAtaca(msgs);
  mostrar(msgs);
}

// Habilidade do Engenheiro
function melhorarArma() {
  estado.sup -= 2;
  estado.bonusArma += 2;
  mostrar(["Você melhora seu martelo: +2 de ataque."]);
}

// ----- Chefes e combate -----
function enfrentar() {
  const chefe = mundo().chefes[estado.chefe];
  estado.luta = { alvo: chefe, hp: chefe.hp, defendendo: false, chefe: true, turno: 0 };
  mostrar([chefe.texto]);
}

function turnoLuta(acao) {
  const luta = estado.luta;
  const alvo = luta.alvo;
  const msgs = [];
  if (acao === "atacar") {
    const r = rolar("ataque", alvo.defesa);
    if (r.ok) {
      let dano = estado.ataque + estado.bonusArma;
      if (r.d20 === 20) dano *= 2;
      luta.hp -= dano;
      msgs.push("Você ataca: " + r.texto + ". Dano: " + dano + (r.d20 === 20 ? " (crítico!)" : "") + ".");
    } else {
      msgs.push("Você ataca: " + r.texto + ". Errou!");
    }
  } else if (acao === "fugir") {
    const r = rolar("agilidade", 12);
    if (r.ok) { estado.luta = null; return mostrar(["Você foge de " + alvo.nome + " (" + r.texto + ")."]); }
    msgs.push("Você tenta fugir, mas falha (" + r.texto + ").");
  } else {
    luta.defendendo = true;
    msgs.push("Você se prepara para defender.");
  }

  if (luta.hp <= 0) {
    msgs.push("Você derrotou " + alvo.nome + "!");
    estado.luta = null;
    if (!luta.chefe) {
      estado.sup += 1;
      msgs.push("Você recolhe 1 suprimento.");
    } else if (estado.chefe === 0) {
      estado.chefe = 1;
      estado.sup += 3;
      estado.hp = Math.min(estado.hpMax, estado.hp + 20);
      msgs.push("Você recolhe os despojos: +3 suprimentos e +20 HP.");
    } else {
      estado.vitoria = true;
    }
    tremer();
    return mostrar(msgs);
  }
  inimigoAtaca(msgs);
  tremer();
  mostrar(msgs);
}

// O inimigo tenta acertar você. A cada 3 turnos, um chefe faz um golpe forte (esquiva mais difícil, dano x1,5).
function inimigoAtaca(msgs) {
  const luta = estado.luta;
  const alvo = luta.alvo;
  luta.turno++;
  const forte = luta.chefe && luta.turno % 3 === 0;
  const r = rolar("agilidade", forte ? 15 : 12);
  if (r.ok) {
    msgs.push(alvo.nome + (forte ? " faz um golpe forte, mas" : " ataca, mas") + " você se esquiva (" + r.texto + ").");
  } else {
    let dano = Math.max(5, alvo.ataque - Math.floor(estado.defesa / 2));
    if (forte) dano = Math.floor(dano * 1.5);
    if (luta.defendendo) dano = Math.floor(dano / 2);
    estado.hp -= dano;
    msgs.push(alvo.nome + (forte ? " faz um GOLPE FORTE" : " acerta você") + " (" + r.texto + "). Dano: " + dano + (luta.defendendo ? " (reduzido pela defesa)" : "") + ".");
  }
  luta.defendendo = false;
}

// Treme a cena depois de um golpe (a animação só roda se o sistema permitir movimento)
function tremer() {
  const caixa = $("palco-caixa");
  caixa.classList.remove("golpe");
  void caixa.offsetWidth;
  caixa.classList.add("golpe");
}

function novoBotao(texto, aoClicar, desligado) {
  const botao = document.createElement("button");
  botao.className = "botao";
  botao.textContent = texto;
  botao.disabled = !!desligado;
  botao.addEventListener("click", aoClicar);
  return botao;
}

// ----- Desenha a tela -----
function desenhar() {
  const m = mundo();
  const chefe = m.chefes[estado.chefe];
  const necessario = PROGRESSO_CHEFE[estado.chefe];
  const hp = Math.max(0, estado.hp);
  const luta = estado.luta;

  let painel = "<span><strong>" + estado.nomeClasse + "</strong> em " + m.nome + "</span>" +
    "<span>HP " + hp + "/" + estado.hpMax + " <progress value=\"" + hp + "\" max=\"" + estado.hpMax + "\"></progress></span>" +
    "<span>Suprimentos: " + estado.sup + "</span>" +
    "<span>Dia " + estado.dia + ", " + FASES[estado.fase] + (estado.abrigo ? " (acampamento montado)" : "") + "</span>";
  painel += luta
    ? "<span>" + luta.alvo.nome + " <progress value=\"" + Math.max(0, luta.hp) + "\" max=\"" + luta.alvo.hp + "\"></progress></span>"
    : "<span>Exploração: " + Math.min(estado.progresso, necessario) + "/" + necessario + "</span>";
  $("painel").innerHTML = painel;

  desenharPalco({ mundo: estado.mundo, local: estado.local || m.locais[0], classe: estado.classe,
    abrigo: estado.abrigo, alvo: luta ? luta.alvo : null, noite: estado.fase === 2 });

  const opcoes = $("opcoes");
  const acoes = $("acoes");
  opcoes.innerHTML = "";
  acoes.innerHTML = "";

  if (estado.hp <= 0) {
    $("texto-cena").textContent = "Suas forças acabam e tudo escurece. Você não sobreviveu a este mundo.";
    opcoes.appendChild(novoBotao("Voltar ao início", mostrarInicio));
  } else if (estado.vitoria) {
    $("texto-cena").textContent = m.vitoria;
    opcoes.appendChild(novoBotao("Jogar de novo", mostrarInicio));
  } else if (luta) {
    $("texto-cena").textContent = "Luta contra " + luta.alvo.nome + " (precisa de " + luta.alvo.defesa + " para acertá-lo). O que você faz?";
    opcoes.appendChild(novoBotao("Atacar", function () { turnoLuta("atacar"); }));
    opcoes.appendChild(novoBotao("Defender (reduz o próximo dano pela metade)", function () { turnoLuta("defender"); }));
    opcoes.appendChild(novoBotao("Usar suprimento (+" + estado.cura + " HP)", usarSuprimento, estado.sup < 1));
    if (!luta.chefe) opcoes.appendChild(novoBotao("Fugir (teste de agilidade)", function () { turnoLuta("fugir"); }));
  } else {
    $("texto-cena").textContent = m.ambiente;
    m.locais.forEach(function (local, i) {
      const risco = local.perigo < 0.4 ? "baixo" : local.perigo < 0.6 ? "médio" : "alto";
      opcoes.appendChild(novoBotao("Explorar: " + local.nome + " (perigo " + risco + ", +" + local.bonus + " suprimento extra)", function () { explorar(i); }));
    });
    opcoes.appendChild(novoBotao("Descansar (+20 HP, +30 com acampamento)", descansar));
    opcoes.appendChild(novoBotao("Montar acampamento (1 suprimento)", montarAcampamento, estado.sup < 1 || estado.abrigo));
    const pronto = estado.progresso >= necessario;
    opcoes.appendChild(novoBotao("Enfrentar " + chefe.nome + (pronto ? "" : " (explore mais " + (necessario - estado.progresso) + "x)"), enfrentar, !pronto));
    acoes.appendChild(novoBotao("Usar suprimento (+" + estado.cura + " HP)", usarSuprimento, estado.sup < 1 || estado.hp >= estado.hpMax));
    if (estado.classe === "engenheiro") {
      acoes.appendChild(novoBotao("Melhorar arma (2 suprimentos, +2 de ataque)", melhorarArma, estado.sup < 2));
    }
  }
}

mostrarInicio();
