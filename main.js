/* ///////////////////////// SELECT STUFF FROM HTML ////////////////////////// */

let carouselSlide = document.querySelector('.carousel-slide');
let temoraryImg = document.querySelectorAll('.carousel-slide img');

let prev = document.querySelector("#prev");
let next = document.querySelector("#next");


/* ///////////////////////// clone first and last img ////////////////////////// */
let clone = document.createElement('img');
clone.setAttribute('src', temoraryImg[0].getAttribute("src"));
carouselSlide.appendChild(clone);
console.log(clone);

let otherClone = document.createElement('img');

otherClone.setAttribute('src', temoraryImg[temoraryImg.length - 1].getAttribute("src"));
carouselSlide.insertBefore(otherClone, temoraryImg[0]);

let carouselImages = document.querySelectorAll('.carousel-slide img');

/* ///////////////////////// SET FIRST IMAGE ////////////////////////// */

let counter = 1;
let size = carouselImages[0].clientWidth;
console.log(size);
carouselSlide.style.transform = "translateX(" + (size * (counter * 2)) + "px)";
