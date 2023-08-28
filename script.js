'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
 
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header')
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'we use cookies to improve functionalities and analytics';

message.innerHTML = 'we use cookies to improve functionalities and analytics.<button class="btn btn--close-cookies">Got it!</button>'
header.append(message);

// header.append(message.cloneNode(true))

document.querySelector('.btn--close-cookies').addEventListener(
  'click', function() {
    message.remove()
  }
)
