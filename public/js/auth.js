function checkAccess(destination) {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        alert("You must log in to access this section.");
        localStorage.setItem("redirectAfterLogin", destination);
        window.location.href = "index.html";
    } else {
        window.location.href = destination;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) {
        const greetingEl = document.querySelector(".greeting");
        if (greetingEl) greetingEl.innerText = `Welcome, ${user.username}!`;
    }
});
const guestBtn = document.getElementById("guestAccess");

if (guestBtn) {
    guestBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "dashboard.html";
    });
}