export default function InputStandart({ name, textLabel, type, valueProp, setValue, children, disabled, requiered, pattern, resectSelect  }) {

    const styleOnToogle = {
        transform: disabled ? 'translateX(0%)' : (valueProp ? 'translateX(100%)' : 'translateX(0%)'),
        backgroundColor: disabled ? '#dddddd' : (valueProp ? '#00dd00' : '#f50000')
    };


    const handdleOnChangue = e => {
        setValue(e.target.value);
    }


    const returnInput = () => {
        if (type === 'time') {
            return (
                <>
                    <label className='style-text-young' htmlFor={name}>{textLabel}</label>
                    <input
                        value={valueProp}
                        className='cursor-pointer border-2 border-gray-300 rounded-md p-1'
                        name={name} id={name}
                        onChange={handdleOnChangue}
                        type='time'
                        disabled={disabled}
                        required={requiered}
                    />
                </>
            );
        }
        else if (type === 'date') {
            return (
                <>
                    <label className='style-text-young' htmlFor={name}>{textLabel}</label>
                    <input
                        type='date'
                        value={valueProp}
                        className='cursor-pointer border-2 border-gray-300 rounded-md p-1'
                        name={name} id={name}
                        onChange={handdleOnChangue}
                        disabled={disabled}
                        required={requiered}
                    />
                </>
            );
        }
        else if (type === 'file') {
            return (
                <>
                    <label className='style-text-young' htmlFor={name}>{textLabel}</label>
                    <input
                        defaultValue={null}
                        className='cursor-pointer border-2 border-gray-300 rounded-md p-1'
                        name={name} id={name}
                        onChange={e => setValue(e.target.files[0])}
                        type='file'
                        disabled={disabled}
                    />

                </>
            )
        }
        else if (type === 'toogle') {
            return (
                <>
                    <label className='style-text-young' htmlFor={name}>{textLabel}</label>
                    <div className='flex justify-end items-center'>
                        <div className='w-[50px] h-[25px] rounded-[40px] bg-[gray] flex items-center cursor-pointer'
                            onClick={() => {
                                if (!disabled) setValue(!valueProp);
                            }}
                        >
                            <div className='w-7 h-7 rounded-full relative bg-[#f50000] translate-x-0 transition duration-300 ease-in-out' style={styleOnToogle}>

                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else if (type === 'select') {
            return (
                <>
                    <label className='style-text-young' htmlFor={name}>{textLabel}</label>
                    <select
                        
                        value={valueProp ?? null}
                        className='w-[49%] cursor-pointer border-2 border-gray-300 rounded-md p-1'
                        name={name} id={name}
                        onChange={(e) => {
                            
                            handdleOnChangue(e)
                            if(resectSelect) e.target.value = null;
                        }}
                        disabled={disabled}
                        required={requiered}
                    >
                        <option className='text-customGrayText' selected={true} disabled={true} value={null}>--seleccione--</option>
                        {children}
                    </select>
                </>
            );
        }
        else {
            return (
                <>
                    <label className='style-text-young' htmlFor={name}>{textLabel}</label>
                    <input
                        className='cursor-pointer border-2 border-gray-300 rounded-md p-1 invalid'
                        pattern={pattern}
                        type={type}
                        value={valueProp}
                        onChange={handdleOnChangue}
                        name={name} id={name}
                        disabled={disabled}
                        required={requiered}
                        
                    />
                </>
            );
        }
    };


    return (
        <div className='flex gap-[1rem] items-center flex-wrap justify-between w-full'>
            {
                returnInput()
            }
        </div>
    );
}