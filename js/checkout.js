import * as util from "./util.js";

const itemsSummary = (cart) => {
  const tBody = document.createElement("tbody");
  cart.forEach((element) => {
    const row = `<tr>
                                            <th scope="row">
                                                <div class="d-flex align-items-center mt-2">
                                                    <img src="${element.images}" class="img-fluid rounded-circle" style="width: 90px; height: 90px;" alt="">
                                                </div>
                                            </th>
                                            <td class="py-5">${element.name}</td>
                                            <td class="py-5">${element.price} CAD</td>
                                            <td class="py-5">${element.quantity}</td>
                                            <td class="py-5">${element.total}</td>
                                        </tr>`;
    tBody.insertAdjacentHTML("beforeend", row);
  });

  const totalPrice = util.cartTotalPrice();

  // subtotal
  tBody.insertAdjacentHTML(
    "beforeend",
    `<tr>
                                            <th scope="row">
                                            </th>
                                            <td class="py-5"></td>
                                            <td class="py-5"></td>
                                            <td class="py-5">
                                                <p class="mb-0 text-dark py-3">Subtotal</p>
                                            </td>
                                            <td class="py-5">
                                                <div class="py-3 border-bottom border-top">
                                                    <p class="mb-0 text-dark">${totalPrice} CAD</p>
                                                </div>
                                            </td>
                                        </tr>`
  );

  // shipping
  tBody.insertAdjacentHTML(
    "beforeend",
    `<tr>
                                            <th scope="row">
                                            </th>
                                            <td class="py-5"></td>
                                            <td class="py-5"></td>
                                            <td class="py-5">
                                                <p class="mb-0 text-dark py-3">Shipping</p>
                                            </td>
                                            <td class="py-5">
                                                <div class="py-3 border-bottom border-top">
                                                    <p class="mb-0 text-dark">5 CAD</p>
                                                </div>
                                            </td>
                                        </tr>`
  );

  // total
  tBody.insertAdjacentHTML(
    "beforeend",
    `<tr>
                                            <th scope="row">
                                            </th>
                                            <td class="py-5"></td>
                                            <td class="py-5"></td>
                                            <td class="py-5">
                                                <p class="mb-0 text-dark py-3">Subtotal</p>
                                            </td>
                                            <td class="py-5">
                                                <div class="py-3 border-bottom border-top">
                                                    <p class="mb-0 text-dark">${
                                                      totalPrice + 5
                                                    } CAD</p>
                                                </div>
                                            </td>
                                        </tr>`
  );

  return tBody.outerHTML;
};

export default function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    return `<!-- Single Page Header start -->
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Checkout</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active text-white">Checkout</li>
            </ol>
        </div>
        <!-- Single Page Header End -->
        
        <!-- Cart Page Start -->
        <div class="container-fluid py-5">
            <div class="container text-center">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <i class="fa fa-shopping-bag display-1 text-primary"></i>
                        <h1 class="display-1">Add something before checkout ;)</h1>
                    </div>
                </div>
            </div>
        </div>
        <!-- Cart Page End -->`;
  }


  const items = itemsSummary(cart);

  return `<!-- Single Page Header start -->
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Checkout</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active text-white">Checkout</li>
            </ol>
        </div>
        <!-- Single Page Header End -->


        <!-- Checkout Page Start -->
        <div class="container-fluid py-5">
            <div class="container py-5">
                <h1 class="mb-4">Billing details</h1>
                <form action="/thankyou" method="get">
                    <div class="row g-5">
                        <div class="col-md-12 col-lg-6 col-xl-7">
                            <div class="row">
                                <div class="col-md-12 col-lg-6">
                                    <div class="form-item w-100">
                                        <label for="firstName" class="form-label my-3">First Name<sup>*</sup></label>
                                        <input id="firstName" name="firstName" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <div class="form-item w-100">
                                        <label for="lastName" class="form-label my-3">Last Name<sup>*</sup></label>
                                        <input id="lastName" name="lastName" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="form-item">
                                <label for="address" class="form-label my-3">Address <sup>*</sup></label>
                                <input id="address" name="address" type="text" class="form-control" placeholder="House Number Street Name">
                            </div>
                            <div class="form-item">
                                <label for="city" class="form-label my-3">Town/City<sup>*</sup></label>
                                <input id="city" name="city" type="text" class="form-control">
                            </div>
                            <div class="form-item">
                                <label for="country" class="form-label my-3">Country<sup>*</sup></label>
                                <input id="country" name="country" type="text" class="form-control">
                            </div>
                            <div class="form-item">
                                <label for="zip" class="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                <input id="zip" name="zip" type="text" class="form-control">
                            </div>
                            <div class="form-item">
                                <label for="mobile" class="form-label my-3">Mobile<sup>*</sup></label>
                                <input id="mobile" name="mobile" type="tel" class="form-control">
                            </div>
                            <div class="form-item">
                                <label for="email" class="form-label my-3">Email Address<sup>*</sup></label>
                                <input id="email" name="email" type="email" class="form-control">
                            </div>
                            <hr>
                            <div class="form-item">
                                <textarea name="note" class="form-control" spellcheck="false" cols="30" rows="11" placeholder="Oreder Notes (Optional)"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6 col-xl-5">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    ${items}
                                </table>
                            </div>
                            <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div class="col-12">
                                    <div class="form-radio text-start my-3">
                                        <input type="radio" class="form-check-input bg-primary border-0" id="payments-1" name="payment" value="Check">
                                        <label class="form-check-label" for="payments-1">Check Payments</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div class="col-12">
                                    <div class="form-radio text-start my-3">
                                        <input type="radio" class="form-check-input bg-primary border-0" id="payment-2" name="payment" value="COD">
                                        <label class="form-check-label" for="payment-2">Cash On Delivery</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Checkout Page End -->`;
}
