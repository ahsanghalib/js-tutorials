/*****************
 *  Tip Calculator
 */

function lessThen(amount, percent) {
    this.amount = amount;
    this.percent = percent;
}

function greaterThen(amount, percent) {
    this.amount = amount;
    this.percent = percent;
}

function between(firstAmount, secondAmount, percent) {
    this.firstAmount = firstAmount;
    this.secondAmount = secondAmount;
    this.percent = percent;
}

function rules(lessThen, greaterThen, between) {
    this.lessThen = lessThen;
    this.between = between;
    this.greaterThen = greaterThen;
}

let defineRules = [
    new rules(
        new lessThen(50, 0.2),
        new greaterThen(200, 0.1),
        new between(50, 200, 0.15),
    ),

    new rules(
        new lessThen(100, 0.2),
        new greaterThen(300, 0.25),
        new between(100, 300, 0.10),
    ),

];

function calcTip(amount, rule) {
    let r = defineRules[rule];
    
    if(amount < r.lessThen.amount) {
        return amount * r.lessThen.percent;
    } 

    if(amount > r.greaterThen.amount) {
        return amount * r.greaterThen.percent;
    } 

    if(amount >= r.between.firstAmount && amount <= r.between.secondAmount) {
        return amount * r.between.percent;
    } 
}

function tipArray(billAmount, rule) {
    let tip = [];
    billAmount.forEach(element => {
        tip.push(parseFloat(calcTip(element, rule).toFixed(2)));
    });
    return tip;
}

function totalAmountArray(billAmount, tip) {
    let total = [];
    for(let i = 0; i < billAmount.length; i++) {
        total.push(billAmount[i] + tip[i]);
    }
    return total;
}

function average(arrayElement) {
    let total = 0;
    arrayElement.forEach(e => {
        total += e;
    });
    return parseFloat((total / arrayElement.length).toFixed(2));
}

function tipAndBill(name, billAmount, rule) {
    this.name = name;
    this.billAmount = billAmount;
    this.rule = rule;
    this.tip = tipArray(this.billAmount, this.rule);
    this.totalAmt = totalAmountArray(this.billAmount, this.tip); 
    this.avgTip = average(this.tip);
    this.avgBill = average(this.billAmount);
    this.avgTotal = average(this.totalAmt);
}

function displayInfo(obj) {

    let highAvg = {
        name: null,
        avg: 0
    };

    obj.forEach(e => {
        console.log(e.name.toUpperCase());
        console.log("Bills\tTips\tTotal Amount");
        for(let i = 0; i < e.billAmount.length; i++) {
            console.log(e.billAmount[i] + "\t" + e.tip[i] + "\t" + e.totalAmt[i]);
        }
        console.log("Averages:");
        console.log("Bill\tTip\tTotal");
        console.log(e.avgBill + "\t" + e.avgTip + "\t" + e.avgTotal);
        console.log("\n");

        if(highAvg.avg < e.avgTip) {
            highAvg.avg = e.avgTip;
            highAvg.name = e.name;
        }
    });

    console.log(`High Paid Tip is by ${highAvg.name.toUpperCase()} of ${highAvg.avg}`);
}


let obj = [
    new tipAndBill('John', [124, 48, 268, 180, 42],  0),
    new tipAndBill('Mark', [77, 375, 110, 45], 1),
];

displayInfo(obj);