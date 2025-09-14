import SelectDelay from './select_delay';



export default function SectionForDelay({ children, ...restProps }) {
    return (
        <div className='w-full min-h-[500px]'>
            <SelectDelay
                {...restProps}
            />
            {children}
        </div>
    );
};