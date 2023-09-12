'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');
 
const tabs = document.querySelectorAll('.operations_tab') 
const tabContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');  

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
 
// const allSections = document.querySelectorAll('.section');
// const allButtons = document.getElementsByTagName('button');
// const header = document.querySelector('.header')
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// //message.textContent = 'we use cookies to improve functionalities and analytics';

// message.innerHTML = 'we use cookies to improve functionalities and analytics.<button class="btn btn--close-cookies">Got it!</button>'
// header.append(message);

// // header.append(message.cloneNode(true))

// document.querySelector('.btn--close-cookies').addEventListener(
//   'click', function() {
//     message.remove()
//   }
// )


// smoth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
    //getting coordinates of element we want to scrol to
  const s1coords = section1.getBoundingClientRect() 

   //now scrolling
   // examplE1 window.scrollTo(s1coords.left + window.PageXoffset, s1coords.top + window.PageYoffset);

   section1.scrollIntoView({
     behavior: 'smooth'
   })
  }) 

  

/* 
*event bubbling 
*and probagation 
*/



//////////////////////////////////
//page navigation

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e){ 
//     e.preventDefault()
//     const id = this.getAttribute('href') 
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     });
//   })
// }) 


//1. add event listener to common element
//2. determine which element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault()
  

  //matching strategy 
    if(e.target.classList.contains('nav__link')){
      const id = e.target.getAttribute('href');
      
     document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
     });
    }  ;

});

// const h1 = document.querySelector('h1') 

// //Going downwards: child

//  console.log(h1.querySelectorAll('.highlight')) 
//  console.log(h1.children)

//  h1.firstElementChild.style.color = 'white'

//  //GOING UPWARDS: PARENTS

//  console.log(h1.parentNode) 

//  h1.closest('h1').style.background = 'orange' 

 //Going Side ways: siblings

//  console.log(h1.previousElementSibling) 
//  console.log(h1.nextElementSibling) 

// console.log(h1.previousSibling)
// console.log(h1.nextSibling) 

// console.log(h1.parentElement.children)
 

// TAbbed component

tabContainer.addEventListener('click', (e) =>{
  const clicked = e.target.closest('.operations__tab');
 
  
  //Guard clause
if(!clicked) return;

// remove active classes
tabs.forEach(t => t.classList.remove('operations__tab--active'));
tabsContent.forEach(c => c.classList.remove('operations__content--active'))


//Active tab
clicked.classList.add('operations__tab--active'); 

//Active content area

document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
}) 

//Menu fade navigation
const handleHover = function(e, opcacity) { 
  if(e.target.classList.contains('nav__link')) {
  const link = e.target;

  const siblings = link.closest('.nav').querySelectorAll('.nav__link') 
  const logo = link.closest('.nav').querySelector('img') 

  siblings.forEach(el => {
    if(el !== link) el.style.opcacity = opcacity;
  });

  logo.style.opcacity = opcacity;
}
}

// passing "arguument into handler "
nav.addEventListener('mouseover', handleHover)

nav.addEventListener('mouseout', handleHover); 

//--------------Sticky Navigation using Intersaction Observer API------/////

// const obsCallback = function (entries, observer) {
//   entries.forEach( entry =>{
//     console.log(entry)
//   });

// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1) 
 
const header = document.querySelector('.header'); 
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight)

const stickyNav = function(entries) {
  const [entry] = entries
 

  if(!entry.isIntersecting
    ) nav.classList.add('sticky'); 

  else nav.classList.remove('sticky')


}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header)


//-------reveal sections-----// 
const allSections = document.querySelectorAll('.section') 

const revealSection = function(entries, observer) {
  const [entry] = entries;
  

  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden') 
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {  
  root: null,
  threshold: 0.15}) 

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
}) 

//----Lazy Loading Images---//


const imgTargets = document.querySelectorAll('img[data-src]')
console.log(imgTargets);

const loadImg = function(entries, observer) {
  const [entry] = entries;
  
  if(!entry.isIntersecting) return; 

  // Replace src with data-src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (){
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {

  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img));

//slider

const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left'); 
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');

const createDots = function() {
  slides.forEach()
}

let curSlide = 0;
const maxSlide = slides.length

// const slider = document.querySelector('.slider'); 
// slider.style.transform = 'scale(0.5)'
// slider.style.overflow= 'visible'



// 0%, 100%, 200%, 300%
const goToSlide = function(slide){
  slides.forEach((s,i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)); 
}

goToSlide(0)
//next slide
const nextSlide = function(){ 
  if(curSlide === maxSlide - 1){
    curSlide =0;
  } else{
curSlide++;} 

goToSlide(curSlide)

} 

//prevous slide

const prevSlide = () =>{
  if(curSlide ===0){
    curSlide = maxSlide -1;
  }
  else{
  curSlide--;}
  goToSlide(curSlide)
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide) 

document.addEventListener('keydown', function(e){
  console.log(e) 
  if(e.key === 'ArrowLeft') {
    prevSlide();
  }
  if(e.key === 'ArrowRight'){
    nextSlide()
  }
})
