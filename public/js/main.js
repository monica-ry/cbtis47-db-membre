/* rueda */
const cabinData = [
    { name: "", info: "" },
    { name: "", info: "" },
    { name: "", info: "" },
    { name: "", info: "" },
    { name: "", info: "" },
    { name: "", info: "" },
    { name: "", info: "" },
    { name: "", info: "" }
];

const scene = document.getElementById('wheelScene');
const wheel = document.getElementById('wheelEl');

if (scene && wheel) {

    const total = cabinData.length;
    const center = 250;
    const radius = 218;
    const bubbles = [];

    cabinData.forEach((data, i) => {

        const angleDeg = (360 / total) * i;
        const angleRad = (angleDeg - 90) * Math.PI / 180;

        const cx = center + radius * Math.cos(angleRad);
        const cy = center + radius * Math.sin(angleRad);

        const holder = document.createElement('div');
        holder.className = 'bubble-holder';
        holder.style.transform = `rotate(${angleDeg}deg)`;

        const dot = document.createElement('div');
        dot.className = 'bubble-dot';

        holder.appendChild(dot);
        wheel.appendChild(holder);

        const bubble = document.createElement('div');
        bubble.className = 'info-bubble';
        bubble.innerHTML = `<h3>${data.name}</h3><p>${data.info}</p>`;

        const bW = 148;
        const bH = 70;

        bubble.style.left = (cx - bW / 2) + 'px';
        bubble.style.top = (cy - bH / 2) + 'px';
        bubble.style.transitionDelay = (i * 0.06) + 's';

        scene.appendChild(bubble);
        bubbles.push(bubble);
    });

    scene.addEventListener('mouseenter', () => {
        bubbles.forEach(b => b.classList.add('visible'));
    });

    scene.addEventListener('mouseleave', () => {
        bubbles.forEach(b => b.classList.remove('visible'));
    });
}


// LOGIN USUARIO
async function loginUser() {

    const input = document.getElementById('userEmail');
    const password = document.getElementById('userPassword');
    const errorBox = document.getElementById('userError');

    errorBox.innerText = "";

    input.classList.remove("input-error");
    password.classList.remove("input-error");

    if (!input.value || !password.value) {
        errorBox.innerText = "Please fill in all fields.";
        input.classList.add("input-error");
        password.classList.add("input-error");
        return;
    }

    const response = await fetch("/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            input: input.value,
            password: password.value
        })
    });

    const data = await response.json();

    if (!response.ok) {
        errorBox.innerText = data.message;
        input.classList.add("input-error");
        password.classList.add("input-error");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(data.user));

    const redirect = localStorage.getItem("redirectAfterLogin");

    if (redirect) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirect;
    } else {
        window.location.href = "dashboard.html";
    }
}

// LOGIN ADMIN
async function loginAdmin() {

    const input = document.getElementById('adminEmail');
    const password = document.getElementById('adminPassword');
    const errorBox = document.getElementById('adminError');

    errorBox.innerText = "";
    input.classList.remove("input-error");
    password.classList.remove("input-error");

    if (!input.value || !password.value) {
        errorBox.innerText = "Please fill in all fields.";
        input.classList.add("input-error");
        password.classList.add("input-error");
        return;
    }

    const response = await fetch("/loginAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            input: input.value,
            password: password.value
        })
    });

    const data = await response.json();

    if (!response.ok) {
        errorBox.innerText = data.message;
        input.classList.add("input-error");
        password.classList.add("input-error");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(data.user));
    window.location.href = "admin.html";
}


/* REGISTER  */
async function registerUser() {

    const username = document.getElementById('regUsername');
    const email = document.getElementById('regEmail');
    const phone = document.getElementById('regPhone');
    const password = document.getElementById('regPassword');
    const errorBox = document.getElementById('registerError');

    errorBox.innerText = "";

    if (!username.value || !email.value || !phone.value || !password.value) {
        errorBox.innerText = "All fields are required.";
        return;
    }

    const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            phone: phone.value,
            password: password.value
        })
    });

    const data = await response.json();

    if (!response.ok) {
        errorBox.innerText = data.message;
        return;
    }

    window.location.href = "index.html";
}