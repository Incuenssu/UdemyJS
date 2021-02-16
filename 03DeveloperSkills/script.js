// Remember, we're gonna use strict mode in all scripts now!
'use strict';

//PROBLEM 1. Given an array of temperatures, calculate the temperature amplitude
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temperatures2 = [1, -12, 3, 4, 55];
// 1) Understanding the problem:
// - What is temperature amplitude? Answer: difference between highest and lowest temperature.
// - How to compute max and min temperatures? Answer:
// - Whats a sensor error? What to do? Answer:
// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array.
// - Find min value in temp array.
// - Subtract min from max and return it

//Do it for professor:
const calcTempAmplitude = function (temps) {
    let max = temps[0];
    let min = temps[0];
    for (let i = 0; i < temps.length; i++) {
        const curTemp = temps[i];
        if (typeof curTemp !== 'number') continue;
        if (curTemp > max) max = curTemp;
        if (curTemp < min) min = curTemp;
    }
    return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);
//Do it for me:
const calcAmplitude = function (temper) {
    let max = 0;
    for (let i = 0; i < temper.length; i++) {
        if (temper[i] > max) {
            max = temper[i];
        }
    }
    let min = 0;
    for (let i = 0; i < temper.length; i++) {
        if (temper[i] < min) {
            min = temper[i];
        }
    }
    if (min < 0) {
        min = min * -1;
    }
    if (max < 0) {
        max = max * -1;
    }
    let amplitude = max + min;
    return `The amplitude of the day is ${amplitude}.`;
};
console.log(calcAmplitude(temperatures));

//PROBLEM 2. Given two arrays of temperatures, calculate the temperature amplitude
// 1) Understanding the problem:
// - With 2 arrays, should we implement functionality twice? Answer: No, merge the 2 arrays
// 2) Breaking up into sub-problems
// - How to merge two arrays?
//Do it for professor:
const calcTempAmplitudeNew = function (t1, t2) {
    const temps = t1.concat(t2);
    console.log(temps);
    let max = temps[0];
    let min = temps[0];
    for (let i = 0; i < temps.length; i++) {
        const curTemp = temps[i];
        if (typeof curTemp !== 'number') continue;
        if (curTemp > max) max = curTemp;
        if (curTemp < min) min = curTemp;
    }
    return max - min;
};
const amplitudeNew = calcTempAmplitudeNew(temperatures, [9, 0, 5]);
console.log(amplitudeNew);
//Do it for me:
let merge = temperatures;
for (let i = 0; i < temperatures2.length; i++) {
    merge.push(temperatures2[i]);
}
const calcAmplitudeTwo = function (temper) {
    let max = 0;
    for (let i = 0; i < temper.length; i++) {
        if (temper[i] > max) {
            max = temper[i];
        }
    }
    let min = 0;
    for (let i = 0; i < temper.length; i++) {
        if (temper[i] < min) {
            min = temper[i];
        }
    }
    if (min < 0) {
        min = min * -1;
    }
    if (max < 0) {
        max = max * -1;
    }
    let amplitude = max + min;
    return `The amplitude of the day is ${amplitude}.`;
};
console.log(calcAmplitudeTwo(merge));

//DEBUGGING WITH THE CONSOLE
console.log(`------- DEBUGGING WITH THE CONSOLE -------`);
const measureKelvin = function () {
    const measurement = {
        type: 'temperature',
        unit: 'celsius',
        // C) FIX THE BUG
        //Model before debugging: value: prompt('Degrees celsius:'),
        //Model after debugging: value: Number(prompt('Degrees celsius:')),
        //For more theory, we stablish the value manually, and the prompt not disturb
        value: 10,
    };
    // B) FIND THE BUG
    //console.log(measurement);
    console.table(measurement);

    //console.log(measurement.value);
    //console.warn(measurement.value);
    //console.error(measurement.value);
    const kelvin = measurement.value + 273;
    return kelvin;
};
// A) IDENTIFY THE BUG
console.log(measureKelvin());

//DEBUGGER WITH CHROME
console.log(`------- DEBUGGING WITH CHROME -------`);
const calcTempAmplitudeBUG = function (t1, t2) {
    const temps = t1.concat(t2);
    console.log(temps);
    let max = 0;
    let min = 0;
    for (let i = 0; i < temps.length; i++) {
        const curTemp = temps[i];
        if (typeof curTemp !== 'number') continue;
        //debugger; //Automatically open the debugger of chrome
        if (curTemp > max) max = curTemp;
        if (curTemp < min) min = curTemp;
    }
    console.log(max, min);
    return max - min;
};
const amplitudeBUG = calcTempAmplitudeBUG([3, 5, 1], [9, 4, 5]);
// A) IDENTIFY
console.log(amplitudeBUG);

//Challenge 1
console.log(`------- CHALLENGE 1 -------`);
const Data1 = [17, 21, 23];
const Data2 = [12, 5, -5, 0, 4];
const printForecast = function (arr) {
    let phrase = '...';
    for (let i = 0; i < arr.length; i++) {
        phrase += ` ${arr[i]}ºC in ${i + 1} days ...`;
    }
    return phrase;
};
console.log(printForecast(Data1));
console.log(printForecast(Data2));
