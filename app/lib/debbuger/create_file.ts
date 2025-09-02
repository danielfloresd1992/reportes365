export function downloadJSON(obj: unknown, fileName: string = 'data.json'): void {
    // Convertir el objeto a texto JSON con formato legible
    const jsonString: string = JSON.stringify(obj, null, 2);

    // Crear un Blob con el contenido
    const blob: Blob = new Blob([jsonString], { type: 'application/json' });

    // Crear una URL temporal para el Blob
    const url: string = URL.createObjectURL(blob);

    // Crear un enlace invisible para forzar la descarga
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Limpiar
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}