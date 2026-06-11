function initCarousel() {

    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {

        const slidesContainer = carousel.querySelector(".slides");
        const slides = carousel.querySelectorAll(".slide");
        const dotsContainer = carousel.querySelector(".dots");

        if (!slidesContainer || !dotsContainer || slides.length === 0) return;

        dotsContainer.innerHTML = "";

        let index = 0;

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

            if (!dots[index]) return;

            slidesContainer.style.transform = `translateX(-${index * 100}%)`;

            dots.forEach(d => d.classList.remove("active"));
            dots[index].classList.add("active");
        }

        function autoSlide() {
            index = (index + 1) % slides.length;
            showSlide();
        }

        showSlide();
        setInterval(autoSlide, 4000);
    });
}