import { KEY_USER_LOGIN } from "./constants.js";
import { handleLoadUser } from "./products.js";

const getCartApi = async () => {
  const response = await fetch("http://localhost:3000/carts");
  const cartsList = await response.json();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const itemCart = cartsList.find((cart) => cart.id === Number(id)).carts;

  handleRenderPurchaseDetail(itemCart);
};

const handleRenderPurchaseDetail = (itemCart) => {
  const tablePurchaseDetail = document.querySelector(
    ".main-purchase__table-cart-tbody"
  );
  const htmlPurchaseDetail = itemCart.map((cart) => {
    const imgURL = "../." + `${cart.imgURL}`;
    const priceProduct = cart.originalPrice * (1 - cart.percentSale);
    return `<tr class="main-purchase__table-cart-item">
            <td
              class="main-purchase__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0]"
            >
              <img
                src="${imgURL}"
                class="inline"
                alt="green_shop"
              />
            </td>
        
            <td
              class="main-purchase__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] text-[#4fc286] uppercase font-[500]"
            >
              ${cart.productName}
            </td>
        
            <td
              class="main-purchase__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
            >
              ${priceProduct} đ
            </td>
        
            <td
              class="main-purchase__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
            >
              <input
                type="text"
                class="p-2 w-[50px] text-center border-solid border-[1px] border-[#e0e0e0]"
                value="${cart.quantity}"
                disabled
              />
            </td>
        
            <td
              class="main-purchase__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
            >
              ${priceProduct * cart.quantity} đ
            </td>
        
            <td
              class="main-purchase__table-cart-row-item p-4 border-solid border-[1px] border-[#e0e0e0] font-[500] text-[#8e8d8d]"
            >
              <i class="fa-solid fa-trash-can cursor-pointer"></i>
            </td>
          </tr>`;
  });

  tablePurchaseDetail.innerHTML = htmlPurchaseDetail?.join("");
};

const handleShoppingContinue = () => {
  location.href = "./products_page.html";
};

window.onload = () => {
  handleLoadUser();
  getCartApi();

  document
    .querySelector(".main-purchase__btn-continue")
    .addEventListener("click", handleShoppingContinue);

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
