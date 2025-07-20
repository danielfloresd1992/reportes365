import { useState } from 'react';



export default function RowTree({ data, bordeB, setData, title, disabled }) {


    const [valueState, setValueState] = useState(data?.result?.addRow?.value ?? '');

    const styleBoldText = {
        fontWeight: 700
    }

    const styleCellBorder = 'text-center border border-black w-1/2 font-semibold';
    const styleCellBorderR = 'text-center border-r border-r-solid border-r-black font-semibold';
    const styleCell = 'text-center w-1/3 font-semibold';


    const inputStyles = {
        textAlign: 'center',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        border: 'none',
        outline: 'none',
        minWidth: '50%',
        backgroundColor: 'transparent'
    };



    return (
        <>
            <tr className='w-full' title={title}>

                <td className={`${styleCellBorderR} w-1/3 `} style={bordeB ? { borderBottom: '1px solid #000', ...styleBoldText } : styleBoldText} rowSpan={data.result?.addRow ? 3 : 2}>{data.title}</td>
                <td style={styleBoldText} className={`${styleCellBorder} border-bottom w-1/3`}>{data.result.firt.key}</td>
                <td style={styleBoldText} className={`${styleCellBorder} border-bottom w-1/3 font-semibold`}>
                    <input
                        className='unstyledInput font-semibold monotext'
                        type='text'
                        onChange={e => setData({ ...data, result: { ...data.result, firt: { ...data.result.firt, value: e.target.value } } })}
                        value={data.result.firt.value ?? 'N/A'}
                        disabled={Boolean(disabled)}
                        style={styleBoldText}
                    />
                </td>

            </tr>
            <tr className='w-full' style={styleBoldText}>
                <td style={styleBoldText} className={`${styleCellBorderR} w-1/3`}>{data.result.second.key}</td>
                <td style={styleBoldText} className={`${styleCell} w-1/3`}>
                    <input
                        className='unstyledInput font-semibold monotext'
                        type='text'
                        onChange={e => setData({ ...data, result: { ...data.result, second: { ...data.result.second, value: e.target.value } } })}
                        value={data.result.second.value ?? 'N/A'}
                        disabled={Boolean(disabled)}
                        style={styleBoldText}
                    />
                </td>

            </tr>
            {
                data.result?.addRow ?
                    <tr style={styleBoldText}>
                        <td style={styleBoldText} className={`${styleCellBorder} border-bottom w-1/3`}>{data.result.addRow.key ?? 'N/A'}</td>
                        <td style={styleBoldText} className={`${styleCellBorder} border-bottom w-1/3 font-semibold`}>
                            <input
                                className='unstyledInput font-semibold monotext'
                                type='text'
                                onChange={e => {
                                    setValueState(e.target.value);
                                    setData({ ...data, result: { ...data.result, addRow: { ...data.result.addRow, value: e.target.value } } });
                                }}
                                value={valueState}
                                disabled={Boolean(disabled)}
                                style={styleBoldText}
                            />
                        </td>
                    </tr>
                    :
                    null
            }
        </>
    );
}