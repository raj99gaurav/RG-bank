"use strict";

//selections
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

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

//Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

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
