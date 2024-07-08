import React, { useState } from "react";
import qrCode from '../assets/qr_code.png';
const Payment = () => {

    const [creditCard, setCreditCard] = useState(false);
    const [payPal, setPayPal] = useState(false);
    const [payByUpi, setPayByUpi] = useState(false);
    function toggleDisplay(section) {
        if (section === 'creditCard') {
            setCreditCard(true); setPayPal(false); setPayByUpi(false);
        } else if (section === 'payByUpi') {
            setCreditCard(false); setPayPal(false); setPayByUpi(true);
        }
        else if (section === 'payPal') {
            setCreditCard(false); setPayPal(true); setPayByUpi(false);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', backgroundColor: 'white' }}>
            <div className="maindiv" style={{ margin: '100px' }} >
                <div className="payment d-flex flex-column gap-4">
                    <div className="creditcard d-flex flex-column gap-2 bg-light p-3" style={{width:'550px'}} >
                        <div className="d-flex gap-2 align-items-center">
                            <div style={{height:'20px',width:'20px',border:'5px solid grey',borderRadius:'50%',backgroundColor:'white'}} onClick={() => toggleDisplay('creditCard')}></div>
                            <label>Credit / Debit Card</label>
                        </div>

                        {creditCard && <div className="hide d-flex flex-column gap-4" id='creditCard' >
                            <div className="cardnumber" >
                                <input type="text" className='inputPayment' style={{ width: '100%' }} placeholder="Card Number"></input>
                            </div>

                            <div className="cardname">
                                <input type="text" className='inputPayment' style={{ width: '100%' }} placeholder="Card Holder Name"></input>
                            </div>

                            <div className="expiry d-flex justify-content-between gap-4">
                                <div className="expirtymm">
                                    <input type="text" className='inputPayment' placeholder="Expiry(mm)"></input>
                                </div>
                                <div className="expirtyyy">
                                    <input type="text" className='inputPayment' placeholder="Expiry(yy)"></input>
                                </div>
                            </div>

                            <div className="cvvpostalcode d-flex justify-content-between">
                                <div className="cvv">
                                    <input type="text" className='inputPayment' placeholder="CVV"></input>
                                </div>
                                <div className="postal">
                                    <input type="text" className='inputPayment' placeholder="postal/zip code"></input>
                                </div>
                            </div>
                            <div className="paybuton">
                                <button style={{ width: '100%' }} className="btn btn-primary">Pay Now</button>
                            </div>
                        </div>}
                    </div>
                    <div className="paypal bg-light p-3" style={{width:'550px'}}>
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex gap-2 align-items-center">
                                <div style={{height:'20px',width:'20px',border:'5px solid grey',borderRadius:'50%',backgroundColor:'white'}}   onClick={() => toggleDisplay('payPal')}></div>
                                <label>Paypal </label>
                            </div>
                            {payPal && <div className="hide d-flex flex-column gap-4" id='payPal' >
                                <div className="d-flex flex-column">
                                    <b>Email Id</b>
                                    <label>Enter Email ID of your paypal account</label>
                                    <input className='inputPayment' type="email" placeholder="example@email.com"></input>
                                </div>
                                <div className="d-flex flex-column">
                                    <b>Password</b>
                                    <label>Enter Password of your paypal account</label>
                                    <input type="password" className='inputPayment'></input>
                                </div>
                                <div className="paybuton d-flex flex-column">
                                    <button style={{ width: '100%' }} className="btn btn-primary">Login to Paypal</button>
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className="paybyupi d-flex flex-column gap-3 bg-light p-3" style={{width:'550px'}}>
                        <div className="d-flex gap-2 align-items-center">
                            <div style={{height:'20px',width:'20px',border:'5px solid grey',borderRadius:'50%',backgroundColor:'white'}} onClick={() => toggleDisplay('payByUpi')}></div>
                            <label>Pay By UPI </label>
                        </div>
                        {payByUpi && <div id='payByUpi' className="hide d-flex justify-content-between align-items-center gap-3" >
                                <div className="d-flex flex-column gap-2">
                                    <b>UPI ID</b>
                                    <label>Enter ID of UPI available to you</label>
                                    <input type='text' className='inputPayment' placeholder="example@ybl.com"></input>
                                    <button style={{ width: '100%' }} className="btn btn-primary" >Pay By UPI</button>
                                </div>
                                <div style={{ fontFamily: 'sans-serif' }}>OR</div>
                                <div>
                                    <img src={qrCode} height='110px' width='120px' alt='QR '></img>
                                </div>
                            </div>}


                    </div>
                    <div className="product">

                    </div>


                </div>
            </div>
        </div>

    )
}

export default Payment;


//if item alredy in cart show optioin of payment
