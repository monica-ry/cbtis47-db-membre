document.addEventListener("DOMContentLoaded", () => {

    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {

        const slidesContainer = carousel.querySelector(".slides");
        const slides = carousel.querySelectorAll(".slide");
        const dotsContainer = carousel.querySelector(".dots");

        let index = 0;

        /* crear puntos */

        slides.forEach((_, i) => {

            const dot = document.createElement("div");
            dot.classList.add("dot");

            if (i === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {

                index = i;
                showSlide();

            });

            dotsContainer.appendChild(dot);

        });

        const dots = dotsContainer.querySelectorAll(".dot");

        function showSlide() {

            slidesContainer.style.transform =
                `translateX(-${index * 100}%)`;

            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");

        }

        function autoSlide() {

            index++;

            if (index >= slides.length) {
                index = 0;
            }

            showSlide();

        }

        setInterval(autoSlide, 4000);

    });

});