import clientHttpAxios from './clientAxios';




export function getFranchiseWithItsEstablishments(name) {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get(`/franchise/establishments=${name}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};


export function getEstablishmentAll() {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get('/establishment')
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};



export function getImgEstablishmentById(id, params) {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get(`/local/id=${id}${params ? `?populate=${params}` : ''}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};
