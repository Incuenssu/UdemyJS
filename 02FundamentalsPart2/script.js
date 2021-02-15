'use strict'
//FUNCTIONS
/*function logger() {
    console.log(`My name is Jose Luis.`)
}
logger()
function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`
    return juice
}
const applejuice = fruitProcessor(5, 4)
console.log(applejuice)
console.log(fruitProcessor(2, 41))
const apple1 = fruitProcessor(11, 111)
const apple2 = fruitProcessor(2, 222)
const apple3 = fruitProcessor(333, 33)
console.log(apple3)
console.log(apple2)
console.log(apple1)*/
//LECTURE: Functions
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`
}
const countrie1 = describeCountry("Spain", 50, "Madrid")
//console.log(countrie1)
//LECTURE: Function Declarations vs. Expressions
function percentageOfWorld1(population) {
    return (population / 7900) * 100
}
//console.log(percentageOfWorld1(1441).toFixed(2), percentageOfWorld1(50).toFixed(2), percentageOfWorld1(590).toFixed(2))
//LECTURE: Arrow Functions
const percentageOfWorld2 = population => (population / 7900) * 100
//console.log(`The percentage of people in the world of China is ${percentageOfWorld2(1441).toFixed(2)}%`)
//LECTURE: Functions Calling Other Functions
const describePopulation = function (country, population) {
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(population).toFixed(2)}% of the world`
}
//console.log(describePopulation("China", 1441))

/* //Challenge 1
const calcAverage = (average1, average2, average3) => (average1 + average2 + average3) / 3
//Data 1
const Dolphins1 = 44
const Dolphins2 = 23
const Dolphins3 = 71
const Koalas1 = 65
const Koalas2 = 54
const Koalas3 = 49
//Data 2
const Dolphins1 = 85
const Dolphins2 = 54
const Dolphins3 = 41
const Koalas1 = 23
const Koalas2 = 34
const Koalas3 = 27
const avgDolphins = calcAverage(Dolphins1, Dolphins2, Dolphins3)
const avgKoalas = calcAverage(Koalas1, Koalas2, Koalas3)
const checkWinner = function (Dolphins, Koalas) {
    let winner = 0
    if (Dolphins > Koalas) {
        winner = "Dolphins"
    } else if (Dolphins < Koalas) {
        winner = "Koalas"
    } else {
        winner = "No one"
    }
    return `${winner} win (${Dolphins} vs ${Koalas})`
}
console.log(checkWinner(avgDolphins, avgKoalas))*/

//LECTURE: Introduction to Arrays
const populations = [50, 1441, 569, 21]
const percentages = [percentageOfWorld1(populations[0]).toFixed(2), percentageOfWorld1(populations[1]).toFixed(2), percentageOfWorld1(populations[2]).toFixed(2), percentageOfWorld1(populations[3]).toFixed(2)]
//console.log(percentages)
//LECTURE: Basic Array Operations (Methods)
let neighbours = ["France", "Portugal", "Andorra"]
neighbours.push("Utopia")
neighbours.pop("Utopia")
neighbours[neighbours.indexOf("Andorra")] = "Principality of Andorra"
//console.log(neighbours)

/*//Challenge 2
const calcTip = function (bill) {
    let tip = 0
    if (bill > 50 && bill < 300) {
        tip = bill * 0.15
    } else {
        tip = bill * 0.2
    }
    return tip
}
const price = [100, 125, 555, 44]
const tips = [calcTip(price[0]), calcTip(price[1]), calcTip(price[2]), calcTip(price[3])]
const total = [price[0] + tips[0], price[1] + tips[1], price[2] + tips[2], price[3] + tips[3]]
console.log(price)
console.log(tips)
console.log(total)*/

