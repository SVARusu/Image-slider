/* ///////////////////////// SELECT STUFF FROM HTML ////////////////////////// */

let carouselSlide = document.querySelector('.carousel-slide');
let temoraryImg = document.querySelectorAll('.carousel-slide img');
let dots = document.querySelectorAll('.dot');
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");


/* ///////////////////////// clone first and last img ////////////////////////// */
let clone = document.createElement('img');
clone.setAttribute('src', temoraryImg[0].getAttribute("src"));
clone.setAttribute('id', "lastClone");
carouselSlide.appendChild(clone);
console.log(clone);

let otherClone = document.createElement('img');

otherClone.setAttribute('src', temoraryImg[temoraryImg.length - 1].getAttribute("src"));
otherClone.setAttribute('id', "firstClone");
carouselSlide.insertBefore(otherClone, temoraryImg[0]);

let carouselImages = document.querySelectorAll('.carousel-slide img');

/* ///////////////////////// SET FIRST IMAGE ////////////////////////// */


let counter = 0;
dots[counter].style.background = '#9C0000';
let space = 1;
let size = carouselImages[0].clientWidth;
console.log(size);
//carouselSlide.style.transform = "translateX(" + (size * (counter * space)) + "px)";
carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
next.addEventListener('click', function () {
    dots[counter].style.background = 'rgb(0, 0, 0)';
    if(counter >= carouselImages.length-2) return;
    carouselSlide.style.transition = ".8s ease-in-out";
    counter++;
    space++
    dots[counter].style.background = '#9C0000';
    //console.log(counter);
    carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";

});

prev.addEventListener('click', function () {
    dots[counter].style.background = 'rgb(0, 0, 0)';
    if(counter <= -1) return;
    carouselSlide.style.transition = ".8s ease-in-out";
    counter--;
    space--
    dots[counter].style.background = '#9C0000';
    //console.log(counter);
    carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";

});

carouselSlide.addEventListener("transitionend", function () {
    if (carouselImages[counter+1].id === "firstClone") {
        console.log(counter);
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length-3;
        carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }else if (carouselImages[counter+1].id === "lastClone") {
        console.log(counter);
        carouselSlide.style.transition = 'none';
        counter = 0;
        carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }
})