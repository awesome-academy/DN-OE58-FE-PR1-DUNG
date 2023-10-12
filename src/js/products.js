import { KEY_CART_LIST, KEY_USER_LOGIN } from "./constants.js";

const getProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  return data;
};
export const products = await getProducts();
console.log(products);

const renderProducts = (productsList) => {
  const htmlProductsList = productsList.map((product) => {
    const imgURL = product.imgURL.slice(1);
    return `<div
      class="products__list-item relative flex flex-col justify-center items-center w-full border-solid border-2 border-[#e9e9e9] cursor-pointer
      " productId=${product.id}
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
            src=${imgURL}
            class="w-full"
            alt="cay_chan_chim"
          />
        </a>
      </div>

      <div
        class="products__list-content flex flex-col items-center justify-center p-4"
      >
        <p class="products__list-name">${product.productName}</p>
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
  if (document.querySelector(".products__list")) {
    document.querySelector(".products__list").innerHTML =
      htmlProductsList.join("");
  }
};

const handleAddProductFromProductsToCart = () => {
  const carts = JSON.parse(localStorage.getItem(KEY_CART_LIST)) || [];
  const productsList = document.querySelectorAll(".products__list-item");

  productsList.forEach((product) => {
    product.addEventListener("click", (e) => {
      const id = product.getAttribute("productId");

      if (e.target.classList.contains("products__list-add")) {
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
      }
      handleGetQuantityCart();
    });
  });
};

export const handleGetQuantityCart = () => {
  const cartsList = JSON.parse(localStorage.getItem(KEY_CART_LIST)) || [];
  document.querySelector(
    ".main-header__cart"
  ).children[1].innerHTML = `${cartsList.length}`;
};

export const handleLoadUser = () => {
  const userLogin = JSON.parse(localStorage.getItem(KEY_USER_LOGIN));

  if (!userLogin || userLogin.length === 0) {
    document.querySelector(".above-header__login").classList.remove("hidden");

    document
      .querySelector(".above-header__register")
      .classList.remove("hidden");

    document.querySelector(".above-header__user-login").classList.add("hidden");
    document.querySelector(".above-header__btn-logout").classList.add("hidden");
  } else {
    document.querySelector(".above-header__login").classList.add("hidden");
    document.querySelector(".above-header__register").classList.add("hidden");

    document
      .querySelector(".above-header__user-login")
      .classList.remove("hidden");

    document
      .querySelector(".above-header__btn-logout")
      .classList.remove("hidden");

    document.querySelector(
      ".above-header__user-login span"
    ).innerText = `${userLogin?.email}`;
  }
};

window.onload = () => {
  renderProducts(products);
  handleAddProductFromProductsToCart();
  handleGetQuantityCart();
  handleLoadUser();

  const categoriesFilter = document.querySelectorAll(
    ".filter-products__category-item span"
  );
  categoriesFilter.forEach((item) => {
    item.addEventListener("click", () => {
      let productsFilter = [];

      switch (item.innerText) {
        case "Cây chậu treo":
          productsFilter = products.filter(
            (product) => product.category === "Cây chậu treo"
          );
          renderProducts(productsFilter);
          break;

        case "Cây cỏ hoa":
          productsFilter = products.filter(
            (product) => product.category === "Cây cỏ hoa"
          );
          renderProducts(productsFilter);
          break;

        case "Cây dây leo":
          productsFilter = products.filter(
            (product) => product.category === "Cây dây leo"
          );
          renderProducts(productsFilter);
          break;

        case "Cây để bàn":
          productsFilter = products.filter(
            (product) => product.category === "Cây để bàn"
          );
          renderProducts(productsFilter);
          break;

        case "Cây may mắn":
          productsFilter = products.filter(
            (product) => product.category === "Cây may mắn"
          );
          renderProducts(productsFilter);
          break;

        case "Cây trang trí":
          productsFilter = products.filter(
            (product) => product.category === "Cây trang trí"
          );
          renderProducts(productsFilter);
          break;

        case "Cây nội thất":
          productsFilter = products.filter(
            (product) => product.category === "Cây nội thất"
          );
          renderProducts(productsFilter);
          break;

        default:
          renderProducts(products);
      }
    });
  });

  const priceFilter = document.querySelectorAll(
    ".filter-products__price-item span"
  );
  priceFilter.forEach((item) => {
    item.addEventListener("click", () => {
      let productsFilter = [];

      switch (item.innerText) {
        case "200.000 Đ - 400.000 Đ":
          productsFilter = products.filter(
            (product) =>
              product.originalPrice * (1 - product.percentSale) > 200000 &&
              product.originalPrice * (1 - product.percentSale) < 400000
          );
          renderProducts(productsFilter);
          break;

        case "400.000 Đ - 600.000 Đ":
          productsFilter = products.filter(
            (product) =>
              product.originalPrice * (1 - product.percentSale) > 400000 &&
              product.originalPrice * (1 - product.percentSale) < 600000
          );
          renderProducts(productsFilter);
          break;

        case "600.000 Đ - 800.000 Đ":
          productsFilter = products.filter(
            (product) =>
              product.originalPrice * (1 - product.percentSale) > 600000 &&
              product.originalPrice * (1 - product.percentSale) < 800000
          );
          renderProducts(productsFilter);
          break;

        case "800.000 Đ - 1.000.000 Đ":
          productsFilter = products.filter(
            (product) =>
              product.originalPrice * (1 - product.percentSale) > 800000 &&
              product.originalPrice * (1 - product.percentSale) < 1000000
          );
          renderProducts(productsFilter);
          break;

        case "1.000.000 Đ - 1.200.000 Đ":
          productsFilter = products.filter(
            (product) =>
              product.originalPrice * (1 - product.percentSale) > 1000000 &&
              product.originalPrice * (1 - product.percentSale) < 1200000
          );
          renderProducts(productsFilter);
          break;

        default:
          renderProducts(products);
      }
    });
  });

  const colorsFilter = document.querySelectorAll(
    ".filter-products__color-item span"
  );
  colorsFilter.forEach((item) => {
    item.addEventListener("click", () => {
      let productsFilter = [];

      switch (item.innerText) {
        case "Xanh cây":
          productsFilter = products.filter(
            (product) => product.color === "Xanh cây"
          );
          renderProducts(productsFilter);
          break;

        case "Đỏ cam":
          productsFilter = products.filter(
            (product) => product.color === "Đỏ cam"
          );
          renderProducts(productsFilter);
          break;

        case "Tím":
          productsFilter = products.filter(
            (product) => product.color === "Tím"
          );
          renderProducts(productsFilter);
          break;

        case "Xanh trời":
          productsFilter = products.filter(
            (product) => product.color === "Xanh trời"
          );
          renderProducts(productsFilter);
          break;

        case "Vàng":
          productsFilter = products.filter(
            (product) => product.color === "Vàng"
          );
          renderProducts(productsFilter);
          break;

        case "Hồng":
          productsFilter = products.filter(
            (product) => product.color === "Hồng"
          );
          renderProducts(productsFilter);
          break;

        default:
          renderProducts(products);
      }
    });
  });

  const searchButton = document.querySelector(".main-header__btn-search i");
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    let searchInput = document.querySelector(
      ".main-header__search-box input"
    ).value;
    if (searchInput) {
      const productsFilter = products.filter((item) =>
        item.productName.includes(searchInput)
      );
      renderProducts(productsFilter);
    } else {
      return;
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
