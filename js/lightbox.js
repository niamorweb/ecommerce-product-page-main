const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.product-hero');

const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');

const overlay = document.querySelector('.overlay');
const lightbox = document.querySelector('.lightbox');

let lightboxGallery;
let lightboxHero;




btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);




function onThumbClick(event) {
    //clear active state for all thumbnails
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    // //update hero image
    heroImg.src = event.target.src.replace('-thumbnail', '');
}


function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
    
}

function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return(imageIndex)
}

heroImg.addEventListener('click', function(){
    console.log(heroImg.src)
})

function setHeroImage(imageIndex) {
    heroImg.src = `./images/image-product-${imageIndex}.jpg`;
    //images are not sync
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    // //set active thumbnail
    gallery[imageIndex-1].classList.add('active');
}






gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});


heroImg.addEventListener('click', onHeroImgClick);











function onHeroImgClick() {
    if (window.innerWidth >= 1100) {
        if (overlay.childElementCount == 1) {
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose);

            lightboxGallery = overlay.querySelectorAll('.pic');
            lightboxHero = overlay.querySelector('.product-hero');
            lightboxGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLightbox);
            });

            const btnOverlayNext = overlay.querySelector('.next');
            const btnOverlayPrevious = overlay.querySelector('.previous');
            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
            btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
        }
        overlay.classList.remove('hidden');
        document.documentElement.scrollTop = 0;
        document.querySelector('body').style.overflow="hidden"
    }
}

function onBtnOverlayClose() {
    overlay.classList.add('hidden');
    document.querySelector('body').style.overflow="visible"
}

function onThumbClickLightbox(event) {
    //clear active state for all thumbnails
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    lightboxHero.src = event.target.src.replace('-thumbnail', '');
}


function handleBtnClickNextOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
}

function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
}

function getOverlayCurrentImageIndex() {
    const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setOverlayHeroImage(imageIndex) {
    lightboxHero.src = `./images/image-product-${imageIndex}.jpg`;
    //images are not sync
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    lightboxGallery[imageIndex-1].classList.add('active');
}

