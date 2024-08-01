const url = (urlStr) => {
    return new URL(urlStr);
};

const queryStringToObject = url =>
    Object.fromEntries([...new URLSearchParams(url.split('?')[1])]);

export {url, queryStringToObject};