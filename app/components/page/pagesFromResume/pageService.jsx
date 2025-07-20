import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Legend, ReferenceLine, CartesianGrid, Scatter, ComposedChart } from 'recharts';
import PageMultiProposal from '../../page/PageMultiProposal/PageMultiProposal';

import BgYellowGradient from '../BgYellowGradient';



export default function PageService({ listEstablishments, dataPage }) {


    const [processedData, setProcessedData] = useState(null);
    const [errorState, setErrorState] = useState(null);




    useEffect(() => {
        let arrData = [];
        listEstablishments && dataPage && listEstablishments.establishments.forEach(establishments => {
            const data_filter = dataPage.filter(document => document.establishmentName === establishments.name)[0]

            if (data_filter) {
                const pageSumary = data_filter.pages.filter(page => page.type === 'summary')[0];
                const page1ra = data_filter.pages.filter(page => page.type === 'delay1ra')[0];
                const pageClean = data_filter.pages.filter(page => page.type === 'delayClear')[0];


                const dataPush = {
                    name: data_filter.establishmentName,
                    Rotaciones: Number(pageSumary?.data?.totalOfOccupiedTables) || 0 + pageSumary?.data?.totalOfOccupiedTablesBar?.bodyForTable?.length,
                    'Primera atención': page1ra?.data?.body?.length ?? 0,
                    'Limpieza de mesa': pageClean?.data?.body?.length ?? 0,
                    percentageAtention: ((page1ra?.data?.body?.length / Number(pageSumary?.data?.totalOfOccupiedTables) || 0 + pageSumary?.data?.totalOfOccupiedTablesBar?.bodyForTable?.length) * 100).toFixed(2),
                    percentageClean: ((pageClean?.data?.body?.length / Number(pageSumary?.data?.totalOfOccupiedTables) || 0 + pageSumary?.data?.totalOfOccupiedTablesBar?.bodyForTable?.length) * 100).toFixed(2),

                }
                arrData.push(dataPush);
            }
            setProcessedData(arrData)
        });

    }, [listEstablishments, dataPage]);



    console.log(processedData);




    const customLegend = (props) => {
        const { payload } = props;
        return (
            <div className='w-full flex justify-center items-center gap-[2rem] m-[1rem_0]'>

                {payload.map((entry, index) => (//entry.color
                    <div className='flex items-center justify-center gap-[1rem]'>
                        <div style={{ backgroundColor: entry.color, height: '20px', width: '20px' }}></div>
                        <span key={index} style={{ color: '#000000', fontWeight: 'bold' }}>{entry.value}</span>
                    </div>


                ))}
            </div >
        );
    };


    if (!processedData) return null;

    return (
        <PageMultiProposal noIcon={true}>

            <BgYellowGradient title='Total de rotaciones vs. demora en primera atención y limpieza'>
                <div className='w-full h-full flex items-center justify-center'>
                    <ResponsiveContainer width="100%" height='95%'>
                        <ComposedChart
                            width={100}
                            height={100}
                            data={processedData}
                        >
                            <CartesianGrid
                                strokeDasharray='10 10'
                                stroke='#cfcfcf'
                                vertical={true}
                                horizontal={true}
                                fillOpacity={0.8}
                            />
                            <Tooltip />

                            <XAxis dataKey='name' />


                            <Legend
                                width={'100%'}
                                height={36}
                                wrapperStyle={{ color: '#000000', fontSize: '18px', fontWeight: 'bold' }}
                                content={customLegend}
                            />


                            <ReferenceLine y={0} stroke='#000' />

                            <Bar dataKey='Rotaciones' fill='#e5e87a'>
                                <LabelList
                                    dataKey='Rotaciones'
                                    position='centerTop'
                                    fill='#4f4f4f'
                                    fontSize={16}
                                    fontWeight="bold"
                                    offset={10}
                                />

                            </Bar>

                            <Bar dataKey='Primera atención' fill='#1d7c12'>
                                <LabelList
                                    dataKey='Primera atención'
                                    position='top'
                                    fill='#4f4f4f'
                                    fontSize={16}
                                    fontWeight="bold"
                                    offset={10}
                                />
                            </Bar>


                            <Bar dataKey='Limpieza de mesa' fill="#9fc600">
                                <LabelList
                                    dataKey='Limpieza de mesa'
                                    position='top'
                                    fill='#4f4f4f'
                                    fontSize={16}
                                    fontWeight="bold"
                                    offset={10}
                                />
                            </Bar>
                            <Scatter dataKey='Primera atención' fill="red" >
                                <LabelList
                                    dataKey='Primera atención'
                                    position='top'
                                    fill='#4f4f4f'
                                    fontSize={16}
                                    fontWeight="bold"
                                    offset={10}
                                    formatter={(temp) => console.log(temp)}
                                />
                            </Scatter>
                        </ComposedChart>

                    </ResponsiveContainer>
                </div>
            </BgYellowGradient>
        </PageMultiProposal>
    )
}