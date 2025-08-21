const questions = [
    {
        question:"Which feature of Java makes it possible to run a Java program on different platforms?",
        answers:[
            { text:"Object-oriented" ,correct:false},
            { text:"Platform-Independent" ,correct:true},
            { text:"Syntax" ,correct:false},
            { text:"Memory Management" ,correct:false},
        ]
    },
    {
         question:"Which data type would be best for storing a person's age in Java?",
        answers:[
            { text:"int" ,correct:false},
            { text:"double" ,correct:false},
            { text:"long" ,correct:false},
            { text:"byte" ,correct:true},
        ]
    }, 
    {
        question :"What is the default value of a boolean variable in Java?",
        answers:[
            { text:"true" ,correct:false},
            { text:"false" ,correct:true},
            { text:"0" ,correct:false},
            { text:"null" ,correct:false},
        ]
    },
    {
         question:"Which keyword is used to define a constant variable in Java?",
        answers:[
            { text:"final" ,correct:true},
            { text:"static" ,correct:false},
            { text:"const" ,correct:false},
            { text:"immutable" ,correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
        const selectedBtn=e.target;
        const isCorrect=selectedBtn.dataset.correct==="true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button=>{
            if(button.dataset.correct==="true"){
                button.classList.add("correct");
            }
            button.disabled=true;
        });
        nextButton.style.display="block";
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

startQuiz();
