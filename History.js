const game = document.querySelector("#game")
const submit = document.querySelector("submit")
const choice = document.querySelectorAll("button")
const startBtn = document.querySelector("#start")
const homePageBtn = document.querySelector('#homepage')
const modalText = document.querySelector('#modalText')

let scoreNum = document.querySelector("#score")
let question = document.querySelector("#question");
let score = 0
let yay = document.querySelector("#true")
let nay = document.querySelector("#false")
let questionIndex = 0
let resultDiv = document.querySelector(".answerDiv")
let questionsAnswered = 0;

homePageBtn.addEventListener('click', ()=>{
    document.location.href="index.html"
})
startBtn.addEventListener('click', startGame)

function startGame(){

 //shows all buttons and texts whilst hiding start button after user presses Let's Start button
    startBtn.classList.add('hide')
    homePageBtn.classList.add('hide')
    yay.classList.remove('hide')
    nay.classList.remove('hide')
    question.classList.remove('hide')
    
}

//Count questions up to last question as we answer and progress throughout the quiz
document.getElementById('count').innerHTML= 'Question ' + (++questionIndex) + ' \/ 14';

//API website to retrieve data such as questions/answers etc.
axios({
    method: "get",
    url: "https://opentdb.com/api.php?amount=14&category=23&difficulty=easy&type=boolean"
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

let random = Math.floor(Math.random() * 14);


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
        document.getElementById('count').innerHTML= 'Question ' + (questionIndex) + ' \/ 14';
    }else if (answer !== ans){
        resultDiv.innerText = 'Oopsie :('
        ques = response.data.results[questionIndex].question;
        question.innerText = ques
        ans = response.data.results[questionIndex].correct_answer
        questionIndex++
        document.getElementById('count').innerHTML= 'Question ' + (questionIndex) + ' \/ 14';
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
        document.getElementById('count').innerHTML= 'Question ' + (questionIndex) + ' \/ 14';

    }else if (answer !== ans){
        resultDiv.innerText = 'Oopsie :('
        ques = response.data.results[questionIndex].question;
        question.innerText = ques
        ans = response.data.results[questionIndex].correct_answer
        questionIndex++
        document.getElementById('count').innerHTML= 'Question ' + (questionIndex) + ' \/ 14';
    }
    questionsAnswered++;
    lastQuestion();
});

function lastQuestion() {
    if (questionsAnswered === questionsArray.length - 1 && score >= 8) {
        
        yay.classList.add('hide')
        nay.classList.add('hide')
        question.classList.add('hide')
        startBtn.classList.remove('hide')
        homePageBtn.classList.remove('hide')
        modal.classList.remove('hide')
        modalText.innerText= 'Congratulations, You passed!'
        startBtn.innerText = 'Restart'
        startBtn.addEventListener('click', () => {
            window.location.reload()
        })
    }else if(questionsAnswered === questionsArray.length - 1 && score <= 7) {
        yay.classList.add('hide')
        nay.classList.add('hide')
        question.classList.add('hide')
        startBtn.classList.remove('hide')
        homePageBtn.classList.remove('hide')
        modal.classList.remove('hide')
        modalText.innerText = 'Failed, Maybe in the next life.'
        startBtn.innerText = 'Restart'
        startBtn.addEventListener('click', () => {
            document.location.href="History.html";
        })
        }
    }

})
    


.catch((error) => {
console.error(error);
})

const modal = document.getElementById("myModal");
const span = document.querySelector(".close");

span.onclick = function() {
    console.log('click');
    modal.style.display = "none";
}
