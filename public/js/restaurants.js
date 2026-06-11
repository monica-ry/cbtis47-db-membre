console.log("JS funcionando");
document.addEventListener("DOMContentLoaded", () => {

    fetch("/api/restaurants")
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("restaurantsContainer");
            const template = document.getElementById("restaurant-template");

            container.innerHTML = "";

            data.forEach(rest => {

                const clone = template.content.cloneNode(true);

                clone.querySelector(".game-img").src = "/images/" + rest.image;
                clone.querySelector(".game-name").textContent = rest.name;
                clone.querySelector(".game-desc").textContent = rest.description;

                container.appendChild(clone);

            });

        })
        .catch(err => console.error(err));

});