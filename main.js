var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for(let i = 1; i <= 5; i++){
  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic'+ i + '.jpg');
  newImage.classList.add("newImg");
  newImage.addEventListener('click',  changeImage);
  thumbBar.appendChild(newImage);
}

function changeImage(e){
  document.querySelector('.displayed-img').setAttribute('src', e.target.getAttribute('src'))
  // e.target.getAttribute('src');
  // console.log(e.target.getAttribute('src'));
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function(e){
  console.log(btn.classList);
  
  if(e.target.classList.contains('dark')){
    btn.setAttribute('class', 'light');
    btn.textContent = "Lighten";
    document.querySelector('.overlay').style.background = "rgba(0,0,0,0.5)";
  }
  else{
    btn.setAttribute('class', 'dark');
    btn.textContent = "Darken";
    document.querySelector('.overlay').style.background = "rgba(0,0,0,0)";
  }
});

function slideImg(n){
  let img = document.querySelector('.displayed-img').getAttribute('src');
  let slides = document.getElementsByClassName('newImg');
  for(let i = 0; i < slides.length; i++){
    if(img === slides[i].getAttribute('src')){
      let index = i + n;
      console.log(slides[i].getAttribute('src'));
      if(index < 0){
        document.querySelector('.displayed-img').setAttribute('src', slides[slides.length - 1].getAttribute('src'))
      }else if(index > slides.length - 1) {
        document.querySelector('.displayed-img').setAttribute('src', slides[0].getAttribute('src'))
      }
      else if(n < 1){
        document.querySelector('.displayed-img').setAttribute('src', slides[i - 1].getAttribute('src'))
      }
      else{
        document.querySelector('.displayed-img').setAttribute('src', slides[i + 1].getAttribute('src'))
      }
      //document.querySelector('.displayed-img').setAttribute('src', slides[i + 1].getAttribute('src'))
    }
  }
}
 
// class Person{
//   constructor(name, age){
//     this.name = name;
//     this.age = age
//   }
//   printName(){
//     console.log(`${this.name} is ${this.age} years old`);
    
//   }

// }

// class Student extends Person{
//   constructor(field, name, age){
//     super(name, age);
//     this.field = field;
//   }
// }

// let mike = new Person("mike", 25);
// let tim = new Student("info", "tim", 21);
// tim.printName()

// mike.printName()
