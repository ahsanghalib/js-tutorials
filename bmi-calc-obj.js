function bmiIndex(fullName, mass, height, bmi) {
    this.fullName = fullName;
    this.mass = mass;
    this.height = height;
    this.bmi = parseFloat(bmiCalc(this.mass, this.height).toFixed(2));
}

let list = [
    new bmiIndex('John', 90, 1.83),
    new bmiIndex('Mark', 75, 1.67),
    new bmiIndex('Mick', 105, 1.57),
    new bmiIndex('Mick 2', 105, 1.57),
    new bmiIndex('Chand', 100, 1.97),
];

let maxBmi = 0;
let maxList = [];

function bmiCalc(massBmi, heightBmi) {
    return massBmi / (heightBmi * heightBmi);
}


// calculated maxBmi here
list.forEach(e => {
    if(e.bmi > maxBmi) {
        maxBmi = e.bmi;
    }
});

// get the max entry using max Bmi for more then one max.
list.forEach(e => {
    if(e.bmi == maxBmi) {
        maxList.push(e);
    }
});

console.log(`Total Max BMI found: ${maxList.length} out of ${list.length}`);

for(let i = 0; i < maxList.length; i++) {
    console.log(`Full Name: ${maxList[i].fullName}  BMI: ${maxList[i].bmi}`);
}