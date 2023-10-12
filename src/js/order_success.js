import { KEY_USER_LOGIN } from "./constants.js";
import { handleLoadUser } from "./products.js";

const handleRedirectToPurchase = () => {
  location.href = "./purchase_page.html";
};

const handleShoppingContinue = () => {
  location.href = "./products_page.html";
};

window.onload = () => {
  handleLoadUser();
  document
    .querySelector(".continue-shopping__btn ")
    .addEventListener("click", handleShoppingContinue);

  document
    .querySelector(".btn-redirect-purchase")
    .addEventListener("click", handleRedirectToPurchase);

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
