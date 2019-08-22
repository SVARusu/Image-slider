let carouselSlide = document.querySelector('.carousel-slide');
let carouselImages = document.querySelectorAll('.carousel-slide img');

let prev = document.querySelector("#prev");
let next = document.querySelector("#next");

let counter = 1;
let size = carouselImages[0].clientWidth;
console.log(size);

carouselSlide.style.transform = "translateX(" + (size * (counter * 2)) + "px)";
