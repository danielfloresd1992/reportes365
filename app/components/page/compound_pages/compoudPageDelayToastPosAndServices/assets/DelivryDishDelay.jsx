

export default function DeliveyDelay({ delay_data, dishItem, styles, addCell, editCell, deleteCell, }) {


    console.log(delay_data);

    return null;


    bodyState?.delayDeliveryDishWhenItIsReadyInKitchen && bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay.map((delayDelivery, indexDelay) => {
        return (
            <LayautNovelty
                onSwipeRight={{
                    callbackDelete: () => {
                        deleteDelayInTable(delayDelivery._id, 'delayDeliveryDishWhenItIsReadyInKitchen');
                    },
                    deleteOnSwipe: true
                }}
                styles={styles}
                namePage=''
                key={delayDelivery._id}
                boubleClickEvent={() => findNovelty(delayDelivery._id)}
            >
                <div className='w-full h-full flex flex-wrap item-center justify-center gap-[.5rem]' onClick={() => console.log(delayDelivery)}>
                    <div className='w-full flex justify-center'>
                        <div className='w-[70%]'>
                            <Title styles={styles}>

                                <p style={{ color: styles?.colorTextBox ?? '#000000' }}>Demora en entrega de {delayDelivery.nameDish ?? 'plato'} - mesa:
                                    <input
                                        className='unstyledInput w-[20px]'
                                        style={{ width: '30px' }}
                                        type='text'
                                        onChange={e => {
                                            editCell(delayDelivery._id, { table: Number(e.target.value) }, 'delayDeliveryDishWhenItIsReadyInKitchen')
                                        }}
                                        value={delayDelivery.table ?? 'N/A'}

                                    />
                                </p>
                            </Title>
                        </div>
                    </div>
                    {
                        delayDelivery.imageUrl.map((imgObject, indexImage) => (
                            <Image
                                key={imgObject._id}
                                caption={imgObject.caption}
                                styles={styles}
                                setSrc={tranUrlToLocal(imgObject.url)}
                                title={
                                    delayDelivery.timePeriod ? (indexImage === 0 ? delayDelivery.timePeriod.tomaOrden : (indexImage === 1 ? delayDelivery.timePeriod.listoCocina : ((indexImage === 2 ? delayDelivery.timePeriod.listoTablet : delayDelivery.timePeriod.entregaPlato)))) : ''
                                }
                                getFile={data => getNewUrlImg(data, { delay: 'delayDeliveryDishWhenItIsReadyInKitchen', data: delayDelivery, id: delayDelivery._id, index: indexImage })}
                                arrowCordernate={true}
                                setCoordinates={imgObject?.coordinates ? imgObject.coordinates : null}
                                saveCordenate={data => {
                                    const newData = { imageUrl: [...delayDelivery.imageUrl] }
                                    newData.imageUrl[indexImage].coordinates = data;
                                    editCell(delayDelivery._id, newData, 'delayDeliveryDishWhenItIsReadyInKitchen');
                                }}
                                boubleClickEvent={() => findNovelty(delayDelivery._id)}
                            />
                        ))
                    }
                    <div className='w-full flex justify-center'>
                        <div className='w-[50%]'>
                            <Title styles={styles}>
                                <p style={{ color: styles?.colorTextBox ?? '#000000' }}>Duración:
                                    <input
                                        className='unstyledInput'
                                        style={{ width: '75px' }}
                                        type='text'
                                        onChange={e => {
                                            editCell(delayDelivery._id, { timePeriod: { ...delayDelivery.timePeriod, timeTotal: e.target.value } }, 'delayDeliveryDishWhenItIsReadyInKitchen');
                                        }}
                                        value={`${delayDelivery?.timePeriod?.timeTotal ?? TimeOperator.calculateTime(delayDelivery.timePeriod.listoCocina, delayDelivery.timePeriod.entregaPlato)}`}
                                    />
                                </p>
                            </Title>

                        </div>
                    </div>
                </div>
            </LayautNovelty>
        );
    });
}