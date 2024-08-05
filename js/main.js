import { routes, navigate } from "./route.js";
import * as util from "./util.js";

(async function ($) {
  "use strict";

  const activateTestimonial = () => {
    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 2000,
      center: false,
      dots: true,
      loop: true,
      margin: 25,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 1,
        },
        768: {
          items: 1,
        },
        992: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });
  };

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  const quantityActivate = () => {
    // Product Quantity
    $(".quantity button").on("click", function () {
      var button = $(this);
      var oldValue = button.parent().parent().find("input").val();
      if (button.hasClass("btn-plus")) {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
      button.parent().parent().find("input").val(newVal);
    });
  };

  const deleteItemCart = () => {
    $("tr button").on("click", function () {
      const button = $(this);
      const tr = this.closest("tr");
      const id = tr.dataset.id;

      const cart = JSON.parse(localStorage.getItem("cart")).filter(
        (x) => x.id != id
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "/cart";
    });
  };

  const updateCartQuantity = (length) => {
    const cartElement = document.getElementById("cartQuantity");
    if (length === null || length === undefined) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartElement.innerHTML = cart.length;
    } else {
      cartElement.innerHTML = length;
    }
  };

  const addToCart = () => {
    document.getElementById("addToCart").addEventListener("click", async () => {
      const res = await fetch("/data/product.json");
      const resData = await res.json();
      const id = $("#itemProductId").val();
      const itemDetail = resData.find((x) => x.id == id);

      if (itemDetail === null || itemDetail === undefined) {
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const cartItem = cart.find((x) => x.id === itemDetail.id);

      if (cartItem === null || cartItem === undefined) {
        // not exists in cart -> add
        const cartObject = {
          id: itemDetail.id,
          name: itemDetail.name,
          images: itemDetail.images,
          price: itemDetail.price,
          quantity: parseInt($("#quantity").val()),
          total: itemDetail.price * $("#quantity").val(),
        };
        cart.push(cartObject);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cartItem.quantity += parseInt($("#quantity").val()); // reference so no need to push
        cartItem.total = cartItem.quantity * cartItem.price;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      updateCartQuantity(cart.length);
    });
  };

  const formValidation = () => {
    document.querySelector("form").addEventListener('submit', function (ev) {
      ev.preventDefault();
      const formData = new FormData(ev.target);
      console.log(formData);
      const data = Object.fromEntries(formData.entries());
      console.log(data);

      if(data.firstName === null || data.firstName === undefined || data.firstName === '') {
        alert('Cannot leave first name empty !');
        return;
      }

      if(data.lastName === null || data.lastName === undefined || data.lastName === '') {
        alert('Cannot leave last name empty !');
        return;
      }

      if(data.address === null || data.address === undefined || data.address === '') {
        alert('Cannot leave address empty !');
        return;
      }

      if(data.city === null || data.city === undefined || data.city === '') {
        alert('Cannot leave city empty !');
        return;
      }

      if(data.country === null || data.country === undefined || data.country === '') {
        alert('Cannot leave country empty !');
        return;
      }


      if(data.zip === null || data.zip === undefined || data.zip === '') {
        alert('Cannot leave zip empty !');
        return;
      }

      if(data.mobile === null || data.mobile === undefined || data.mobile === '') {
        alert('Cannot leave mobile empty !');
        return;
      }

      if(data.email === null || data.email === undefined || data.email === '') {
        alert('Cannot leave email empty !');
        return;
      }

      if( !('payment') in data || data.payment === null || data.payment === undefined || data.payment === '') {
        alert('Select payment method !');
        return;
      }

      localStorage.clear();
      window.location.href = "/thankyou";
    });
  };

  const initial = async () => {
    navigate(await routes[0].view());
    activateTestimonial();
  };

  await initial();

  window.navigation.addEventListener("navigate", async (event) => {
    event.preventDefault();
    const path = util.url(event.destination.url).pathname;
    const segments = path.split("/").filter((segment) => segment.length > 0);
    updateCartQuantity();
    if (segments.length === 0) {
      // home page
      navigate(await routes[0].view());
      activateTestimonial();
    } else {
      //console.log(segments);
      const route = routes.find((r) => r.path === `/${segments[0]}`);
      //console.log(route);

      if (route === null || route === undefined) {
        navigate(routes[6].view()); // 404 page
        return;
      }

      if (route.requireSegment) {
        if (segments.length < 2) {
          // not supply id
          navigate(routes[6].view()); // 404 page
          return;
        } else {
          navigate(await route.view(segments[1]));
          quantityActivate();
          addToCart();
        }
      } else if (route.path === "/shop") {
        navigate(await route.view(util.url(event.destination.url)));
      } else if (route.path === "/cart") {
        navigate(await route.view());
        deleteItemCart();
      } else if (route.path === "/checkout") {
        navigate(route.view());
        formValidation();
      } else {
        navigate(await route.view());
      }
    }
  });
})(jQuery);
