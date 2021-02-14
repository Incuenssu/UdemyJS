//LECTURE: Basics
const country = "Spain"
const continent = "Europe"
let population = 50
let language = "spanish"
const isIsland = false
/*    const massMark = 95;  //Challenge 1
    const massJohn = 1.88;
    const heightMark = 85;
    const heightJohn = 1.76;
    let BMIMark = massMark / heightMark ** 2;
    let BMIJohn = massJohn / heightJohn ** 2;
    let markHigherBMI = BMIMark > BMIJohn;
    console.log(markHigherBMI)*/
const description = country + " is in " + continent + ", and its " + population + " million people speak " + language
console.log(description)
//LECTURE: Strings and Template Literals
const newdescription = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
console.log(newdescription)
//LECTURE: Taking Decisions: if / else Statements
if (population > 33) {
    console.log(`${country}'s population is ${population - 33} million above average`)
} else if (population < 22) {
    console.log(`${country}'s population is ${33 - population} million below average`)
} else {
    console.log(`The population of ${country} is average`)
}
/*const massMark = 95; //Challenge 2
const massJohn = 85;
const heightMark = 1.88;
const heightJohn = 1.76;
let BMIMark = massMark / (heightMark * heightMark);
let BMIJohn = massJohn / (heightJohn ** 2);
let markHigherBMI = BMIMark > BMIJohn;
if (markHigherBMI == true) {
    console.log("Marks's BMI is higher than John's")
} else {
    console.log("John's BMI is higher than Mark's")
}
if (markHigherBMI == true) { //With template string
    console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})`)
} else {
    console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})`)
}*/
//LECTURE: Equality Operators: == vs. ===
const numNeighbours = '1'
if (numNeighbours == 1) {
    console.log('Only 1 border!')
}
if (Number(numNeighbours) === 1) {
    console.log('Only 1 exactly border!')
}
if (numNeighbours === 1) {
    console.log('Only 1 exactly border but not a number!')
}
//LECTURE: Logical Operators
if (language == "english") {
    if (population <= 50) {
        if (isIsland == false) {
            console.log(`You should live in ${country} :)`)
        }
    }
} else {
    console.log(`${country} does not meet your criteria :(`)
}
if (language == "english" && population <= 50 && isIsland == false) {       //Lo mismo pero mas corto
    console.log(`You should live in ${country} :)`)
} else {
    console.log(`${country} does not meet your criteria :(`)
}

/*const averageDolphins = (96 + 108 + 89) / 3       //Challenge 3
    const averageKoalas = (88 + 91 + 110) / 3
    if (averageDolphins > averageKoalas) {
        console.log(`Dolphins wins! with ${averageDolphins} points`)
    } else if (averageDolphins < averageKoalas) {
        console.log(`Koalas wins! with ${averageKoalas} points`)
    } else if (averageDolphins == averageKoalas) {
        console.log("Empate!")
    }
    //Bonus 1
    const B1averageDolphins = (96 + 108 + 89) / 3
    const B1averageKoalas = (88 + 91 + 110) / 3
    if (B1averageDolphins > B1averageKoalas && B1averageDolphins > 100) {
        console.log(`Bonus 1: Dolphins wins! with ${B1averageDolphins} points`)
    } else if (B1averageDolphins < B1averageKoalas && B1averageKoalas > 100) {
        console.log(`Bonus 1: Koalas wins! with ${B1averageKoalas} points`)
    } else if (B1averageDolphins == B1averageKoalas) {
        console.log("Bonus 1: Empate!")
    } else {
        console.log(`Bonus 1: No hay ganador con Dolphins ${B1averageDolphins} y Koalas ${B1averageKoalas}`)
    }//Bonus 2
    const B2averageDolphins = 112
    const B2averageKoalas = (109 + 106) / 2
    if (B2averageDolphins > B2averageKoalas && B2averageDolphins > 100) {
        console.log(`Bonus 2: Dolphins wins! with ${B2averageDolphins} points`)
    } else if (B2averageDolphins < B2averageKoalas && B2averageKoalas > 100) {
        console.log(`Bonus 2: Koalas wins! with ${B2averageKoalas} points`)
    } else if (B2averageDolphins == B2averageKoalas) {
        console.log("Bonus 2: Empate!")
    } else {
        console.log(`Bonus 2: No hay ganador con Dolphins ${B2averageDolphins} y Koalas ${B2averageKoalas}`)
    }*/
//LECTURE: The switch Statement
switch (language) {
    case "mandarin":
        console.log("MOST number of native speakers!")
        break;
    case "spanish":
        console.log("2nd place in number of native speakers")
        break
    case "english":
        console.log("3rd place")
        break
    case "hindi":
        console.log("Number 4")
        break
    case "arabic":
        console.log("5th most spoken language")
        break
    default:
        console.log("Great language too :D")
        break;
}
//LECTURE: The Conditional (Ternary) Operator
console.log(`${country}'s population is ${population >= 33 ? "above" : "below"} average.`)
//Challenge 4
let price = 430
let tip = price > 50 && price < 300 ? price * 0.15 : price * 0.2
console.log(`The bill was ${price}, the tip was ${tip}, and the total value ${price + tip}.`)


