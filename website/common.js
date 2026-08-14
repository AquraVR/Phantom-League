// shared across every page - api base, nav toggle, sign-in modal
const API_BASE = window.BREACH_API_BASE || "http://localhost:8000";

function initNav(){
  const toggles = document.querySelectorAll(".nav-toggle");
  const nav = document.getElementById("mainNav");
  toggles.forEach(toggle => {
    toggle.setAttribute("type", "button");
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  document.querySelectorAll(".login-btn").forEach(btn => {
    btn.setAttribute("type", "button");
    btn.addEventListener("click", startSignIn);
  });
}

function startSignIn(){
  // real flow: window.location.href = `${API_BASE}/auth/login`
  // then discord redirects back here with a session/token before we ask for the name below.
  // no backend oauth endpoint exists yet, so this jumps straight to the name step as a stand-in.
  openNamePrompt();
}

function openNamePrompt(){
  const overlay = document.getElementById("nameModalOverlay");
  if (!overlay) return;
  overlay.classList.add("visible");
  document.body.classList.add("modal-open");
  const input = document.getElementById("ubisoftNameInput");
  if (input) { input.value = ""; setTimeout(() => input.focus(), 50); }
}

function closeNamePrompt(){
  const overlay = document.getElementById("nameModalOverlay");
  if (!overlay) return;
  overlay.classList.remove("visible");
  document.body.classList.remove("modal-open");
}

function submitUbisoftName(){
  const input = document.getElementById("ubisoftNameInput");
  const name = input ? input.value.trim() : "";
  if (!name){
    input.focus();
    return;
  }
  // real flow: POST { ubisoft_name: name } to the backend against the signed-in user's account
  closeNamePrompt();
  document.querySelectorAll(".login-btn").forEach(btn => {
    btn.textContent = name;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  const closeBtn = document.getElementById("nameModalClose");
  const form = document.getElementById("nameModalForm");
  const overlay = document.getElementById("nameModalOverlay");
  if (closeBtn) closeBtn.addEventListener("click", closeNamePrompt);
  if (form) form.addEventListener("submit", (e) => { e.preventDefault(); submitUbisoftName(); });
  if (overlay) overlay.addEventListener("click", (e) => { if (e.target === overlay) closeNamePrompt(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNamePrompt(); });
});
