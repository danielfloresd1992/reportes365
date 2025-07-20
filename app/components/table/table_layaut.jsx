export default function TabletLayaut({ styles, children }) {
    return (
        <table className='w-full h-full border-3 border-solid border-gray-600 bg-white m-auto table-fixed text-center' style={styles ? styles : null}>{children}</table>
    );
}