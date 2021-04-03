'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

console.log(
    '------------------------- Using the geolocation API -------------------------'
);
// let map, mapEvent;
// // Using the geolocation API
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         function (position) {
//             // console.log(position);
//             // const latitude = position.coords.latitude;
//             // const longitude = position.coords.longitude
//             const { latitude } = position.coords;
//             const { longitude } = position.coords;
//             // Linking to Google Maps
//             console.log(
//                 `https://www.google.com/maps/@${latitude},${longitude}`
//             );
//             // Displaying a map using Leaflet Library
//             const coords = [latitude, longitude];
//             map = L.map('map').setView(coords, 13); // 13: zoom
//             L.tileLayer(
//                 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
//                 {
//                     attribution:
//                         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//                 }
//             ).addTo(map);
//             // Displaying a map marker. Comes from Leaflet library
//             map.on('click', function (mapE) {
//                 // console.log(mapEvent);
//                 // const { lat, lng } = mapEvent.latlng;
//                 // L.marker([lat, lng])
//                 //     .addTo(map)
//                 //     .bindPopup(
//                 //         L.popup({
//                 //             maxWidth: 250,
//                 //             minWidth: 100,
//                 //             autoClose: false, // Set it to false if you want to override the default behavior of the popup closing when another popup is opened.
//                 //             closeOnClick: false, // Set it if you want to override the default behavior of the popup closing when user clicks on the map.
//                 //             className: 'running-popup',
//                 //         })
//                 //     )
//                 //     .setPopupContent('Workout!')
//                 //     .openPopup();
//                 mapEvent = mapE;
//                 // Rendering workout input form
//                 form.classList.remove('hidden');
//                 inputDistance.focus(); // Put the coursor into this input of the form
//             });
//         },
//         function () {
//             alert('Could not get your postion');
//         }
//     );
// }

// console.log(
//     '------------------------- Displaying a map using Leaflet Library -------------------------'
// );
// // Displaying a map using Leaflet Library

// console.log(
//     '------------------------- Displaying a map marker -------------------------'
// );
// // Displaying a map marker

// console.log(
//     '------------------------- Rendering workout input form -------------------------'
// );
// // Rendering workout input form
// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     // Clear input fields
//     inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value =
//         '';
//     // Display de marker
//     const { lat, lng } = mapEvent.latlng;
//     L.marker([lat, lng])
//         .addTo(map)
//         .bindPopup(
//             L.popup({
//                 maxWidth: 250,
//                 minWidth: 100,
//                 autoClose: false, // Set it to false if you want to override the default behavior of the popup closing when another popup is opened.
//                 closeOnClick: false, // Set it if you want to override the default behavior of the popup closing when user clicks on the map.
//                 className: 'running-popup',
//             })
//         )
//         .setPopupContent('Workout!')
//         .openPopup();
// });
// // Changing between elevation(cicling) and cadence(running)
// inputType.addEventListener('change', function () {
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
// });

console.log(
    '------------------------- Refactoring for Project Architecture -------------------------'
);
// Refactoring for Project Architecture
// We are going to change all the code because we want to use ES6 classes
// APPLICATION ARCHITECTURE
class App {
    #map;
    #mapEvent;
    #workouts = [];
    #mapZoomLevel = 13;
    constructor() {
        // Get user's position
        this._getPosition();
        // Get data from localStorage
        this._getLocalStorage();
        // Attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener(
            'click',
            this._moveToPopup.bind(this)
        );
    }
    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {
                    alert('Could not get your postion');
                }
            );
        }
    }
    _loadMap(position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);
        this.#map.on('click', this._showForm.bind(this));
        // localStorage
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        });
    }
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _hideForm() {
        // Empty inputs
        inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value =
            '';
        // Hide the form first, because the animation is ugly if we add first the hidden class and later display none the form
        form.style.display = 'none';
        // Add hidden class
        form.classList.add('hidden');
        // Fixing animations
        setTimeout(() => (form.style.display = 'grid'), 1000);
    }
    _toggleElevationField() {
        inputElevation
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
        inputCadence
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
    }
    _newWorkout(e) {
        // Creating a new workout
        const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp));
        // validInputs: loop over the array and then each of them t will check wheter the number is finite or not. Then arrow method, only return true if Number.isFinite(inp) is true for all of them. If only one is not finite, return false
        const allPositives = (...inputs) => inputs.every(inp => inp > 0);
        e.preventDefault();
        // Get data from the form
        const type = inputType.value;
        const distance = +inputDistance.value; // "+" Convert in a number
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;
        // If workout is running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // Check if data is valid
            if (
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence)
                !validInputs(distance, duration, cadence) ||
                !allPositives(distance, duration, cadence)
            )
                return alert('Inputs have to be positive numbers!');
            workout = new Running([lat, lng], distance, duration, cadence);
        }
        // If workout is cycling, create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            // Check if data is valid
            if (
                !validInputs(distance, duration, elevation) ||
                !allPositives(distance, duration)
            )
                return alert('Inputs have to be positive numbers!');
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }
        // Add new object to workout array
        this.#workouts.push(workout);
        // Render workout on map as marker
        this._renderWorkoutMarker(workout);
        // Render workout on list. Rendering workouts
        this._renderWorkout(workout);
        // Hide the form and clear the imput fields
        this._hideForm();
        // Set local storage to all workouts
        this._setLocalStorage();
    }
    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent(
                `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${
                    workout.description
                }`
            )
            .openPopup();
    }
    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${
            workout.id
        }">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${
                        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
                    }</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
            `;
        if (workout.type === 'running') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(
                        1
                    )}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>
            `;
        }
        if (workout.type === 'cycling') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(
                        1
                    )}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `;
        }
        form.insertAdjacentHTML('afterend', html);
    }
    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return;
        // The id allows to identify where we are going to move to
        const workout = this.#workouts.find(
            work => work.id === workoutEl.dataset.id
        );
        // Leaflet library
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
        // workout.click(); This is an example of how NOT work the __proto__ parents in localStorage
    }
    // Working with local storage
    _setLocalStorage() {
        // Setting all the workouts to local storage
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }
    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return; // If no data, do nothing
        // We add the localStorage in the workouts variable
        this.#workouts = data;
        // Add the dataStorage to the HTML
        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        });
    }
    resetlocalStorage() {
        localStorage.removeItem('workouts');
        // Reload the page
        location.reload();
        // in console we write: app.resetlocalStorage()
    }
}
const app = new App();

console.log(
    '------------------------- Managing workout data: creating classes -------------------------'
);
// Managing workout data: creating classes
class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10); // In real world we use libraries, but in this example we can use random numbers
    clicks = 0; // Public interface
    constructor(coords, distance, duration) {
        this.coords = coords; // [lat,lng]
        this.distance = distance; // In km
        this.duration = duration; // In minutes
        // this.date = ...      We are using modern JS not implemented yet (early 2021)
        // this.id = ...        to be sure this work in all browsers, we use this way
    }
    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(
            1
        )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
    click() {
        this.clicks++;
    }
}
class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace() {
        // minutes/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed() {
        // km/hour
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

console.log(
    '------------------------- Creating a new workout -------------------------'
);
// Creating a new workout

console.log(
    '------------------------- Rendering workouts -------------------------'
);
// Rendering workouts. Creating a list of items for each workout

console.log(
    '------------------------- Move to marker on click -------------------------'
);
// Move to marker on click
// The element not exists at the beginning, so we can't attach the listener. In this case, we use event delegation, we put the listener in the parent(workouts)

console.log(
    '------------------------- Working with local storage -------------------------'
);
// Working with local storage

console.log(
    '------------------------- Final considerations -------------------------'
);
// Final considerations
/*
1.- Ability to edit a workout;
2.- Ability to delete a workout;
3.- Ability to delete all workouts;
4.- Ability to sort workouts by a certain field (e.g. distance);
5.- Re-build Running and Cycling objects coming from Local Storage; ==> Solve the __proto__ parent problem: workout.click()
6.- More realistic error and confirmation messages;
7.- Ability to position the map to show all workouts [very hard]; ==> Leaflet library
8.- Ability to draw lines and shapes instead of just points [very hard]; ==> Leaflet library
9.- Geocode location from coordinates (“Run in Faro, Portugal”) [only after asynchronous JavaScript section];
10.- Display weather data for workout time and place [only after asynchronous JavaScript section].
*/
