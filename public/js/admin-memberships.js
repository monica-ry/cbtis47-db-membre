let editingMembershipId = null;

async function loadMemberships() {
    const res = await fetch("/api/memberships");
    const items = await res.json();
    const tbody = document.getElementById("membershipsTableBody");
    tbody.innerHTML = items.map(m => `
        <tr>
            <td>${m.id}</td>
            <td>${esc(m.name)}</td>
            <td>$${parseFloat(m.price).toFixed(2)}</td>
            <td>${esc(m.duration || '')}</td>
            <td>${esc((m.description || '').substring(0, 60))}${(m.description || '').length > 60 ? '...' : ''}</td>
            <td>${esc((m.benefits || '').substring(0, 60))}${(m.benefits || '').length > 60 ? '...' : ''}</td>
            <td>
                <button class="btn-sm btn-edit" onclick="openEditModal(${m.id})">Edit</button>
                <button class="btn-sm btn-del" onclick="deleteMembership(${m.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

function openAddModal() {
    editingMembershipId = null;
    document.getElementById("membershipId").value = "";
    document.getElementById("membershipName").value = "";
    document.getElementById("membershipPrice").value = "";
    document.getElementById("membershipDuration").value = "";
    document.getElementById("membershipDesc").value = "";
    document.getElementById("membershipBenefits").value = "";
    document.getElementById("membershipModal").style.display = "block";
    document.getElementById("membershipModalOverlay").style.display = "block";
}

async function openEditModal(id) {
    const res = await fetch("/api/memberships");
    const items = await res.json();
    const item = items.find(m => m.id === id);
    if (!item) return;
    editingMembershipId = id;
    document.getElementById("membershipId").value = item.id;
    document.getElementById("membershipName").value = item.name;
    document.getElementById("membershipPrice").value = item.price;
    document.getElementById("membershipDuration").value = item.duration || "";
    document.getElementById("membershipDesc").value = item.description || "";
    document.getElementById("membershipBenefits").value = item.benefits || "";
    document.getElementById("membershipModal").style.display = "block";
    document.getElementById("membershipModalOverlay").style.display = "block";
}

function closeMembershipModal() {
    document.getElementById("membershipModal").style.display = "none";
    document.getElementById("membershipModalOverlay").style.display = "none";
}

async function saveMembership() {
    const name = document.getElementById("membershipName").value.trim();
    const price = document.getElementById("membershipPrice").value;
    const duration = document.getElementById("membershipDuration").value.trim();
    const description = document.getElementById("membershipDesc").value.trim();
    const benefits = document.getElementById("membershipBenefits").value.trim();
    if (!name || !price) { showToast("Name and price are required", "error"); return; }

    const url = editingMembershipId ? `/api/admin/memberships/${editingMembershipId}` : "/api/admin/memberships";
    const method = editingMembershipId ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, duration, description, benefits }),
    });
    const data = await res.json();
    if (data.success) {
        showToast(editingMembershipId ? "Plan updated" : "Plan added", "success");
        closeMembershipModal();
        loadMemberships();
    } else {
        showToast(data.error || "Error saving plan", "error");
    }
}

async function deleteMembership(id) {
    if (!confirm("Delete this membership plan?")) return;
    const res = await fetch(`/api/admin/memberships/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
        showToast("Plan deleted", "success");
        loadMemberships();
    } else {
        showToast(data.error || "Error deleting plan", "error");
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

document.addEventListener("DOMContentLoaded", loadMemberships);
