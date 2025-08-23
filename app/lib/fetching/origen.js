//NODE_ENV === 'production'
const url = import.meta.env.VITE_API_URL;
export default function returnIpBase() {
    return url;
}       