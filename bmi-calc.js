/////////////////////////////////
// Challenge No. 1
// Calculating BMI
/////////////////////////////////

 var johnMass = 90;
 var johnHeigth = 1.83;
 var markMass = 75;
 var markHeigth = 1.67;

 var johnBMI = johnMass / (johnHeigth * johnHeigth);
 var markBMI = markMass / (markHeigth * markHeigth);

 var bmi = markBMI > johnBMI;

 console.log("Is Mark's BMI heigher than John's? " + bmi);