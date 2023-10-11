import { KEY_USER_LOGIN } from "./constants.js";
import { handleLoadUser } from "./products.js";

const getCartApi = async () => {
  const response = await fetch("http://localhost:3000/carts");
  const cartsList = await response.json();
  handleRenderPurchase(cartsList);
};

const handleRenderPurchase = (cartsList) => {
  const purchaseTable = document.querySelector(
    ".main-purchase__table-purchase-tbody"
  );

  const htmlCartsList = cartsList.map((cart) => {
    return `<tr class="main-cart__table-cart-item">
    <td
      class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0]"
    >
      ${cart.id}
    </td>

    <td
      class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] text-[#4fc286] uppercase font-[500]"
    >
      ${cart.name}
    </td>

    <td
      class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
    >
      ${cart.date}
    </td>

    <td
      class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
    >
      <input
        readonly
        disabled
        type="text"
        class="p-2 w-[50px] text-center border-solid border-[1px] border-[#e0e0e0]"
        value="${cart.carts.length}"
      />
    </td>

    <td
      class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
    >
     300000 đ
    </td>

    <td
      class="main-cart__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d] cursor-pointer hover:underline hover:text-[#4fc286]"
    >
      Chi tiết
    </td>
  </tr> `;
  });
  if (purchaseTable) {
    purchaseTable.innerHTML = htmlCartsList.join("");
  }
};

const handleRedirectDetailPurchase = () => {};

window.onload = () => {
  handleLoadUser();
  getCartApi();

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
