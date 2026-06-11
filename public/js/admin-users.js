async function loadUsers() {
    const res = await fetch("/api/admin/users");
    const users = await res.json();
    const tbody = document.getElementById("usersTableBody");
    tbody.innerHTML = users.map(u => `
        <tr>
            <td>${u.id}</td>
            <td>${esc(u.username)}</td>
            <td>${esc(u.email || '')}</td>
            <td>${esc(u.phone || '')}</td>
            <td><span class="admin-role ${u.role}">${u.role}</span></td>
            <td>${u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</td>
        </tr>
    `).join("");
}

function esc(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
}

document.addEventListener("DOMContentLoaded", loadUsers);
