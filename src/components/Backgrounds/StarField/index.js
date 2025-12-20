import { useEffect, useRef } from "react"

export default function StarfieldBG({ paused = false }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const stars = []

        const starCount = 800
        const speed = 0.5

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * canvas.width,
                size: Math.random() * 2,
            })
        }

        let rafId = 0

        const renderFrame = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2

            stars.forEach((star) => {
                if (paused) return
                star.z -= speed

                if (star.z <= 0) {
                    star.z = canvas.width
                    star.x = Math.random() * canvas.width - canvas.width / 2
                    star.y = Math.random() * canvas.height - canvas.height / 2
                }

                const k = 128 / star.z
                const px = star.x * k + centerX
                const py = star.y * k + centerY

                if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
                    // After a resize, some stars can have z > canvas.width, which would yield
                    // a negative radius and crash ctx.arc(). Clamp and re-home when needed.
                    if (star.z > canvas.width) {
                        star.z = Math.random() * canvas.width
                    }

                    const size = Math.max(0.1, (1 - star.z / canvas.width) * star.size * 2)
                    const alpha = Math.max(0, 1 - star.z / canvas.width)

                    ctx.beginPath()
                    ctx.arc(px, py, size, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
                    ctx.fill()

                    // const trailLength = 5
                    ctx.beginPath()
                    ctx.moveTo(px, py)
                    ctx.lineTo(px - (px - centerX) * 0.01, py - (py - centerY) * 0.01)
                    ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.5})`
                    ctx.lineWidth = size
                    ctx.stroke()
                }
            })

            if (!paused) {
                rafId = requestAnimationFrame(renderFrame)
            }
        }

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            // Keep star depth values consistent with new dimensions.
            for (let i = 0; i < stars.length; i++) {
                const star = stars[i]
                star.z = Math.random() * canvas.width
            }
        }

        window.addEventListener("resize", handleResize)
        renderFrame()

        return () => {
            window.removeEventListener("resize", handleResize)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [paused])

    return <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
}
