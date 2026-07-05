// =========================
// Crash Simulator
// Simulation uniquement
// =========================

const multiplier = document.getElementById("multiplier");
const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");

const history = document.getElementById("history");

const average = document.getElementById("average");
const highest = document.getElementById("highest");
const count = document.getElementById("count");

let values = [];
let maxValue = 0;

function getValueFromColor(color) {

    if (color === "red") {
        return 1.00 + Math.random() * 1.49; // 1.00 - 2.49
    }

    if (color === "orange") {
        return 2.50 + Math.random() * 1.49; // 2.50 - 3.99
    }

    if (color === "yellow") {
        return 4.00 + Math.random() * 1.99; // 4.00 - 5.99
    }

    if (color === "green") {
        return 6.00 + Math.random() * 1.99; // 6.00 - 7.99
    }

    if (color === "purple") {
        return 8.00 + Math.random() * 2.00; // 8.00 - 10.00
    }

    return 1.00;
}

// ===============================
// Cycle de 100 générations
// ===============================

let cycle = ["red","red","red","red",
    "yellow","yellow",
    "red",
    "orange","orange","orange",
    "red","orange","red","red",
    "orange","orange",
    "purple",
    "red","red","red","red","red"];

function createCycle() {

    cycle = [];

    // 70 %
    for (let i = 0; i < 70; i++) {
        cycle.push("low");
    }

    // 20 %
    for (let i = 0; i < 20; i++) {
        cycle.push("medium");
    }

    // 7 %
    for (let i = 0; i < 7; i++) {
        cycle.push("high");
    }

    // 3 %
    for (let i = 0; i < 3; i++) {
        cycle.push("veryHigh");
    }

    // Mélange Fisher-Yates
    for (let i = cycle.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [cycle[i], cycle[j]] = [cycle[j], cycle[i]];
    }
}

createCycle();

let lowStreak = 0;

function randomMultiplier() {

    if (cycle.length === 0) {
        // si cycle fini → regen simple
        return 1.00 + Math.random() * 9.00;
    }

    const color = cycle.shift();
    const value = getValueFromColor(color);

    return Number(value.toFixed(2));
}
// =========================
// Animation compteur
// =========================

function animateValue(target){

    let start = 1;

    const duration = 1200;

    const increment = target / 80;

    multiplier.style.color="#00ff84";
    multiplier.style.textShadow="0 0 20px #00ff84";

    const timer = setInterval(()=>{

        start += increment;

        if(start >= target){

            start = target;

            clearInterval(timer);

        }

        multiplier.textContent = start.toFixed(2)+"x";

    },duration/80);

}

// =========================
// Couleur historique
// =========================

function getColor(value){

    if (value < 2.5) {
        return "red";      // petits multiplicateurs (très fréquents)
    }

    if (value < 4) {
        return "orange";   // moyens
    }

    if (value < 6) {
        return "yellow";   // bons gains

    }

    if (value < 8) {
        return "green";    // gros gains rares
    }

    return "purple";       // très grosses valeurs (très rares)
}

// =========================
// Historique
// =========================

function addHistory(value){

    const div = document.createElement("div");

    div.className = getColor(value);

    div.textContent = value.toFixed(2)+"x";

    history.prepend(div);

    while(history.children.length>20){

        history.removeChild(history.lastChild);

    }

}

// =========================
// Statistiques
// =========================

function updateStats(value){

    values.push(value);

    if(value>maxValue){

        maxValue=value;

    }

    const sum = values.reduce((a,b)=>a+b,0);

    const avg = sum/values.length;

    average.textContent = avg.toFixed(2)+"x";

    highest.textContent = maxValue.toFixed(2)+"x";

    count.textContent = values.length;

}

// =========================
// Génération
// =========================

generateBtn.addEventListener("click",()=>{

    generateBtn.disabled=true;

    loading.classList.remove("hidden");

    multiplier.textContent="...";

    setTimeout(()=>{

        const value = randomMultiplier();

        animateValue(value);

        addHistory(value);

        updateStats(value);

        loading.classList.add("hidden");

        generateBtn.disabled=false;

    },1800);

});

// =========================
// État initial
// =========================

multiplier.textContent = "0.00x";

average.textContent = "0.00x";
highest.textContent = "0.00x";
count.textContent = "0";
