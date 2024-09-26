const Container = ({ children }) => {
    return (
        <div className='max-w-screen-2xl mx-auto xl:px-20 lg:px-10 md:px-6 sm:px-6 px-4'>
            {children}
        </div>
    )
}

export default Container