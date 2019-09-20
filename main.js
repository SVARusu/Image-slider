/* ///////////////////////// SELECT STUFF FROM HTML ////////////////////////// */
let carouselSlide = document.querySelector('.carousel-slide');
let imageCount = document.querySelector('.image-count span');
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
const lowerSliderPrev = document.querySelector("#lowerSliderPrev");
const lowerSliderNext = document.querySelector("#lowerSliderNext");
const loader = document.querySelector(".loader");
let thumbBar = document.querySelector('.thumb-bar');
document.querySelector(".carousel-container").style.opacity = 0;
loader.style.opacity = 1;
let currentImageNumber = 1;
let totalImageNumber;
let carouselImages;
let countActiveImg = 0;
let smallerCounter = 0;
let thumbnailImages;
let counter = 1;
let imageSize = 0;
let interval;
let totalImageSize = 0;
let initialImageSize = 0;




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
            //let thumbDiv = document.createElement('div');
            newImage.setAttribute('src', images[i].url);
            newImage.classList.add("newImg");
            newImage.addEventListener('click', changeImg.bind(null, i));
            //thumbDiv.appendChild(newImage);
            thumbBar.appendChild(newImage);
        }
        thumbnailImages = document.querySelectorAll('.newImg');
        thumbnailImages[0].style.opacity = 1;

        /* ///////////////////////// CREATE THE IMAGE COUNT////////////////////////// */
        totalImageNumber = images.length;
        imageCount.textContent = "Image " + currentImageNumber + '/' + totalImageNumber;
        let temporaryImg = document.querySelectorAll('.carousel-slide img');


        /* ///////////////////////// CREATE CLONES////////////////////////// */
        temporaryImg[temporaryImg.length - 1].addEventListener("load", function () {

            //imageSize = temporaryImg[0].clientWidth;
            temporaryImg.forEach(image => {
                totalImageSize = totalImageSize + image.clientWidth;
            });
            console.log(imageSize);
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
                imageSize = imageSize + temporaryImg[temporaryImg.length - i].clientWidth;
                console.log(temporaryImg[temporaryImg.length - i].clientWidth);
            }

           
            //carouselSlide.style.marginLeft = "-" + ((window.innerWidth - temporaryImg[0].clientWidth)) + "px";

            carouselImages = document.querySelectorAll('.carousel-slide img');
            /* carouselImages[carouselImages.length - 1].addEventListener("load", function () {
                loader.style.opacity = 0;
                document.querySelector(".carousel-container").style.opacity = 1;

            }); */

            console.log(totalImageSize);

            onImagesLoaded(function() {
                //alert("All the images have loaded");
                loader.style.opacity = 0;
                document.querySelector(".carousel-container").style.opacity = 1;
                initialImageSize = imageSize;
                carouselSlide.style.transform = "translateX(" + (-imageSize + (window.innerWidth - temporaryImg[0].clientWidth) / 2) + "px)";
            });

        });
    });


function onImagesLoaded(event) {
    //var images = container.getElementsByTagName("img");
    let loaded = carouselImages.length;
    for (let i = 0; i < carouselImages.length; i++) {
        if (carouselImages[i].complete) {
            loaded--;
        }
        else {
            carouselImages[i].addEventListener("load", function () {
                loaded--;
                if (loaded == 0) {
                    event();
                }
            });
        }
        if (loaded == 0) {
            event();
        }
    }
}

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
carouselSlide.addEventListener("wheel", function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.deltaY < 0) {
        prevSlide();
    } else if (e.deltaY > 0) {
        nextSlide();
    }
});

document.querySelector(".carousel-container").addEventListener("mouseleave", function () {
    //interval = setInterval(nextSlide, 5000);
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
    //transitionForSmallerSlider(5)
    console.log("Well this is awkward");

}

function changeLeft() {
    //transitionForSmallerSlider(0)
    console.log("Well this is awkward");
}

function nextSlide() {
    if (counter >= carouselImages.length - 3) return;
    /* ///////////// change the active image on the smaller slider/////////////// */
    countActiveImg++;
    if (countActiveImg > thumbnailImages.length - 1) {
        countActiveImg = 0;
        //transitionForSmallerSlider(countActiveImg)
    }
    if (countActiveImg === 5) {
        //transitionForSmallerSlider(countActiveImg)
    }
    changeOpacity();
    thumbnailImages[countActiveImg].style.opacity = 1;
    //if (counter >= carouselImages.length - 2) return;
    carouselSlide.style.transition = "1.5s ease-in-out";
    counter++;
    //imageSize = imageSize + ((window.innerWidth / 2 - carouselImages[counter + 1].clientWidth / 2));
    //imageSize = imageSize + carouselImages[counter + 1].clientWidth/2;
    console.log('Image Size:', imageSize);

    imageSize = imageSize + carouselImages[counter].clientWidth;
    console.log('After change: ', imageSize, carouselImages[counter].clientWidth, carouselImages[counter + 1].clientWidth);

    //carouselSlide.style.transform = "translateX(" + (-imageSize * counter) + "px)";
    carouselSlide.style.transform = "translateX(" + (-imageSize + (window.innerWidth - carouselImages[counter + 1].clientWidth) / 2) + "px)";
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
        //transitionForSmallerSlider(5)
    }
    if (countActiveImg === 4) {
        //transitionForSmallerSlider(0)
    }
    changeOpacity();
    thumbnailImages[countActiveImg].style.opacity = 1;

    //if (counter <= -1) return;
    carouselSlide.style.transition = "1.5s ease-in-out";
    counter--;
    //carouselSlide.style.transform = "translateX(" + (-imageSize * counter) + "px)";
    imageSize = imageSize - carouselImages[counter + 1].clientWidth;
    console.log(carouselImages[counter + 1]);
    carouselSlide.style.transform = "translateX(" + (-imageSize + (window.innerWidth - carouselImages[counter + 1].clientWidth) / 2) + "px)";
    console.log(carouselImages[counter + 1].clientWidth);
    /* ///////////// change the image number/////////////// */
    currentImageNumber--;
    if (currentImageNumber < 1) currentImageNumber = 10;

    imageCount.textContent = "Image " + currentImageNumber + '/' + totalImageNumber;
}

carouselSlide.addEventListener("transitionend", function () {
    if (carouselImages[counter + 1].classList.contains("firstClone")) {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 4;
        imageSize = totalImageSize + carouselImages[counter].clientWidth;
        carouselSlide.style.transform = "translateX(" + (-imageSize + (window.innerWidth - carouselImages[counter + 1].clientWidth) / 2) + "px)";
    } else if (carouselImages[counter + 1].classList.contains("lastClone")) {
        carouselSlide.style.transition = 'none';
        counter = 1;
        console.log("initial size:", initialImageSize);

        imageSize = initialImageSize;
        console.log("Image size:", imageSize);
        carouselSlide.style.transform = "translateX(" + (-imageSize + (window.innerWidth - carouselImages[counter + 1].clientWidth) / 2) + "px)";
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
    imageSize = initialImageSize;
    counter = index + 1;
    for (let i = 2; i < index + 2; i++) {
        imageSize = imageSize + carouselImages[i].clientWidth;
        console.log(carouselImages[i]);
    }
    console.log(imageSize);
    carouselSlide.style.transition = ".8s ease-in-out";
    carouselSlide.style.transform = "translateX(" + (-imageSize + (window.innerWidth - carouselImages[counter + 1].clientWidth) / 2) + "px)";
}

console.log(window.innerWidth);
