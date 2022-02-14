const jwt_decode = require("jwt-decode");

async function requestLogin(e) {
  e.preventDefault();

  try {
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target["admin-username"].value,
        password: e.target["admin-password"].value,
      }),
    };

    const data = await (
      await fetch("http://localhost:3000/admin/login", options)
    ).json();
    if (!data.success) {
      throw new Error("Login not authorized");
    }
    login(data.token);
  } catch (err) {
    alert(err);
    console.warn(err);
  }
}

async function requestRegistration(e) {
  e.preventDefault();

  try {
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target["admin-username"].value,
        password: e.target["admin-password"].value,
      }),
    };

    const data = await (
      await fetch("http://localhost:3000/admin/register", options)
    ).json();
    if (data.err) {
      throw new Error(data.err);
    }
    requestLogin(e);
  } catch (err) {
    console.warn(err);
  }
}

function login(token) {
  const admin = jwt_decode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("username", admin.username);
  window.location.hash = "#adminPage";
}

// function logout() {
//   localStorage.clear();
//   location.hash = "#login";
// }

function currentUser() {
  const username = localStorage.getItem("username");
  return username;
}

module.exports = {
  requestLogin,
  requestRegistration,
  currentUser,
};
