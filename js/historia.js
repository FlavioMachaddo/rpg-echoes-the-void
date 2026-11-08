// Dados de cada mundo (edite à vontade; o jogo.js só lê estes dados).
// locais: 3 lugares para explorar (cenario = qual desenho; perigo = chance de monstro; bonus = suprimentos extras).
// eventos: o que pode acontecer ao Explorar sem monstro. teste: [atributo, dificuldade].
// monstros: inimigos comuns. chefes: o primeiro é o menor, o segundo é o final. defesa = dificuldade para acertar.
// imagem: arquivo do monstro em img/monstros/.
const HISTORIAS = {
  frostgard: {
    nome: "FrostGard",
    ambiente: "A névoa glacial devora o horizonte e o frio aperta a cada hora. Ruínas, fortalezas e cabanas são seu único refúgio.",
    noite: { dano: 10, texto: "O frio da noite corta você até os ossos." },
    vitoria: "A Rainha da Geada se desfaz em cristais e a névoa de FrostGard se abre. Você sobreviveu a este mundo.",
    locais: [
      { nome: "Floresta Congelada", cenario: 0, perigo: 0.3, bonus: 0 },
      { nome: "Cabana de Caçadores", cenario: 1, perigo: 0.5, bonus: 1 },
      { nome: "Fortaleza em Ruínas", cenario: 2, perigo: 0.7, bonus: 2 }
    ],
    monstros: [
      { nome: "Espectro Gélido", imagem: "img/monstros/espectro-gelido.png", hp: 30, ataque: 14, defesa: 10 },
      { nome: "Aranha de Gelo", imagem: "img/monstros/aranha-de-gelo.png", hp: 35, ataque: 16, defesa: 10 }
    ],
    chefes: [
      { nome: "Lobo de Gelo", imagem: "img/monstros/lobo-de-gelo.png", hp: 70, ataque: 26, defesa: 13, texto: "Um lobo de cristal azul surge da névoa, rosnando." },
      { nome: "Rainha da Geada", imagem: "img/monstros/rainha-da-geada.png", hp: 150, ataque: 36, defesa: 14, texto: "No salão da fortaleza, a Rainha da Geada se ergue do trono de gelo." }
    ],
    eventos: [
      { texto: "Você encontra uma cabana de caçadores com a lareira acesa.", ok: { texto: "Você se aquece e vasculha: +10 HP e +2 suprimentos.", hp: 10, sup: 2 } },
      { texto: "Uma tempestade de névoa cai sobre você.", teste: ["defesa", 12], ok: { texto: "Você resiste ao vento e acha provisões na neve.", sup: 1 }, falha: { texto: "O frio te castiga.", hp: -15 } },
      { texto: "Uma fenda de gelo corta o caminho.", teste: ["agilidade", 12], ok: { texto: "Você salta e acha suprimentos congelados.", sup: 2 }, falha: { texto: "Você escorrega na queda.", hp: -10 } },
      { texto: "Ruínas de pedra antiga guardam uma porta de ferro.", teste: ["ataque", 12], ok: { texto: "Você arromba a porta e leva suprimentos.", sup: 2 }, falha: { texto: "A alavanca machuca sua mão.", hp: -5 } }
    ]
  },
  thalassia: {
    nome: "Thalassia",
    ambiente: "Águas cristalinas e milhares de ilhas. Há monstros marinhos nas profundezas e dormir em alto-mar não é aconselhado.",
    noite: { dano: 15, texto: "Monstros marinhos atacam seu barco no escuro." },
    vitoria: "O Leviatã de Cristal afunda e o oceano de Thalassia se acalma. Você sobreviveu a este mundo.",
    locais: [
      { nome: "Ilha Tropical", cenario: 0, perigo: 0.3, bonus: 0 },
      { nome: "Recife de Coral", cenario: 1, perigo: 0.5, bonus: 1 },
      { nome: "Naufrágio Antigo", cenario: 2, perigo: 0.7, bonus: 2 }
    ],
    monstros: [
      { nome: "Caranguejo Gigante", imagem: "img/monstros/caranguejo-gigante.png", hp: 35, ataque: 16, defesa: 10 },
      { nome: "Água-viva Sombria", imagem: "img/monstros/agua-viva-sombria.png", hp: 30, ataque: 14, defesa: 10 }
    ],
    chefes: [
      { nome: "Serpente das Marés", imagem: "img/monstros/serpente-das-mares.png", hp: 70, ataque: 26, defesa: 13, texto: "Uma serpente enorme rompe a superfície, cercada de espuma." },
      { nome: "Leviatã de Cristal", imagem: "img/monstros/leviata-de-cristal.png", hp: 150, ataque: 36, defesa: 14, texto: "O mar ferve e o Leviatã de Cristal emerge, brilhando em magia elemental." }
    ],
    eventos: [
      { texto: "Você chega a uma ilha deserta cheia de frutos e água doce.", ok: { texto: "Você se refresca: +5 HP e +2 suprimentos.", hp: 5, sup: 2 } },
      { texto: "Uma corrente forte arrasta seu barco.", teste: ["agilidade", 12], ok: { texto: "Você aproveita a corrente e pesca no caminho.", sup: 1 }, falha: { texto: "O barco bate nos recifes.", hp: -10 } },
      { texto: "Cardumes de peixes passam perto da margem.", teste: ["ataque", 12], ok: { texto: "Você pesca bastante.", sup: 2 }, falha: { texto: "Uma onda te derruba na água.", hp: -10 } },
      { texto: "Um baú aparece preso nos corais.", teste: ["defesa", 12], ok: { texto: "Você mergulha e volta com suprimentos.", sup: 2 }, falha: { texto: "A pressão da água te machuca.", hp: -10 } }
    ]
  },
  terrazero: {
    nome: "Terra Zero",
    ambiente: "Cidades fantasmas, vegetação mutante e desastres constantes dos Observadores. Cuidado com o que você vê: nem tudo é real.",
    noite: { dano: 10, texto: "Um desastre natural sacode a cidade durante a noite." },
    vitoria: "O Observador desaparece e o céu da Terra Zero se aquieta. Você sobreviveu a este mundo.",
    locais: [
      { nome: "Mata Mutante", cenario: 0, perigo: 0.3, bonus: 0 },
      { nome: "Avenida de Carros", cenario: 1, perigo: 0.5, bonus: 1 },
      { nome: "Cidade Fantasma", cenario: 2, perigo: 0.7, bonus: 2 }
    ],
    monstros: [
      { nome: "Mutante Rastejante", imagem: "img/monstros/mutante-rastejante.png", hp: 35, ataque: 16, defesa: 10 },
      { nome: "Sombra Observada", imagem: "img/monstros/sombra-observada.png", hp: 30, ataque: 14, defesa: 10 }
    ],
    chefes: [
      { nome: "Drone Sentinela", imagem: "img/monstros/drone-sentinela.png", hp: 70, ataque: 26, defesa: 13, texto: "Um drone dos Observadores desce com um brilho roxo." },
      { nome: "O Observador", imagem: "img/monstros/o-observador.png", hp: 150, ataque: 36, defesa: 14, texto: "A realidade treme e O Observador revela sua forma no alto da torre." }
    ],
    eventos: [
      { texto: "Uma loja intacta numa cidade fantasma.", ok: { texto: "Você revira as prateleiras: +2 suprimentos.", sup: 2 } },
      { texto: "Uma figura imóvel olha para você. Será real?", teste: ["defesa", 12], ok: { texto: "Era uma ilusão. Atrás dela havia suprimentos.", sup: 1 }, falha: { texto: "A ilusão fere de verdade.", hp: -10 } },
      { texto: "A vegetação mutante se move ao seu redor.", teste: ["agilidade", 12], ok: { texto: "Você se esquiva e colhe frutos estranhos.", sup: 1 }, falha: { texto: "Os galhos te prendem e ferem.", hp: -15 } },
      { texto: "Um carro abandonado com peças e provisões.", teste: ["ataque", 11], ok: { texto: "Você abre o porta-malas e leva tudo.", sup: 2 }, falha: { texto: "A lataria corta sua mão.", hp: -5 } }
    ]
  }
};
