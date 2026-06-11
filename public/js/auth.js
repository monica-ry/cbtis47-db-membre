document.addEventListener("DOMContentLoaded", () => {

    const userName = document.getElementById("userName");
    const accountButton = document.getElementById("accountButton");

    const modal = document.getElementById("accountModal");

    const modalUsername = document.getElementById("modalUsername");
    const modalEmail = document.getElementById("modalEmail");

    const logoutBtn = document.getElementById("logoutBtn");

    // SESION
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    // NO HAY SESION
    if (!user) {

        userName.textContent = "Log in";

        accountButton.addEventListener("click", () => {
            window.location.href = "/";
        });

    }

    // SI HAY SESION
    else {

        userName.textContent = "Account";

        accountButton.addEventListener("click", () => {

            modal.style.display = "flex";

            modalUsername.textContent = user.username;
            modalEmail.textContent = user.email;

        });

    }

    // CERRAR MODAL
    modal.addEventListener("click", (e) => {

        if (e.target === modal) {
            modal.style.display = "none";
        }

    });

    // LOGOUT
    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("loggedUser");

        window.location.href = "/";

    });

});


function checkAccess(page) {

    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {

        localStorage.setItem("redirectAfterLogin", page);

        alert("You need to log in first");

        window.location.href = "/";

        return;
    }

    window.location.href = page;

}