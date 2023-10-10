import { KEY_CART_LIST, KEY_USER_LOGIN } from "./constants.js";
import { handleGetQuantityCart, handleLoadUser } from "./products.js";

const cartsList = JSON.parse(localStorage.getItem(KEY_CART_LIST));

const handleRenderCart = (carts) => {
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
};

const handleCountBill = (carts) => {
  let totalBill = 0;
  carts.forEach((item) => {
    totalBill += item.originalPrice * (1 - item.percentSale) * item.quantity;
  });
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

window.onload = () => {
  handleRenderCart(cartsList);
  handleCountBill(cartsList);
  handleGetQuantityCart();
  handleLoadUser();

  if (localStorage.getItem(KEY_USER_LOGIN)) {
    document
      .querySelector(".above-header__btn-logout")
      .addEventListener("click", () => {
        localStorage.removeItem(KEY_USER_LOGIN);
        handleLoadUser();
      });
  }

  const formCheckout = document.querySelector(".box-checkout__form");

  const inputName = document.querySelector(
    ".box-checkout__form input[name='name']"
  );
  const inputCity = document.querySelector("#city");
  const inputDistrict = document.querySelector("#district");
  const inputWard = document.querySelector("#ward");
  const inputAddress = document.querySelector(
    ".box-checkout__form input[name='address']"
  );
  const inputPhone = document.querySelector(
    ".box-checkout__form input[name='phone']"
  );
  const inputPaymentMethod = document.querySelector(
    ".box-checkout__form select[name='payment-method']"
  );
};
