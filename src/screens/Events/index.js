'use client'

import { useState, useRef } from 'react'
import { Button } from 'antd'

const categories = [
    "Coding", "STEM", "Business", "Graphic design", "3D animation and design"
]

const Events = () => {
    const [activeCategory, setActiveCategory] = useState(3) // Graphic design is active
    const scrollRef = useRef(null)

    return (
        <section className="bg-black text-white min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-2xl mb-2">macOS</h2>
                    <h1 className="text-6xl font-bold mb-6">Sharp as a Mac.</h1>
                    <p className="text-lg text-gray-400 mb-4">
                        Tens of thousands of apps are optimized to unlock the full
                        capabilities of macOS — from your go-to productivity apps to your
                        favorite games and hardcore working pro apps. And with the M1
                        family of chips, these apps just race.
                    </p>
                    <a href="#" className="text-blue-500 hover:underline">
                        Learn more about macOS
                    </a>
                </div>

                <div className="relative mb-8">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
                    >
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="flex-none w-[800px] h-[450px] relative">
                                <img
                                    src={`/placeholder.svg?height=450&width=800&text=App ${index + 1}`}
                                    alt={`App screenshot ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-6 mt-8 overflow-x-auto pb-4">
                    {categories.map((category, index) => (
                        <Button
                            key={category}
                            variant="ghost"
                            className={`text-sm whitespace-nowrap ${index === activeCategory ? 'text-white' : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setActiveCategory(index)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="text-center mt-8 text-gray-400 text-sm">
                    <p>Find your type. Take on illustrations, 3D creations, visual effects,</p>
                    <p>motion graphics and more with industry-standard apps.</p>
                    <p className="mt-2">Adobe InDesign, Affinity Designer, Photoshop, Sketch, Figma,</p>
                    <p>Illustrator, Figma and more.</p>
                </div>
            </div>
        </section>
    )
}

export default Events;