// get products litst
const getProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  //   console.log(data, "products");
  return data;
};

const products = await getProducts();

// render Products
const renderProducts = () => {
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

      <div
           class="products__list-add-remove absolute top-0 right-0 flex items-center justify-around hover:border-solid hover:border-2 hover:border-[#d1d1d1] w-[60px] h-[40px] cursor-default"
       >
          <i
              class="fa-solid fa-cart-plus products__list-add cursor-pointer"
          ></i>
          <i
              class="fa-regular fa-trash-can products__list-remove cursor-pointer"
          ></i>
      </div>

      <div class="products__list-img">
        <img
          src="${imgURL}"
          class="w-full"
          alt="cay_chan_chim"
        />
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
const handleAddProductToCart = () => {
  const carts = [];
  const productsList = document.querySelectorAll(".products__list-item");

  productsList.forEach((product) => {
    product.addEventListener("click", (e) => {
      const id = product.getAttribute("productId");

      //   add products to cart, save on local storage
      if (e.target.classList.contains("products__list-add")) {
        // console.log(true, id);
        const productToCart = products.find((item) => item.id === Number(id));
        // console.log(productToCart);

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
        localStorage.setItem("carts", JSON.stringify(carts));
      }
    });
  });

  // get products cart từ local storage
  const cartsList = JSON.parse(localStorage.getItem("carts"));
  console.log(cartsList);
  // show products to cart
  const htmlListCart = cartsList.map((item) => {
    const imgURL = "../." + `${item.imgURL}`;
    const priceProduct = item.originalPrice * (1 - item.percentSale);
    return `<tr class="main-cart__table-cart-item">
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
      <i class="fa-solid fa-trash-can"></i>
    </td>
  </tr>`;
  });
  if (document.querySelector(".main-cart__table-cart-tbody")) {
    document.querySelector(".main-cart__table-cart-tbody").innerHTML =
      htmlListCart.join("");
  }
};

const handleRedirectToDetailProduct = () => {};

window.onload = () => {
  renderProducts();
  handleAddProductToCart();
};
