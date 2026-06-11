let editingRestaurantId = null;
let currentImage = "";

async function loadRestaurants() {
    const res = await fetch("/api/restaurants");
    const items = await res.json();
    const tbody = document.getElementById("restaurantsTableBody");
    tbody.innerHTML = items.map(r => `
        <tr>
            <td>${r.id}</td>
            <td>${r.image ? `<img src="/images/${esc(r.image)}" alt="">` : '-'}</td>
            <td>${esc(r.name)}</td>
            <td>${esc(r.type || '')}</td>
            <td>${esc(r.description || '')}</td>
            <td>
                <button class="btn-sm btn-edit" onclick="openEditModal(${r.id})">Edit</button>
                <button class="btn-sm btn-del" onclick="deleteRestaurant(${r.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

function openAddModal() {
    editingRestaurantId = null;
    currentImage = "";
    document.getElementById("restaurantId").value = "";
    document.getElementById("restaurantName").value = "";
    document.getElementById("restaurantType").value = "";
    document.getElementById("restaurantDesc").value = "";
    document.getElementById("restaurantImage").value = "";
    document.getElementById("restaurantImagePreview").textContent = "";
    document.getElementById("restaurantModal").style.display = "block";
    document.getElementById("restaurantModalOverlay").style.display = "block";
}

async function openEditModal(id) {
    const res = await fetch("/api/restaurants");
    const items = await res.json();
    const item = items.find(r => r.id === id);
    if (!item) return;
    editingRestaurantId = id;
    currentImage = item.image || "";
    document.getElementById("restaurantId").value = item.id;
    document.getElementById("restaurantName").value = item.name;
    document.getElementById("restaurantType").value = item.type || "";
    document.getElementById("restaurantDesc").value = item.description || "";
    document.getElementById("restaurantImage").value = "";
    document.getElementById("restaurantImagePreview").textContent = currentImage ? "Current: " + currentImage : "";
    document.getElementById("restaurantModal").style.display = "block";
    document.getElementById("restaurantModalOverlay").style.display = "block";
}

function closeRestaurantModal() {
    document.getElementById("restaurantModal").style.display = "none";
    document.getElementById("restaurantModalOverlay").style.display = "none";
}

async function saveRestaurant() {
    const name = document.getElementById("restaurantName").value.trim();
    const type = document.getElementById("restaurantType").value.trim();
    const description = document.getElementById("restaurantDesc").value.trim();
    if (!name) { showToast("Name is required", "error"); return; }

    let image = currentImage;
    const fileInput = document.getElementById("restaurantImage");
    if (fileInput.files && fileInput.files[0]) {
        const fd = new FormData();
        fd.append("image", fileInput.files[0]);
        const up = await fetch("/api/upload", { method: "POST", body: fd });
        const upData = await up.json();
        if (!upData.success) { showToast("Upload failed", "error"); return; }
        image = upData.filename;
    }

    const url = editingRestaurantId ? `/api/admin/restaurants/${editingRestaurantId}` : "/api/admin/restaurants";
    const method = editingRestaurantId ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, description, image }),
    });
    const data = await res.json();
    if (data.success) {
        showToast(editingRestaurantId ? "Restaurant updated" : "Restaurant added", "success");
        closeRestaurantModal();
        loadRestaurants();
    } else {
        showToast(data.error || "Error saving restaurant", "error");
    }
}

async function deleteRestaurant(id) {
    if (!confirm("Delete this restaurant?")) return;
    const res = await fetch(`/api/admin/restaurants/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
        showToast("Restaurant deleted", "success");
        loadRestaurants();
    } else {
        showToast(data.error || "Error deleting restaurant", "error");
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

document.addEventListener("DOMContentLoaded", loadRestaurants);
