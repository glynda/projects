let glynda = {
  mname: 'Vivian',
  job: 'Teacher',
  byear: 2003,
};

let Employee = function (n, j, a) {
  this.mname = n;
  this.job = j;
  this.byear = a;
  this.calAge = function () {
    const d = new Date();
    let thisyear = d.getFullYear();
    this.age = thisyear - this.byear;
    console.log(this.age);
  };
};

glynda = new Employee('Liza', 'Accountant', 2007);
const jim = new Employee('Jim', 'Coach', 1997);
//glynda.calAge();

glynda.calAge();
console.log(glynda);
jim.calAge();
console.log(jim);

const prototypeObj = {
  calcAge: function () {
    const d = new Date();
    const yearNow = d.getFullYear();
    this.age = yearNow - this.birthYear;
    console.log(this.age);
  },
};

const lanie = Object.create(prototypeObj, {
  fname: { value: 'Rina' },
  job: { value: 'Dancer' },
  birthYear: { value: 2000 },
});
lanie.calcAge();
console.log(lanie);

const arrbyear = [2009, 2000, 1988, 1977, 1986];

function calcAge(elBY) {
  const d = new Date();
  const yNow = d.getFullYear();
  return yNow - elBY;
}

function calcTheAge(arr, fn) {
  let arrOfAges = [];
  for (let i = 0; i < arr.length; i++) {
    arrOfAges.push(fn(arr[i]));
  }
  return arrOfAges;
}

function isFullAge(elAges) {
  return elAges >= 18;
}

const ages = calcTheAge(arrbyear, calcAge);
const fullAge = calcTheAge(ages, isFullAge);
console.log(ages);
console.log(fullAge);

function getOrder(order) {
  if (order === 'burger') {
    return function (qty) {
      let price = 15;
      return qty * price;
    };
  } else if (order === 'fries') {
    return function (qty) {
      let price = 5;
      return qty * price;
    };
  } else {
    order === 'drinks';
    return function (qty) {
      let price = 3;
      return qty * price;
    };
  }
}

const myOrder = getOrder('burger');
const orderPrice = myOrder(2);
console.log('Order Price: ' + orderPrice);
//order variable is used first than qty
console.log(getOrder('burger')(2));

function getToRetire(ageTo) {
  return function (birthEl) {
    const age = 2024 - birthEl;
    return ageTo - age + ' remaining years';
  };
}
console.log(getToRetire(1977)(75));
console.log(getToRetire(1974)(75));
console.log(getToRetire(1990)(75));

const str = 'Javascript is the coolest programming language?';
console.log(str);
const ans = ['yes', 'no'];
console.log(ans);
const ansQues = prompt('Do you wanna play the game? Select 0: yes, 1: no');
const myAnswer = Number(ansQues);
//console.log(typeof myAnswer);
if (myAnswer === ans.indexOf('yes')) console.log('Correct Answer');
else console.log('Incorrect answer!');

function getReminYearsToRetire(yearToRetire) {
  return function (byear) {
    const d = new Date();
    const yearN = d.getFullYear();
    const myAge = yearN - byear;
    const str = ' years remaining to retire.';
    return yearToRetire - myAge + str;
  };
}
//will execute accdg to first used variable inside the function like byear is used first than retAge
console.log(getReminYearsToRetire(1977)(75));

//glynda code for javascript
