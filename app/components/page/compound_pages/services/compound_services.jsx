import LayautPages from '../layautPages';
import HeaderPage from '../headerCompound';
import FooterPage from '../footerCompound';


export default function CompoundServices({ styles, data, updateDataProp, config, deletePage, dataId, typeDelay }) {




    const addRow = () => {

    };




    return(
        <LayautPages dataId={dataId}>
            <HeaderPage deletePage={() => deletePage(null, data._id)} dataId={dataId}>
                <button
                    className=''
                    type='button'
                    title='agregar fila'
                    onClick={addRow}
                >➕  aregar una fila</button>

            </HeaderPage>

            

            <FooterPage eventClick={() => console.log(data)} />
        </LayautPages>
    );
}