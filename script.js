"use strict";

//selections
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
//Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);

  console.log(e.target.getBoundingClientRect());

  console.log("CURRENT scroll x/y", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width view port",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  // window.scrollTo(
  //   s1cords.left + window + pageXOffset,
  //   s1cords.top + window.pageYOffset
  // ); //s1cords.top is relative to the viewport

  // old method
  // window.scrollTo({
  //   left: s1cords.left + window + pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //new method
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
//Page Navigation -> smooth scrolling in nav bar

//This techq is okay for 3 elements but what if we had 10k elements with a forEach func we will be creating 10k copies and will impact the performance
// document.querySelectorAll(".nav__link ").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("Links");
//     const id = this.getAttribute("href"); //we dont want absolute url thats why we cant use this.href
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" }); // common techq to implement scrolling
//   });
// });

//Clean Solution For Page Navigation using event deligation -> using parent for all childs

//1. Add event listener to common parent element
//2.Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target); //to find where the event is originated from

  //Matching strategy -> so it doesnt trigger if we click on the blank space
  if (e.target.classList.contains("nav__link")) {
    console.log("Link");
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////
//Tabbed Component

tabsContainer.addEventListener("click", function (e) {
  // const clicked = e.target;
  // console.log(clicked); if we click on span elemt (1,2,3 number in the text) we still need the buttton
  // const clicked = e.target.parentElement; cant do this as we will get button when we click span as it is the parent but when we click the button we will get the container which is button's parent
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  //ignore clicks outside area using Guard clause

  if (!clicked) return;

  //remove the active classes for both tabs and content area
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));

  //active tab

  clicked.classList.add("operations__tab--active");

  //activate the content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////
//Menu fade animation Effect -> all the links fade out except the link we hover over by passing arguments to event handlers
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this; // we need to use this keyword if we want to pass in any other value and for multiple values we can pass in array
    });
    logo.style.opacity = this;
  }
};

//we cant directly do nav.addEventListener("mouseover",handleHover); as we have to pass the parameters
nav.addEventListener("mouseover", handleHover.bind(0.5)); // we dont use mouse enter event as it doesnt bubble

nav.addEventListener("mouseout", handleHover.bind(1)); // to go out of hover effect

///////////////////////////////////////
//Implementing sticky navigation : The Intersection Observer API

//learning about api

// const obsCallback = function (entries, observer) {
//   //whenever the view port of intersected at 10% this funtion will get called
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // entire view port
//   // threshold: 0.1, //% of callback 0.1 = 10% , we can have multiple threshhold
//   threshold: [0, 0.2], //in and out of the view port
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // same as entries[0]

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //0 % of header is visible we want something to happen
  rootMargin: `-${navHeight}px`, // box of 90 px outside of target element -> header in this case
});
headerObserver.observe(header);

///////////////////////////////////////
//Revealing elements on scroll :Intersection Observer API
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; //guard clause
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////
//Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]"); //not all the imgs are going to be lazy loaded so we dont select img
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img'); on a slow internet they will load really slow if we do this so we will remove the blur only if the high res img is loaded
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach((img) => imageObserver.observe(img));
