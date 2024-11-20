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
        baseLevel: 5,
        variation: 2,
        bgColor: "#b7ffc7"
    },
    3: { // Água
        pokemons: [
            { name: "Poliwag", rate: 15 },
            { name: "Magikarp", rate: 40 },
            { name: "Psyduck", rate: 50 },
            { name: "Tentacool", rate: 60}
        ],
        baseLevel: 5,
        variation: 3,
        bgColor: "#c2efff"
    }
}

export const TYPES_BG = [
    { type: "normal", color: "#a6a48a"},
    { type: "fire", color: "#e78747"},
    { type: "water", color: "#6d94e6"},
    { type: "eletric", color: "#f5d230"},
    { type: "grass", color: "#79c95c"},
    { type: "ice", color: "#9adbd3"},
    { type: "fighting", color: "#c73531"},
    { type: "poison", color: "#95309a"},
    { type: "ground", color: "#ddc176"},
    { type: "flying", color: "#a695e3"},
    { type: "psychic", color: "#e67698"},
    { type: "bug", color: "#a8bd1f"},
    { type: "rock", color: "#b9a33f"},
    { type: "ghost", color: "#735e95"},
    { type: "dragon", color: "#7856df"},
    { type: "dark", color: "#716353"},
    { type: "steel", color: "#b9bace"},
    { type: "fairy", color: "#e14a6b"},
]