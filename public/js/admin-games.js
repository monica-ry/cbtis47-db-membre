let editingGameId = null;

async function loadGames() {
    const res = await fetch("/api/games");
    const games = await res.json();
    const tbody = document.getElementById("gamesTableBody");
    tbody.innerHTML = games.map(g => `
        <tr>
            <td>${g.id}</td>
            <td>${g.image ? `<img src="${esc(g.image)}" alt="">` : '-'}</td>
            <td>${esc(g.name)}</td>
            <td>${esc(g.description || '')}</td>
            <td>${g.status}</td>
            <td>
                <button class="btn-sm btn-edit" onclick="openEditModal(${g.id})">Edit</button>
                <button class="btn-sm btn-del" onclick="deleteGame(${g.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

function openAddModal() {
    editingGameId = null;
    document.getElementById("gameId").value = "";
    document.getElementById("gameName").value = "";
    document.getElementById("gameDesc").value = "";
    document.getElementById("gameImage").value = "";
    document.getElementById("gameStatus").value = "active";
    document.getElementById("gameModal").style.display = "block";
    document.getElementById("gameModalOverlay").style.display = "block";
}

async function openEditModal(id) {
    const res = await fetch("/api/games");
    const games = await res.json();
    const game = games.find(g => g.id === id);
    if (!game) return;
    editingGameId = id;
    document.getElementById("gameId").value = game.id;
    document.getElementById("gameName").value = game.name;
    document.getElementById("gameDesc").value = game.description || "";
    document.getElementById("gameImage").value = game.image || "";
    document.getElementById("gameStatus").value = game.status || "active";
    document.getElementById("gameModal").style.display = "block";
    document.getElementById("gameModalOverlay").style.display = "block";
}

function closeGameModal() {
    document.getElementById("gameModal").style.display = "none";
    document.getElementById("gameModalOverlay").style.display = "none";
}

async function saveGame() {
    const name = document.getElementById("gameName").value.trim();
    const description = document.getElementById("gameDesc").value.trim();
    const image = document.getElementById("gameImage").value.trim();
    const status = document.getElementById("gameStatus").value;
    if (!name) { showToast("Name is required", "error"); return; }

    const url = editingGameId ? `/api/admin/games/${editingGameId}` : "/api/admin/games";
    const method = editingGameId ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image, status }),
    });
    const data = await res.json();
    if (data.success) {
        showToast(editingGameId ? "Game updated" : "Game added", "success");
        closeGameModal();
        loadGames();
    } else {
        showToast(data.error || "Error saving game", "error");
    }
}

async function deleteGame(id) {
    if (!confirm("Delete this game?")) return;
    const res = await fetch(`/api/admin/games/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
        showToast("Game deleted", "success");
        loadGames();
    } else {
        showToast(data.error || "Error deleting game", "error");
    }
}

function showToast(msg, type) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function esc(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
}

document.addEventListener("DOMContentLoaded", loadGames);
