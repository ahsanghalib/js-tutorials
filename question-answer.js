class Question {
    constructor(question, answers, trueAnswer) {
        this.question = question;
        this.answers = answers;
        this.trueAnswer = trueAnswer;
    }

    displayQuestion() {
        console.log(this.question);
        this.answers.forEach((e, id) => {
            console.log(id, e);
        });
    }

    checkAnswer(ans, fn) {
        let score;
        if (ans === this.trueAnswer) {
            console.log('Correct Answer');
            score = fn(true);
        } else {
            console.log('Wrong Answer');
            score = fn(false);
        }

        this.displayScore(score);
    }

    displayScore(score) {
        console.log('Your current score is: ' + score);
        console.log('-----------------------------------');
    }

}

let score = 0;

function keepScore(correct) {
    if(correct) {
        score++;
    }
    return score;
}

function nextQuestion() {

    let q1 = new Question('Is  Javascript dynamically typed language? ',
        ['Yes', 'No'],
        0);

    let q2 = new Question('What is Typescript?  ',
        ['New Language', 'Superset of JS', 'Reference'],
        1);

    let q3 = new Question('Can we use ReactJS with Typescript and JS both ',
        ['Yes', 'No', 'All'],
        2);

    let questions = [q1, q2, q3];
    let randomNumber = Math.floor(Math.random() * (questions.length - 1));
    questions[randomNumber].displayQuestion();

    let ans = prompt("Enter your choice or enter exit to end.");

    if (ans !== 'exit') {
        questions[randomNumber].checkAnswer(parseInt(ans), keepScore);
        nextQuestion();
    }
}

nextQuestion();


