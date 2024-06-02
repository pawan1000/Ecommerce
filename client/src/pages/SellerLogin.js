import React from 'react'
import { NavLink } from 'react-router-dom'

const SellerLogin = () => {
    return (
        <div className='parent container p-3 m-3 bg-success' style={{ height: '500px', width:'2000px', display: 'flex', flexDirection: 'row', gap: '2px', justifyContent: 'center', alignItems: 'center' }}>
            <div className='border bg-info p-4 m-3' >
                <form>
                    <div>
                        <label>Enter Username</label>
                        <input type='text'></input>
                    </div>
                    <br></br>
                    <div>
                        <label>Enter Password</label>
                        <input type='text'></input>
                    </div>
                    <br></br>
                    <div className='text-center'>
                        <label></label>
                        <input type='submit' className='' value='Login'></input>
                        <NavLink to='/register'>Don't have an account ? create one</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellerLogin
