'use strict';
console.log(
    '------------------------- Construction functions and the NEW operator -------------------------'
);
// Construction functions and the NEW operator
const Person = function (firstName, birthYear) {
    // 1. New {empty} is created
    // console.log(this);
    // 2. function is called, this = {empty}
    this.firstName = firstName; // Instance property
    this.birthYear = birthYear; // Instance property
    // 3. {empty} linked to prototype. See later
};
const jonas = new Person('Jonas', 1990);
// 4. function automatically return {}
console.log(jonas);
const matilda = new Person('Matilda', 1997);
const jack = new Person('Jack', 1975);
// Instance of
// console.log(jonas instanceof Person);
// console.log('Jose' instanceof Person);

console.log('------------------------- Prototypes -------------------------');
// Prototypes
console.log('---------- Methods ----------');
Person.prototype.calcAge = function () {
    console.log(2021 - this.birthYear); // The "this keyword" is set to the object that is calling the method
};
console.log(Person.prototype);
jonas.calcAge();
console.log(jonas); //Jonas has not the method calcAge, but it can access an use it
matilda.calcAge();
// console.log(jonas.__proto__); // 3. {empty} linked to prototype
// console.log(jonas.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(Person));
console.log('---------- Propierties ----------');
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species);
console.log(matilda);
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(
    '------------------------- Prototypal Inheritance on Built - in objects -------------------------'
);
// Prototypal Inheritance on Built - in objects
const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__); // ALl the methods of the arrays. but this array has NOT the methods
// console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__); // Very similar than the Object.prototype
// NOT use like this. It is only a experiment to show.
Array.prototype.unique = function () {
    return [...new Set(this)];
};
console.log(arr.unique());
console.dir(x => x + 1); // The functions are objects

console.log('------------------------- Challenge 1 -------------------------');
// Challenge 1
/*Your tasks:
1. Useaconstructorfunctiontoimplementa'Car'.Acarhasa'make'anda 'speed' property. The 'speed' property is the current speed of the car in km/h
2. Implementan'accelerate'methodthatwillincreasethecar'sspeedby10, and log the new speed to the console
3. Implementa'brake'methodthatwilldecreasethecar'sspeedby5,andlog the new speed to the console
4. Create2'Car'objectsandexperimentwithcalling'accelerate'and 'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h*/
// Made for me
// 1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};
// 2
Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`Speed of ${this.make}: ${this.speed} km/h`);
};
// 3
Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`Speed of ${this.make}: ${this.speed} km/h`);
};
// 4
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
// bmw.brake();
// mercedes.accelerate();
mercedes.brake();
// Made for professor
// 1
const CarP = function (make, speed) {
    this.make = make;
    this.speed = speed;
};
// 2
CarP.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};
// 3
CarP.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};
// 4
const bmwP = new CarP('BMW', 120);
const mercedesP = new CarP('Mercedes', 95);
// bmwP.accelerate();
// bmwP.accelerate();
// bmwP.brake();
bmwP.accelerate();

console.log('------------------------- ES6 classes -------------------------');
// ES6 classes
// class expressions
// const PersonCl = class {};
// class declarations
class PersonCl {
    // 1. Add a constructor method for the propierties
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    // Adding methods. Methods will be added to .prototype property(instance methods)
    calcAge() {
        console.log(2021 - this.birthYear);
    }
    greet() {
        console.log(`Hey ${this.firstName}`);
    }
    // Setters and Getters
    get age() {
        return 2021 - this.birthYear;
    }
    set fullName(name) {
        // Set a propierty that already exists. Problems with the constructor.
        if (name.includes(' ')) this._fullName = name;
        // We add the _ because the constructor and the setter are writting the value and looping arround, this _ solve the problem.
        // But the fullName doesn't extist, so we need to create a getter to solve it.
        else alert(`${name} is not a full name!`);
    }
    get fullName() {
        return this._fullName;
    }
    // Static methods
    static hey() {
        console.log('Hey there');
        // console.log(this);
    }
}
const jessica = new PersonCl('Jessica Davis', 1980);
jessica.calcAge();
console.log(jessica); // The object has NOT any method
// console.log(jessica.__proto__ === PersonCl.prototype); // True
// 1. Classes are NOT hoisted
// 2. Classes are first class citizens
// 3. Classes are executed in strict mode

