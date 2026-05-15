let fitnessData = JSON.parse(localStorage.getItem("fitnessData")) || {
    steps: 0,
    calories: 0,
    workout: 0,
    history: []
};

function updateDashboard() {
    document.getElementById("stepsDisplay").innerText = fitnessData.steps;
    document.getElementById("caloriesDisplay").innerText = fitnessData.calories;
    document.getElementById("workoutDisplay").innerText = fitnessData.workout + " mins";

    document.getElementById("stepsProgress").style.width = Math.min((fitnessData.steps / 10000) * 100, 100) + "%";
    document.getElementById("caloriesProgress").style.width = Math.min((fitnessData.calories / 500) * 100, 100) + "%";
    document.getElementById("workoutProgress").style.width = Math.min((fitnessData.workout / 60) * 100, 100) + "%";

    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    fitnessData.history.forEach(function(item){
        let li = document.createElement("li");
        li.innerText = item;
        historyList.appendChild(li);
    });
}

function saveData() {
    let steps = Number(document.getElementById("stepsInput").value);
    let calories = Number(document.getElementById("caloriesInput").value);
    let workout = Number(document.getElementById("workoutInput").value);

    if(steps === 0 && calories === 0 && workout === 0){
        alert("Please enter fitness data");
        return;
    }

    fitnessData.steps += steps;
    fitnessData.calories += calories;
    fitnessData.workout += workout;

    let date = new Date().toLocaleDateString();

    fitnessData.history.push(
        date + " - Steps: " + steps + ", Calories: " + calories + ", Workout: " + workout + " mins"
    );

    localStorage.setItem("fitnessData", JSON.stringify(fitnessData));

    document.getElementById("stepsInput").value = "";
    document.getElementById("caloriesInput").value = "";
    document.getElementById("workoutInput").value = "";

    updateDashboard();
}

function resetData() {
    fitnessData = {
        steps: 0,
        calories: 0,
        workout: 0,
        history: []
    };

    localStorage.setItem("fitnessData", JSON.stringify(fitnessData));
    updateDashboard();
}

document.getElementById("saveBtn").addEventListener("click", saveData);
document.getElementById("resetBtn").addEventListener("click", resetData);

updateDashboard();