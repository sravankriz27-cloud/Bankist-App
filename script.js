"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
                <div class="movements__value">${mov}€</div>
            </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumInterest.textContent = `${interest}€`;
};

let usrname = "Steven Thomas Williams";

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

const calcCurrentBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcCurrentBalance(acc);
};

//Event Handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }!`;
    containerApp.style.opacity = 100;

    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();

    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount);
    calcCurrentBalance(currentAccount);
  } else {
    labelWelcome.textContent = `Wrong username or pin!`;
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
  }
});

//Transactions

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

//Close Accounts

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = "";
});

//Loan Amounts

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 10)
  ) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
});
let sorted = false;

//Sort Button
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/* const deposits = account1.movements.filter(function (mov){
  return mov> 0;
});

const withdrawals = account1.movements.filter(function (mov){
  return mov <0;
});

const balance = account1.movements.reduce(function (acc, cur){
  return acc + cur;
}, )
console.log(balance)
;


console.log(deposits);
console.log(withdrawals);
 */
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////////

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/* 

const calcAverageHumanAge = function(ages){
  const humanAge = ages.map( function (ages) {
    if(ages <= 2){
      return 2 * ages;
    } else {
      return 16 + ages * 4;
    }
  });

  const adultDogs = humanAge.filter( function(humanAge){
    return humanAge >=18;
  })

 const avgAge = adultDogs.reduce(function (acc, age, i, arr) {
   return acc + age / arr.length;
 }, 0);


 console.log(avgAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

 */

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/* 
const calcAverageHumanAge = function (ages){
  const avgAge = ages.map( age =>( age <= 2 ? age * 2: 16 + age * 4))
  .filter( humanAge => humanAge >= 18)
  .reduce((acc, age ,_ , arr)  => acc + age / arr.length, 0);

}

calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); */

// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
/* 
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
]; 

const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

const dogBothActivities = breeds.find(
  breed => 
    breed.activities.includes('fetch') && breed.activities.includes('running')
).breed;
console.log(dogBothActivities);

const allActivities = breeds.flatMap( breed => breed.activities);
console.log(allActivities);


/* const uniqueAct = new Set(allActivities);
const uniqueActivities = [...uniqueAct];
console.log(uniqueActivities); */

/* const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

const swimmingAdjacent = [
  ...new Set(
    breeds
     .filter(breed => breed.activities.includes('swimming'))
     .flatMap(breed => breed.activities)
     .filter(breed => breed.activities != 'swimming')
  ),
];

console.log(swimmingAdjacent);

const averageWeight = breeds.map( breed => breed.averageWeight);
console.log(averageWeight)

const aboveAvgWeight = averageWeight.every(weight => weight >10)
console.log(aboveAvgWeight);

console.log(breeds.some(breed => breed.activities.length >= 3));

*/

/* const arr = [98 , 45, -44, 67, 15];
arr.sort((a, b) => a-b);

console.log(arr); */

// array grouping

/* const groupedMovements = Object.groupBy(movements, movement =>
   movement > 0 ? 'deposits' :  'withdrawals'
);

console.log(groupedMovements); */
/* 
const dice = Array.from({length : 100},rolls => Math.floor(Math.random() * 6) + 1);
console.log(dice) */

/* const bankDepositSum = accounts.flatMap(acc=> acc.movements).filter(mov => mov> 0).reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum) */

/* const bankdeposit1000 =accounts.flatMap(acc => acc.movements).filter(mov => mov > 1000).length;

console.log(bankdeposit1000); */

/* const bankdeposit1000 = accounts.flatMap((acc) => acc.movements).reduce((acc , cur) => (cur >= 1000 ? acc + 1 : acc),0);
console.log(bankdeposit1000);
 */

/* const bankdeposit1000 = accounts.flatMap((acc) => acc.movements)
                                  .reduce((sums, curr) => { curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
                                    return  sums;
                                   }, {deposits: 0, withdrawals : 0});

console.log(bankdeposit1000)

 */

/* const convertTitleCase = function(title){
  const exceptions = [
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "nor",
    "yet",
    "so",
    "for",
    "at",
    "by",
    "in",
    "of",
    "on",
    "to",
    "up",
  ];

    const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word[0].toUpperCase() + word.slice(1)).join(' ');
  return titleCase;

};

console.log(convertTitleCase("THis is A Long Sentence")); */

// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:*/
/* const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];



const recFood = dogs.map(dog => dog.weight ** 0.75 * 28);

dogs.forEach(dog=> {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

const sarahDog = dogs.find( dog => dog.owners.includes('Sarah'));

console.log(sarahDog)

if(sarahDog){
 const recmFood = sarahDog.recFood;
 const currFood = sarahDog.curFood;

 if(currFood > recmFood){
  console.log(`the dog is eating more than he/she should..!`)
 }else if(recmFood > currFood) {
  console.log(`The dog is eating less than whatt he/she should be eating..!`)
 }
 };



const dogsTooMuch = dogs.filter (dogs => dogs.curFood > dogs.recFood);
let ownersTooMuch = dogsTooMuch.flatMap(dog => dog.owners);
console.log(ownersTooMuch);

const dogsTooLittle = dogs.filter (dogs => dogs.recFood > dogs.curFood);
let ownersTooLittle = dogsTooLittle.flatMap (dog => dog.owners);
console.log(ownersTooLittle);

console.log(
  `${ownersTooLittle.join(' and ')}'s Dogs eat too little`
);

console.log(`${ownersTooMuch.join(" and ")}'s Dogs eat too much`);

const exactFood = dogs.some(dogs => dogs.recFood == dogs.curFood);
console.log(exactFood);

console.log(dogs.every(dogs => dogs.curFood > dogs.recFood*0.9 && dogs.curFood < dogs.recFood *1.1 ));

const eatingOkay = dogs.filter(
  (dogs) =>
    dogs.curFood > dogs.recFood * 0.9 && dogs.curFood < dogs.recFood * 1.1
);

console.log(eatingOkay);

const dogsGroupedbyportion = Object.groupBy(dogs, dog => {
  if(dog.curFood > dog.recFood){
    return 'too-much';
  }else if (dog.recFood > dog.curFood){
    return 'too-little';
  }else {
    return 'exact';
  }
})

console.log(dogsGroupedbyportion);


const dogsGroupedByOwners = Object.groupBy(dogs , dogs => `${dogs.owners.length}-owners`);
console.log(dogsGroupedByOwners);

const dogsSorted = dogs.toSorted((a,b) => a.recFood - b.recFood);
console.log(dogsSorted);
 */
