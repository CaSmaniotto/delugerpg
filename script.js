import { ZONES, TYPES_BG } from "./dex.js";
import { MINI_MAP } from "./map.js";
import { fetchPokemon } from "./api.js";

const PLAYER = document.getElementById('player');
const MAP_INFO = document.getElementById('map').getBoundingClientRect();
const STEP = 16;

const P_NAME = document.getElementById('p_name');
const CARD_INFO = document.querySelector('.card-info');
const POKEMON_SPRITE = document.getElementById('pokemon-sprite');
const P_CARD = document.querySelector('.pokemon-card');
const P_LEVEL = document.getElementById('level');
const TYPES_LIST = document.querySelector('.types')

const ALERT = document.querySelector('.alert')
const MESSAGE = document.getElementById('message');


function start() {
    // Posição inicial do personagem na tela
    let posX = MAP_INFO.width / 2.02;
    let posY = MAP_INFO.height / 1.98;

    PLAYER.style.left = `${posX}px`;
    PLAYER.style.top = `${posY}px`;
    
    // Posição inicial do personagem no mapa
    let x = 15;
    let y = 16;

    // Função para mover o personagem
    function movePlayer(deltaX, deltaY) {
        let new_x = x + deltaX;
        let new_y = y + deltaY;

        if (
            new_x >= 0 && new_x < MINI_MAP.length &&  // Verifica linha válida
            new_y >= 0 && new_y < MINI_MAP.length && // Verifica coluna válida
            MINI_MAP[new_y][new_x] !== 0 // Verifica se o caminho é livre
        ) {
            posX += deltaX * STEP;
            posY += deltaY * STEP;

            PLAYER.style.left = `${posX}px`;
            PLAYER.style.top = `${posY}px`;

            x = new_x;
            y = new_y;

            let zone = MINI_MAP[new_y][new_x]
            encounter(zone)
        }
    }

    document.addEventListener('keydown', (event) => {
        if (event.repeat) return;

        switch (event.key) {
            case 'ArrowUp':
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                movePlayer(1, 0);
                break;
        }
    });
}

async function encounter(index) {
    const ZONA = ZONES[index];
    let detected = false;
    CARD_INFO.style.backgroundColor = ZONA.bgColor;
    TYPES_LIST.innerHTML = "";


    if (ZONA.pokemons) {
        let RATE = Math.floor(Math.random() * 100);
        //console.log(RATE);
        for (let pokemon of ZONA.pokemons) {
            if (pokemon.rate >= RATE) {
                const data = await fetchPokemon(pokemon.name.toLowerCase());
                let variation = ZONA.variation
                const randomVariation = Math.floor(Math.random() * (variation * 2 + 1)) - variation;
                let level = ZONA.baseLevel - randomVariation

                P_NAME.innerHTML = "<u> " + pokemon.name + " </u> Appeared!";
                POKEMON_SPRITE.src = data["sprites"].front_default;
                P_LEVEL.innerHTML = "Level: "+level

                P_CARD.style.display = "flex";

                ALERT.style.display = "none";


                for (let type of data["types"]) {
                    let typeName = type["type"].name
                    const span = document.createElement("span");
                    span.classList.add("type");
                    span.textContent = typeName.toUpperCase();

                    TYPES_LIST.appendChild(span);

                    const match = TYPES_BG.find(item => item.type === typeName);
                    span.style.backgroundColor = match.color
                }
                detected = true;
                break;
            }
        }
    }

    if (!detected) {
        P_CARD.style.display = "none"
        MESSAGE.innerHTML = "Couldn't find anything. <br> Try moving to another spot.";
        ALERT.style.display = "flex";
    }
}

start()