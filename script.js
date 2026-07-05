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

// =========================
// Génération aléatoire
// =========================

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

function randomMultiplier() {

    if (cycle.length === 0) {
        createCycle();
    }

    const type = cycle.pop();

    let value;

    switch (type) {

        // 70 % : 1.00 -> 1.99
        case "low":
            value = 1 + Math.random() * 0.99;
            break;

        // 20 % : 2.00 -> 3.00
        case "medium":
            value = 2 + Math.random();
            break;

        // 7 % : 3.00 -> 5.00
        case "high":
            value = 3 + Math.random() * 2;
            break;

        // 3 % : 5.10 -> 6.00
        case "veryHigh":
            value = 5.10 + Math.random() * 0.90;
            break;
    }

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

    if(value < 2){
        return "red";
    }

    if(value < 5.1){
        return "orange";
    }

    return "green";
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
