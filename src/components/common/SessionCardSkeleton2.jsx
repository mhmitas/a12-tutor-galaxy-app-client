import React from 'react'

const SessionCardSkeleton2 = () => {
    return (
        <div className="w-full bg-base-100 rounded-md">
            <figure className='aspect-video skeleton rounded-md rounded-b-none'></figure>
            <div className="p-4 space-y-2">
                <h2 className="skeleton h-8 rounded-md "></h2>
                <h3 className="skeleton h-8 rounded-md"></h3>
                <div className='text-end'>
                    <button className='skeleton h-8 rounded-md w-16 self-end'></button>
                </div>
            </div>
        </div>
    )
}

export default SessionCardSkeleton2