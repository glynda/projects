// Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
//m tall.

//BMI = mass / height ** 2 = mass / (height * height) (mass in kg
//and height in meter).
const markHigherBMI = true;
const markweight = 78;
const markheight = 1.69;

const johnweight = 92;
const johnheight = 1.95;

const markBMI = (markweight / markheight ** 2 / markheight) * markheight;

const johnBMI = (johnweight / johnheight ** 2 / johnheight) * johnheight;
console.log(markBMI);
console.log(johnBMI);
const answer =
  markBMI > johnBMI ? `Marks Higher than John` : `Marks less than John`;
console.log(` Mark = ${markBMI} , John = ${johnBMI} ${answer} `);

const nowyear = 2024;
const birthyear = 2000;
const age = () => nowyear - birthyear;
console.log(age());
console.log("Just testing...is it woring");

const add = (a, b) => a + b;
console.log(add(8, 4));

let score = 19;
let grade;

if (score >= 10 && score < 50) grade = "70%";
else if (score >= 50 && score < 90) grade = "80%";
else if (score >= 90) grade = "90%";
else console.log(`You failed`);

console.log(grade);
