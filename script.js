const questions = [
    {
        question: "Qual é o menor país do mundo?",
        answers: [
            { text: "Mônaco", correct: false },
            { text: "Vaticano", correct: true },
            { text: "Nauru", correct: false },
            { text: "San Marino", correct: false }
        ]
    },
    {
        question: "Qual planeta é conhecido como Planeta Vermelho?",
        answers: [
            {text: "Terra", correct: "false"},
            {text: "Vênus", correct: "false"},
            {text: "Jupiter", correct: "flase"},
            {text: "Marte", correct: "true"},
        ]
    },
    {
        question: "Qual o maior mamífero do mundo?",
        answers: [
            {text: "Elefante", correct: "false"},
            {text: "Girafa", correct: "false"},
            {text: "Baleia Azul", correct: "true"},
            {text: "Hipopótamo", correct: "flase"},
        ]
    },
    {
        question: "Qual o maior deserto do mundo?",
        answers: [
            {text: "Tundra do Ártico", correct: "false"},
            {text: "Deserto da Antártida", correct: "true"},
            {text: "Deserto do Saara", correct: "false"},
            {text: "Deserto Australiano", correct: "flase"},
        ]
    },
    {
        question: "Qual é a capital do Japão?",
        answers: [
            { text: "Seul", correct: false },
            { text: "Tóquio", correct: true },
            { text: "Pequim", correct: false },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "Em que ano o homem pisou na Lua pela primeira vez?",
        answers: [
            { text: "1965", correct: false },
            { text: "1969", correct: true },
            { text: "1971", correct: false },
            { text: "1975", correct: false }
        ]
    },
    {
        question: "Qual é o maior oceano do mundo?",
        answers: [
            { text: "Oceano Atlântico", correct: false },
            { text: "Oceano Índico", correct: false },
            { text: "Oceano Pacífico", correct: true },
            { text: "Oceano Ártico", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próximo";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
