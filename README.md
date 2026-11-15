# Echoes of the Void

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**A browser-based survival RPG built with plain HTML, CSS and JavaScript.**
Pick a class, pick a world, and survive the cold, the ocean and the ruins until you defeat the bosses that rule each one.

### 🎮 [Play online](https://flaviomachaddo.github.io/rpg-echoes-the-void/)

> No installation required. The game runs entirely in your browser.

---

## Table of contents

- [About the project](#about-the-project)
- [Features](#features)
- [The worlds](#the-worlds)
- [The classes](#the-classes)
- [How to play](#how-to-play)
- [Game rules at a glance](#game-rules-at-a-glance)
- [Website pages](#website-pages)
- [Built with](#built-with)
- [Project structure](#project-structure)
- [Running locally](#running-locally)
- [Customizing the game](#customizing-the-game)
- [Authors](#authors)

---

## About the project

**Echoes of the Void** is a small tabletop-style RPG turned into a website. The player chooses one of three classes and one of three very different worlds, then manages time, health and supplies while exploring locations, fighting monsters and facing two bosses per world.

The game uses a **custom attribute system** (HP, Defense, Attack and Agility) combined with **d20 dice rolls** for every uncertain action.

The project is also a **website** with five pages (Home, Rules, Character, Worlds and Play) and a complete **game** built from scratch with no frameworks, libraries or backend. It was created as a Web Programming course project.

## Features

- **Three worlds**, each with its own scenery, hazards, monsters and bosses.
- **Three classes**, each with unique stats, a signature weapon and a special ability.
- **Survival mechanics:** a day/night cycle, supplies that must be managed, camps that protect you from the night.
- **Exploration:** three locations per world, each with a different level of danger and reward.
- **Turn-based combat** against common monsters and bosses, with a d20 hit system, critical hits, dodging and defending.
- **Two bosses per world:** a minor boss and a final boss with powerful attacks every third turn.
- **Pixel-art game scene** drawn on an HTML `<canvas>`, with character and monster sprites.
- **Carousel pages** for choosing a class or a world, working with mouse, touch and keyboard.
- **Saved choices:** your selected class and world are remembered in the browser.
- **Responsive and accessible:** works on desktop and mobile, with keyboard support, ARIA labels and reduced-motion support.

## The worlds

| World | Description | Minor boss | Final boss |
|---|---|---|---|
| **FrostGard** | A world frozen in an eternal winter. A glacial fog swallows the horizon and the temperature drops as night approaches. Ancient stone ruins, abandoned fortresses and hunters' cabins are the only shelter. | Ice Wolf | Frost Queen |
| **Thalassia** | A world of crystal-clear water where only 5% of the surface is land: thousands of paradise islands scattered across a vast ocean full of elemental magic, and sea monsters in the deep. | Tide Serpent | Crystal Leviathan |
| **Terra Zero** | A post-apocalyptic Earth of ruined cities, abandoned vehicles and mutant vegetation, kept unstable by an ultra-advanced alien civilization known as the Observers. Not everything you see is real. | Sentinel Drone | The Observer |

## The classes

| Class | HP | Defense | Attack | Agility | Weapon | Special ability |
|---|---|---|---|---|---|---|
| **Engineer** | 80 | 30 | 10 | 15 | Hammer (+5 attack) | Spends 2 supplies to upgrade the weapon (+2 attack), as many times as needed. |
| **Athlete** | 90 | 10 | 20 | 20 | Bow and arrow (+3 attack) | The lower the HP, the higher the Agility (up to +5 on the bonus). |
| **Firefighter** | 100 | 50 | 20 | 12 | Axe (+8 attack) | Each supply heals 35 HP instead of 20. |

## How to play

1. **Choose a class** on the *Character* page.
2. **Choose a world** on the *Worlds* page. The **Choose and play** button takes you straight to the game.
3. On the *Play* page, press **Start adventure** and survive:
   - **Explore** one of three locations to find supplies, events and monsters.
   - **Rest** to recover HP.
   - **Build a camp** (1 supply) to protect yourself during the night.
   - **Fight** monsters, then challenge the **minor boss** and finally the **final boss**.
4. Defeat the final boss to win. If your HP reaches 0, you lose.

## Game rules at a glance

The full rules are available on the *Rules* page of the site.

- **Dice tests:** roll a d20 and add the attribute bonus (*attribute ÷ 5, rounded down*). Meet or beat the difficulty to succeed. A natural 20 always succeeds and a natural 1 always fails.
- **Time:** each day has three phases (morning, afternoon, night) and every action spends one phase.
- **Night:** if the night begins without a camp, the world deals damage (10 HP in FrostGard and Terra Zero, 15 HP in Thalassia).
- **Food:** every new day costs 1 supply. With no supplies, you lose 15 HP.
- **Combat:** on your turn you can attack, defend, use a supply or (against common monsters) flee. Then the enemy attacks, and you try to dodge with an Agility test.
- **Bosses:** the minor boss appears after 3 explorations and the final boss after 6. Every third turn, a boss unleashes a strong attack that is harder to dodge and deals 1.5x damage.

| Enemy | HP | Attack | Defense |
|---|---|---|---|
| Common monsters | 30–35 | 14–16 | 10 |
| Minor boss | 70 | 26 | 13 |
| Final boss | 150 | 36 | 14 |

## Website pages

| Page | File | Description |
|---|---|---|
| **Home** | `index.html` | Presentation of the game, the three worlds, the three classes and a quick guide. |
| **Rules** | `regras.html` | Attributes, d20 tests, survival, classes and combat. |
| **Character** | `personagem.html` | Carousel with the three classes and the **Choose** button. |
| **Worlds** | `mundos.html` | Carousel with the three worlds and the **Choose and play** button. |
| **Play** | `jogar.html` | The game itself, with the pixel-art scene, status panel and action buttons. |

## Built with

| Technology | Used for |
|---|---|
| **HTML5** | Structure and content of all pages, semantic tags, `<canvas>` for the game scene. |
| **CSS3** | Purple-and-black theme with CSS variables, Flexbox, Grid, scroll snapping for the carousels, animations and responsive layout. |
| **JavaScript (ES6, vanilla)** | Game logic, dice system, combat, carousel behavior, menu generation and page-to-page data sharing. |
| **Canvas API** | Drawing the scenery, the camp, the characters and the monsters. |
| **Web Storage (`localStorage`)** | Remembering the chosen class and world. |
| **GitHub Pages** | Hosting the game online. |

No frameworks, no build tools and no backend or database.

## Project structure

```
rpg-echoes-the-void/
├── index.html          # Home
├── regras.html         # Rules
├── personagem.html     # Character (class carousel)
├── mundos.html         # Worlds (world carousel)
├── jogar.html          # Play (the game)
├── css/
│   └── style.css       # Theme, layout, carousel and game styles
├── js/
│   ├── nav.js          # Builds the navigation menu on every page
│   ├── carrossel.js    # Carousel behavior
│   ├── personagem.js   # Saves the chosen class
│   ├── mundos.js       # Saves the chosen world and opens the game
│   ├── historia.js     # Game data: worlds, locations, monsters, bosses, events
│   ├── palco.js        # Draws the game scene on the canvas
│   └── jogo.js         # Game engine: dice, time, exploration and combat
└── img/                # World and class photos, character sprites, monsters
```

## Running locally

No build step is needed.

```bash
git clone https://github.com/FlavioMachaddo/rpg-echoes-the-void.git
cd rpg-echoes-the-void
```

Then open `index.html` in any modern browser.

## Customizing the game

The game was designed so that data, logic and drawing are separated:

| I want to... | Edit |
|---|---|
| Change boss or monster stats | `js/historia.js` |
| Add or change locations and events | `js/historia.js` |
| Make the whole game easier or harder | `DIVISOR` at the top of `js/jogo.js` |
| Change class stats and abilities | `CLASSES` in `js/jogo.js` (and the Character page) |
| Change the colors of the site | CSS variables at the top of `css/style.css` |
| Replace a monster image | The matching file in `img/monstros/` |

## Authors

- **Flávio Emanuel Gomes Machado**

Created as a Web Programming course project, for educational purposes.
