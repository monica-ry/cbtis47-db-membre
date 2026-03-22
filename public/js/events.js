async function loadEvents() {
    try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("No se pudo cargar los eventos");

        const events = await response.json();
        console.log("Eventos recibidos:", events); 

        const container = document.getElementById("eventsContainer");
        container.innerHTML = "";

        if (!events || events.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--primary)">No hay eventos recientes</p>`;
            return;
        }

        const now = new Date();

        events.forEach(event => {
            const startDate = new Date(event.start_date);
            const endDate = new Date(event.end_date);

            let diffMs = endDate - now;
            if (diffMs <= 0) return;
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            let remainingText = "";
            if (diffDays > 0) {
                remainingText = `${diffDays} día(s) restante(s)`;
            } else if (diffHours > 0) {
                remainingText = `${diffHours} hora(s) restante(s)`;
            } else {
                remainingText = `${diffMins} minuto(s) restante(s)`;
            }

            const imagePath = `images/${event.image}`;
            const img = new Image();
            img.src = imagePath;
            img.onerror = () => {
                img.src = "images/default.jpg"; 
            };

            const card = document.createElement("div");
            card.classList.add("info-card");
            card.innerHTML = `
                <img src="${img.src}" alt="${event.name}">
                <div class="card-text">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p style="font-weight:bold; color:var(--accent)">Tiempo restante: ${remainingText}</p>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando eventos:", error);
        const container = document.getElementById("eventsContainer");
        container.innerHTML = `<p style="text-align:center; color:red">No se pudieron cargar los eventos</p>`;
    }
}

// Cargar al abrir la página
loadEvents();

// Refrescar cada 1 minuto para actualizar tiempo restante
setInterval(loadEvents, 60000);