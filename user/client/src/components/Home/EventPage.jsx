import "./EventPage.css";
import Header from "../Header/Header";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../config/Context";

function EventPage() {
    const { id } = useParams();
    const { loginInfo } = useContext(Context);
    const [product, setProduct] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post("https://cc-backend-final.onrender.com/api/v1/auth/get-event", { id });
                setProduct(response.data.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        if (loginInfo) {
            async function checkRegistration() {
                try {
                    const response = await axios.post("https://cc-backend-final.onrender.com/api/v1/auth/check-registration", { eventId: id, userId: loginInfo?._id });
                    setIsRegistered(response.data.isRegistered);
                } catch (error) {
                    console.error("Error checking registration:", error);
                }
            }
            checkRegistration();
        }
    }, [id, loginInfo]);

    async function bookNowFunc() {
        try {
            const response = await axios.post("https://cc-backend-final.onrender.com/api/v1/auth/book", { eventId: id, userId: loginInfo?._id });
            alert(response.data.message);
            setIsRegistered(true); // Update state after successful booking
        } catch (error) {
            console.error("Error booking event:", error);
        }
    }

    if (!product) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    return (
        <>
            <Header />
            <div className="event-page-main-div">
                <div className="event-page-heading">{product.name}</div>
                <div className="event-section1-div">
                    <img src={product.image} alt={product.name} className="event-image" />
                </div>
                <div className="event-section2-div">
                    <div className="event-detail1">
                        <div>Last Date of Registration:</div>
                        <div>{product.Rend_date?.slice(0, 10)}</div>
                    </div>
                    <div className="event-detail1">
                        <div>Price:</div>
                        <div>₹{product.price}/-</div>
                    </div>
                    <div className="event-detail1">
                        <div>Event Date:</div>
                        <div>{product.start_date?.slice(0, 10)}</div>
                    </div>
                </div>
                <div className="event-desc-div">
                    {product.description}
                </div>
                {loginInfo ? (
                    <div className="event-btn-div">
                        {isRegistered ? (
                            <span className="event-btn-disabled">Already Registered</span>
                        ) : (
                            <span onClick={bookNowFunc} className="event-btn">Book Now</span>
                        )}
                    </div>
                ) : (
                    <center style={{ marginTop: 20 }}>Login To Book</center>
                )}
            </div>
        </>
    );
}

export default EventPage;