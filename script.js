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
function randomMultiplier() {

    const r = Math.random();
    let value;

    // 80 % -> entre 0.00 et 3.50
    if (r < 0.80) {

        value = Math.random() * 3.5;

    }

    // 12 % -> entre 3.51 et 4.99
    else if (r < 0.92) {

        value = 3.51 + Math.random() * 1.48;

    }

    // 8 % -> entre 5.00 et 10.00
    else {

        value = 5 + Math.random() * 5;

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
// Première valeur
// =========================

const first = randomMultiplier();

multiplier.textContent = first.toFixed(2)+"x";

addHistory(first);

updateStats(first);