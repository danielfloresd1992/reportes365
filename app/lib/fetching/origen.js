//NODE_ENV === 'production'
export default function returnIpBase() {
    return import.meta.env.VITE_API_URL;
}       