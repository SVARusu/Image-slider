/* ///////////////////////// SELECT STUFF FROM HTML ////////////////////////// */
let carouselSlide = document.querySelector('.carousel-slide');
let imageCount = document.querySelector('.image-count span');
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
const lowerSliderPrev = document.querySelector("#lowerSliderPrev");
const lowerSliderNext = document.querySelector("#lowerSliderNext");
let thumbBar = document.querySelector('.thumb-bar');

let currentImageNumber = 1;
let totalImageNumber;
let carouselImages;
let countActiveImg = 0;
let smallerCounter = 0;
let thumbnailImages;
let counter = 1;
let imageSize;
let interval;

function makeRequest(method, url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url);
        request.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(request.response);
            } else {
                reject({
                    status: this.status,
                    statusText: request.response
                });
            }
        }
        request.onerror = function () {
            reject({
                status: this.status,
                statusText: request.response
            });
        }
        request.send();
    });
}
makeRequest('GET', "https://localhost:5000/images")
    .then(function (images) {
        images = JSON.parse(images);
        /* ///////////////////////// ADD IMAGES TO THE SLIDER////////////////////////// */
        for (let i = 0; i < images.length; i++) {
            let img = document.createElement('img');
            img.setAttribute("class", "carousel-image");
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.textContent = images[i].short_description;
            let h2 = document.createElement('h2');
            h2.textContent = images[i].name;
            img.setAttribute("src", images[i].url);
            div.appendChild(img)
            div.appendChild(h2);
            div.appendChild(p);
            carouselSlide.appendChild(div);
            
            /* //////////// ADD IMAGES TO THE SMALLER SLIDER ////////////// */
            let newImage = document.createElement('img');
            newImage.setAttribute('src', images[i].url);
            newImage.classList.add("newImg");
            newImage.addEventListener('click', changeImg.bind(null, i));
            thumbBar.appendChild(newImage);
        }
        thumbnailImages = document.querySelectorAll('.newImg');
        thumbnailImages[0].style.opacity = 1;

        /* ///////////////////////// CREATE THE IMAGE COUNT////////////////////////// */
        totalImageNumber = images.length;
        imageCount.textContent = "Image " + currentImageNumber + '/' + totalImageNumber;
        let temporaryImg = document.querySelectorAll('.carousel-slide img');

        /* ///////////////////////// CREATE CLONES////////////////////////// */
        temporaryImg[1].addEventListener("load", function () {
            imageSize = temporaryImg[1].clientWidth;
            for (let i = 1; i <= 2; i++) {

                let div1 = document.createElement('div');
                let par1 = document.createElement('p');
                par1.textContent = images[i - 1].short_description;
                let header1 = document.createElement('h2');
                header1.textContent = images[i - 1].name;
                let clone = document.createElement('img');
                clone.setAttribute('src', temporaryImg[i - 1].getAttribute("src"));
                clone.setAttribute('class', "lastClone");
                div1.appendChild(clone);
                div1.appendChild(header1);
                div1.appendChild(par1);

                carouselSlide.appendChild(div1);

                let div2 = document.createElement('div');
                let par2 = document.createElement('p');
                par2.textContent = images[images.length - i].short_description;
                let header2 = document.createElement('h2');
                header2.textContent = images[images.length - i].name;
                let otherClone = document.createElement('img');
                otherClone.setAttribute('src', temporaryImg[temporaryImg.length - i].getAttribute("src"));
                otherClone.setAttribute('class', "firstClone");
                div2.appendChild(otherClone);
                div2.appendChild(header2);
                div2.appendChild(par2);

                carouselSlide.prepend(div2);
            }
            carouselSlide.style.transform = "translateX(" + (-imageSize) + "px)";

            carouselImages = document.querySelectorAll('.carousel-slide img');
        });
    });

function changeOpacity() {
    for (let i = 0; i < thumbnailImages.length; i++) {
        thumbnailImages[i].style.opacity = 0.7
    }
}

function transitionForSmallerSlider(move) {
    thumbBar.style.transition = ".5s ease-in-out";
    thumbBar.style.transform = "translateX(" + (-20 * move) + "%)";
}

