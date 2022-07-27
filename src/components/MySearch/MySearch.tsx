import React from 'react'
import './MySearch.scss'

interface MySearch {
    code: string,
    setCode: (el: string) => void
    placeholder?: any
}



const MySearch: React.FC<MySearch> = ({ code, setCode, placeholder }) => {
    return (
        <div className='mysearch'>
            <input type="number" placeholder={placeholder} value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
    )
}

export default MySearch