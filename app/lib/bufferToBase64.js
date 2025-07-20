
function arrayBufferToBase64( buffer , type) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    const file = window.btoa(binary);
    return `data:${type};base64,` + file;
};


function bufferToDataURL(buffer, type){
    const binary = String.fromCharCode.apply(null, new Uint8Array(buffer));
    const base64 = btoa(binary);
    return `data:${type};base64,${base64}`;
}


export { arrayBufferToBase64, bufferToDataURL };