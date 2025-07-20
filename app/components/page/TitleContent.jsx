import { useState, useEffect, useRef } from "react"
import useAutoResizeInput from '../../hook/auto_resize_input';


export default function Title({ title, styles, getValue, children }) {


    const [ textState, setTextState ] = useState(title);
    const { refInput } = useAutoResizeInput();



    return (
        <div
            className='min-w-[300px] p-[.2rem_1rem] bg-[#fff] border-[3px] border-[#28b90c] text-center'
            style={{ backgroundColor: styles?.bgTextBox ? styles?.bgTextBox : '#ffffffc9', borderColor: styles?.colorBorderBox }}
        >
            {
                !children ?
                    <>
                        <input
                            className='unstyledInput font-semibold'
                            style={{ color: styles?.colorTextBox ? styles?.colorTextBox : '#000000', fontWeight: 600 }}
                            value={textState}
                            onChange={e => {
                                    setTextState(e.target.value);
                                    getValue(e.target.value)
                                }
                            }
                            ref={refInput}
                        />
                    </>
                    : null
            }

            {children}
        </div>
    )
}//{children}