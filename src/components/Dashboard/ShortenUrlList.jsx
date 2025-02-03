import React from 'react'
import ShortenItem from './ShortenItem'

const ShortenUrlList = ({ data }) => {
  return (
    <div className=' my-6 space-y-4'>
        {/* max-h-screen overflow-scroll */ }
        {data && data.map((item) => (
            <ShortenItem key={item.id} {...item} />
        ))}
    </div>
  )
}

export default ShortenUrlList
