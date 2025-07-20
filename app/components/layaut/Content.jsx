export default function CompleteLayaut({ children, style }) {
    return (
        <section className='h-screen w-full pt-12 flex flex-wrap overflow-hidden' style={{ ...style }}>{children}</section>
    );
}