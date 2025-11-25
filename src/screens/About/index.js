import { Suspense } from "react";


const About = () => {

    const surroundingImages = [
        { src: "https://picsum.photos/100/120", alt: "File", x: -200, y: -200 },
        { src: "https://picsum.photos/160/140", alt: "Globe", x: 200, y: -200 },
        { src: "https://picsum.photos/140/170", alt: "Next.js", x: -400, y: 0 },
        { src: "https://picsum.photos/110/160", alt: "Vercel", x: 400, y: 0 },
        { src: "https://picsum.photos/100/200", alt: "Window", x: -300, y: 200 },
        { src: "https://picsum.photos/200/100", alt: "Random1", x: 300, y: 200 },
        { src: "https://picsum.photos/150/250", alt: "Random2", x: 0, y: 250 },
    ];

    const mainImage = "/Assets/images/logo.webp";

    return (
        <div id="core-team" className="w-full h-full min-h-screen flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="relative w-full h-full flex items-center justify-center parent-animate-in">
                    <div className="absolute w-[150px] h-[50px] md:w-[300px] md:h-[150px] lg:w-[400px] lg:h-[200px] z-20 rounded-lg overflow-hidden scale-in">
                        <img src={mainImage} alt="Team" className="w-full h-full object-contain" aria-label="Team image"
                            style={{
                                animationName: 'fadeIn',
                                animationDuration: '3s',
                                animationFillMode: 'both'
                            }}
                        />
                    </div>

                    {surroundingImages.map((member, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                "--x": `${member.x}px`,
                                "--y": `${member.y}px`,
                                animationDuration: '2s',
                                animationDelay: `2s`,
                            }}
                        >
                            <img
                                src={member.src}
                                alt={member.alt}
                                className={`w-${member.src.split('/')[3]} h-${member.src.split('/')[4]} rounded-lg object-cover`}
                            />
                        </div>
                    ))}
                </div>
            </Suspense>
        </div>
    );
};


export default About;