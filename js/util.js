const url = (urlStr) => {
    return new URL(urlStr);
};

const queryStringToObject = url =>
    Object.fromEntries([...new URLSearchParams(url.split('?')[1])]);

const cartTotalPrice = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    const totalCartValue = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.total;
    }, 0);

    return totalCartValue;
}

export {url, queryStringToObject, cartTotalPrice};