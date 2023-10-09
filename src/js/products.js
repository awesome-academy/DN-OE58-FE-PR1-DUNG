import { KEY_CART_LIST } from "./constants.js";

// get products litst
const getProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  return data;
};
export const products = await getProducts();

// render Products
const renderProducts = (products) => {
  const htmlProductsList = products.map((product) => {
    const imgURL = product.imgURL.slice(1);
    return `<div
      class="products__list-item relative flex flex-col justify-center items-center w-full border-solid border-2 border-[#e9e9e9] cursor-pointer
      " productId='${product.id}'
    >
      <p
        class="absolute bg-[#4fc286] rounded-[100%] p-4 top-4 left-4 uppercase text-white"
      >
        New
      </p>
      <i
        class="fa-solid fa-cart-plus products__list-add absolute bottom-6 right-2 text-xl cursor-pointer"
      ></i>

      <div class="products__list-img">
        <a href="./detail_product_page.html?id=${product.id}">
          <img
            src="${imgURL}"
            class="w-full"
            alt="cay_chan_chim"
          />
        </a>
      </div>

      <div
        class="products__list-content flex flex-col items-center justify-center p-4"
      >
        <p class="products__list-name">"${product.productName}"</p>
        <p>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </p>
        <p>
          <span class="text-[#ca4d4d] font-[700]">${
            product.originalPrice * (1 - product.percentSale)
          } đ</span>
          <span class="line-through text-[#333] opacity-60"
            >${product.originalPrice} đ</span>
        </p>
      </div>
    </div>`;
  });
  // render vào list
  if (document.querySelector(".products__list")) {
    document.querySelector(".products__list").innerHTML =
      htmlProductsList.join("");
  }
};

// add to cart
export const handleAddProductFromProductsToCart = () => {
  const carts = JSON.parse(localStorage.getItem(KEY_CART_LIST)) || [];

  const productsList = document.querySelectorAll(".products__list-item");

  productsList.forEach((product) => {
    product.addEventListener("click", (e) => {
      const id = product.getAttribute("productId");

      if (e.target.classList.contains("products__list-add")) {
        // console.log(true, id);
        const productToCart = products.find((item) => item.id === Number(id));

        if (carts.length === 0) {
          carts.push({ ...productToCart, quantity: 1 });
        } else {
          const productExisted = carts.find(
            (item) => item.id === productToCart.id
          );
          if (productExisted) {
            productExisted.quantity += 1;
          } else {
            carts.push({ ...productToCart, quantity: 1 });
          }
        }
        localStorage.setItem(KEY_CART_LIST, JSON.stringify(carts));
      } else {
        // redirect to detail_page
        location.href = "./detail_product_page.html";
      }
    });
  });
};

export const handleGetQuantityCart = () => {
  const cartsList = JSON.parse(localStorage.getItem(KEY_CART_LIST)) || [];
  document.querySelector(
    ".main-header__cart"
  ).children[1].innerHTML = `${cartsList.length}`;
};

window.onload = () => {
  renderProducts(products);
  handleAddProductFromProductsToCart();
  handleGetQuantityCart();
};
