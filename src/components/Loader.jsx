import React from 'react'
import { MutatingDots, ProgressBar, RotatingSquare, RotatingTriangles, Triangle, Watch } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className=' flex flex-col justify-center items-center gap-3 w-full h-[500px]'>
        <div className='flex flex-row justify-between gap-3'>
            <div>
                <ProgressBar />
            </div>
            <div className='rotate-90'>
                <ProgressBar />
            </div>
        </div>
        <div className='flex flex-row justify-between gap-3'>
            <div className='-rotate-90'>
                <ProgressBar />
            </div>
            <div className='rotate-180'>
                <ProgressBar />
            </div>
        </div>
    </div>
  )
}

export default Loader