
export default function tranUrlToLocal(url: string) {
    if (!url) return null;
    if (url.indexOf('https://amazona365.ddns.net') < 0) return url;
    let dns = `${import.meta.env.VITE_API_URL_IMAGE}${url.split('https://amazona365.ddns.net')[1]}`;
    return dns;
}
