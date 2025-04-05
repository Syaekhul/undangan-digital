import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_r2bd47THwp6fR9DHOuCYj5RsXs06-8o",
  authDomain: "wedding-invitation-bdbbe.firebaseapp.com",
  databaseURL:
    "https://wedding-invitation-bdbbe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wedding-invitation-bdbbe",
  storageBucket: "wedding-invitation-bdbbe.firebasestorage.app",
  messagingSenderId: "1043559927157",
  appId: "1:1043559927157:web:28c58dc6d5ad21f238573c",
  measurementId: "G-Z563B0LJ5N"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const wishesRef = ref(db, "wishes");

document.getElementById("submitWish").addEventListener("click", () => {
  const name = document.getElementById("inputName").value.trim();
  const wish = document.getElementById("inputWish").value.trim();

  if (name && wish) {
    push(wishesRef, {
      name,
      wish,
      timestamp: Date.now()
    });

    document.getElementById("inputName").value = "";
    document.getElementById("inputWish").value = "";
  }
});

const wishList = document.getElementById("wishList");
onChildAdded(wishesRef, (data) => {
  const { name, wish } = data.val();

  const messageEl = document.createElement("div");
  messageEl.classList.add("message", "mt-2", "p-2");
  messageEl.innerHTML = `
    <p class="name">${name}</p>
    <p class="wish"><strong>${wish}</strong></p>
    `;

  wishList.prepend(messageEl);
});
