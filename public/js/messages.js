const socket = io();
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

let username = "Guest";

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) username = user.username;
    socket.emit("register_user", username);
    loadMyMessages();
});

socket.on("message_sent", (msg) => {
    appendMessage(msg);
});

socket.on("admin_reply", (msg) => {
    appendMessage(msg);
});

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    socket.emit("send_message", { username, text });
    chatInput.value = "";
}

function loadMyMessages() {
    socket.emit("get_user_messages", username);
    socket.on("user_messages", (data) => {
        if (data.username !== username) return;
        chatBox.innerHTML = "";
        data.messages.forEach(appendMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

function appendMessage(msg) {
    const isAdmin = msg.type === "admin";
    const isOwn = msg.username === username && !isAdmin;
    const div = document.createElement("div");
    div.className = "chat-msg" + (isOwn ? " own" : "") + (isAdmin ? " admin" : "");
    div.innerHTML = `
        <div class="chat-msg-header">
            <span class="chat-msg-user">${esc(isAdmin ? "Admin" : msg.username)}</span>
            <span class="chat-msg-time">${msg.time}</span>
        </div>
        <div class="chat-msg-text">${esc(msg.text)}</div>
    `;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function esc(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
}
