let currentIndex = 0;
let isReversing = false; // 슬라이드가 역방향으로 진행 중인지 여부
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    const offset = -index * 100; // 슬라이드의 너비만큼 이동
    slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    if (!isReversing) {
        currentIndex++;
        if (currentIndex >= totalSlides - 1) { // 마지막 슬라이드에 도달했을 때
            isReversing = true;
        }
    } else {
        currentIndex--;
        if (currentIndex <= 0) { // 첫 번째 슬라이드에 도달했을 때
            isReversing = false;
        }
    }
    showSlide(currentIndex);
}

function prevSlide() {
    if (!isReversing) {
        currentIndex--;
        if (currentIndex <= 0) { // 첫 번째 슬라이드에 도달했을 때
            isReversing = true;
        }
    } else {
        currentIndex++;
        if (currentIndex >= totalSlides - 1) { // 마지막 슬라이드에 도달했을 때
            isReversing = false;
        }
    }
    showSlide(currentIndex);
}

showSlide(currentIndex);

setInterval(() => {
    nextSlide();
}, 5000);
