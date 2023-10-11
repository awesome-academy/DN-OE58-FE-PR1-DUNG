const getUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
};
export const users = await getUsers();

const inputName = document.querySelector(
  ".box-register__form input[name='name']"
);
const inputPhone = document.querySelector(
  ".box-register__form input[name='phone']"
);
const inputEmail = document.querySelector(
  ".box-register__form input[name='email']"
);
const inputAddress = document.querySelector(
  ".box-register__form input[name='address']"
);
const inputPassword = document.querySelector(
  ".box-register__form input[name='password']"
);
const inputConfirmPassword = document.querySelector(
  ".box-register__form input[name='confirm-password']"
);

const patternEmail =
  /^[a-z][a-z0-9_.]{3,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;
const patternPassword = /[0-9a-zA-Z]{6,}/;
const patternPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

const handleValidate = () => {
  if (inputName.value === "") {
    document.querySelector("#error-name").innerText = "Vui lòng nhập tên";
    return false;
  }
  document.querySelector("#error-name").innerText = "";

  if (!patternPhone.test(inputPhone.value)) {
    document.querySelector("#error-phone").innerText = "Sai định dạng SĐT";
    return false;
  }
  document.querySelector("#error-phone").innerText = "";

  if (!patternEmail.test(inputEmail.value)) {
    document.querySelector("#error-email").innerText = "Sai định dạng email";
    return false;
  }
  document.querySelector("#error-email").innerText = "";

  if (inputAddress === "") {
    document.querySelector("#error-email").innerText = "Vui lòng nhập địa chỉ";
    return false;
  }
  document.querySelector("#error-email").innerText = "";

  if (!patternPassword.test(inputPassword.value)) {
    document.querySelector("#error-password").innerText =
      "Mật khẩu phải trên 6 ký tự";
    return false;
  }
  document.querySelector("#error-password").innerText = "";

  if (inputConfirmPassword.value !== inputPassword.value) {
    document.querySelector("#error-confirm-password").innerText =
      "Xác nhận lại mật khẩu không khớp";
    return false;
  }
  document.querySelector("#error-confirm-password").innerText = "";
  return true;
};

const handlePostUser = async (url = "", user = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return (data = response.json());
};

window.onload = () => {
  const formRegister = document.querySelector("#form-register");

  formRegister.addEventListener("submit", (event) => {
    event.preventDefault();
    let flagValidate = handleValidate();

    if (flagValidate)
      if (users.find((user) => user.email === inputEmail.value)) {
        alert("Email này đã được đăng ký");
        return;
      } else {
        handlePostUser("http://localhost:3000/users", {
          email: inputEmail.value,
          password: inputPassword.value,
          phone: inputPhone.value,
          address: inputAddress.value,
          name: inputName.value,
        });
        alert("Đăng ký tài khoản thành công");
      }
  });
};
