import { KEY_CART_LIST, KEY_USER_LOGIN } from "./constants.js";
import { handleGetQuantityCart, handleLoadUser } from "./products.js";
import { users } from "./register.js";

const cartsList = JSON.parse(localStorage.getItem(KEY_CART_LIST));

const handleRenderCart = (carts) => {
  if (cartsList) {
    if (carts && carts.length != 0) {
      const htmlListCart = carts.map((item) => {
        const priceProduct = item.originalPrice * (1 - item.percentSale);
        return `<tr class="bill__table-cart-item" productId="${item.id}">
          <td
            class="bill__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] text-[#4fc286] uppercase font-[500]"
          >
            ${item.productName}
          </td>
      
          <td
            class="bill__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
          >
            ${priceProduct} đ
          </td>
      
          <td
            class="bill__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
          >
            <input
              type="text"
              class="p-2 w-[50px] text-center"
              readonly
              disabled
              value="${item.quantity}"
            />
          </td>
      
          <td
            class="bill__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
          >
            ${priceProduct * item.quantity} đ
          </td>
        </tr>`;
      });
      document.querySelector(".bill__table-bill-tbody").innerHTML =
        htmlListCart.join("");
    } else {
      document.querySelector(
        ".bill__table-cart-tbody"
      ).innerHTML = `<tr>No product....</tr>`;
    }
  }
};

const handleCountBill = (carts) => {
  let totalBill = 0;
  if (cartsList) {
    carts.forEach((item) => {
      totalBill += item.originalPrice * (1 - item.percentSale) * item.quantity;
    });
  }
  let vatTax = totalBill * 0.1;
  let totalMoneyPay = totalBill + vatTax;

  document.querySelector(".bill__table-payment-item").children[1].innerHTML =
    totalBill;
  document.querySelector(
    ".bill__table-payment-item:nth-child(2)"
  ).children[1].innerHTML = vatTax;
  document.querySelector(
    ".bill__table-payment-item:last-child"
  ).children[1].innerHTML = totalMoneyPay;
};

const formCheckout = document.querySelector(".box-checkout__form");

const inputName = document.querySelector(
  ".box-checkout__form input[name='name']"
);
const inputAddress = document.querySelector(
  ".box-checkout__form input[name='address']"
);
const inputPhone = document.querySelector(
  ".box-checkout__form input[name='phone']"
);
const inputPaymentMethod = document.querySelector(
  ".box-checkout__form select[name='payment-method']"
);
const patternPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

const handleValidate = () => {
  if (inputName.value === "") {
    document.querySelector("#error-name").innerText = "Vui lòng nhập tên";
    return false;
  }
  document.querySelector("#error-name").innerText = "";

  if (inputAddress.value === "") {
    document.querySelector("#error-address").innerText =
      "Vui lòng nhập địa chỉ";
    return false;
  }
  document.querySelector("#error-address").innerText = "";

  if (!patternPhone.test(inputPhone.value)) {
    document.querySelector("#error-phone").innerText = "Sai định dạng SĐT";
    return false;
  }
  document.querySelector("#error-phone").innerText = "";
  return true;
};

const handleAddCartToAPI = async (url = "", cart = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  return (data = response.json());
};

const handleRemoveCartStorage = () => {
  localStorage.removeItem(KEY_CART_LIST);
};

window.onload = () => {
  handleRenderCart(cartsList);
  handleCountBill(cartsList);
  handleGetQuantityCart();
  handleLoadUser();

  formCheckout.addEventListener("submit", (e) => {
    e.preventDefault();

    const userLogin = JSON.parse(localStorage.getItem(KEY_USER_LOGIN));
    let flagValidate = handleValidate();
    if (userLogin) {
      const userInfoLogin = users.find(
        (user) => user.email === userLogin.email
      );
      if (flagValidate) {
        handleAddCartToAPI("http://localhost:3000/carts", {
          name: inputName.value,
          address: inputAddress.value,
          phone: inputPhone.value,
          paymentMethod: inputPaymentMethod.value,
          carts: [...cartsList],
          userId: userInfoLogin.id,
          date: `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`,
        });
        handleRemoveCartStorage();
        location.href = "./order_success_page.html";
      }
    } else {
      location.href = "./loginpage.html";
      alert("Bạn cần đăng nhập để thanh toán");
    }
  });

  if (localStorage.getItem(KEY_USER_LOGIN)) {
    document
      .querySelector(".above-header__btn-logout")
      .addEventListener("click", () => {
        localStorage.removeItem(KEY_USER_LOGIN);
        handleLoadUser();
        location.href = "./products_page.html";
      });
  }

  formCheckout.addEventListener("submit", (e) => {
    e.preventDefault();

    const userLogin = JSON.parse(localStorage.getItem(KEY_USER_LOGIN));
    let flagValidate = handleValidate();
    if (userLogin) {
      const userInfoLogin = users.find(
        (user) => user.email === userLogin.email
      );
      if (flagValidate) {
        handleAddCartToAPI("http://localhost:3000/carts", {
          name: inputName.value,
          address: inputAddress.value,
          phone: inputPhone.value,
          paymentMethod: inputPaymentMethod.value,
          carts: [...cartsList],
          userId: userInfoLogin.id,
          date: `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`,
        });
        handleRemoveCartStorage();
        location.href = "./order_success_page.html";
      }
    } else {
      location.href = "./loginpage.html";
      alert("Bạn cần đăng nhập để thanh toán");
    }
  });

  if (localStorage.getItem(KEY_USER_LOGIN)) {
    document
      .querySelector(".above-header__btn-logout")
      .addEventListener("click", () => {
        localStorage.removeItem(KEY_USER_LOGIN);
        handleLoadUser();
        location.href = "./products_page.html";
      });
  }
};
