


export default function Summary({ summary, dishItem, styles, config }) {


    console.log(summary);

    return null;

    /////////////////  TABLE METRIC
    config?.propMetricTableInToastPos ?
        <>
            <LayautNovelty
                namePage='Resumen general de métricas'
                styles={styles}
            >
                {
                    entriesNameState.length > 2 && entriesNameState.length < 5 ?

                        <div className="w-full h-full">
                            <div className="w-full h-full">
                                <div className='w-full h-[50%] flex direction-row  justify-around'>
                                    <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                        <div className='w-full flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                            <img className='w-[25px]' src={icoGrafic} alt='ico-grafuc' />
                                            <h2 className="w-full">Resumen General</h2>
                                        </div>


                                        <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext">
                                            <div className='w-[50%]'>
                                                <p className="w-full text-gray-600">Procesos evaluados</p>
                                            </div>
                                            <div className='w-[50%]'>
                                                <p style={{
                                                    display: 'block',
                                                    textAlign: 'end'
                                                }} className="font-medium text-gray-900 " >{entriesNameState.length > 1 ? (bodyState['take out'] ? (totalProcess().totalProcess - bodyState['take out'].totalProcess) : totalProcess().totalProcess) : 0}</p>
                                            </div>
                                        </div>


                                        <div className="flex justify-between py-[.1rem] border-b border-gray-100 text-green-600 monotext">
                                            <div className='w-[50%]'>
                                                <p style={{
                                                    width: '100%',
                                                    display: 'block',
                                                    textAlign: 'start'
                                                }} className='w-full'>Demoras preparación</p>
                                            </div>
                                            <div className='w-[50%]'>
                                                <p style={{
                                                    display: 'block',
                                                    textAlign: 'end'
                                                }} className="w-full font-medium">{entriesNameState.length > 1 ? totalProcess().totalDelayToasd : 0}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between py-[.1rem] text-green-600 monotext">
                                            <div className='w-[50%]'>
                                                <p style={{
                                                    display: 'block',
                                                    textAlign: 'start'
                                                }} className='w-full'>Demoras en entrega</p>
                                            </div>
                                            <div className='w-[50%]'>
                                                <p style={{
                                                    display: 'block',
                                                    textAlign: 'end'
                                                }} className="font-medium">{bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay && bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay?.length || 0}</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                        <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                            <img className='w-[25px] h-[25px]' src={icoReloj} alt='ico-grafuc' />
                                            <h2>Tiempos Promedio</h2>
                                        </div>

                                        {
                                            entriesNameState.map((entry, index) => (
                                                <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext" key={entry}>
                                                    <div>
                                                        <p className="text-gray-600">{entry}</p>
                                                    </div>
                                                    <div>
                                                        <p
                                                            className="monotext text-gray-900"
                                                            contentEditable
                                                            onBlur={e => {
                                                                const newBody = { ...dataProp.data };
                                                                newBody.body[entry].average = e.target.textContent;
                                                                updateDataProp(newBody, (data, error) => {
                                                                    setBodyState(data);
                                                                });
                                                            }}
                                                        >{bodyState[entry] && bodyState[entry].average}</p>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>


                                <div className='w-full h-[50%] flex direction-row justify-center justify-around'>
                                    <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                        <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                            <img className='w-[25px] h-[25px]' src={icoProcess} alt='ico-grafuc' />
                                            <h2>Procesos por Categoría</h2>
                                        </div>

                                        {
                                            entriesNameState.map((entry, index) => (
                                                <div className='flex justify-between py-[.1rem] border-b border-gray-100 monotext' key={entry}>
                                                    <div>
                                                        <p className='text-gray-600'>{entry}</p>
                                                    </div>
                                                    <div>
                                                        <p className='font-medium text-gray-900 ' contentEditable onBlur={e => {
                                                            const newBody = { ...dataProp.data };
                                                            newBody.body[entry].totalProcess = Number(e.target.textContent);
                                                            updateDataProp(newBody, (data, error) => {
                                                                setBodyState(data);
                                                            });
                                                        }}
                                                        >{bodyState[entry] && bodyState[entry].totalProcess}</p>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>


                                    <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                        <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                            <img className='w-[25px] h-[25px]' src={icoAlert} alt='ico-grafuc' />
                                            <h2>Demoras por categorias</h2>
                                        </div>
                                        <div className="bg-green-50 rounded-md p-3 mb-4">
                                            {
                                                entriesNameState.map((entry, index) => (
                                                    <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext" key={entry}>
                                                        <div>
                                                            <p className="text-gray-600">{entry}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-green-600">
                                                                {
                                                                    bodyState[entry] && bodyState[entry].delay.length
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="flex justify-between py-[.1rem] text-green ">
                                            <div>
                                                <span className="font-medium">Total superaciones</span>
                                            </div>
                                            <div>
                                                <span className="font-medium monotext">{totalProcess().totalDelayToasd}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        :

                        <div className='w-full h-full'>
                            {
                                console.log(styles)
                            }
                            <TabletLayaut>
                                <thead>
                                    <tr style={{
                                        backgroundColor: styles?.bgTextBox ?? '#ffffff',
                                        color: styles?.colorTextBox ?? '#0000000',

                                    }}>
                                        <th className={styleCellBorder} style={{ padding: '.5rem 0rem' }}>
                                            <div className='flex justify-center items-center gap-[.3rem]'>
                                                <img src={foodIco} alt='ico-time' className='w-[20px] h-[20px]' />
                                                <p>Categoría</p>
                                            </div>
                                        </th>

                                        <th className={styleCellBorder}>
                                            <div className='flex justify-center items-center gap-[.3rem]'>
                                                <img src={icoReloj} alt='ico-time' className='w-[20px] h-[20px]' />
                                                <p>Tiempo promedio</p>
                                            </div>
                                        </th>

                                        <th className={styleCellBorder}>
                                            <div className='flex justify-center items-center gap-[.3rem]'>
                                                <img src={icoProcess} alt='ico-time' className='w-[20px] h-[20px]' />
                                                <p>Procesos registrado</p>
                                            </div>
                                        </th>

                                        <th className={styleCellBorder}>
                                            <div className='flex justify-center items-center gap-[.3rem]'>
                                                <img src={alertIco} alt='ico-time' className='w-[20px] h-[20px]' />
                                                <p>Demoras</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        entriesNameState.map(entrie => (
                                            <tr key={entrie}>
                                                <td className={styleCellBorder}> {entrie} </td>
                                                <td className={styleCellBorder}>
                                                    <p
                                                        contentEditable
                                                        onBlur={e => {
                                                            const newBody = { ...dataProp.data };
                                                            newBody.body[entrie].average = e.target.textContent;
                                                            updateDataProp(newBody, (data, error) => {
                                                                setBodyState(data);
                                                            });
                                                        }}
                                                    >{bodyState[entrie] && bodyState[entrie].average}</p>
                                                </td>


                                                <td className={styleCellBorder}>
                                                    <p contentEditable onBlur={e => {
                                                        const newBody = { ...dataProp.data };
                                                        newBody.body[entrie].totalProcess = Number(e.target.textContent);
                                                        updateDataProp(newBody, (data, error) => {
                                                            setBodyState(data);
                                                        });
                                                    }}
                                                    >{bodyState[entrie] && bodyState[entrie].totalProcess}</p>
                                                </td>


                                                <td className={styleCellBorder}>{bodyState[entrie] && bodyState[entrie].delay.length}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td colSpan={3} className={styleCellBorder}
                                            style={{
                                                backgroundColor: '#ddd'
                                            }}
                                        >Total de procesos evaluados </td>

                                        <td className={styleCellBorder}
                                            style={{
                                                fontWeight: '700'
                                            }}
                                        >
                                            {totalProcess().totalProcess}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td
                                            colSpan={3}
                                            className={styleCellBorder}
                                            style={{
                                                backgroundColor: '#ddd'
                                            }}
                                        >Total de demoras en preparación </td>
                                        <td
                                            className={styleCellBorder}
                                            style={{
                                                color: totalProcess().totalDelayToasd > 1 ? 'red' : '#000000',
                                                fontWeight: '700'
                                            }}

                                        >{totalProcess().totalDelayToasd}</td>
                                    </tr>


                                    <tr>
                                        <td
                                            colSpan={3}
                                            className={styleCellBorder}
                                            style={{
                                                backgroundColor: '#ddd'
                                            }}
                                        > Total de demoras en entrega de plato </td>
                                        <td className={styleCellBorder}
                                            style={{
                                                fontWeight: '700'
                                            }}
                                        >{bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay && bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay?.length || 0}</td>
                                    </tr>
                                </tbody>
                            </TabletLayaut>
                        </div>
                }

            </LayautNovelty>
        </>
        :
        <div className='w-full'>

        </div>

}