import { useEffect, useRef } from "react"

export default function ParticleNetworkBG() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles = []

        const mouse = { x: 0, y: 0 }
        const particleCount = 110
        const maxDistance = 100

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
            })
        }

        const animate = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle, i) => {
                particle.x += particle.vx
                particle.y += particle.vy

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                const dx = mouse.x - particle.x
                const dy = mouse.y - particle.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 50) {
                    particle.x -= dx * 0.01
                    particle.y -= dy * 0.01
                }

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fillStyle = "#3b82f6"
                ctx.fill()

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x
                    const dy = particles[j].y - particle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < maxDistance) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / maxDistance})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            })

            requestAnimationFrame(animate)
        }

        const handleMouseMove = (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("resize", handleResize)
        animate()

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <canvas ref={canvasRef} className="absolute inset-0 bg-black z-0" />
    )
}
