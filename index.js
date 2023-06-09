// Scroll to top at page refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }



// DropDown Menu
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.onclick = function (){
dropDownMenu.classList.toggle('open');
const isOpen = dropDownMenu.classList.contains('open');

toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}

// Carousel Sliding
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0];
wrapper = carousel.querySelector(".wrapper");
arrowIcons = document.querySelectorAll(".wrapper i");

let dragState = false, isReallyDragging = false, prevPageX, prevScrollLeft, positionDiff;


const showHideIcons = () => {  
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;  
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 21;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => {

    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 21;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const isDragging = (e) => {
    dragState = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const notDragging = () => {
    dragState = false;
    carousel.classList.remove("dragging");

    if(!isReallyDragging) return;
    isReallyDragging = false;

    autoSlide();
}

const dragging = (e) => {
    if(!dragState) return;
    e.preventDefault();
    isReallyDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

carousel.addEventListener("mousedown", isDragging);
carousel.addEventListener("touchstart", isDragging);


carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);


carousel.addEventListener("mouseup", notDragging);
carousel.addEventListener("mouseleave", notDragging);
carousel.addEventListener("touchend", notDragging);