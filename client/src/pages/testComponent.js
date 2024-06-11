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
    // const [inputValue,setInputValue]=useState('');
    // const debouncedText=useDebounce(inputValue,2000)
    const [reverse,setReverse]=useState(true)

    const [number, setNumber] = useState('');

    function handleChange(e) {
        const digit = e.target.value;
        setNumber(digit);
        e.target.style.color = 'red';
        if (digit.length == 3) {
            const newInput = "(" + digit + ")"
            document.getElementById('inputBox').value = newInput
        }
        if (digit.length == 8) {
            const newInput = digit + '-'
            document.getElementById('inputBox').value = newInput
        }
        if (digit.length == 13) {
            const newInput = digit.slice(0, digit.length - 1);
            document.getElementById('inputBox').value = newInput
        }

    }

    return (
        <div>
            {/* <input type='text' onChange={(e)=>setInputValue(e.target.value)}></input>
    <h1>{debouncedText}</h1> */}

            <input type='' id='inputBox' onChange={(e) => handleChange(e)} ></input>
            {number}

        </div>
    )
}

export default TestComponent
