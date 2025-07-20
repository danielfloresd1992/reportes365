export default function BgYellowGradient({ title, children }) {
    return (
        <div className='w-full h-full p-[1rem_0] bg-gradient-to-t from-[#f7f4cb] to-[#ffffff] p-[2rem]'>
            <h2 className='text-[1.2rem] font-semibold text-[#4f4f4f] text-center noto-sans-text'>{title}</h2>
            {children}
        </div>
    );
}