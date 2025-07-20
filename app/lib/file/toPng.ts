import { toPng } from  'html-to-image'


export async function htmlToPng(arrHtml:[HTMLInputElement]){
    const arrPng: any= []

    for(let i = 0; i < arrHtml.length; i++){
        arrHtml[i].style.margin = '0';
        const iteratedElement: any = arrHtml[i];
        const sectionInput: HTMLInputElement | null = iteratedElement.querySelector('#input-remove');
        const button_delete: HTMLInputElement | null = iteratedElement.querySelector('#delete-2020scv');
        let base64Png: string = '';
        
        if(sectionInput) sectionInput.classList.add('hidden-element');
        if(button_delete) button_delete.classList.add('hidden-element');

        if(iteratedElement.id === 'compund-page'){
            const pageCompound1 = await toPng(iteratedElement.children[1]);
            const pageCompound2 = await toPng(iteratedElement.children[2]);
            arrPng.push(pageCompound1);
            arrPng.push(pageCompound2);
        }
        else{
            base64Png = await toPng(iteratedElement);
            arrPng.push(base64Png);
        }


        if(sectionInput) sectionInput.classList.remove('hidden-element');
        if(button_delete) button_delete.classList.remove('hidden-element');
        arrHtml[i].style.margin = 'revert-layer';
    }
    return arrPng;
}