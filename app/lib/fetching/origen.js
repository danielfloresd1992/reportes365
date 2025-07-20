//NODE_ENV === 'production'
export default function returnIpBase() {
    const mode = process.env.NODE_ENV === 'development';
    let domain;
    if (typeof window !== 'undefined') {
        const origin = window.location.hostname;
        if (!mode) {
            if (origin === '72.68.60.254') {
                domain = 'https://72.68.60.254/api_jarvis/v1'
            }
            else {
                domain = 'https://amazona365.ddns.net/api_jarvis/v1'
            }
        }
        else {
            if (origin === '72.68.60.201' || origin === 'localhost') {
                //domain = 'https://72.68.60.201:3006/api_jarvis_dev/v1'
                domain = 'https://72.68.60.254/api_jarvis/v1'
            }
            else {
                domain = 'https://amazona365.ddns.net:3006/api_jarvis_dev/v1'
            }
        }
        return domain;
    }
}       