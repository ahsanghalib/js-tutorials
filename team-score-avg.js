/////////////////////////////////
// Challenge No. 2
/////////////////////////////////


/**
This is like constructor function.
 */
function teamWithScore(name, score) {
    this.name = name;
    this.score = score;
}

const teams = [
    new teamWithScore('John Team', [120, 120, 103]), 
    new teamWithScore('Mark Team', [116, 94, 123]),
    new teamWithScore('Mike Team', [97, 134, 105]),
];

let winner = {
    name: null,
    avgScore: 0,
};

let highScore = {
    name: null,
    matchNo: 0,
    score: 0,
}

function avgOfArray(arrayElement) {
    var total = 0;
    arrayElement.forEach(element => {
        total += element;
    });
    return total / arrayElement.length;
}


teams.forEach(element => {
    let average = avgOfArray(element.score);
    console.log("Team Name: " + element.name + " \nAverage Score: " + Math.round(average) + " Scores: " + element.score);
    
    if(average > winner.avgScore) {
        winner.name = element.name;
        winner.avgScore = average;
    }

    for(let i = 0; i < element.score.length; i++) {
        if(element.score[i] > highScore.score) {
            highScore.score = element.score[i];
            highScore.name = element.name;
            highScore.matchNo = i + 1;
        }
    }
});

console.log("\nWinner is " + winner.name.toUpperCase() + 
            " with Average Score of " + Math.round(winner.avgScore));

console.log("Highest Score "+ highScore.score +" is by " + highScore.name.toUpperCase() + " in Match No. " + highScore.matchNo);