/***
 * This script runs the interactive elemnts of Cheryl's World.
 */

let currentSlide = 0;
let currentSlides = [];

window.onload = function() {
    const splashImage = document.querySelector('.splash-container img');
    setTimeout(() => {
        splashImage.classList.add('bounce-in'); /* Trigger bounce-in effect */
    }, 500);
};

/***
 * Loads the main room when the splash image is clicked.
 */
const splashImage = document.getElementById('splash-image');
const splashContainer = document.querySelector('.splash-container');
const mainContent = document.querySelector('.background');
splashImage.addEventListener('click', () => {
    splashContainer.style.opacity = 0;

    setTimeout(() => {
        splashContainer.style.display = 'none';
    }, 1000);

    setTimeout(() => {
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = 1;
    }, 500);

    const tutorialContainer = document.querySelector('.tutorial-container');
    setTimeout(() => {
        tutorialContainer.style.opacity = '1';
        tutorialContainer.style.visibility = 'visible';
    }, 2000);

});

/***
 * Shows a slide in the popoup depending on index.
 */
function showSlide(index) {
    const slides = document.querySelectorAll('.popup-slide');    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
}

/***
 * Creates slides for a popup based on info.
 */
function createSlides(info) {
    const slidesContainer = document.getElementById('popup-slides');
    slidesContainer.innerHTML = '';
    currentSlides = JSON.parse(info);

    const popupNav = document.querySelector('.popup-nav');
    if (currentSlides.length === 1) {
        popupNav.style.display = 'none';
    } else {
        popupNav.style.display = 'flex';
    }
    
    currentSlides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'popup-slide';

        if (slide.youtube_link) {
            slideDiv.innerHTML = `
                <p class="popup-title">${slide.title}</p>
                <iframe width="700" height="420" src="${slide.youtube_link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>                
                <p class="popup-text">${slide.text}</p>
            `;
        } else if (slide.spotify_link) {
            slideDiv.innerHTML = `
                <p class="popup-title">${slide.title}</p>
                <iframe style="border-radius:12px" src=${slide.spotify_link}" width="700" height="400" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                <p class="popup-text">${slide.text}</p>
            `;
        } else if (slide.image && slide.text && slide.link) {
            slideDiv.innerHTML = `
                <p class="popup-title">${slide.title}</p>
                <a href="${slide.link}" target="_blank">
                    <img class="popup-image link-image" src="${slide.image}" alt="Slide ${index + 1}">
                </a>
                <p class="popup-text">${slide.text.replace(/\n/g, '<br>')}</p>
            `;
        } else if (slide.image && slide.text) {
            slideDiv.innerHTML = `
                <p class="popup-title">${slide.title}</p>
                <img class="popup-image" src="${slide.image}" alt="Slide ${index + 1}">
                <p class="popup-text">${slide.text.replace(/\n/g, '<br>')}</p>
            `;
        } else if (slide.image) {
            slideDiv.innerHTML = `
                <p class="popup-title">${slide.title}</p>
                <img class="popup-image" src="${slide.image}" alt="Slide ${index + 1}">
            `;
        }
        else if (slide.text){
            slideDiv.innerHTML = `
                <p class="popup-title">${slide.title}</p>
                <p class="popup-text">${slide.text}</p>
            `;
        } else {
            slideDiv.innerHTML = `
                <p class="popup-title">${slide.title}</p>
            `;
        }
        slidesContainer.appendChild(slideDiv);
    });
    
    showSlide(0);
}
 
/***
 * Shows a pop-up when each object is clicked.
 */
document.querySelectorAll('.object').forEach(object => {
    object.addEventListener('click', function(e) {
        e.stopPropagation();
        const popup = document.getElementById('popup');
        createSlides(this.dataset.info);
        popup.style.display = 'block';
    });
});

/***
 * Closes the pop-up when the close buton is clicked.
 */
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

/***
 * Navigates to the previous slide when the previous button is clicked.
 */
document.querySelector('.prev-btn').addEventListener('click', () => {
    if (currentSlide == 0) {
        showSlide(currentSlides.length - 1)
    } else if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
});


/***
 * Navigates to the next slide when the previous button is clicked.
 */
document.querySelector('.next-btn').addEventListener('click', () => {
    if (currentSlide == currentSlides.length - 1) {
        showSlide(0)
    } else if (currentSlide < currentSlides.length - 1) {
        showSlide(currentSlide + 1);
    }
});

/***
 * Play the corresponding sound for an object whenever it is hovered over.
 */
const objects = document.querySelectorAll('.object');
objects.forEach((object) => {
    object.addEventListener('mouseenter', function () { // Trigger on hover
        const soundId = object.getAttribute('data-sound'); // Get the sound ID
        if (soundId) {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0; // Reset sound to the beginning
                sound.play(); // Play the sound
            }
        }
    });
});

/***
 * Closes the pop-up when anywhere outside the pop-up is clicked.
 */
window.addEventListener('click', function(event) {
    const popup = document.getElementById('popup');
    if (event.target !== popup && !popup.contains(event.target)) {
        popup.style.display = 'none';
    }
});

document.querySelector('.gotit-btn').addEventListener('click', () => {
    const tutorialContainer = document.querySelector('.tutorial-container');
    tutorialContainer.style.display = 'none';
});