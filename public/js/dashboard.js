document.addEventListener("DOMContentLoaded", () => {
    loadAll();
    initCarousel();
});

async function loadAll() {

    await Promise.all([
        loadEvents(),
        loadGames(),
        loadRestaurants(),
        loadInfo()
    ]);

}

/* ================= EVENTS ================= */
async function loadEvents() {

    const res = await fetch("/api/events");
    const data = await res.json();

    const container = document.getElementById("eventsSlides");
    const template = document.getElementById("slide-template");

    container.innerHTML = "";

    data.forEach(item => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".slide-img").src = `/images/${item.image}`;
        clone.querySelector(".slide-title").textContent = item.name;
        clone.querySelector(".slide-desc").textContent = item.description;

        container.appendChild(clone);
        console.log("RENDER EVENTS:", data);
        console.log("CONTAINER:", document.getElementById("eventsSlides"));
    });
}

/* ================= GAMES ================= */
async function loadGames() {

    const res = await fetch("/api/games");
    const data = await res.json();

    const container = document.getElementById("gamesSlides");
    const template = document.getElementById("slide-template");

    container.innerHTML = "";

    data.forEach(item => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".slide-img").src = `/images/${item.image}`;
        clone.querySelector(".slide-title").textContent = item.name;
        clone.querySelector(".slide-desc").textContent = item.description;

        container.appendChild(clone);
    });
}

/* ================= RESTAURANTS ================= */
async function loadRestaurants() {

    const res = await fetch("/api/restaurants");
    const data = await res.json();

    const container = document.getElementById("restaurantsSlides");
    const template = document.getElementById("slide-template");

    container.innerHTML = "";

    data.forEach(item => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".slide-img").src = `/images/${item.image}`;
        clone.querySelector(".slide-title").textContent = item.name;
        clone.querySelector(".slide-desc").textContent = item.description;

        container.appendChild(clone);
    });
}
/* LOCATION */
async function loadInfo() {

    const res = await fetch("/park-info");
    const data = await res.json();

    console.log(data);

}