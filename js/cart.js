import * as util from './util.js';

const cartItemTable = (cart) => {
  const tBody = document.createElement("tbody");
  cart.forEach((element) => {
    const rowItem = `<tr data-id="${element.id}">
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <img src="${element.images}" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="" alt="">
                                            </div>
                                        </th>
                                        <td>
                                            <p class="mb-0 mt-4">${element.name}</p>
                                        </td>
                                        <td>
                                            <p class="mb-0 mt-4">${element.price} CAD</p>
                                        </td>
                                        <td>
                                            <div class="input-group quantity mt-4" style="width: 100px;">
                                                <input type="text" class="form-control form-control-sm text-center border-0" value="${element.quantity}">
                                            </div>
                                        </td>
                                        <td>
                                            <p class="mb-0 mt-4">${element.total}</p>
                                        </td>
                                        <td>
                                            <button class="btn btn-md rounded-circle bg-light border mt-4" >
                                                <i class="fa fa-times text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                                    tBody.insertAdjacentHTML("beforeend", rowItem);
  });

  return tBody.outerHTML;
};

const cartTotal = (totalPrice) => {
    return `<div class="bg-light rounded">
                            <div class="p-4">
                                <h1 class="display-6 mb-4">Cart <span class="fw-normal">Total</span></h1>
                                <div class="d-flex justify-content-between mb-4">
                                    <h5 class="mb-0 me-4">Subtotal:</h5>
                                    <p class="mb-0">${totalPrice} CAD</p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h5 class="mb-0 me-4">Shipping</h5>
                                    <div class="">
                                        <p class="mb-0">Flat rate: $5.00</p>
                                    </div>
                                </div>
                            </div>
                            <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                <h5 class="mb-0 ps-4 me-4">Total</h5>
                                <p class="mb-0 pe-4">${totalPrice + 5} CAD</p>
                            </div>
                            <a href="/checkout" class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</a>
                        </div>`;
}

export default function cart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if(cart.length === 0) {
    return `<!-- Single Page Header start -->
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Cart</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active text-white">Cart</li>
            </ol>
        </div>
        <!-- Single Page Header End -->
        
        <!-- Cart Page Start -->
        <div class="container-fluid py-5">
            <div class="container text-center">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <i class="fa fa-shopping-bag display-1 text-primary"></i>
                        <h1 class="display-1">Add something ;)</h1>
                    </div>
                </div>
            </div>
        </div>
        <!-- Cart Page End -->`;
  }

  const itemTable = cartItemTable(cart);
  const total = cartTotal(util.cartTotalPrice());
  return `<!-- Single Page Header start -->
        <div class="container-fluid page-header mb-5">
            <h1 class="text-center text-white display-6">Cart</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active text-white">Cart</li>
            </ol>
        </div>
        <!-- Single Page Header End -->
        
        <!-- Cart Page Start -->
        <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="row g-4 justify-content-end">
                    <div class="col-md-12 col-lg-8">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                  </tr>
                                </thead>
                                ${itemTable}
                            </table>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-4">
                        ${total}
                    </div>
                </div>
            </div>
        </div>
        <!-- Cart Page End -->`;
}
