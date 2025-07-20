import clientHttpAxios from './clientAxios';



export const setDocument = (data) => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.post('/document', data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};





export const resumeDocument = (id) => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get(`/document/resume/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};



export const exitDocument = () => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get('/document/exit')
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};


export const deleteDocumentFetching = id => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.delete(`/document?id=${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}



export const getPaginateDocument = ({ page, date, limit, franchise, establishment }) => {
    return new Promise((resolve, reject) => {
        console.log(`${date ? `&date=${date}` : ''} `);
        clientHttpAxios.get(`/document/paginate?page=${page}${date ? `&date=${date}` : ''}&limit=${limit ?? 10}${franchise !== '' ? `&franchise=${franchise}` : ''}${establishment !== '' ? `&establishment=${establishment}` : ''}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    })
};




export const getLastDocument = () => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get('/document', data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};



export const getDocumentById = (id, populateParams) => {
    return new Promise((resolve, reject) => {
        const populate = populateParams ? `?populate=${populateParams}` : '';
        clientHttpAxios.get(`/document/${id}${populate}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    })
}



export const isExistDocument = (param) => {
    return new Promise((resolve, reject) => {
        const { franchiseName, establishmentName, shift, date, type } = param;

        if (!franchiseName && !establishmentName) reject('params is undefined');
        if (!shift || !date) reject(`params is undefined`);

        clientHttpAxios.get(`/document/isExists/data?franchiseName=${franchiseName}&establishmentName=${establishmentName}&shift=${shift}&date=${date}&type=${type}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}



export const putDocumentById = (id, body) => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.put(`/document?id=${id}`, body)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};



export const patchDocumentById = (id, body) => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.patch(`/document/update/${id}`, body)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};



export const getPageInDocument = id => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get(`/document/getPage/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    })
}



export const addPageInDocument = (id, body) => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.put(`/document/addpage/${id}`, body)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}



export const updatePageInDocument = (id, body) => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.put(`/document/updatepage/${id}`, body)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}



export const sendImg = file => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        clientHttpAxios.post('/document/file', formData)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};



export const setImgPageInDocument = (id, body) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', body.file);
        formData.append('index', body.index);
        clientHttpAxios.put(`/document/updatePage=${id}/file/`, formData)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};


export const putImagePreShift = (id, body) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', body.file)
        formData.append('index', body.index)

        clientHttpAxios.put(`/document/updatePage-preshift/=${id}/file/`, formData)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}



export const deletePageInDocument = (idDocument, idPage) => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.delete(`/document/Page/document=${idDocument}/page=${idPage}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};




// config


export const getDocumentConfig = id => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get(`/document/config/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};



export const setConfigDocument = (id, body) => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.post(`/document/config/establishment=${id}`, body)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};




export const putConfigDocument = (id, body) => {
    return new Promise((resolve, reject) => {
        const newBody = { ...body }
        if (newBody?.style?.imageBg) delete newBody?.style?.imageBg;
        clientHttpAxios.put(`/document/config/${id}`, newBody)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};


export const putConfigDocument_onlyImgFront = (id, body) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();

        for (const key in body) {
            formData.append(key, body[key]);
        }

        clientHttpAxios.put(`/document/config/img/${id}`, formData)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};