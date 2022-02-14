const auth = require("./auth.js");

const adminPage = document.querySelector("#admin-section");

const publicRoutes = ["#", "#login"];
const privateRoutes = ["#adminPage"];

// window.addEventListener("hashchange", updateContent);

function updateContent() {
  const path = window.location.hash;
  if (privateRoutes.includes(path) && !auth.currentUser()) {
    window.location.hash = "#";
  } else if (!!auth.currentUser()) {
    updateAdminPage("#adminPage");
  } else {
    updateAdminPage(path);
  }
}

function updateAdminPage(path) {
  adminPage.innerHTML = "";
  if (path) {
    switch (path) {
      case "#adminPage":
        renderAdminPage();
        break;
      case "#login":
        renderLoginPage();
        break;
      default:
        window.location.href = "/index.html";
    }
  } else {
    window.location.hash = "#login";
    renderLoginPage();
  }
}

const adminTemplate = require("./templates/adminTemplate");
const loginTemplate = require("./templates/loginTemplate");

function renderAdminPage() {
  const logoutBtn = document.querySelector("#admin-btn");
  logoutBtn.innerText = "Logout";
  logoutBtn.href = "./index.html";
  logoutBtn.classList.add("logout-btn");

  const adminPage = document.querySelector("#admin-section");
  adminPage.innerHTML += adminTemplate();
}

function renderLoginPage() {
  const adminPage = document.querySelector("#admin-section");
  adminPage.innerHTML += loginTemplate();
}

module.exports = {
  updateContent,
};
