const slider = document.querySelector('.slider');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
document.addEventListener('keydown', keyPress);

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

nextButton.addEventListener('touch', clickMoveNext);
prevButton.addEventListener('touch', clickMovePrev);
nextButton.addEventListener('click', clickMoveNext);
prevButton.addEventListener('click', clickMovePrev);

slides.forEach((slide, index) => {
  const slideFrame = slide.querySelector('.iframe');

  slideFrame.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);
  

  // Mouse events
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
})

// Disable context menu
window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    console.log(startPos);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex++;
  }
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();

  slider.classList.remove('grabbing');
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function clickMoveNext() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
  }
  setPositionByIndex();
  
}

function clickMovePrev() {
  if (currentIndex > 0) {
    currentIndex--;
  }
  setPositionByIndex();
}

function keyPress(e) {
  e = e || window.event;
  
  if (e.keyCode == '37') {
    clickMovePrev();
  } else if (e.keyCode == '39') {
    clickMoveNext();
  }
}