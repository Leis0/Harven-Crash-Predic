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

// ===============================
// Cycle de 100 générations
// ===============================

let cycle = [];

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

    const r = Math.random();

    let value;

    // détecte les petits multiplicateurs
    const temp = Math.random();

    if (temp < 0.7) {
        value = 1 + Math.random() * 1.5; // 1.00 - 2.5
    } else {
        value = 2.5 + Math.random() * 7.5; // 2.5 - 10
    }

    value = Number(value.toFixed(2));

    // gestion du streak
    if (value < 2) {
        lowStreak++;
    } else {
        lowStreak = 0;
    }

    // après 4 faibles résultats consécutifs
    if (lowStreak >= 4) {

        const boost = Math.random();

        if (boost < 0.7) {
            value = 2 + Math.random() * 3; // 2 - 5
        } else {
            value = 6 + Math.random() * 4; // 6 - 10
        }

        value = Number(value.toFixed(2));

        lowStreak = 0; // reset cycle
    }

    return value;
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
