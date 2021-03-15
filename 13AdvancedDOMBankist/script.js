'use strict';

//////////////////////////////////////////////////////////////////////////////////////////// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
// Opening all the class modal when clicking
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Implementing smooth scrolling. Old school
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
    // Scrolling. OLD School
    // console.log('Current scroll (x/y)', window.pageXOffset, pageYOffset);
    // console.log(
    //             'height/width viewport: ',
    //             document.documentElement.clientHeight,
    //             document.documentElement.clientWidth
    //         );
    // const s1coords = section1.getBoundingClientRect();
    // window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });
    // Scrolling. Modern School
    section1.scrollIntoView({ behavior: 'smooth' });
});

// Event delegation: implementing page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {      This form is bad for performance
//     el.addEventListener('click', function (e) {
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    const clicked = e.target.classList.contains('nav__link');
    // Matching strategy. Old way
    // if (e.target.classList.contains('nav__link')) {
    //     document
    //         .querySelector(e.target.getAttribute('href'))
    //         .scrollIntoView({ behavior: 'smooth' });
    // }
    // Matching strategy. Modern way
    if (!clicked) return;
    document
        .querySelector(e.target.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
});

// Building a tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// tabs.forEach(t => t.addEventListener('click', () => console.log('TABS')));       // Not a good idea create too much listeners. Is better use events delegation
tabsContainer.addEventListener('click', function (e) {
    e.preventDefault();
    // We select the parent
    const clicked = e.target.closest('.operations__tab');
    // Matching strategy. Modern way. If we click outside of the button, the listener finish without errors
    if (!clicked) return;
    // Remove all the active class
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    // Adding the active tab
    clicked.classList.add('operations__tab--active');
    // Adding the active content
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

// Passing arguments to event handlers
// Menu fade animation
const nav = document.querySelector('.nav');
const handleHover = function (e) {
    // console.log(this, e);
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this; // The "this keyword" is in this case the opacity parameter
            logo.style.opacity = this;
        });
    }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Implementing a sticky navigation: the scroll event. NOT USE!!! BAD PERFORMANCE
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//     if (window.scrollY > initialCoords.top) {
//         nav.classList.add('sticky');
//     } else {
//         nav.classList.remove('sticky');
//     }
// });
// Implementing a sticky navigation: intersection observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Revealing elements on scroll
const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    // When the observer do it work, disable the observer
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allSection.forEach(function (section) {
    sectionObserver.observe(section);
    // section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); // We only select the img with the property "data-src" which have the blur effect
const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    // Replace the src with data-src
    entry.target.src = entry.target.dataset.src;
    // Remove the blur filter. We remove the class blur after load the new image with the event listener
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    // Stop observer
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px', // Starting loading the img before the user arrives
});
imgTargets.forEach(img => imgObserver.observe(img));

// Building a slider component: Part 1
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlide = slides.length;
const goToSlide = function (slide) {
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    ); // currentSlide/slide= 1 First: -100% ; Second: 0% ; Third: 100% ; Fourth: 200% ==> currentSlide/slide= 2 First: -200% ; Second: -100% ; Third: 0% ; Fourth: 100%.
};
const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
};
const previousSlide = function () {
    if (currentSlide === 0) {
        currentSlide = maxSlide - 1;
    } else {
        currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
};
const activeDot = function (slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
};
// Sliding with the arrow in the UI
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);
// Building a slider component: Part 2
// Using key arrows to move the slides
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') previousSlide();
    e.key === 'ArrowRight' && nextSlide(); //Same than previous, short circuiting
});
// Dots
const dotContainer = document.querySelector('.dots');
const createDots = function () {
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};
dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activeDot(slide);
    }
});

// Initialization all the functions
const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
};
init();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Theory

console.log(
    '------------------------- Selecting, creating and deleting elements -------------------------'
);
// Selecting, creating and deleting elements
console.log('----- Selecting -----');
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
const allSections = document.querySelectorAll('.section');
// console.log(allSections);
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollection
// console.log(document.getElementsByClassName('btn')); // HTMLCollection
// Creating and inserting elements
console.log('----- Creating -----');
// insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improve functionality and analytics.';
message.innerHTML =
    'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
