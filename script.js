import { ZONES } from "./dex.js";
import { MINI_MAP } from "./map.js";
import { fetchPokemon } from "./api.js";

const PLAYER = document.getElementById('player');
const MAP_INFO = document.getElementById('map').getBoundingClientRect();
const STEP = 16;
const POKE_INFO = document.getElementById('poke-info');
const CARD_INFO = document.querySelector('.card-info');
const POKEMON_SPRITE = document.getElementById('pokemon-sprite');
const ball = document.getElementById('ball-sprite')

let currentIndex = 0;

const sprites = [
    'spr1.png',
    'spr2.png',
    'spr3.png',
];

function changeSprite(i) {
    currentIndex = (currentIndex + i + sprites.length) % sprites.length;
    PLAYER.src = 'assets/player_sprites/' + sprites[currentIndex];
};


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
    const ZONA = ZONES[index]
    let detected = false;
    CARD_INFO.style.backgroundColor = ZONA.bgColor


    if (ZONA.pokemons) {
        let RATE = Math.floor(Math.random() * 100);
        //console.log(RATE);
        for (let pokemon of ZONA.pokemons) {
            if (pokemon.rate >= RATE) {
                let poke_name = pokemon.name;
                POKE_INFO.innerHTML = "<u> " + poke_name + " </u> Appeared!";
                const data = await fetchPokemon(poke_name.toLowerCase());
                POKEMON_SPRITE.src = data["sprites"].front_default;
                ball.style.visibility = "visible";
                detected = true;
                break;
            }
        }
    }

    if (!detected) {
        POKE_INFO.innerHTML = "Couldn't find anything.<br>Try moving to another spot.";
        POKEMON_SPRITE.src = ""
        ball.style.visibility = "hidden";
    }
}

start()