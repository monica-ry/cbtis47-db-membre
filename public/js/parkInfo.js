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

function createInfoRow(iconClass, label, value) {
    const row = document.createElement("div");
    row.className = "info-row";

    const iconSpan = document.createElement("span");
    iconSpan.className = "info-icon";

    const icon = document.createElement("i");
    icon.className = iconClass;
    iconSpan.appendChild(icon);

    const contentDiv = document.createElement("div");
    contentDiv.className = "info-content";

    const labelSpan = document.createElement("span");
    labelSpan.className = "info-label";
    labelSpan.textContent = label;

    const valueSpan = document.createElement("span");
    valueSpan.className = "info-value";
    valueSpan.textContent = value || "-";

    contentDiv.appendChild(labelSpan);
    contentDiv.appendChild(valueSpan);
    row.appendChild(iconSpan);
    row.appendChild(contentDiv);

    return row;
}

function renderParkInfo(park, container) {

    const card = document.createElement("div");
    card.className = "info-card";

    const textDiv = document.createElement("div");
    textDiv.className = "card-text";

    const title = document.createElement("h3");
    title.textContent = park.park_name;

    textDiv.appendChild(title);

    const fields = [
        ["fas fa-location-dot", "Address", park.location],
        ["fas fa-align-left", "Description", park.description],
        ["fas fa-clock", "Hours", `${park.open_time || "?"} - ${park.close_time || "?"}`],
        ["fas fa-calendar-days", "Open Days", park.open_days],
        ["fas fa-phone", "Phone", park.phone],
        ["fas fa-envelope", "Email", park.email],
        ["fas fa-rotate", "Last Updated", park.updated_at],
    ];

    fields.forEach(([icon, label, value], i) => {
        textDiv.appendChild(createInfoRow(icon, label, value));
    });

    card.appendChild(textDiv);
    container.appendChild(card);
}