'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ClipboardIcon, ChartBarIcon, ChatBubbleBottomCenterTextIcon, TruckIcon } from '@heroicons/react/24/outline'

interface Step {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps = [
  {
    title: 'Submit Your Quote',
    description: 'Enter your car details and the quote you received from the dealer.',
    icon: ClipboardIcon,
  },
  {
    title: 'Get Comprehensive Analysis',
    description: 'We compare your quote with our AI price prediction and similar quotes from users in your area.',
    icon: ChartBarIcon,
  },
  {
    title: 'Receive Negotiation Insights',
    description: 'Get access to better quotes and learn effective negotiation strategies.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    title: 'Purchase and Share Success',
    description: 'Armed with our insights, negotiate confidently and get the best deal. After purchase, share your final price to improve our predictions and help the community.',
    icon: TruckIcon,
  },
]

export default function Workflow() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How AutoHaggle Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get the best deal on your dream car in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden md:block" />

          {steps.map((step, index) => (
            <WorkflowStep key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkflowStep({ step, index }: { step: Step; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div ref={ref} className={`flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <motion.div
        className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          <span className="text-blue-600 mr-2">{index + 1}.</span>
          {step.title}
        </h3>
        <p className="text-lg text-gray-600">{step.description}</p>
      </motion.div>

      <div className="hidden md:flex items-center justify-center w-1/2">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
            <step.icon className="w-12 h-12 text-white" />
          </div>
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-blue-300 rounded-full"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>
      </div>
    </div>
  )
}

