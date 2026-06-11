document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [games, restaurants, users, memberships, messages] = await Promise.all([
            fetch("/api/admin/stats/games").then(r => r.json()),
            fetch("/api/admin/stats/restaurants").then(r => r.json()),
            fetch("/api/admin/stats/users").then(r => r.json()),
            fetch("/api/admin/stats/memberships").then(r => r.json()),
            fetch("/api/admin/stats/messages").then(r => r.json()),
        ]);
        document.getElementById("statGames").textContent = games.count;
        document.getElementById("statRestaurants").textContent = restaurants.count;
        document.getElementById("statUsers").textContent = users.count;
        document.getElementById("statMemberships").textContent = memberships.count;
        document.getElementById("statMessages").textContent = messages.count;
    } catch (e) {
        console.error("Error loading stats", e);
    }
});
