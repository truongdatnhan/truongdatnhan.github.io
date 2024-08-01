import * as util from './util.js';

const ITEM_PER_PAGE = 12;

const category = async () => {
  const res = await fetch("/data/category.json");
  const categories = await res.json();

  const listCategory = document.createElement("ul");
  listCategory.classList.add("list-unstyled", "fruite-categorie");

  categories.forEach((item) => {
    const category = `<li>
        <div class="d-flex justify-content-between fruite-name">
            <a href="/shop?catalog=${item.category}"><i class="fas fa-apple-alt me-2"></i>${item.category}</a>
            <span>(${item.item_count})</span>
        </div>
    </li>`;
    listCategory.insertAdjacentHTML("beforeend", category);
  });

  return listCategory.outerHTML;
};

const filter = (products, keyword, category, page) => {
  if (category !== undefined && category !== null && category !== '') {
    products = products.filter((x) => x.category === category);
  }

  if (keyword !== undefined && keyword !== null && keyword !== '') {
    products = products.filter((x) => x.name.includes(keyword));
  }

  // index more than products
  if ((page - 1) * ITEM_PER_PAGE > products.length) {
    return [[], 0, 0];
  }

  const totalPage = Math.ceil(products.length / ITEM_PER_PAGE);

  const skip = (page - 1) * ITEM_PER_PAGE;
  const take = Math.min(page * ITEM_PER_PAGE, products.length);

  products = products.slice(skip, take);

  return [products, totalPage];
};

const item = (products) => {
  if (products.length === 0) {
    return "";
  }

  const holder = document.createElement("div");

  products.forEach((el) => {
    const product = `<div class="col-md-6 col-lg-6 col-xl-4">
                                        <div class="rounded position-relative fruite-item">
                                            <div class="fruite-img">
                                                <img src="${el.images}" class="img-fluid w-100 rounded-top" alt="">
                                            </div>
                                            <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${el.category}</div>
                                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                                <h4>${el.name}</h4>
                                                <p>${el.description}</p>
                                                <div class="d-flex justify-content-between flex-lg-wrap">
                                                    <p class="text-dark fs-5 fw-bold mb-0">${el.price} CAD / ${el.uom}</p>
                                                    <a href="/detail/${el.id}" class="btn border border-secondary rounded-pill px-3 text-primary">To Detail</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
    holder.insertAdjacentHTML("beforeend", product);
  });

  return holder.innerHTML;
};

const pagination = (activatePage, total, url) => {
  const holder = document.createElement("div");

  // first page -> can't move back
  if (activatePage === 1) {
    holder.insertAdjacentHTML("beforeend", `<a class="rounded">&laquo;</a>`);
  } else {
    holder.insertAdjacentHTML(
      "beforeend",
      '<a href="#" class="rounded">&laquo;</a>'
    );
  }

  for (let i = 1; i <= total; i++) {
    if (i === activatePage) {
      holder.insertAdjacentHTML(
        "beforeend",
        `<a class="active rounded">${i}</a>`
      );
    } else {
        url.searchParams.set('page', i);
      holder.insertAdjacentHTML(
        "beforeend",
        `<a href="${url.pathname + url.search}" class="rounded">${i}</a>`
      );
    }
  }

  // last page -> can't move foward
  if (activatePage === total) {
    holder.insertAdjacentHTML("beforeend", '<a class="rounded">&raquo;</a>');
  } else {
    holder.insertAdjacentHTML(
      "beforeend",
      `<a href="#" class="rounded">&raquo;</a>`
    );
  }

  return `<div class="col-12">
            <div class="pagination d-flex justify-content-center mt-5">
                ${holder.innerHTML}
            </div>
        </div>`;
};

export default async function shop(url) {
  const res = await fetch("/data/product.json");
  const resData = await res.json();
  const {keyword, catalog, activatePage = 1} = util.queryStringToObject(url.search);
  const [paginatedProducts, totalPage] = filter(
    resData,
    keyword,
    catalog,
    activatePage
  );

  console.log(activatePage, totalPage);
  const categories = await category();
  const products = item(paginatedProducts);
  const pages = pagination(activatePage, totalPage, url);
  return `
        <!-- Single Page Header start -->
            <div class="container-fluid page-header py-5">
                <h1 class="text-center text-white display-6">Shop</h1>
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
        <!-- Single Page Header End -->


        <!-- Fruits Shop Start-->
        <div class="container-fluid fruite py-5">
            <div class="container py-5">
                <h1 class="mb-4">Fresh fruits shop</h1>
                <div class="row g-4">
                    <div class="col-lg-12">
                        <div class="row g-4">
                            <div class="col-xl-3">
                                <div class="input-group w-100 mx-auto d-flex">
                                    <input type="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1">
                                    <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                                </div>
                            </div>
                            <div class="col-6"></div>
                            <div class="col-xl-3">
                                <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                    <label for="fruits">Default Sorting:</label>
                                    <select id="fruits" name="fruitlist" class="border-0 form-select-sm bg-light me-3" form="fruitform">
                                        <option value="volvo">Nothing</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-lg-3">
                                <div class="row g-4">
                                    <div class="col-lg-12">
                                        <div class="mb-3">
                                            <h4>Categories</h4>
                                            ${categories}
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="position-relative">
                                            <img src="img/banner-fruits.jpg" class="img-fluid w-100 rounded" alt="">
                                            <div class="position-absolute" style="top: 50%; right: 10px; transform: translateY(-50%);">
                                                <h3 class="text-secondary fw-bold">Fresh <br> Fruits <br> Banner</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="row g-4 justify-content-center">
                                    ${products}
                                    ${pages}                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fruits Shop End-->`;
}
