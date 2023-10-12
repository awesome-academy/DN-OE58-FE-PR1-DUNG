import { KEY_CART_LIST, KEY_USER_LOGIN } from "./constants.js";
import { handleGetQuantityCart, handleLoadUser } from "./products.js";

const cartsList = JSON.parse(localStorage.getItem(KEY_CART_LIST));

const handleRenderCart = (carts) => {
  if (carts && carts.length != 0) {
    const htmlListCart = carts.map((item) => {
      const imgURL = "../." + `${item.imgURL}`;
      const priceProduct = item.originalPrice * (1 - item.percentSale);
      return `<tr class="main-cart__table-cart-item" productId="${item.id}">
      <td
        class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0]"
      >
        <img
          src="${imgURL}"
          class="inline"
          alt="green_shop"
        />
      </td>
  
      <td
        class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] text-[#4fc286] uppercase font-[500]"
      >
        ${item.productName}
      </td>
  
      <td
        class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
      >
        ${priceProduct} đ
      </td>
  
      <td
        class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
      >
        <input
          type="text"
          class="p-2 w-[50px] text-center border-solid border-[1px] border-[#e0e0e0]"
          value="${item.quantity}"
          disabled
        />
      </td>
  
      <td
        class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
      >
        ${priceProduct * item.quantity} đ
      </td>
  
      <td
        class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
      >
        <i class="fa-solid fa-trash-can cursor-pointer"></i>
      </td>
    </tr>`;
    });
    document.querySelector(".main-cart__table-cart-tbody").innerHTML =
      htmlListCart.join("");
  } else {
    document.querySelector(
      ".main-cart__table-cart-tbody"
    ).innerHTML = `<tr>No product....</tr>`;
  }
};

const handleRemoveProduct = (carts) => {
  const productsList = document.querySelectorAll(".main-cart__table-cart-item");

  productsList.forEach((item) => {
    item.children[5].children[0].addEventListener("click", () => {
      const cartsUpdate = carts.filter(
        (cart) => cart.id != item.getAttribute("productId")
      );
      localStorage.setItem(KEY_CART_LIST, JSON.stringify(cartsUpdate));
      const cartsList = JSON.parse(localStorage.getItem(KEY_CART_LIST));
      handleRenderCart(cartsList);
      handleGetQuantityCart();
      handleRemoveProduct(cartsList);
      handleCountBill(cartsList);
    });
  });
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

  document.querySelector(
    ".main-cart__table-payment-item"
  ).children[1].innerHTML = totalBill;
  document.querySelector(
    ".main-cart__table-payment-item:nth-child(2)"
  ).children[1].innerHTML = vatTax;
  document.querySelector(
    ".main-cart__table-payment-item:last-child"
  ).children[1].innerHTML = totalMoneyPay;
};

window.onload = () => {
  handleRenderCart(cartsList);
  handleGetQuantityCart();
  handleRemoveProduct(cartsList);
  handleCountBill(cartsList);
  handleLoadUser();

  document
    .querySelector(".main-cart__btn-cancel")
    .addEventListener("click", () => {
      const cartsUpdate = [];
      localStorage.setItem(KEY_CART_LIST, JSON.stringify(cartsUpdate));
      handleRenderCart(cartsUpdate);
      location.href = "./products_page.html";
    });

  document
    .querySelector(".main-cart__btn-continue")
    .addEventListener("click", () => {
      location.href = "./products_page.html";
    });

  document
    .querySelector(".main-cart__btn-payment")
    .addEventListener("click", () => {
      if (!cartsList || cartsList.length === 0) {
        alert("Vui lòng thêm sản phẩm để tiếp tục");
        location.href = "./products_page.html";
      } else {
        location.href = "./checkout_page.html";
      }
    });

  if (localStorage.getItem(KEY_USER_LOGIN)) {
    document
      .querySelector(".above-header__btn-logout")
      .addEventListener("click", () => {
        localStorage.removeItem(KEY_USER_LOGIN);
        handleLoadUser();
      });
  }
};
