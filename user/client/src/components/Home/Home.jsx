import Header from "../Header/Header";
import "./Home.css";
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { useNavigate } from "react-router-dom";
import { Card } from 'antd';

const { Meta } = Card;

const contentStyle = {
  height: '300px',
  width: "100%",
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [event, setEvent] = useState([]);
    const [workshop, setWorkshop] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchInfo = async () => {
        try {
            const res = await fetch('https://cc-backend-final.onrender.com/api/v1/auth/get-events');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setAllProducts(data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        if (allProducts.data) {
            const events = [];
            const workshops = [];

            allProducts.data.forEach(elm => {
                if (elm.category === "event") {
                    events.push(elm);
                } else {
                    workshops.push(elm);
                }
            });

            setEvent(events);
            setWorkshop(workshops);
        }
    }, [allProducts]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Header />
            <div className="home-page-main-div">
                <div className="home-section1-div">
                    <Carousel autoplay>
                        {event.map((elm) => (
                            <div key={elm._id} onClick={() => navigate(`/event/${elm._id}`)}>
                                <img src={elm.image} alt={elm.name} style={contentStyle} />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="home-section-heading">Events</div>
                <div className="home-section2-div">
                    {event.map((elm) => (
                        <Card
                            key={elm._id}
                            onClick={() => navigate(`/event/${elm._id}`)}
                            style={{
                                width: 300,
                                marginRight: 10,
                                marginLeft: 10
                            }}
                            cover={
                                <img
                                    alt={elm.name}
                                    src={elm.image}
                                />
                            }
                        >
                            <Meta
                                title={elm.name}
                                description={elm.description}
                            />
                        </Card>
                    ))}
                </div>

                <div className="home-section-heading">Workshops</div>
                <div className="home-section2-div">
                    {workshop.map((elm) => (
                        <Card
                            key={elm._id}
                            onClick={() => navigate(`/event/${elm._id}`)}
                            style={{
                                width: 300,
                                marginRight: 10,
                                marginLeft: 10
                            }}
                            cover={
                                <img
                                    alt={elm.name}
                                    src={elm.image}
                                />
                            }
                        >
                            <Meta
                                title={elm.name}
                                description={elm.description}
                            />
                        </Card>
                    ))}
                </div>

                <div className="home-section-heading">About Us</div>
                <div className="home-section2-div">
                    <p>Welcome to the DYPCET Coding Club! We are a community of passionate coders at DYP College of Engineering and Technology (DYPCET), dedicated to fostering a culture of learning and collaboration in the field of computer science and programming.</p>
                </div>

                <div className="home-section-heading">Our Mission</div>
                <div className="home-section2-div">
                    <p>Our mission is to provide a platform for students to enhance their coding skills, participate in coding competitions, collaborate on projects, and stay updated with the latest trends and technologies in the world of software development.</p>
                </div>

                <div className="home-section-heading">What We Offer</div>
                <div className="home-section2-div">
                    <ul style={{ display: "grid", justifyContent: "center" }}>
                        <li>Regular coding workshops and seminars</li>
                        <li>Coding competitions and hackathons</li>
                        <li>Project collaboration opportunities</li>
                        <li>Guest lectures from industry experts</li>
                        <li>Networking opportunities with fellow coders</li>
                    </ul>
                </div>

                <div className="home-section-heading">Get Involved</div>
                <div className="home-section2-div">
                    <p>Whether you're a beginner or an experienced coder, everyone is welcome to join our club! Connect with us on social media, attend our events, and participate actively to make the most out of your coding journey at DYPCET.</p>
                </div>
            </div>
        </>
    );
}

export default Home;