console.log(
    '------------------------- Setters and Getters -------------------------'
);
// Setters and Getters
const account = {
    owner: 'Jonas',
    movements: [200, 500, 120, 300],
    get latest() {
        return this.movements.slice(-1).pop();
    },
    set latest(mov) {
        this.movements.push(mov);
    },
};
console.log(account.latest);
account.latest = 50;
console.log(account.latest);
// Using with classes
console.log(jessica.age);
const walter = new PersonCl('Walter White', 1965);

console.log(
    '------------------------- Static methods -------------------------'
);
// Static methods
Person.hey = function () {
    console.log('Hey there');
    // console.log(this);
};
Person.hey(); // This is not inherited
// jonas.hey(); // Not work because is NOT in the prototype of jonas object
PersonCl.hey();
// jessica.hey(); // Not work because is NOT in the prototype of jessica object

console.log(
    '------------------------- Object.create -------------------------'
);
// Object.create
// This gonna be literally the prototype of all the person objects
const personProto = {
    calcAge() {
        console.log(2021 - this.birthYear);
    },
    // Better form to add propierties than steven
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};
const steven = Object.create(personProto);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__); // This is exactly personProto
console.log(steven.__proto__ === personProto); // true
// Better form to add propierties than steven
const sarah = Object.create(personProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

console.log('------------------------- Challenge 2 -------------------------');
// Challenge 2
/*Your tasks:
1. Re-createChallenge#1,butthistimeusinganES6class(callit'CarCl')
2. Addagettercalled'speedUS'whichreturnsthecurrentspeedinmi/h(divide
by 1.6)
3. Addasettercalled'speedUS'whichsetsthecurrentspeedinmi/h(but
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Createanewcarandexperimentwiththe'accelerate'and'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h
*/
// Make for me
// 1
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`Speed of ${this.make}: ${this.speed} km/h`);
    }
    brake() {
        this.speed -= 5;
        console.log(`Speed of ${this.make}: ${this.speed} km/h`);
    }
    // 2
    get speedUS() {
        return this.speed / 1.6;
    }
    // 3
    set speedUS(sp) {
        this.speed = sp * 1.6;
    }
}
// 4
const ford = new CarCl('Ford', 120);
ford.speedUS = 120;
console.log(ford);
// Make for professor
// 1
class CarClP {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`Speed of ${this.make}: ${this.speed} km/h`);
    }
    brake() {
        this.speed -= 5;
        console.log(`Speed of ${this.make}: ${this.speed} km/h`);
        return this;
    }
    // 2
    get speedUS() {
        return this.speed / 1.6;
    }
    // 3
    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}
// 4
const fordP = new CarClP('Ford', 120);
console.log(fordP.speedUS);
fordP.speedUS = 50;
console.log(fordP);

console.log(
    '------------------------- Inheritance between classes: constructor functions -------------------------'
);
// Inheritance between classes: constructor functions
// We use class Person,already created, and class Students
const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
};
// Object.create() to connect the prototypes. Linking prototypes.
Student.prototype = Object.create(Person.prototype);
// Creating the methods
Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student('Mike', 2000, 'Computer Science');
mike.introduce();
mike.calcAge(); // Work for linking the prototypes.
console.dir(Student.prototype.constructor); // The constructor of Student should be Student, but is Person
Student.prototype.constructor = Student; // Fixing the error
console.dir(Student.prototype.constructor);

console.log('------------------------- Challenge 3 -------------------------');
// Challenge 3
/*Your tasks:
1. UseaconstructorfunctiontoimplementanElectricCar(called'EV')asachild "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
2. Implementa'chargeBattery'methodwhichtakesanargument 'chargeTo' and sets the battery charge to 'chargeTo'
3. Implementan'accelerate'methodthatwillincreasethecar'sspeedby20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
4. Createanelectriccarobjectandexperimentwithcalling'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism 😉
Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%*/
// Made for me
// 1
const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;
// 2
EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};
// 3
EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(
        `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
    );
};
// 4
const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);
tesla.accelerate();
// Made for professor
// 1
const EVP = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};
EVP.prototype = Object.create(Car.prototype);
// 2
EVP.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};
// 3
EVP.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(
        `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
    );
};
// 4
const teslaP = new EVP('TeslaP', 120, 23);
teslaP.chargeBattery(90);
teslaP.brake();
teslaP.accelerate();

