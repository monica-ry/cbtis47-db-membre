const socket = io();
const convList = document.getElementById("convList");
const convCount = document.getElementById("convCount");
const adminChatBox = document.getElementById("adminChatBox");
const chatHeader = document.getElementById("chatHeader");
const replyArea = document.getElementById("replyArea");
const replyInput = document.getElementById("replyInput");
const replyBtn = document.getElementById("replyBtn");

let selectedUser = null;
let conversations = [];

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user || user.role !== "admin") {
        window.location.href = "/adminaccess";
        return;
    }
    socket.emit("register_admin");
    socket.emit("get_conversations");
});

socket.on("conversations", (convos) => {
    conversations = convos;
    renderConversations();
});

socket.on("user_messages", (data) => {
    if (data.username === selectedUser) {
        renderMessages(data.messages);
    }
});

socket.on("new_message", (msg) => {
    const existing = conversations.find((c) => c.username === msg.username);
    if (existing) {
        existing.lastMessage = msg.text;
        existing.lastTime = msg.time;
    } else {
        conversations.unshift({
            username: msg.username,
            lastMessage: msg.text,
            lastTime: msg.time,
        });
    }
    renderConversations();
    if (selectedUser === msg.username) {
        socket.emit("get_user_messages", selectedUser);
    }
});

function renderConversations() {
    convList.innerHTML = "";
    convCount.textContent = conversations.length;
    if (conversations.length === 0) {
        convList.innerHTML = '<p class="empty-msg">No conversations yet</p>';
        return;
    }
    conversations.forEach((conv) => {
        const div = document.createElement("div");
        div.className = "admin-conv-item" + (selectedUser === conv.username ? " active" : "");
        div.innerHTML = `
            <span class="admin-conv-name">${esc(conv.username)}</span>
            <span class="admin-conv-preview">${esc(conv.lastMessage)}</span>
        `;
        div.addEventListener("click", () => selectUser(conv.username));
        convList.appendChild(div);
    });
}

function selectUser(username) {
    selectedUser = username;
    chatHeader.innerHTML = `<span>Chat with <strong>${esc(username)}</strong></span>`;
    replyArea.style.display = "flex";
    renderConversations();
    socket.emit("get_user_messages", username);
}

function renderMessages(msgs) {
    adminChatBox.innerHTML = "";
    if (msgs.length === 0) {
        adminChatBox.innerHTML = '<p class="empty-msg">No messages yet</p>';
        return;
    }
    msgs.forEach((msg) => {
        const isAdmin = msg.type === "admin";
        const div = document.createElement("div");
        div.className = "admin-chat-msg" + (isAdmin ? " admin" : "");
        div.innerHTML = `
            <div class="admin-chat-msg-head">
                <span class="admin-chat-msg-user">${esc(isAdmin ? "You" : msg.username)}</span>
                <span class="admin-chat-msg-time">${msg.time}</span>
            </div>
            <div class="admin-chat-msg-text">${esc(msg.text)}</div>
        `;
        adminChatBox.appendChild(div);
    });
    adminChatBox.scrollTop = adminChatBox.scrollHeight;
}

replyBtn.addEventListener("click", sendReply);
replyInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendReply();
});

function sendReply() {
    const text = replyInput.value.trim();
    if (!text || !selectedUser) return;
    socket.emit("admin_reply", { toUser: selectedUser, text });
    replyInput.value = "";
}

function esc(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
}
