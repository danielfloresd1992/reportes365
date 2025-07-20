interface IResultImg{
    data64: string | ArrayBuffer | null,
    file: File
};


export function readFileToUrl(file: File): Promise<IResultImg>{
    return new Promise((resolve, reject) => {
        
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('error', (error : ProgressEvent<FileReader>) => {
            reject(error);
        });
        fileReader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
            const target = e.target as FileReader;
            const resultSrc: string | ArrayBuffer | null = target.result;

            const result: IResultImg = {
                data64: resultSrc,
                file: file
            };
            resolve(result);
        })
    });
}