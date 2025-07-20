import { memo, ReactNode } from 'react';
import LayautPages from '../layautPages';
import HeaderPage from '../headerCompound';
import FooterPage from '../footerCompound';

import TimeOperator from '../../../../lib/time';
import LayautNovelty from '../../../layaut/LayautPage';


interface Iprops {
    data: any,
    styles: any,
    config: any,
    dataId: string,
    headerPadding: string | null
}


export default function TableTwoImage({ data, styles, dataId, config, headerPadding }: Iprops): ReactNode {


    if (!dataId) return <h1>Error: dataId Is undefined</h1>


    console.log(data);



    const deleteSection = () => {

    };












    return (
        <LayautPages dataId={dataId}>
            <HeaderPage deletePage={deleteSection} children={null} />


            {
                data.data?.body?.length === 1 ?
                    null
                    :
                    null
            }

            <FooterPage eventClick={() => console.log(data)} />
        </LayautPages>
    );
}