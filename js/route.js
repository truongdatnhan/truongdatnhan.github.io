import home from "./home.js";
import contact from './contact.js'
import shop from "./shop.js";
import notFound from "./404.js";
import detail from "./detail.js";

const routes = [
    {path: "/", requireSegment: false, view: home},
    {path: "/contact", requireSegment: false, view: contact},
    {path: "/shop", requireSegment: false, view: shop},
    {path: "/detail", requireSegment: true, view: detail},
    {path: "/cart", requireSegment: false},
    {path: "/checkout", requireSegment: false},
    {path: "/404", requireSegment: false, view: notFound}
];

const navigate = (content) => {
    const elMain = document.querySelector("#main");
    elMain.innerHTML = content;
};

export {routes, navigate}