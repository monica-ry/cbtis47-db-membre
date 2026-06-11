function loadNavbar() {
  const container = document.getElementById("navbar");
  if (!container) return;

  const page = window.location.pathname.split("/").pop() || "dashboard";

  const items = [
    { label: "Home", page: "dashboard", auth: false },
    { label: "Membership", page: "memberships", auth: true },
    { label: "Games", page: "games", auth: false },
    { label: "Restaurant", page: "restaurants", auth: false },
    { label: "Park Info", page: "parkInfo", auth: false },
    { label: "Events", page: "events", auth: false },
    { label: "Messages", page: "messages", auth: true },
  ];

  const linksHTML = items
    .map(
      (item) =>
        `<div class="menu-item${page === item.page ? " active" : ""}" onclick="${item.auth ? `checkAccess('${item.page}')` : `location.href='${item.page}'`}">${item.label}</div>`
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
      <div class="menu-msg" onclick="checkAccess('messages')">
        <img src="images/msspark.png" alt="messages">
      </div>
      <div class="menu-profile" id="accountButton">
        <span id="userName">Log in</span>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", loadNavbar);
