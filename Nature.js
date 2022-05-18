const game = document.querySelector("#game")
const submit = document.querySelector("submit")
const choice = document.querySelectorAll("button")
const startBtn = document.querySelector("#start")
const homePageBtn = document.querySelector("#homepage")
let scoreNum = document.querySelector("#score")
let question = document.querySelector("#question");
let score = 0
let yay = document.querySelector("#true")
let nay = document.querySelector("#false")
let questionIndex = 0
let resultDiv = document.querySelector(".answerDiv")
let questionsAnswered = 0;


startBtn.addEventListener('click', startGame)

function startGame(){

 //shows all buttons and texts whilst hiding start button after user presses Let's Start button
    startBtn.classList.add('hide')
    yay.classList.remove('hide')
    nay.classList.remove('hide')
    question.classList.remove('hide')
    homePageBtn.classList.add('hide')
}

//Count questions up to last question as we answer and progress throughout the quiz
document.getElementById('count').innerHTML= 'Question ' + (++questionIndex) + ' \/ 11';

//API website to retrieve data such as questions/answers etc.
axios({
    method: "get",
    url: "https://opentdb.com/api.php?amount=11&category=17&difficulty=easy&type=boolean"
})
.then((response) => {
 console.log(response)

// array of questions in indexes
let resp = response.data.results;
let questionsArray = [];

resp.forEach(element => {
    let questions = element.question;
    questionsArray.push(questions);
});
console.log(questionsArray);

let random = Math.floor(Math.random() * 11);


let ques = questionsArray[random]
console.log(questionsArray);
question.innerText = ques
console.log(ques)

let ans = response.data.results[questionIndex].correct_answer




yay.addEventListener('click', () => {
    // lastQuestion();
    console.log(ans);
    let answer = "True";
    if(answer === ans){
        resultDiv.innerText = 'You got it right!'
        score++
        scoreNum.innerText = score;
        ques = response.data.results[questionIndex].question;
        question.innerText = ques
        ans = response.data.results[questionIndex].correct_answer
        questionIndex++
        document.getElementById('count').innerHTML= 'Question ' + (questionIndex) + ' \/ 11';
    }else if (answer !== ans){
        resultDiv.innerText = 'Oopsie :('
        ques = response.data.results[questionIndex].question;
        question.innerText = ques
        ans = response.data.results[questionIndex].correct_answer
        questionIndex++
        document.getElementById('count').innerHTML= 'Question ' + (questionIndex) + ' \/ 11';
       }
       questionsAnswered++;
       lastQuestion();
    })
    nay.addEventListener('click', () => {
    let answer = "False";
    // lastQuestion();
    if(answer === ans){
        resultDiv.innerText = 'You got it right!'
        score++
        scoreNum.innerText = score;
        ques = response.data.results[questionIndex].question;
        question.innerText = ques
        ans = response.data.results[questionIndex].correct_answer
        questionIndex++
        document.getElementById('count').innerHTML= 'Question ' + (questionIndex) + ' \/ 11';

    }else if (answer !== ans){
        resultDiv.innerText = 'Oopsie :('
        ques = response.data.results[questionIndex].question;
        question.innerText = ques
        ans = response.data.results[questionIndex].correct_answer
        questionIndex++
        document.getElementById('count').innerHTML= 'Question ' + (questionIndex) + ' \/ 11';
    }
    questionsAnswered++;
    lastQuestion();
});

function lastQuestion() {
    if (questionsAnswered === questionsArray.length - 1 && score >= 6) {
        
        yay.classList.add('hide')
        nay.classList.add('hide')
        question.classList.add('hide')
        startBtn.classList.remove('hide')
        homePageBtn.classList.remove('hide')
        startBtn.innerText = 'Restart'
        alert("You passed!");
        startBtn.addEventListener('click', () => {
            window.location.reload()
        })
    }else if(questionsAnswered === questionsArray.length - 1 && score <= 5) {
        alert("Maybe in the next life");
        yay.classList.add('hide')
        nay.classList.add('hide')
        question.classList.add('hide')
        homePageBtn.classList.remove('hide')
        startBtn.classList.remove('hide')
        startBtn.innerText = 'Restart'
        startBtn.addEventListener('click', () => {
            window.location.reload()
        })
        }
    }

})
    


.catch((error) => {
console.error(error);
})