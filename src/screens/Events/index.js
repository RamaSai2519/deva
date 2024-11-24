import React, { useState } from "react";

const EventCard = ({ event }) => (
    <div className="relative bg-zinc-900 rounded-3xl overflow-hidden p-8 min-w-[320px] max-w-[420px] border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105">
        <div className="h-52 flex items-center justify-center mb-8 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-4">
            <img
                src={event.logoUrl}
                alt={`${event.title} logo`}
                className="w-auto h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
        </div>
        <div className="space-y-3">
            <h3 className="font-bold text-2xl text-white">{event.title}</h3>
            <p className="text-zinc-400 text-sm">{event.date}</p>
            <p className="text-zinc-300 text-base leading-relaxed">{event.description}</p>
            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => event.onKnowMore(event)}
                    className="text-blue-400 hover:text-blue-300 flex items-center group"
                >
                    Know More
                    <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
);

const Modal = ({ event, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-zinc-900 rounded-2xl max-w-xl w-full p-8 shadow-lg relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">{event.title}</h2>
                <p className="text-zinc-400">{event.date}</p>
                <p className="text-zinc-300">{event.description}</p>
                <ul className="list-disc list-inside text-zinc-300 mt-4">
                    {event.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

const EventSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            title: "Hackathon",
            date: "March 15-16, 2024",
            description: "24-hour coding challenge to build innovative solutions for real-world problems.",
            logoUrl: "/assets/images/test.jpg",
            onKnowMore: setSelectedEvent,
            details: [
                "Prize pool of ₹50,000",
                "Teams of 2-4 members",
                "Theme: AI for Social Good",
                "Mentorship from industry experts",
                "Free food and refreshments",
            ],
        },
        {
            title: "Tech Talks",
            date: "March 15, 2024",
            description: "Expert sessions on emerging technologies and future trends in tech industry.",
            logoUrl: "/assets/images/test.jpg",
            onKnowMore: setSelectedEvent,
            details: [
                "Keynote by leading tech experts",
                "Panel discussions on AI/ML",
                "Networking opportunities",
                "Certificate of participation",
                "Q&A sessions",
            ],
        },
        {
            title: "Game Jam",
            date: "March 16-17, 2024",
            description: "48-hour challenge to build an innovative game from scratch.",
            logoUrl: "/assets/images/test.jpg",
            onKnowMore: setSelectedEvent,
            details: [
                "Top 3 teams awarded prizes",
                "Showcase your game at the main event",
                "Free access to game dev tools",
                "Networking with game designers",
            ],
        },
        {
            title: "AI Workshop",
            date: "March 17, 2024",
            description: "Hands-on workshop to explore AI tools and frameworks.",
            logoUrl: "/assets/images/test.jpg",
            onKnowMore: setSelectedEvent,
            details: [
                "Learn TensorFlow and PyTorch basics",
                "Interactive coding sessions",
                "Certificate of completion",
                "Guidance from industry mentors",
            ],
        },
    ];

    const visibleCards = 3;

    const nextSlide = () => {
        if (currentIndex < events.length - visibleCards) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-5xl font-bold text-center mb-16 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Epoch 3.0 Events
                </h1>

                <div className="relative">
                    <button
                        onClick={prevSlide}
                        className={`absolute -left-12 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700 rounded-full p-4 z-10 backdrop-blur-sm transition-colors ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    <div className="overflow-hidden">
                        <div
                            className="flex gap-6 transition-transform duration-500"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                            }}
                        >
                            {events.map((event, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-1/3"
                                >
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={nextSlide}
                        className={`absolute -right-12 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700 rounded-full p-4 z-10 backdrop-blur-sm transition-colors ${currentIndex >= events.length - visibleCards
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center mt-12">
                    <a
                        href="#"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 group"
                    >
                        <img
                            src="/assets/images/githubLogo.png"
                            alt="Epoch icon"
                            className="w-8 h-8"
                        />
                        View all Epoch 3.0 events
                        <svg
                            className="w-6 h-6 transform rotate-0 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </a>
                </div>
            </div>

            {selectedEvent && (
                <Modal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
    );
};
    
export default EventSlider; 