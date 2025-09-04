export const chunkArray = (arr, chunkSizeParams) => {

    if (arr.length <= 15) return [arr];

    if (!chunkSizeParams) return [];



    const chunkSize = chunkSizeParams;
    const arrayForReturn = [];





    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        arrayForReturn.push(chunk);
    }

    if (arrayForReturn <= 1) return arrayForReturn;



    const lastChunk = arrayForReturn[arrayForReturn.length - 1];
    const numElementsInLastChunk = lastChunk.length;

    if (numElementsInLastChunk > 0 && numElementsInLastChunk < 5) {
        // El último chunk es pequeño. Se extrae y sus elementos se considerarán el "residuo" (k elementos).
        const elementsToProcessAsRemainder = arrayForReturn.pop();
        const k = elementsToProcessAsRemainder.length; // k será 1, 2 o 3.

        // Ahora, arrayForReturn contiene las secciones "más completas" que precedían al residuo.
        // Su longitud es de al menos 1 (ya que originalmente tenía >= 2 chunks).

        // Realizar el "movimiento" de k elementos entre las secciones si hay al menos dos
        // secciones restantes en arrayForReturn para que ocurra el intercambio.
        // (es decir, si arrayForReturn contiene al menos C1 y C2 después de extraer el residuo).
        if (arrayForReturn.length > 1) {
            // Iterar desde la penúltima sección (índice arrayForReturn.length - 2)
            // hacia atrás hasta la primera (índice 0).
            for (let j = arrayForReturn.length - 2; j >= 0; j--) {
                const targetChunk = arrayForReturn[j];          // Sección que recibe elementos (Cj)
                const sourceChunk = arrayForReturn[j + 1];      // Sección que cede elementos (C(j+1))

                // Extraer los primeros 'k' elementos de sourceChunk.
                // El método splice modifica sourceChunk directamente y devuelve los elementos eliminados.
                const elementsToShift = sourceChunk.splice(0, k);

                // Añadir estos elementos extraídos al final de targetChunk.
                targetChunk.push(...elementsToShift);
            }
        }

        // Finalmente, añadir los elementos del residuo original (elementsToProcessAsRemainder)
        // a la última sección de arrayForReturn (que pudo haber sido modificada por la propagación).
        // Esto es seguro porque arrayForReturn tiene al menos un elemento en este punto.
        arrayForReturn[arrayForReturn.length - 1].push(...elementsToProcessAsRemainder);
    }
    return arrayForReturn;
};



export const chunkArr = (arrProps) => {
    const chunkSize = 4;
    const returnArr = [];
    for (let i = 0; i < arrProps.length; i += chunkSize) {
        returnArr.push(arrProps.slice(i, i + chunkSize));
    }
    return returnArr;
};