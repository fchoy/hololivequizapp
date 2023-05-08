const questions = [{
    question : "What is Amelia Watson's Pet Dog Called?",
    answers : [{text : "Yubi", correct : false}, {text : "Bubba", correct : true}, {text : "Tako", correct : false}, {text : "Ganmo", correct : false}],
    image : "/images/bubba.jpg"
},
{
    question : "Finish the quote : 'Ogey, ____'.",
    answers : [{text : "rrat", correct : true}, {text : "peko", correct : false}, {text : "bud", correct : false}, {text : "let's go", correct : false}],
    image : "/images/ogey.jpg"
},
{
    question : "What was the first thing Gura said on her debut stream?",
    answers : [{text : "'Sh*t...'", correct : false}, {text : "'Wait guys i'm lagging.'", correct : false}, {text : "'Heya guys, it's Gawr Gura!'", correct : false}, {text : "'a'", correct : true}],
    image : "/images/gura.jpg"
},
{
    question : "How many active hololive talents are there currently? (Not including retired talents)",
    answers : [{text : "60", correct : false}, {text : "75", correct : true}, {text : "52", correct : false}, {text : "46", correct : false}],
    image : "/images/hololivetalents.webp"
}
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const imageElement = document.getElementById("question-img");

let currentQuestionIndex = 0; //keeps track of which question we are currently at
let score = 0; //keeps track of score

//initiate quiz
const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    imageElement.style.display = "block"
    showQuestion(); 
}

//display question 
const showQuestion = () => {
    resetState();

    let currentQuestion = questions[currentQuestionIndex]; //get object at index of questions array
    let questionNo = currentQuestionIndex + 1; //question number starting at 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; //set text of h2 question element
    document.getElementById("question-img").src = currentQuestion.image; //change image for each question, referencing the current img tag

    //display answers by mapping through the current object's answers array and for each index, create a button that displays the answer
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button"); //create a button html element
        button.innerHTML = answer.text; //for each index, set the element's text equal to the text attribute of the answer's array
        button.classList.add("btn"); //assign class of 'btn' to the button
        answerButton.appendChild(button); //append newly created button to div
        
        if(answer.correct === true){ 
            button.dataset.correct = answer.correct; //add a custom "attribute" to the dataset of the element, in this case we add an attribute called "correct" to our button, whuch allows us to check if the button is the correct button or not later.
        }

        button.addEventListener("click", selectAnswer); //add event listener to all buttons 

    })
}

//function to remove placeholder buttons (I think a easier way is to just delete them from html initially)
const resetState = () => {
    nextButton.style.display = "none";
    while(answerButton.firstChild){ //while there are first child's left in our answer-buttons div
        answerButton.removeChild(answerButton.firstChild); //remove the first child 
    }
}

//function that handles on click event for all buttons
const selectAnswer = (e) => {
    const selectedButton = e.target; //selectedButton is the clicked target
    const isCorrect = selectedButton.dataset.correct === "true"; //if button's "correct" attribute is set to true, then isCorrect = true.
    
    if(isCorrect){ //if isCorrect is true add class "correct" to button for styling
        selectedButton.classList.add("correct");
        score++;
    }
    else{ //else add class "incorrect" to button 
        selectedButton.classList.add("incorrect");
    }

    //display correct answer if wrong answer is selected
    //create a new array full of references to all buttons in the answer-button div and iterate through them all to find the correct button, and disable the rest
    Array.from(answerButton.children).forEach((button) => {
        //if the button is the correct button
        if(button.dataset.correct === true){
            button.classList.add("correct"); //add class "correct" to button
        }
        //disable the button so we cannot click on another button
        button.disabled = true;
    });

    //show the "next" button on the screen as display : block 
    nextButton.style.display = "block";
}

//event listener for the next button
nextButton.addEventListener("click", () => {
    //if index is < 4, then we will handle the button click event
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        //else, we restart the quic
        startQuiz(); 
    }
});

const handleNextButton = () => {
    currentQuestionIndex++; //increment question index 
    if(currentQuestionIndex < questions.length){ //if we still have more questions to show
        showQuestion(); //call showQuestion()
    }
    else{
        //else display score
        showScore(); 
    }
}

//displays after the last question
const showScore = () => {
    while(answerButton.firstChild){ //remove all buttons from answer-buttons div
        answerButton.removeChild(answerButton.firstChild);
    }

    //hide image
    imageElement.style.display = "none";

    //change question text to score text
    questionElement.innerHTML = `You got ${score} out of ${questions.length} questions correct.`;

    //change next button text to "Play Again?"
    nextButton.innerHTML = "Play Again?";
}

startQuiz();