//LECTURE: Introduction to Objects
const myCountry = {
    country: "Spain",
    capital: "Madrid",
    language: "spanish",
    population: 50,
    neighbours: ["France", "Portugal", "Andorra"]
}
//console.log(myCountry)
//LECTURE: Dot vs. Bracket Notation
//console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language} speaking people ${myCountry.neighbours.length} neighboring countries and a capillar called ${myCountry.capital}`)
myCountry.population = myCountry.population + 2
myCountry["population"] = myCountry["population"] - 2
//another example
const dotname = `${myCountry.country} has ${myCountry.neighbours.length} friends, and his best friend is called ${myCountry.neighbours[0]}`
//console.log(dotname)
const Bracketname = `${myCountry["country"]} has ${myCountry["neighbours"].length} friends, and his best friend is called ${myCountry["neighbours"][1]}`
//console.log(Bracketname)
//LECTURE: Object Methods
const myCountry2 = {
    country: "Spain",
    capital: "Madrid",
    language: "spanish",
    population: 50,
    neighbours: ["France", "Portugal", "Andorra"],
    describe: function () {
        return `${this.country} has ${this.population} million ${this.language} - speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`
    },
    checkIsland: function () {
        this.isIsland = this.neighbours.length === 0 ? true : false;
    }
}
//console.log(myCountry2.describe())
//console.log(myCountry2.checkIsland)
//myCountry2.checkIsland()
//console.log(myCountry2.isIsland)

/*//Challenge 3
const Mark = {
    firstName: "Mark",
    lastName: "Miller",
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.BMI = this.mass / (this.height ** 2)
        return this.BMI
    }
}
const John = {
    firstName: "John",
    lastName: "Smith",
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.BMI = this.mass / (this.height ** 2)
        return this.BMI
    }
}
Mark.calcBMI()
John.calcBMI()
console.log(Mark.BMI < John.BMI ? `John's BMI (${John.BMI.toFixed(2)}) is higher than Mark's (${Mark.BMI.toFixed(2)})!` : `Mark's BMI (${Mark.BMI.toFixed(2)}) is higher than John's (${John.BMI.toFixed(2)})!`)*/

//LECTURE: Iteration: The for Loop
for (let i = 1; i <= 50; i++) {
    //console.log(`Voter number ${i} is currently voting`)
}
//LECTURE: Looping Arrays, Breaking and Continuing
let percentages2 = []
for (let i = 0; i < populations.length; i++) {
    percentages2[i] = percentageOfWorld1(populations[i]).toFixed(2)
    //percentages2.push(percentageOfWorld1(populations[i]).toFixed(2))
}
//console.log(percentages)
//console.log(percentages2)
//LECTURE: Looping Backwards and Loops in Loops
const listOfNeighbours = [
    ['Canada', 'Mexico'],
    ['Spain'],
    ['Norway', 'Sweden', 'Russia']]
for (let i = 0; i < listOfNeighbours.length; i++) {
    if (listOfNeighbours[i].length < 2) continue
    for (let j = 0; j < listOfNeighbours[i].length; j++) {
        //console.log(`Neighbour: ${listOfNeighbours[i][j]}`)
    }
}
//LECTURE: The while Loop
const percentages3 = []
let i = 0
while (i <= populations.length - 1) {
    percentages3[i] = percentageOfWorld1(populations[i]).toFixed(2)
    i++
}
//Challenge 4
const prices = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]
let bills = []
let totals = []
const calcTip = function (bill) {
    let tip = 0
    if (bill > 50 && bill < 300) {
        tip = bill * 0.15
    } else {
        tip = bill * 0.2
    }
    return tip
}
for (let i = 0; i < prices.length; i++) {
    bills.push(calcTip(prices[i]))
    totals.push(prices[i] + bills[i])
}
console.log(prices)
console.log(bills)
console.log(totals)
//Bonus
const calcAverage = function (arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum / arr.length
}
console.log(`Average of prices: ${calcAverage(prices)}€`)
console.log(`Average of bills: ${calcAverage(bills)}€`)
console.log(`Average of totals: ${calcAverage(totals)}€`)