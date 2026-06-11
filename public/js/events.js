console.log("JS funcionando");

document.addEventListener("DOMContentLoaded", () => {

    fetch("/api/events")
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("eventsContainer");
            const template = document.getElementById("event-template");

            console.log("TEMPLATE:", template);
            console.log("HTML:", template.innerHTML);

            container.innerHTML = "";

            data.forEach(event => {

                const clone = template.content.cloneNode(true);

                const start = new Date(event.start_date).toLocaleDateString();
                const end = new Date(event.end_date).toLocaleDateString();

                clone.querySelector(".game-img").src = "images/" + event.image;
                clone.querySelector(".game-name").textContent = event.name;
                clone.querySelector(".game-desc").textContent = event.description;
                clone.querySelector(".game-date").textContent =
                    `${start} - ${end}`;

                container.appendChild(clone);

            });

        })
        .catch(err => console.error(err));

});