import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TimeOperator from '../../../../../lib/time';
import tranUrlToLocal from '../../../../../lib/fetching/transUrlLocal';

import { parserPipeOneObject } from '../../../../../lib/dataParser/dataForNovelty';
import { sendImg } from '../../../../../lib/fetching/documents';

import SectionForDelay from './section_for_delay/section';
import LayautNovelty from '../../../../layaut/LayautPage';
import Title from '../../../TitleContent';
import Image from '../../../../image_for_page/image';





export default function DeliveyDelay({ delay_data, dishItem, styles, editCell }) {





    const addCell = useCallback((typeFood) => {
        const row = {
            _id: uuidv4(),
            table: '0',
            imageToShare: null,
            createdAt: TimeOperator.returnTimeIso(),
            nameDish: typeFood,
            timePeriod: {
                tomaOrden: '00:00:00',
                listoTablet: '00:00:00',
                listoCocina: '00:00:00',
                EntregaPLato: '00:00:00',
                timeTotal: null
            }

        };

        row.imageUrl = [
            { _id: uuidv4(), caption: 'Toma de Orden', url: null, index: 0 },
            { _id: uuidv4(), caption: 'Listo en cocina', url: null, index: 1 },
            { _id: uuidv4(), caption: 'Listo en tablet', url: null, index: 2 },
            { _id: uuidv4(), caption: 'Entrega de plato', url: null, index: 3 }
        ];
        const newArr = [...delay_data.delay, row];
        editCell({ ...delay_data, delay: newArr }, delay_data.type);
    });





    const updateCell = (index, data) => {
        const parseData = parserPipeOneObject(data, true);
        const indexDelay = delay_data.delay.findIndex(item => item._id === data._id);
        const newArrDelau = [...delay_data.delay];
        newArrDelau[indexDelay] = parseData;
        editCell({ ...delay_data, delay: newArrDelau }, delay_data.type);
    };


    const deleteCell = (index, data) => {
        const filterDelay = delay_data.delay.filter(item => item._id !== data._id);
        editCell({ ...delay_data, delay: filterDelay }, delay_data.type);
    };



    const getNewUrlImg = (file, delay, indexImage) => {
        sendImg(file)
            .then(response => {
                const newData = { ...delay };
                newData.imageUrl[indexImage].url = response.data.urlFile;
                const indexDelay = delay_data.delay.findIndex(item => item._id === delay._id);
                const newArrDelay = [...delay_data.delay];
                newArrDelay[indexDelay] = newData;
                editCell({ ...delay_data, delay: newArrDelay }, delay_data.type);
            })
            .catch(error => {
                console.log(error);
            });
    };





    return (
        <SectionForDelay
            title='Demora en entrega'
            add={addCell}
            dishItem={dishItem}

        >
            {
                delay_data.delay.map((delayDelivery, indexDelay) => {
                    return (
                        <LayautNovelty
                            onSwipeRight={{
                                callbackDelete: () => {
                                    deleteCell(null, delayDelivery);
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
                                                        const newData = { ...delayDelivery, table: Number(e.target.value) }
                                                        updateCell(null, newData);
                                                    }}
                                                    value={delayDelivery.table ?? 'N/A'}

                                                />
                                            </p>
                                        </Title>
                                    </div>
                                </div>
                                {
                                    delayDelivery.imageUrl.map((imgObject, indexImage) => {

                                        return (
                                            <Image
                                                key={imgObject._id}
                                                caption={imgObject.caption}
                                                styles={styles}
                                                setSrc={tranUrlToLocal(imgObject.url)}
                                                title={
                                                    delayDelivery.timePeriod ? (indexImage === 0 ? delayDelivery.timePeriod.tomaOrden : (indexImage === 1 ? delayDelivery.timePeriod.listoCocina : ((indexImage === 2 ? delayDelivery.timePeriod.listoTablet : delayDelivery.timePeriod.entregaPlato)))) : ''
                                                }
                                                getFile={data => {
                                                    getNewUrlImg(data, delayDelivery, indexImage);
                                                }}
                                                arrowCordernate={true}
                                                setCoordinates={imgObject?.coordinates ? imgObject.coordinates : null}
                                                saveCordenate={data => {
                                                    const newData = { imageUrl: [...delayDelivery.imageUrl] }
                                                    newData.imageUrl[indexImage].coordinates = data;
                                                    updateCell(null, newData);
                                                }}
                                                boubleClickEvent={() => findNovelty(delayDelivery._id)}
                                            />
                                        )
                                    })
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
                                                        const delay = { ...delayDelivery, timePeriod: { ...delayDelivery.timePeriod, timeTotal: e.target.value } }
                                                        updateCell(null, delay);
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
                })
            }
        </SectionForDelay>
    );
}