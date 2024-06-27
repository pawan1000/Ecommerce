import React, { useEffect, useState } from 'react'

// const useDebounce= (text,delay)=>{
//     const [debouncedText,setDebouncedText]=useState('');
//     useEffect(()=>{
//        const timer= setTimeout(()=>{
//             setDebouncedText(text)
//         },delay)

//         return ()=>{
//             clearTimeout(timer)
//         }

//     },[text,delay])

//     return debouncedText
// }

const TestComponent = () => {

    const [digit,setDigit]=useState(0);
    const [char,setChar]=useState('a');
    function handleDigit()
    {
        setDigit(digit+1);
        setDigit(5);
        setChar('b');
    }

    return (
        <div>
         <button onClick={handleDigit}>{digit} {char}</button>
        </div>
    )
}

export default TestComponent
