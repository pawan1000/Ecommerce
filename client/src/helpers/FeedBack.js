import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdStar, MdStarOutline } from "react-icons/md";
import { Log } from "victory";
function FeedBack({ productId, userId, sellerId }) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackCount, setFeedbackCount] = useState(3);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [totalRatings, setTotalRatings] = useState(0);
    const [clickedRating, setClickedRating] = useState(0);
    useEffect(() => {
        axios.get(`${apiUrl}/feedback/list/53`).then(
            (res) => {
                if (!res.data.error) {
                    setFeedbacks(res.data);
                }
            }
        ).then(() => {
            const rating = calculateRating();
            setTotalRatings(rating);
        })
    }, [feedbackCount, productId, userId])

    function calculateRating() {
        const rating = feedbacks.reduce((accumulator, feedback) => {
            return accumulator + feedback.rating;
        }, 0);
        return Math.floor(rating / feedbacks.length);
    }

    function handleSubmit() {

    }

    function handleStar(e, action) {
        const element = e.currentTarget;
        const starId = parseInt(element.id.replace('star', ''), 10);

        if (action === 'addClass') {
            for (let i = 1; i <= starId; i++) {
                document.getElementById(`star${i}`).classList.add('star');
            }
        } else if (action === 'removeClass') {
            if (clickedRating === 0) {
                for (let i = 1; i <= 5; i++) {
                    document.getElementById(`star${i}`).classList.remove('star');
                }
            } else {
                for (let i = 1; i <= clickedRating; i++) {
                    document.getElementById(`star${i}`).classList.add('star');
                }
                for (let i = clickedRating + 1; i <= 5; i++) {
                    document.getElementById(`star${i}`).classList.remove('star');
                }
            }
        } else if (action === 'click') {
            setClickedRating(starId);
            for (let i = 1; i <= 5; i++) {
                document.getElementById(`star${i}`).classList.remove('star');
            }
            for (let i = 1; i <= starId; i++) {
                document.getElementById(`star${i}`).classList.add('star');
            }
        }
    }
    

    return (
        <div>
            <div className="d-flex align-items-center">
                <div> Total Ratings : {totalRatings}  </div>
                <MdStar fill="blue" color="red" />
            </div>
            <div className="border">
                {
                    feedbacks && (feedbacks.slice(0, feedbackCount).map((feedback) => {
                        return (
                            <div className="border p-2 m-2">
                                <div>{feedback.username}</div>
                                <div>{feedback.msg}</div>
                                <div>{feedback.created_date} </div>
                            </div>
                        )
                    }))
                }
                {
                    feedbacks && (feedbacks.length > 3 && feedbackCount < feedbacks.length && (
                        <div className="border p-2 m-2">
                            <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setFeedbackCount(feedbackCount + 3)}>Load More ...</span>
                        </div>
                    ))
                }
            </div>
            <div className="ratings border p-2 m-2">
                <span>Give Ratings</span>
                <MdStar id="star1" onMouseEnter={(e) => handleStar(e, 'addClass')} onMouseLeave={(e) => handleStar(e, 'removeClass')} onClick={(e) => handleStar(e, 'select')} />
                <MdStar id='star2' onMouseEnter={(e) => handleStar(e, 'addClass')} onMouseLeave={(e) => handleStar(e, 'removeClass')} onClick={(e) => handleStar(e, 'select')} />
                <MdStar id="star3" onMouseEnter={(e) => handleStar(e, 'addClass')} onMouseLeave={(e) => handleStar(e, 'removeClass')} onClick={(e) => handleStar(e, 'select')} />
                <MdStar id="star4" onMouseEnter={(e) => handleStar(e, 'addClass')} onMouseLeave={(e) => handleStar(e, 'removeClass')} onClick={(e) => handleStar(e, 'select')} />
                <MdStar id="star5" onMouseEnter={(e) => handleStar(e, 'addClass')} onMouseLeave={(e) => handleStar(e, 'removeClass')} onClick={(e) => handleStar(e, 'select')} />
                <div>
                    <input type="text" placeholder="Give your feedback" style={{ borderBottom: '3px solid #7AB2B2 ' }} value={feedbackMsg} onChange={(e) => setFeedbackMsg(e.target.value)}></input>
                    <input type="submit" class="submit-btn" value="Submit" onClick={(e) => handleSubmit(e)} />
                </div>
            </div>


        </div>
    )
}

export default FeedBack;