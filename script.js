/*
let grades = {}
let select_input = null

window.addEventListener('load', () => {
    //le code a executer lorque l'evenement load est mis
    console.log('The page has fully loaded');
    select_input = document.getElementsByTagName("select")



    getGrade(select_input)
    attachedAListenerToSelect(select_input)
    calculateAverage()
});



function getGrade() {
    for (let input of select_input) {
        grades[input.id] = parseFloat(input.value)
    }
    console.log(grades)
}



function attachedAListenerToSelect() {

    for (let input of select_input) {
        input.addEventListener('change', getGrade)
    }
}

let total = 0;
let arrayGrades = [
    grades["grade_math_1"],
    grades["grade_math_2"],
    grades["grade_math_3"],
    grades["grade_eng_1"],
    grades["grade_eng_2"],
    grades["grade_eng_3"],
    grades["grade_eng_4"],
    grades["grade_eng_5"]
]
function calculateAverage (gradesArray) {
    let sum = 0
    let divider = 0

    for (let i = 0; i < gradesArray.length; i++) {
        if (isNaN(gradesArray[i])) {
            sum = sum + gradesArray[i]
            divider++
        }

    }
    console.log(sum / divider)
    return sum / divider
}



function calculateAverage (gradesArray){
    let sum = 0;
    let div = 0;

    let arrayConstitutionBE = [
        grades["grade_math_1"],
        grades["grade_math_2"],
        grades["grade_math_3"],
        grades["grade_eng_1"],
        grades["grade_eng_2"],
        grades["grade_eng_3"],
        grades["grade_eng_4"],
        grades["grade_eng_5"]
    ]


    for (let i = 0; i < averageBE.length; i++) {
        if (isNaN(i)) averageBE = 0;
    }

    averageBE = sum / div;


}
*/



// variable globale
let grades = {}
let baseKnowledges = []
let ecgKnowledge = []
let modulesICT = []
let weightICT =[]
let averageGeneral = []
let weightGeneral = []


// ecouter un evenement
window.addEventListener('load', () => {
// le code a executer lorsque l'evenement load est mis
    if (localStorage.getItem("saveGrades") === null) {
        getGradesValuesFromHTML()
    } else {
        grades = JSON.parse(localStorage.getItem("saveGrades"))
        updateGradesWhenTheyAlreadyInLocalStorage()
    }
    arrayConstitution()
    registerChangeEventsListenerOnInputs()
})

// function pour mettre a jours les inputs dans l'HTML
function updateGradesWhenTheyAlreadyInLocalStorage () {
    for (let updateGrades in grades) {
        document.getElementById(updateGrades).value = grades[updateGrades] ?? "Note"
    }
}
// function pour les valeurs recuperer depuis l'HTML
function getGradesValuesFromHTML() {
    let inputs = document.getElementsByTagName('select')
    for (let input of inputs) {
        grades[input.id] = parseFloat(input.value)
    }
    arrayConstitution()
    localStorage.setItem("saveGrades", JSON.stringify(grades))

}

// function pour changer les ecouteurs d'evenement en select
function registerChangeEventsListenerOnInputs() {
    let selects = document.getElementsByTagName('select')
    for (let select of selects) {
        select.addEventListener('change', getGradesValuesFromHTML)
    }
}

// function pour calculer la moyenne
function calculateAverage (gradesArray) {

    let sum = 0
    let divider = 0

    for (let i = 0; i < gradesArray.length; i++) {
        if (!isNaN(gradesArray[i]) ? gradesArray[i] !== null : false) {
            sum = sum + gradesArray[i]
            divider++
        }

    }

    return sum / divider
}


// function pour la moyenne des ponderation
function weightedAverage(gradesArray, weightArray) {
    let sum = 0
    let divider = 0

    for (let i = 0; i < gradesArray.length; i++) {
        if (!isNaN(gradesArray[i]) ? gradesArray[i] !== null : false) {
            sum += (gradesArray[i] * weightArray[i])
            divider+= weightArray[i]
        }
    }

    return sum / divider
}


// function pour les arrondis
function roundNumber(number, multiple) {
    return (Math.round(number / multiple) * multiple)
}


// tableau de mes notes
function arrayConstitution() {
    baseKnowledges = [
        grades["grade_math_1"],
        grades["grade_math_2"],
        grades["grade_math_3"],
        grades["grade_eng_1"],
        grades["grade_eng_2"],
        grades["grade_eng_3"],
        grades["grade_eng_4"],
        grades["grade_eng_5"],
    ]
    let baseKnowledgeAvg = roundNumber(calculateAverage(baseKnowledges), 0.5)

    ecgKnowledge = [
        grades["grade_1"],
        grades["grade_2"],
        grades["grade_3"],
        grades["grade_4"],
        grades["grade_5"],
        grades["grade_6"],
        grades["grade_7"],
        grades["grade_8"],
    ]
    let ecgKnowledgeAvg = roundNumber(calculateAverage(ecgKnowledge), 0.5)

    modulesICT = [
        grades["grade_mod_epsic"],
        grades["grade_mod_cie"],
    ]
    weightICT = [80, 20]

    let modulesICTAvg = roundNumber(weightedAverage(modulesICT, weightICT), 0.1)


    averageGeneral = [
        baseKnowledgeAvg,
        ecgKnowledgeAvg,
        modulesICTAvg,
        grades["averageTPI"],
    ]
    weightGeneral = [10, 20, 30, 40]

    let averageCFC = roundNumber(weightedAverage(averageGeneral, weightGeneral), 0.1)

    function displayAlertFailOrSuccess () {
        let result;
        if (averageCFC >= 4) {
            result = 'success';
        } else {
            result = 'fail';
        }
        return result;
    }


    displayAverageOnHTML(
        baseKnowledgeAvg,
        ecgKnowledgeAvg,
        modulesICTAvg,
        averageCFC,
        displayAlertFailOrSuccess())

}

function onlyIfNumber(number) {
    if (number === null || isNaN(number) || number === undefined) {
        return "-"
    } else {
        return number.toFixed(1)

    }
}


// function pour afficher mes moyennes generales
function displayAverageOnHTML (baseKnowledgeAvg, ecgKnowledgeAvg, modulesICTAvg, averageCFC, displayAlertFailOrSuccess) {
    document.getElementById("averageCBE").innerText = onlyIfNumber(baseKnowledgeAvg)
    document.getElementById("averageCG").innerText = onlyIfNumber(ecgKnowledgeAvg)
    document.getElementById("averageCI").innerText = onlyIfNumber(modulesICTAvg)
    document.getElementById("CFC").innerText = onlyIfNumber(averageCFC)
    document.getElementById("alert").innerText = displayAlertFailOrSuccess
}






