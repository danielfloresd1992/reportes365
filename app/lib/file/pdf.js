import { jsPDF } from 'jspdf';

export const pdfClassic = (arr_image) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new jsPDF({
                orientation: "la ndscape"/*, compress: true*/, unit: "mm",
                format: "a4",
                compress: false, // ← Desactiva compresión general del PDF
                hotfixes: [],   // ← Evita correcciones que puedan afectar calidad
                precision: 16
            });
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            arr_image.forEach((element, index) => {
                doc.addImage(element, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
                if (index < arr_image.length - 1) doc.addPage();
            });
            resolve(doc);
        }
        catch (error) {
            reject(error);
        }
    });
};