import { KEY_USER_LOGIN } from "./constants.js";

const getUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
};
const users = await getUsers();

const inputEmail = document.querySelector(".box-login__email input");
const inputPassword = document.querySelector(".box-login__password input");
const btnLogin = document.querySelector(".box-login__form button");

const patternEmail =
  /^[a-z][a-z0-9_.]{3,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;
const patternPassword = /[0-9a-zA-Z]{6,}/;

const handleValidate = () => {
  if (!patternEmail.test(inputEmail.value)) {
    inputEmail.nextElementSibling.innerText = "Sai định dạng email!";
    return false;
  }
  inputEmail.nextElementSibling.innerText = "";

  if (!patternPassword.test(inputPassword.value)) {
    inputPassword.nextElementSibling.innerText = "Vui lòng nhập mật khẩu!";
    return false;
  }
  inputPassword.nextElementSibling.innerText = "";
  return true;
};

window.onload = () => {
  btnLogin.addEventListener("click", () => {
    let flagValidate = handleValidate();
    if (flagValidate) {
      const valueEmail = inputEmail.value;
      const valuePassword = inputPassword.value;

      const user = users.find((user) => user.email === valueEmail);
      if (user) {
        if (user.password === valuePassword) {
          localStorage.setItem(
            KEY_USER_LOGIN,
            JSON.stringify({ email: valueEmail, password: valuePassword })
          );
          const userLogin = JSON.parse(localStorage.getItem(KEY_USER_LOGIN));

          document
            .querySelector(".above-header__login")
            .classList.add("hidden");
          document
            .querySelector(".above-header__register")
            .classList.add("hidden");

          document
            .querySelector(".above-header__user-login")
            .classList.remove("hidden");
          document
            .querySelector(".above-header__user-login")
            .classList.remove("hidden");

          document.querySelector(
            ".above-header__user-login span"
          ).innerText = `${userLogin.email}`;

          location.href = "./products_page.html";
        } else {
          alert("sai mật khẩu");
        }
      } else {
        alert("sai tài khoản");
      }
    }
  });

  document
    .querySelector(".register-link__btn")
    .addEventListener("click", () => {
      location.href = "./register_page.html";
    });
};