// header.before(message);
header.append(message);
// header.after(message);
// header.append(message.cloneNode(true));
console.log('----- Deleting -----');
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
        // message.remove();
        message.parentElement.removeChild(message);
    });

console.log(
    '------------------------- Styles, attributes and classes -------------------------'
);
// Styles, attributes and classes
console.log('----- Styles -----');
message.style.backgroundColor = '#37383d';
message.style.width = '100%';
// console.log(message.style.color);
// console.log(message.style.backgroundColor);
// getComputedStyle
message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
console.log(Number.parseFloat(getComputedStyle(message).height, 10));
// document.documentElement.style.setProperty('--color-primary', 'orangered');
console.log('----- Attributes -----');
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // Absolute URL. In the browser(server) is the absolute URL
console.log(logo.getAttribute('src')); // Relative URL. In the HTML is the relative URL
const link = document.querySelector('.twitter-link');
console.log(link.href); // Absolute URL in links
console.log(link.getAttribute('href')); // Absolute URL in links
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');
// Data attributes
console.log(logo.dataset.versionNumber);
// Classes
logo.classList.add('c', 'c2');
logo.classList.remove('c', 'c2');
logo.classList.toggle('c');
logo.classList.contains('c'); // Not "includes" like in arrays
// logo.className = 'jonas'; DON'T USE; OVERRIDE THE OTHER CLASSES

console.log(
    '------------------------- Types of events and event handlers -------------------------'
);
// Types of events and event handlers
const h1 = document.querySelector('h1');
const alertH1 = function () {
    console.log('Mouse OUT');
    // Remove an event handler
    h1.removeEventListener('mouseleave', alertH1);
};
h1.addEventListener('mouseleave', alertH1);
setTimeout(() => h1.removeEventListener('mouseleave', alertH1), 3000);
// OLD addEventListener
// h1.onmouseenter = function () {
//     console.log('Mouse enter');
// };
// Using an HTML attribute

console.log(
    '------------------------- Event propagation in practice -------------------------'
);
// Event propagation in practice
const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
    `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// When we click here, the 3 nodes change his color. Because the event happen in all blubbling parents nodes
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('LINK 1', e.target, e.currentTarget);
//     // Stop propagation
//     // e.stopPropagation();
// });
// // When we click here, not happen in the child node(the previous) but yes happen in parent node
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('CONTAINER', e.target, e.currentTarget);
// });
// // This is the last event and no parent nodes. This is the unique who change
// document.querySelector('.nav').addEventListener(
//     'click',
//     function (e) {
//         this.style.backgroundColor = randomColor();
//         console.log('NAV', e.target, e.currentTarget);
//     },
//     true
// );

console.log(
    '------------------------- DOM traversing -------------------------'
);
// DOM traversing
// Going downwards: selecting child element
console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'red';
// Going upwards: selecting parent element
// console.log(h1.parentNode);
console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';
// Going sideways: selecting siblings element
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//     if (el != h1) el.style.transform = 'scale(0.5';
// });

console.log(
    '------------------------- Implementing a sticky navigation: Intersection observer API -------------------------'
);
// Implementing a sticky navigation: Intersection observer API
// this function will get called each time that the observer element, or our target element here(section1), is intersecting the root element at the threshold that we defined. No matter if we are scrolling down or up.
// We are only interested in "entries" but sometimes using the observer is also useful. Entries is threshold.
// const observerCallBack = function (entries, observer) {
//     entries.forEach(entry => console.log(entry));
// };
// const observerOptions = {
//     root: null, // Is the element that the target is intersecting. null == viewport
//     threshold: 0.1, // Is the percentage of intersection at which the observer callback will be called(0.1===10%)
//     // threshold: [0.1, 0.5, 0.8], // Can be exist multiple threshold
// };
// const observer = new IntersectionObserver(observerCallBack, observerOptions);
// observer.observe(section1);

console.log(
    '------------------------- Lifecycle DOM events -------------------------'
);
// Lifecycle DOM events
document.querySelector('DOMContentLoaded', function (e) {
    console.log('HTML parsed and DOM tree built!', e);
});
window.addEventListener('load', function (e) {
    console.log('Page fully loaded', e);
});
// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     console.log(e);
//     e.returnValue = '';
// });

console.log(
    '------------------------- Efficient script loading: defer and sync -------------------------'
);
// Efficient script loading: defer and sync
