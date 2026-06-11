async function loadParkInfo() {
    try {
        const res = await fetch("/park-info");
        const data = await res.json();
        const info = Array.isArray(data) ? data[0] : data;
        if (!info) return;
        document.getElementById("parkName").value = info.park_name || "";
        document.getElementById("parkLocation").value = info.location || "";
        document.getElementById("parkDescription").value = info.description || "";
        document.getElementById("parkOpen").value = info.open_time || "";
        document.getElementById("parkClose").value = info.close_time || "";
        document.getElementById("parkDays").value = info.open_days || "";
        document.getElementById("parkPhone").value = info.phone || "";
        document.getElementById("parkEmail").value = info.email || "";
    } catch (e) {
        console.error("Error loading park info", e);
    }
}

async function saveParkInfo() {
    const data = {
        park_name: document.getElementById("parkName").value.trim(),
        location: document.getElementById("parkLocation").value.trim(),
        description: document.getElementById("parkDescription").value.trim(),
        open_time: document.getElementById("parkOpen").value.trim(),
        close_time: document.getElementById("parkClose").value.trim(),
        open_days: document.getElementById("parkDays").value.trim(),
        phone: document.getElementById("parkPhone").value.trim(),
        email: document.getElementById("parkEmail").value.trim(),
    };

    try {
        const res = await fetch("/api/admin/parkinfo", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
            showToast("Park info updated", "success");
        } else {
            showToast(result.error || "Error saving", "error");
        }
    } catch (e) {
        showToast("Error saving park info", "error");
    }
}

function showToast(msg, type) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

document.addEventListener("DOMContentLoaded", loadParkInfo);
