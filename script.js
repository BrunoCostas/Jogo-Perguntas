const questions = [
    {
        question: "Qual a capital da França?",
        answers: [
            {text: "Paris", correct: true},
            {text: "Londres", correct: false},
            {text: "Berlim", correct: false},
            {text: "Madrid", correct: false},
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
            {text: "Girrafa", correct: "false"},
            {text: "Baleia Azul", correct: "true"},
            {text: "Hipopótamo", correct: "flase"},
        ]
    },
    {
        question: "Qual o simbolo químico do Ouro?",
        answers: [
            {text: "Go", correct: "false"},
            {text: "Au", correct: "true"},
            {text: "Ag", correct: "false"},
            {text: "Ge", correct: "flase"},
        ]
    },
    {
        question: "Qual o idioma oficial da Coreia do Sul?",
        answers: [
            {text: "Japonês", correct: "false"},
            {text: "Chinês", correct: "false"},
            {text: "Inglês", correct: "false"},
            {text: "Coreano", correct: "true"},
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
