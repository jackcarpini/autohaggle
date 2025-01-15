'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 50
    const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe']

    class Particle {
      private static canvas: HTMLCanvasElement;
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      static setCanvas(canvas: HTMLCanvasElement) {
        Particle.canvas = canvas;
      }

      static getDimensions() {
        return {
          width: Particle.canvas.width,
          height: Particle.canvas.height
        };
      }

      constructor() {
        this.x = Math.random() * Particle.canvas.width
        this.y = Math.random() * Particle.canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0) this.x = Particle.canvas.width
        if (this.x > Particle.canvas.width) this.x = 0
        if (this.y < 0) this.y = Particle.canvas.height
        if (this.y > Particle.canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      if (!ctx) return;
      const { width, height } = Particle.getDimensions();
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      requestAnimationFrame(animate)
    }

    Particle.setCanvas(canvas)
    init()
    animate()

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}