/* ///////////////////////// CHANGE THE IMAGE AUTOMATICALLY ////////////////////////// */
carouselSlide.addEventListener("wheel", function(e){
    e.stopPropagation();
    e.preventDefault();
    if(e.deltaY < 0){
        prevSlide();
    } else if (e.deltaY > 0){
        nextSlide();        
    }    
});

document.querySelector(".carousel-container").addEventListener("mouseleave", function () {
    interval = setInterval(nextSlide, 5000);
});
document.querySelector(".carousel-container").addEventListener("mouseover", function () {
    clearInterval(interval);
});

/* ///////////////////////// ADD EVENT LISTENERS ////////////////////////// */
next.addEventListener('click', nextSlide)
prev.addEventListener('click', prevSlide)
lowerSliderPrev.addEventListener('click', changeLeft);
lowerSliderNext.addEventListener('click', changeRight);

/* ///////////////////////// IMAGE BAR ////////////////////////// */
function changeRight() {
    transitionForSmallerSlider(5)
}

function changeLeft() {
    transitionForSmallerSlider(0)
}

function nextSlide() {
    if (counter >= carouselImages.length - 3) return;
    /* ///////////// change the active image on the smaller slider/////////////// */
    countActiveImg++;
    if (countActiveImg > thumbnailImages.length - 1) {
        countActiveImg = 0;
        transitionForSmallerSlider(countActiveImg)
    }
    if (countActiveImg === 5) {
        transitionForSmallerSlider(countActiveImg)
    }
    changeOpacity();
    thumbnailImages[countActiveImg].style.opacity = 1;
    //if (counter >= carouselImages.length - 2) return;
    carouselSlide.style.transition = "1.5s ease-in-out";
    counter++;
    carouselSlide.style.transform = "translateX(" + (-imageSize * counter) + "px)";

    /* ///////////// change the image number/////////////// */
    currentImageNumber++;
    if (currentImageNumber > totalImageNumber) currentImageNumber = 1;

    imageCount.textContent = "Image " + currentImageNumber + '/' + totalImageNumber;
}

function prevSlide() {
    if (counter <= 0) return;
    /* ///////////// change the active image on the smaller slider/////////////// */
    countActiveImg--;
    if (countActiveImg < 0) {
        countActiveImg = 9;
        transitionForSmallerSlider(5)
    }
    if (countActiveImg === 4) {
        transitionForSmallerSlider(0)
    }
    changeOpacity();
    thumbnailImages[countActiveImg].style.opacity = 1;

    //if (counter <= -1) return;
    carouselSlide.style.transition = "1.5s ease-in-out";
    counter--;
    carouselSlide.style.transform = "translateX(" + (-imageSize * counter) + "px)";
    /* ///////////// change the image number/////////////// */
    currentImageNumber--;
    if (currentImageNumber < 1) currentImageNumber = 10;

    imageCount.textContent = "Image " + currentImageNumber + '/' + totalImageNumber;
}

carouselSlide.addEventListener("transitionend", function () {
    if (carouselImages[counter + 1].classList.contains("firstClone")) {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 4;
        carouselSlide.style.transform = "translateX(" + (-imageSize * (counter)) + "px)";
    } else if (carouselImages[counter + 1].classList.contains("lastClone")) {
        carouselSlide.style.transition = 'none';
        counter = 1;
        carouselSlide.style.transform = "translateX(" + (-imageSize * (counter)) + "px)";
    }
});

/* ///////////////////////// IMAGE BAR EVENT ////////////////////////// */

function changeImg(index) {
    /* ///////////////////////// CHANGE THE ACTIVE IMAGE ON THE SMALLER SLIDER ON CLICK ////////////////////////// */
    countActiveImg = index;
    changeOpacity();
    thumbnailImages[countActiveImg].style.opacity = 1;
    /* ///////////////////////// CHANGE THE IMAGE NUMBER ////////////////////////// */
    currentImageNumber = index + 1;
    imageCount.textContent = "Image " + (currentImageNumber) + '/' + totalImageNumber;
    
    /* ///////////////////////// CHANGE THE ACTIVE IMAGE ON THE BIGGER SLIDER ON CLICK ////////////////////////// */
    counter = index + 1;
    carouselSlide.style.transition = ".8s ease-in-out";
    carouselSlide.style.transform = "translateX(" + (-imageSize * (counter)) + "px)";
}