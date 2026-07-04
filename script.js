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
// Cycle de 10 générations
// ===============================

let cycle = [];

function createCycle() {

    cycle = [
        "low",
        "low",
        "low",
        "low",

        "two",
        "two",
        "two",

        "mid",
        "mid",

        "high"
    ];

    // Mélange du tableau (Fisher-Yates)
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

        // 0.00 à 1.99
        case "low":
            value = Math.random() * 1.99;
            break;

        // 2.00 à 2.99
        case "two":
            value = 2 + Math.random() * 0.99;
            break;

        // 3.00 à 4.99
        case "mid":
            value = 3 + Math.random() * 1.99;
            break;

        // 5.00 à 10.00
        case "high":
            value = 5 + Math.random() * 5;
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

    if(value < 10){

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
