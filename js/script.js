let currentIndex = 1;
let totalSlides = 7;

const updateActiveSlide = () => {
    const titles = document.querySelectorAll(".title");
    titles.forEach((el, index) => {
        if (index + 0 === currentIndex) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
};

const handleSlider = () => {
    if (currentIndex < totalSlides) {
        currentIndex++;
    } else {
        currentIndex = 1;
    }

    gsap.to(".slide-titles", {
        onStart: () => {
            setTimeout(() => {
                updateActiveSlide();
            }, 100);

            updateImages(currentIndex + 1);
        },

        x: `-${(currentIndex - 1) * 11.1111}%`,
        duration: 2,
        ease: "power4.out",
    });
};

const updateImages = (currentIndex) => {
    const imgSrc = `./images/img${currentIndex}.jpg`;
    const imgTop = document.createElement("img");
    const imgBottom = document.createElement("img");

    imgTop.src = imgSrc;
    imgBottom.src = imgSrc;

    imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    imgTop.style.transform = "scale(2)";
    imgBottom.style.transform = "scale(2)";
    
    document.querySelector(".img-top").appendChild(imgTop);
    document.querySelector(".img-bottom").appendChild(imgBottom);

    gsap.to([imgTop, imgBottom], {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        transform: "scale(1)",
        duration: 2,
        ease: "power4.out",
        stagger: 0.15,
        onComplete: trimExcessImages,
    });
};

const trimExcessImages = () => {
    const selectors = [".img-top", ".img-bottom"];
    selectors.forEach((selector) => {
        const container = document.querySelector(selector);
        const images = Array.from(container.querySelector("img"));
        const exessCount = images.length - 5;

        if (exessCount > 0) {
            images.slice(0, exessCount).forEach((image) => container.removeChild(image));
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", handleSlider);

    updateImages(2);
    updateActiveSlide();
});