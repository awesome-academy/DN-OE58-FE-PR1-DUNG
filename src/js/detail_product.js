import { KEY_CART_LIST, KEY_USER_LOGIN } from "./constants.js";
import { handleGetQuantityCart, handleLoadUser, products } from "./products.js";

export const handleRenderDetailProduct = (product) => {
  const productElement = document.querySelector(
    ".main-detail-product__product-grp"
  );
  const imgURL = "../." + `${product.imgURL}`;
  const priceProduct = product.originalPrice * (1 - product.percentSale);

  const htmlProduct = `<div class="breadcum-detail-product pt-4 pb-16">
      <a href="./homepage.html">Home</a>
      <span>/</span>
      <a href="./detail_product_page.html" class="text-[#4fc286]"
        >${product.productName}</a
      >
    </div>
  
    <div
      class="detail-product flex flex-col justify-center items-center md:flex-row md:justify-between md:items-start gap-[20px]"
    >
      <div class="detail-product__img-grp w-full md:w-[45%]">
        <img src="${imgURL}" alt="product_img" />
        <div
          class="detail-product__img-list flex flex-wrap justify-between py-4"
        >
          <img
            src="${imgURL}"
            class="w-[19%]"
            alt="product_img"
          />
          <img
            src="${imgURL}"
            class="w-[19%]"
            alt="product_img"
          />
          <img
            src="${imgURL}"
            class="w-[19%]"
            alt="product_img"
          />
          <img
            src="${imgURL}"
            class="w-[19%]"
            alt="product_img"
          />
          <img
            src="${imgURL}"
            class="w-[19%]"
            alt="product_img"
          />
        </div>
      </div>
  
      <div class="detail-product__information w-full md:w-[55%]">
        <div
          class="detail-product__basic-info border-solid border-b-2 border-[#efefef] py-4"
        >
          <p
            class="outstanding__name capitalize font-[500] text-lg text-[#919191]"
          >
            ${product.productName}
          </p>
          <div class="text-xs my-2">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <p>
            <span class="text-[#ca4d4d] font-[700]">${priceProduct}</span>
            <span class="line-through text-[#333] opacity-60"
              >${product.originalPrice}</span
            >
          </p>
        </div>
  
        <div
          class="detail-product__desc border-solid border-b-2 border-[#efefef] py-4"
        >
          <p class="text-sm text-[#919191] text-justify">
            ${product.desc}
          </p>
        </div>
  
        <div
          class="detail-product__quantity border-solid border-b-2 border-[#efefef] py-4 flex items-center gap-[30px]"
        >
          <p class="detail-product__quantity-title">Số lượng</p>
  
          <div
            class="detail-product__quantity-btn-grp flex items-center justify-center gap-[8px]"
          >
            <button
              class="detail-product__btn-decrease w-[30px] h-[30px] border-solid border-2 border-[#efefef] flex justify-center items-center"
            >
              -
            </button>
            <input
              class="detail-product__quantity w-[50px] h-[30px] border-solid border-2 border-[#efefef] text-center" name="quantity"
              value="1"
            />
            <button
              class="detail-product__btn-increase w-[30px] h-[30px] border-solid border-2 border-[#efefef] flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
  
        <div class="detail-product__btn-buy-grp my-4">
          <button
            class="detail-product__btn-buy py-3 px-8 rounded-full border-solid border-2 border-[#4fc286] hover:bg-[#4fc286] uppercase hover:text-white"
          >
            Mua ngay
          </button>
  
          <i
            class="fa-solid fa-magnifying-glass p-3 border-solid border-2 border-[#efefef] rounded-full mx-4"
          ></i>
          <i
            class="fa-solid fa-heart p-3 border-solid border-2 border-[#efefef] rounded-full"
          ></i>
        </div>
      </div>
    </div>
  
    <div class="description-product-box mt-16">
      <div class="description-product-box__title flex">
        <p
          class="description-product-box__infor-product w-1/3 uppercase border-solid border-2 border-b-0 border-s-[1px] border-e-[1px] border-[#aaaaaa] py-3 hover:text-[#4fc286] cursor-pointer flex justify-center items-center"
        >
          Thông tin sản phẩm
        </p>
        <p
          class="description-product-box__cus-review w-1/3 uppercase py-3 hover:text-[#4fc286] cursor-pointer flex justify-center items-center"
        >
          Khách hàng đánh giá
        </p>
        <p
          class="description-product-box__tag w-1/3 uppercase py-3 hover:text-[#4fc286] cursor-pointer flex justify-center items-center"
        >
          Thẻ tag
        </p>
      </div>
  
      <div
        class="description-product-box__detail border-solid border-[1px] border-[#aaaaaa]"
      >
        <div
          class="description-product-box__detail-infor text-justify p-12"
        >
          <p class="py-2">
            ${product.information}
          </p>
        </div>
      </div>
    </div>
    <!-- end description-product-box -->`;
  productElement.innerHTML = htmlProduct;
};

const handleAddProductFromDetailProductToCart = (product) => {
  const buttonAdd = document.querySelector(".detail-product__btn-buy");
  let inputQuantity = 1;

  const carts = JSON.parse(localStorage.getItem(KEY_CART_LIST)) || [];

  buttonAdd.addEventListener("click", () => {
    inputQuantity = parseInt(
      document.querySelector("input[name='quantity']").value
    );

    if (carts.length) {
      if (carts.find((item) => item.id === product.id)) {
        const product_ = carts.find((item) => item.id === product.id);
        product_.quantity += inputQuantity;
      } else {
        carts.push({ ...product, quantity: inputQuantity });
      }
    } else {
      carts.push({ ...product, quantity: inputQuantity });
    }
    localStorage.setItem(KEY_CART_LIST, JSON.stringify(carts));
    handleGetQuantityCart();
  });
};

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = products.find((item) => item.id === Number(productId));

  handleRenderDetailProduct(product);

  let quantity = parseInt(
    document.querySelector("input[name='quantity']").value
  );
  const btnIncrease = document.querySelector(".detail-product__btn-increase");
  btnIncrease.addEventListener("click", () => {
    quantity = isNaN(quantity) ? 1 : quantity;
    quantity++;
    document.querySelector("input[name='quantity']").value = quantity;
  });
  const btnDecrease = document.querySelector(".detail-product__btn-decrease");
  btnDecrease.addEventListener("click", () => {
    quantity = isNaN(quantity) ? 1 : quantity;
    quantity--;
    document.querySelector("input[name='quantity']").value = quantity;
  });

  handleAddProductFromDetailProductToCart(product);
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
};
