export const ZONES = {
    1: { // Planície
        bgColor: "#C9FF9F"
    },
    2: { // Grama Alta
        pokemons: [
            { name: "Pidgey", rate: 20 },
            { name: "Rattata", rate: 40 },
            { name: "Spearow", rate: 50}
        ],
        baseLevel: 4,
        variation: 2,
        bgColor: "#b7ffc7"
    },
    3: { // Água
        pokemons: [
            { name: "Poliwag", rate: 20 },
            { name: "Magikarp", rate: 50 },
            { name: "Psyduck", rate: 60 }
        ],
        baseLevel: 2,
        variation: 3,
        bgColor: "#c2efff"
    }
}