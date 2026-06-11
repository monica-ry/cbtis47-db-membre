document.addEventListener("DOMContentLoaded", () => {
    loadParkInfo();
});

async function loadParkInfo() {

    const container = document.getElementById("parkInfoContainer");

    console.log("JS CARGADO OK");

    try {

        const response = await fetch("/park-info");
        const data = await response.json();

        console.log("API RESPONSE:", data);

        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = "<p class='error-message'>No hay datos del parque</p>";
            return;
        }

        const park = data[0];

        console.log("PARK OBJECT:", park);

        renderParkInfo(park, container);

    } catch (error) {

        console.error("ERROR FETCH:", error);

        container.innerHTML = "<p class='error-message'>Error cargando datos</p>";
    }
}

function renderParkInfo(park, container) {

    console.log("RENDER START:", park);

    const card = document.createElement("div");
    card.className = "info-card";

    const textDiv = document.createElement("div");
    textDiv.className = "card-text";

    const title = document.createElement("h3");
    title.textContent = park.park_name;

    const location = document.createElement("p");
    location.textContent = park.location;

    const description = document.createElement("p");
    description.textContent = park.description;

    const hours = document.createElement("p");
    hours.textContent = park.open_time + " - " + park.close_time;

    const days = document.createElement("p");
    days.textContent = park.open_days;

    const phone = document.createElement("p");
    phone.textContent = park.phone;

    const email = document.createElement("p");
    email.textContent = park.email;

    const update = document.createElement("p");
    update.textContent = "Updated: " + park.updated_at;

    textDiv.appendChild(title);
    textDiv.appendChild(location);
    textDiv.appendChild(description);
    textDiv.appendChild(hours);
    textDiv.appendChild(days);
    textDiv.appendChild(phone);
    textDiv.appendChild(email);
    textDiv.appendChild(update);

    card.appendChild(textDiv);
    container.appendChild(card);
}