'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const testimonials = [
  {
    name: 'John Doe',
    role: 'Car Buyer',
    image: '/placeholder.svg?height=100&width=100',
    quote: 'AutoHaggle helped me save $3,000 on my new car purchase. I couldn\'t believe the difference!',
  },
  {
    name: 'Jane Smith',
    role: 'First-time Buyer',
    image: '/placeholder.svg?height=100&width=100',
    quote: 'As a first-time buyer, I was nervous about negotiating. AutoHaggle gave me the confidence I needed.',
  },
  {
    name: 'Mike Johnson',
    role: 'Car Enthusiast',
    image: '/placeholder.svg?height=100&width=100',
    quote: 'I thought I knew everything about car buying, but AutoHaggle showed me there\'s always room for improvement.',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
          What Our Users Say
        </h2>
        <div className="mt-20">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                />
                <blockquote className="mt-8">
                  <p className="text-xl font-medium text-gray-900">
                    "{testimonials[currentIndex].quote}"
                  </p>
                </blockquote>
                <p className="mt-4 font-medium text-gray-900">{testimonials[currentIndex].name}</p>
                <p className="mt-1 text-sm text-gray-500">{testimonials[currentIndex].role}</p>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 left-0 -mt-4 text-gray-500 hover:text-gray-700"
            >
              <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 right-0 -mt-4 text-gray-500 hover:text-gray-700"
            >
              <ChevronRightIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

