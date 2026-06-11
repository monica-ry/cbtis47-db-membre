function loadAdminNavbar() {
  const container = document.getElementById("navbar");
  if (!container) return;

  const page = window.location.pathname.split("/").pop() || "admin-dashboard";

  const items = [
    { label: "Dashboard", page: "admin-dashboard", auth: false },
    { label: "Games", page: "admin-games", auth: false },
    { label: "Restaurants", page: "admin-restaurants", auth: false },
    { label: "Users", page: "admin-users", auth: false },
    { label: "Park Info", page: "admin-parkinfo", auth: false },
    { label: "Memberships", page: "admin-memberships", auth: false },
    { label: "Messages", page: "admin", auth: false },
  ];

  const linksHTML = items
    .map(
      (item) =>
        `<div class="menu-item${page === item.page ? " active" : ""}" onclick="location.href='${item.page}'">${item.label}</div>`
    )
    .join("");

  container.innerHTML = `
    <div class="top-menu">
      <div class="menu-logo">
        <img src="images/logo.jpeg" alt="logo">
      </div>
      <div class="menu-links">
        ${linksHTML}
      </div>
      <div class="menu-profile" id="accountButton">
        <span id="userName">Admin</span>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user || user.role !== "admin") {
    window.location.href = "/adminaccess";
    return;
  }
  loadAdminNavbar();

  document.getElementById("accountButton").addEventListener("click", () => {
    const modal = document.getElementById("accountModal");
    if (modal) {
      const isVisible = modal.style.display === "flex";
      modal.style.display = isVisible ? "none" : "flex";
      document.getElementById("modalUsername").textContent = user.username;
      document.getElementById("modalEmail").textContent = user.email || "";
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedUser");
      window.location.href = "/adminaccess";
    });
  }
});