console.log(
    '------------------------- Inheritance between classes: ES6 Classes -------------------------'
);
// Inheritance between classes: ES6 Classes
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        // Always need to happen first!
        super(fullName, birthYear);
        this.course = course;
    }
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }
    // Overwrite the calcAge method
    calcAge() {
        console.log(
            `I'm ${
                2021 - this.birthYear
            } years old, but as a student I feel more like ${
                2021 - this.birthYear + 10
            }`
        );
    }
}
// const martha = new StudentCl('Martha Jones', 1999);
const martha = new StudentCl('Martha Jones', 1999, 'Computer Science');
martha.introduce();
martha.calcAge();

console.log(
    '------------------------- Inheritance between classes: Object.create() -------------------------'
);
// Inheritance between classes: Object.create()
const StudentProto = Object.create(personProto);
StudentProto.init = function (firstName, birthYear, course) {
    personProto.init.call(this, firstName, birthYear);
    this.course = course;
};
StudentProto.introduce = function () {
    console.log(
        `I'm ${
            2021 - this.birthYear
        } years old, but as a student I feel more like ${
            2021 - this.birthYear + 10
        }`
    );
};
const jay = Object.create(StudentProto);
jay.init('Jay', 1989, 'Computer Science');
jay.introduce();
jay.calcAge();

console.log(
    '------------------------- Another class example -------------------------'
);
// Another class example
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // Data encapsulation. NOT trully private, it is just a covnention. Developers agree to use and everyone does it this way. Protected property
        this._pin = pin;
        this._movements = [];
        this.locale = navigator.language;
        console.log(`Thanks for opening an account, ${this.owner}`);
    }
    // Public interface of our objects
    deposit(value) {
        this._movements.push(value);
        return this;
    }
    withdraw(value) {
        this.deposit(-value);
        return this;
    }
    _approveLoan(value) {
        // This method is only internal for the bank. NOT in the public API. Protect method
        return true; // It is only an example, not important to use complex logic.
    }
    requestLoan(value) {
        if (this._approveLoan(value)) {
            this.deposit(value);
            console.log('Loan approve');
            return this;
        }
    }
    // Data encapsulation. Is more common use "getMETHOD" than "get METHOD". We can see the movements more secure
    getMovements() {
        return this._movements;
    }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
// Not a good idea using this, is better using methods that interact with that. Avoid bugs.
// acc1.movements.push(250);
// acc1.movements.push(-75);
acc1.deposit(250);
acc1.withdraw(75);
// But, even if methods are used, it is possible to use ".movements.push()" or another interact. For example, we don't see the pin outside the class. Data encapsulation
console.log(acc1.pin);
acc1.requestLoan(1000);
acc1._approveLoan(1000);

console.log(
    '------------------------- Encapsulation: protected properties and methods -------------------------'
);
// Encapsulation: protected properties and methods
acc1._movements.push(250);
acc1._movements.push(-75);
console.log(acc1.getMovements());
console.log(acc1);

console.log(
    '------------------------- Encapsulation: private class fields and methods -------------------------'
);
// Encapsulation: private class fields and methods
// Public fields in Account are: _movements and localte. Because they are not in the parameters
class Account2 {
    // Public fields. This are on the instances, not on the prototype. Exactly the same than putting in the constructor.
    locale = navigator.language;

