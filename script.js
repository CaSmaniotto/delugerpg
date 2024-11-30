import { ZONES, TYPES_BG } from "./dex.js";
import { MINI_MAP } from "./map.js";
import { fetchPokemon } from "./api.js";

const PLAYER = document.getElementById('player');
const MAP_INFO = document.getElementById('map').getBoundingClientRect();
const TILE_SIZE = 16;

const UI = {
    name: document.getElementById('p_name'),
    cardInfo: document.querySelector('.card-info'),
    sprite: document.getElementById('pokemon-sprite'),
    card: document.querySelector('.pokemon-card'),
    level: document.getElementById('level'),
    types: document.querySelector('.types'),
    hp: document.getElementById('HP'),
    alert: document.querySelector('.alert'),
    message: document.getElementById('message'),
};

let playerPosition = { x: 15, y: 16 }; // Posição no mapa
let screenPosition = {
    x: MAP_INFO.width / 2.02,
    y: MAP_INFO.height / 1.98,
};

function initializePlayer() {
    PLAYER.style.left = `${screenPosition.x}px`;
    PLAYER.style.top = `${screenPosition.y}px`;
}

function movePlayer(deltaX, deltaY) {
    const { x, y } = playerPosition;
    const newX = x + deltaX;
    const newY = y + deltaY;

    if (
        newX >= 0 && newX < MINI_MAP[0].length &&
        newY >= 0 && newY < MINI_MAP.length &&
        MINI_MAP[newY][newX] !== 0
    ) {
        playerPosition = { x: newX, y: newY };
        screenPosition.x += deltaX * TILE_SIZE;
        screenPosition.y += deltaY * TILE_SIZE;

        PLAYER.style.left = `${screenPosition.x}px`;
        PLAYER.style.top = `${screenPosition.y}px`;

        triggerEncounter(MINI_MAP[newY][newX]);
    }
}

function setupKeyboardControls() {
    document.addEventListener('keydown', (event) => {
        if (event.repeat) return;

        switch (event.code) {
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

    document.getElementById('move_n').addEventListener('click', () => { // cima
        movePlayer(0, -1);
    });
    document.getElementById('move_nw').addEventListener('click', () => { // diagonal cima esq
        movePlayer(-1, -1);
    });
    document.getElementById('move_ne').addEventListener('click', () => { // diagonal cima dir
        movePlayer(1, -1);
    });
    document.getElementById('move_s').addEventListener('click', () => { // baixo
        movePlayer(0, 1);
    });
    document.getElementById('move_sw').addEventListener('click', () => { // diagonal baixo esq
        movePlayer(-1, 1);
    });
    document.getElementById('move_se').addEventListener('click', () => { // diagonal baixo dir
        movePlayer(1, 1);
    });
    document.getElementById('move_w').addEventListener('click', () => { // esq
        movePlayer(-1, 0);
    });
    document.getElementById('move_e').addEventListener('click', () => { // dir
        movePlayer(1, 0);
    });
}

async function triggerEncounter(zoneIndex) {
    const zone = ZONES[zoneIndex];
    let isEncountered = false;
    UI.cardInfo.style.backgroundColor = zone.bgColor;
    UI.types.innerHTML = "";

    if (zone.pokemons) {
        const rate = Math.random() * 100;
        for (let pokemon of zone.pokemons) {
            if (rate <= pokemon.rate) {
                await displayPokemon(pokemon, zone);
                isEncountered = true;
                break;
            }
        }
    }

    if (!isEncountered) {
        displayNoEncounterMessage();
    }
}

async function displayPokemon(pokemon, zone) {
    const data = await fetchPokemon(pokemon.name.toLowerCase());
    const randomVariation = Math.floor(Math.random() * (zone.variation * 2 + 1)) - zone.variation;
    const level = Math.max(zone.baseLevel - randomVariation, 1);

    UI.name.innerHTML = `<u>${pokemon.name}</u> appeared!`;
    UI.sprite.src = data.sprites.front_default;
    UI.level.textContent = `Level: ${level}`;
    UI.card.style.display = "flex";
    UI.alert.style.display = "none";

    const hpStat = data.stats.find(stat => stat.stat.name === "hp");
    UI.hp.textContent = `HP: ${hpStat.base_stat}`;

    UI.sprite.classList.add("shake");
    UI.sprite.addEventListener("animationend", () => {
        UI.sprite.classList.remove("shake");
    });

    for (let typeInfo of data.types) {
        const typeName = typeInfo.type.name;
        const span = document.createElement("span");
        span.classList.add("type");
        span.textContent = typeName.toUpperCase();

        const match = TYPES_BG.find(item => item.type === typeName);
        if (match) span.style.backgroundColor = match.color;

        UI.types.appendChild(span);
    }
}

function displayNoEncounterMessage() {
    UI.card.style.display = "none";
    UI.message.innerHTML = "Couldn't find anything. <br> Try moving to another spot.";
    UI.alert.style.display = "flex";
}

function start() {
    initializePlayer();
    setupKeyboardControls();
}

start();
