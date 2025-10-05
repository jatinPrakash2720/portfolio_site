'use client'

import React, { useState, lazy, Suspense } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../../src/components/ui/textarea'
import { Label } from '../../../src/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../src/components/ui/form'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowLeft,
  CheckCircle,
  User,
  FolderOpen,
} from 'lucide-react'

// Lazy load heavy components
const PixelBlast = lazy(() => import('../../components/PixelBlast'))

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

export default function ContactPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [isPixelBlastLoaded, setIsPixelBlastLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Form submitted:', data)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProfileClick = () => {
    router.push('/')
  }

  const handleProjectsClick = () => {
    router.push('/projects')
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@example.com',
      href: 'mailto:contact@example.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#',
    },
  ]

  return (
    <div
      className={`h-screen flex relative transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Fallback Background */}
      {!isPixelBlastLoaded && (
        <div
          className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-purple-900/20 via-black to-purple-800/10'
              : 'bg-gradient-to-br from-purple-100/30 via-gray-50 to-purple-200/20'
          }`}
        />
      )}

      {/* PixelBlast Background - Lazy loaded */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<LoadingSpinner />}>
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color={theme === 'dark' ? '#8B5CF6' : '#A855F7'}
            patternScale={2}
            patternDensity={0.8}
            pixelSizeJitter={0.3}
            enableRipples={false}
            liquid={false}
            speed={0.3}
            edgeFade={0.15}
            transparent
            onLoad={() => setIsPixelBlastLoaded(true)}
          />
        </Suspense>
      </div>

      {/* Tint Overlay */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-colors duration-300 ${
          theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-200/20'
        }`}
      />

      <main className="flex-1 relative z-10">
        {/* Mobile: 5x6, Tablet: 8x5, Desktop: 8x6 Grid */}
        <div className="relative grid grid-cols-5 grid-rows-6 md:grid-cols-8 md:grid-rows-5 lg:grid-rows-6 gap-3 m-4 md:m-6 lg:m-10 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:h-[calc(100vh-5rem)]">
          {/* Contact Form - Mobile: 4x4, Tablet: 4x4, Desktop: 4x5 */}
          <div className="col-span-4 row-span-4 md:col-span-4 md:row-span-4 lg:row-span-5 rounded-2xl md:rounded-3xl overflow-hidden bg-black/80 backdrop-blur-sm border-2 border-purple-500/20">
            <div className="h-full flex flex-col">
              <div className="p-4 md:p-6 border-b border-purple-500/20">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Get in Touch
                </h1>
                <p className="text-sm md:text-base text-white/60">
                  Send us a message and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-green-400 mb-2">
                      Message Sent!
                    </h2>
                    <p className="text-white/60 mb-6">
                      Thank you for your message. We'll get back to you soon.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false)
                        form.reset()
                      }}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  className="bg-black/50 border-purple-500/30 text-white placeholder:text-white/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  className="bg-black/50 border-purple-500/30 text-white placeholder:text-white/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What's this about?"
                                className="bg-black/50 border-purple-500/30 text-white placeholder:text-white/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your project..."
                                className="bg-black/50 border-purple-500/30 text-white placeholder:text-white/50 min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info - Mobile: 5x2, Tablet: 3x4, Desktop: 3x5 */}
          <div className="col-span-5 row-span-2 row-start-5 md:col-span-3 md:row-span-4 md:col-start-5 md:row-start-1 lg:col-span-3 lg:row-span-5 lg:col-start-5 lg:row-start-1 rounded-2xl md:rounded-3xl overflow-hidden bg-black/80 backdrop-blur-sm border-2 border-purple-500/20">
            <div className="h-full flex flex-col">
              <div className="p-4 md:p-6 border-b border-purple-500/20">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  Contact Info
                </h2>
                <p className="text-sm text-white/60">
                  Reach out to us through any of these channels
                </p>
              </div>

              <div className="flex-1 p-4 md:p-6">
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-3 p-3 rounded-lg bg-black/50 border border-purple-500/20 hover:border-purple-500/50 transition-all group"
                    >
                      <div className="p-2 rounded-lg bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
                        <info.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/80">
                          {info.label}
                        </div>
                        <div className="text-xs text-white/60">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Button - Mobile: 1x1, Tablet: 1x1, Desktop: 1x1 */}
          <div className="col-span-1 row-span-1 row-start-6 md:col-span-1 md:row-span-1 md:col-start-5 md:row-start-5 lg:col-span-1 lg:row-span-1 lg:col-start-5 lg:row-start-6">
            <button
              onClick={handleProjectsClick}
              className={`w-full h-full rounded-xl md:rounded-2xl border-2 p-2 md:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-purple-500/15 border-purple-400/40'
                  : 'bg-purple-400/25 border-purple-300/50'
              }`}
            >
              <FolderOpen className="h-4 w-4 md:h-5 md:w-5 group-hover:text-purple-400 transition-colors duration-300" />
              <div className="text-[10px] md:text-xs font-light text-white/80 mt-1">
                Projects
              </div>
            </button>
          </div>

          {/* Profile Button - Mobile: 1x1, Tablet: 1x1, Desktop: 1x1 */}
          <div className="col-span-1 row-span-1 row-start-6 col-start-2 md:col-span-1 md:row-span-1 md:col-start-6 md:row-start-5 lg:col-span-1 lg:row-span-1 lg:col-start-6 lg:row-start-6">
            <button
              onClick={handleProfileClick}
              className={`w-full h-full rounded-xl md:rounded-2xl border-2 p-2 md:p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 group relative hover:border-transparent backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-purple-600/15 border-purple-500/40'
                  : 'bg-purple-500/25 border-purple-400/50'
              }`}
            >
              <User className="h-4 w-4 md:h-5 md:w-5 group-hover:text-purple-400 transition-colors duration-300" />
              <div className="text-[10px] md:text-xs font-light text-white/80 mt-1">
                Profile
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
