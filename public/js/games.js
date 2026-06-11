console.log("JS funcionando");

document.addEventListener("DOMContentLoaded", () => {

    fetch("/api/games")
        .then(res => res.json())
        .then(data => {
            console.log("DATA:", data);

            const container = document.getElementById("gamesContainer");
            const template = document.getElementById("game-template");

            container.innerHTML = "";

            data.forEach(game => {

                const clone = template.content.cloneNode(true);

                clone.querySelector(".game-img").src = "/images/" + game.image;
                clone.querySelector(".game-name").textContent = game.name;
                clone.querySelector(".game-desc").textContent = game.description;

                container.appendChild(clone);

            });

        })
        .catch(err => {
            console.error("Error cargando juegos:", err);
        });

});