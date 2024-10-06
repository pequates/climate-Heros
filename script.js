let score = 0;
let wood = 0;
let metal = 0;
let water = 0;
let food = 0;
let energy = 100;
let experience = 0;
let level = 1;
let currentQuestionIndex = 0;
let currentTime = { day: 1, hour: 8 };
let currentWeather = "Sunny";
let reputation = 0;
let researchPoints = 0;
let npcs = [];
let quests = [];
let skills = { planting: 0, crafting: 0, trading: 0 };
let locations = ["Forest", "Mountains", "Lake", "River", "Village"];
let currentLocation = "Forest";
let inventory = [];

const questions = [
    {
        question: "Sources of Carbon Dioxide Emissions in Prehistory?",
        answers: ["Waste", "Volcanoes", "Burning of Coal"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "Actions to Reduce Carbon Dioxide Emissions?",
        answers: ["Limit coal burning", "Deforestation", "Increase cement production"],
        correct: 1,
        category: "Climate History"
    },
    {
        question: "Which Sources of Electricity Emit CO2?",
        answers: ["Wind Power Plants", "Hydropower Plants", "Coal-Fired Power Plants"],
        correct: 3,
        category: "Climate History"
    },
    {
        question: "Consequences of High CO2 Emissions?",
        answers: ["Reduced precipitation", "Global warming", "Increased biodiversity"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "When Did the Ice Age Begin?",
        answers: ["About 2.6 million years ago", "About 3.4 million years ago", "About 1.9 million years ago"],
        correct: 1,
        category: "Climate History"
    },
    {
        question: "What Happened During the Ice Age?",
        answers: ["Decrease in sea levels", "Increase in sea levels", "Increase in sea levels"],
        correct: 1,
        category: "Climate History"
    },
    {
        question: "Consequences of Glacier Surface Reduction?",
        answers: ["Increase in biodiversity", "Loss of habitats for many species", "Climate stability"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "What is an Interglacial Period?",
        answers: ["A cooler period between glaciations", "A warmer period between glaciations", "A period of stable temperature"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "What Happens During Interglacial Periods?",
        answers: ["Increase in temperature", "Decrease in sea levels", "Increase in ice cover"],
        correct: 1,
        category: "Climate History"
    },
    {
        question: "When Did the Medieval Climate Optimum Occur?",
        answers: ["Around 800-1300 AD", "Around 500-800 AD", "Around 1300-1500 AD"],
        correct: 1,
        category: "Climate History"
    },
    {
        question: "Main Climate Characteristics During the Medieval Climate Optimum?",
        answers: ["Cooling climate", "Higher than average temperatures", "Stable temperature"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "Changes in Biodiversity During the Medieval Climate Optimum?",
        answers: ["Extinction of many species", "Increase in the number of species", "Stabilization of ecosystems"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "Effects on Groundwater Levels During the Medieval Climate Optimum?",
        answers: ["Increase in groundwater levels", "Decrease in groundwater levels", "No changes"],
        correct: 1,
        category: "Climate History"
    },
    {
        question: "Effects of the Medieval Climate Optimum on Human Health?",
        answers: ["Increase in diseases", "Improvement in health due to better food conditions", "Stabilization of health"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "Significance of the Medieval Climate Optimum in Climate Change Research?",
        answers: ["Example of stable climate", "Example of changes in the ecosystem", "Both of the above"],
        correct: 3,
        category: "Climate History"
    },
    {
        question: "When Did the Little Ice Age Begin?",
        answers: ["1300", "1400", "1500"],
        correct: 1,
        category: "Climate History"
    },
    {
        question: "Main Effect of the Little Ice Age in Europe?",
        answers: ["Increase in temperatures", "Colder winters and cooler summers", "Heavy rains"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "Economic Consequences of the Little Ice Age?",
        answers: ["Increase in yields", "Agricultural crisis", "Industrial development"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "Main Source of Contemporary Global Warming?",
        answers: ["Volcanism", "Greenhouse gas emissions", "Natural changes"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "What Does the Term Global Warming Mean?",
        answers: ["Changes in local climate", "Increase in average temperatures on Earth", "Decrease in ice amounts in oceans"],
        correct: 2,
        category: "Climate History"
    },
    {
        question: "What Can We Do Individually to Help Combat Warming?",
        answers: ["Use disposable products", "Reduce energy and water consumption", "Ignore climate change"],
        correct: 2,
        category: "Climate History"
    },
];

document.getElementById("plantButton").addEventListener("click", plantTree);
document.getElementById("buildMachineButton").addEventListener("click", buildMachine);
document.getElementById("nextButton").addEventListener("click", loadQuestion);
document.getElementById("tradeButton").addEventListener("click", tradeWithNPC);
document.getElementById("exploreButton").addEventListener("click", exploreWorld);
document.getElementById("researchButton").addEventListener("click", conductResearch);
document.getElementById("openChestButton").addEventListener("click", openTreasureChest);
document.getElementById("playMiniGameButton").addEventListener("click", playMiniGame);

function startGame() {
    document.getElementById("storyArea").innerText = "Welcome to the game Climate Heroes. Your task is to save the planet.";
    loadNPCs();
    loadQuestion();
    updateWeather();
    updateTime();
    generateQuest();
    updateLocationImage();
}

function loadNPCs() {
    npcs = [
        { name: "Marek", dialog: "Hi! I need wood for construction. Help me, and you'll get a reward!", quests: [] },
        { name: "Zofia", dialog: "Hey! I'm collecting information about plants. Can you help me?", quests: [] },
        { name: "Tomek", dialog: "I'm looking for rare minerals; can you help me?", quests: [] },
    ];
}

function updateWeather() {
    const weatherConditions = ["Sunny", "Rainy", "Stormy"];
    currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    document.getElementById("weatherArea").innerText = `Weather: ${currentWeather}`;
}

function updateTime() {
    const timeString = `Day ${currentTime.day}, Hour ${currentTime.hour}:00`;
    document.getElementById("timeArea").innerText = timeString;
    currentTime.hour++;
    if (currentTime.hour >= 24) {
        currentTime.hour = 0;
        currentTime.day++;
        dailyEvent();
    }
}

function dailyEvent() {
    const eventChance = Math.random();
    if (eventChance < 0.3) {
        alert("A mysterious traveler has appeared today offering to trade resources!");
    } else if (eventChance < 0.6) {
        alert("Today is trading day! You can gain additional resources from NPCs.");
    } else {
        alert("Today is a calm day. You can focus on your tasks.");
    }
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        document.getElementById("questionArea").innerText = questionData.question;
        const answerOptions = document.getElementById("answerOptions");
        answerOptions.innerHTML = "";
        questionData.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerText = answer;
            button.onclick = () => checkAnswer(index);
            answerOptions.appendChild(button);
        });
    } else {
        alert("You have completed all the questions!");
    }
}

function checkAnswer(index) {
    const questionData = questions[currentQuestionIndex];
    if (index === questionData.correct) {
        alert("Correct answer!");
        score += 10;
        experience += 5;
        researchPoints++;
    } else {
        alert("Incorrect answer!");
        score -= 5;
    }
    currentQuestionIndex++;
    updateUI();
}

function updateUI() {
    document.getElementById("score").innerText = `Points: ${score}`;
    document.getElementById("resources").innerText = `Wood: ${wood}, Metal: ${metal}, Water: ${water}, Food: ${food}, Energy: ${energy}`;
    document.getElementById("experience").innerText = `Experience: ${experience}`;
    document.getElementById("level").innerText = `Level: ${level}`;
    document.getElementById("reputation").innerText = `Reputation: ${reputation}`;
    document.getElementById("researchPoints").innerText = `Research Points: ${researchPoints}`;
    document.getElementById("locationArea").innerText = `Location: ${currentLocation}`;
    updateLocationImage();
}

function changeLocation(location) {
    currentLocation = location;
    updateLocationImage();
    alert(`You have moved to ${currentLocation}.`);
    updateUI();
}

function updateLocationImage() {
    const locationImages = {
        "Forest": "las.png",
        "Mountains": "góry.png",
        "Lake": "jezioro.png",
        "River": "rzeka.png",
        "Village": "wioska.png"
    };
    const imgTag = document.getElementById("locationImage");
    imgTag.src = locationImages[currentLocation] || "images/default.jpg";
}

function plantTree() {
    if (energy >= 10) {
        energy -= 10;
        wood += 1;
        alert("You have planted a tree!");
        updateUI();
    } else {
        alert("You don't have enough energy!");
    }
}

function buildMachine() {
    if (energy >= 20 && wood >= 2) {
        energy -= 20;
        score -= 20;
        wood -= 2;
        alert("You have built a machine!");
        updateUI();
    } else {
        alert("You don't have enough resources!");
    }
}

function tradeWithNPC() {
    const randomNPC = npcs[Math.floor(Math.random() * npcs.length)];
    alert(randomNPC.dialog);
    // Possibility to trade with NPC
}

function exploreWorld() {
    if (currentLocation === "Forest") {
        const explorationOutcome = Math.random();
        if (explorationOutcome < 0.5) {
            wood += 3;
            researchPoints += 1;
            alert("You found extra wood and research points in the forest!");
        } else {
            alert("You didn't find anything interesting in the forest.");
        }
    } else if (currentLocation === "Mountains") {
        metal += 1;
        alert("You found rare minerals!");
    } else if (currentLocation === "Lake") {
        water += 1;
        alert("You found extra water!");
    } else if (currentLocation === "River") {
        food += 1;
        alert("You found fish in the river!");
    } else if (currentLocation === "Village") {
        alert("You met the villagers who can help!");
    }
}

function conductResearch() {
    if (researchPoints >= 5) {
        researchPoints -= 5;
        experience += 10;
        alert("You conducted research and gained experience!");
        updateUI();
    } else {
        alert("You don't have enough research points!");
    }
}

function openTreasureChest() {
    const rewards = Math.floor(Math.random() * 10) + 1;
    score += rewards;
    alert(`You opened the chest and gained ${rewards} points!`);
}

function generateQuest() {
    const questDescription = "Help an NPC gather 10 units of wood!";
    quests.push({ description: questDescription, completed: false });
    alert(`New quest: ${questDescription}`);
}

function playMiniGame() {
    alert("You played a mini-game!");
}

startGame();