    // Private fields. This are on the instances, not on the prototype. Necesary to create first and then giving a value in the constructor.
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // Data encapsulation. NOT trully private, it is just a covnention. Developers agree to use and everyone does it this way. Protected property
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;
        console.log(`Thanks for opening an account, ${this.owner}`);
    }
    // Public interface of our objects
    // Public methods
    deposit(value) {
        this.#movements.push(value);
    }
    withdraw(value) {
        this.deposit(-value);
    }
    requestLoan(value) {
        if (this.#approveLoan(value)) {
            this.deposit(value);
            console.log('Loan approve');
        }
    }
    getMovements() {
        return this.#movements;
    }
    static helper() {
        console.log('Helper');
    }
    // Private methods. Not appears on the prototype.
    #approveLoan(value) {
        // This method is only internal for the bank. NOT in the public API. Protect method
        return true; // It is only an example, not important to use complex logic.
    }
}
const acc2 = new Account2('Jonas', 'EUR', 1111);
acc2.deposit(10000);
acc2.withdraw(150);
console.log(acc2);
console.log(acc2.getMovements());

console.log(
    '------------------------- Chaining methods -------------------------'
);
// Chaining methods
// acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(400);
// acc1.deposit(300) resolved and not return nothing(undefined). Later try to do undefined.deposit(500) and show us the error.
// Is necesary to write a return in deposit: "return this". And all of them
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(400);
console.log(acc1.getMovements());

console.log(
    '------------------------- ES6 classes summary -------------------------'
);
// ES6 classes summary
class StudentSummary extends Person {
    // Person ==> Parent class
    // extends ==> Inheritance between classes, automatically sets prototype chain connecting child and parent.
    // StudentSummary ==> Child class
    university = 'University of Lisbon'; // Public field (similar to property, available on created object)
    #studyHours = 0; // Private fields (not accessible outside of class)
    #course;
    static numSubjects = 10; // Static public field (available only on class)
    // Constructor method, called by new operator. Mandatory in regular class, might be omitted in a child class
    constructor(fullName, birthYear, startYear, course) {
        super(fullName, birthYear); // Call to parent (super) class (necessary with extend). Needs to happen before accessing this.
        this.startYear = startYear; // Instance property (available on created object)
        this.#course = course; // Redefining private field
    }
    // Public method
    introduce() {
        console.log(`I study ${this.#course} at ${this.university}`);
    }
    study(h) {
        // Referencing private field and method
        this.#makeCoffe();
        this.#studyHours += h;
    }
    // Private method (Might not yet work in your browser. “Fake” alternative: _ instead of #)
    #makeCoffe() {
        return 'Here a coffe for you!';
    }
    // Getter method
    get testScore() {
        return this._testScore;
    }
    // Setter method (use _ to set property with same name as method, and also add getter)
    set testScore(score) {
        this._testScore = score <= 20 ? score : 0;
    }
    // Static method (available only on class. Can not access instance properties nor methods, only static ones)
    static printCurriculum() {
        console.log(`There are ${this.numSubjects} subjects`);
    }
}
// Creating new object with new operator
const student = new StudentSummary('Jose', 1990, 2020, 'Medicine');
console.log(student);

console.log('------------------------- Challenge 4 -------------------------');
// Challenge 4
/*Your tasks:
1. Re-createChallenge#3,butthistimeusingES6classes:createan'EVCl' child class of the 'CarCl' class
2. Makethe'charge'propertyprivate
3. Implementtheabilitytochainthe'accelerate'and'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%*/
// Made for me
// 1
class EVCl extends CarCl {
    // 2
    #charge;
    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }
    // 3 I will not change the brake method in Car class
    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }
    accelerate() {
        this.speed += 20;
        this.#charge -= 1;
        console.log(
            `${this.make} going at ${this.speed} km/h, with a charge of ${
                this.#charge
            }%`
        );
        return this;
    }
}
const rivian = new EVCl('Rivian', 120, 23);
rivian
    .chargeBattery(40)
    .accelerate()
    .accelerate()
    .chargeBattery(99)
    .accelerate();
// Made for professor
// 1
class EVClP extends CarClP {
    // 2
    #charge;
    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }
    // 3
    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }
    accelerate() {
        this.speed += 20;
        this.#charge--;
        console.log(
            `Professor: ${this.make} going at ${
                this.speed
            } km/h, with a charge of ${this.#charge}%`
        );
        return this;
    }
}
const rivianP = new EVClP('Rivian', 120, 23);
rivianP
    .accelerate()
    .accelerate()
    .accelerate()
    .brake()
    .chargeBattery(50)
    .accelerate();
console.log(rivianP.speedUS);
