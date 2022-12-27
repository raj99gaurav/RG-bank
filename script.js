"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

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
