import Compressor from 'compressorjs';


interface IparamsCompress {
    file: File,
    level: number,
    callback: (file: File | null, error: any) => void
}


export default function compressFile({file, level, callback}: IparamsCompress): any{
    new Compressor(file, {
        quality: level ?? 0.4,
        success(result: File){
            callback(result, null);
        },
        error(error){
            callback(null, error);
        }
    });
}