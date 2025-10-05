'use client'

import { User, FolderOpen, Mail, Sun, Moon, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../contexts/ThemeContext'
import { LimelightNav, NavItem } from './ui/limelight-nav'

interface SidebarProps {
  user?: {
    name: string
    avatar: string
    username: string
  }
}

export default function Sidebar({ user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        buttonRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const navItems: NavItem[] = [
    {
      id: 'profile',
      icon: <User />,
      label: 'Profile',
      onClick: () => {
        router.push('/')
        setIsOpen(false)
      },
    },
    {
      id: 'projects',
      icon: <FolderOpen />,
      label: 'Projects',
      onClick: () => {
        router.push('/projects')
        setIsOpen(false)
      },
    },
    {
      id: 'contact',
      icon: <Mail />,
      label: 'Contact',
      onClick: () => {
        console.log('Contact clicked')
        setIsOpen(false)
      },
    },
    {
      id: 'theme',
      icon: theme === 'dark' ? <Sun /> : <Moon />,
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      onClick: toggleTheme,
    },
  ]

  return (
    <>
      {/* Arrow Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center transition-all duration-300 hover:scale-125 group animate-pulse-slow"
        title="Menu"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-pink-500/40 to-purple-600/40 blur-xl animate-gradient-shift" />
        <ChevronRight
          size={40}
          className={`relative z-10 text-purple-400 group-hover:text-purple-300 transition-all duration-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.9)] md:w-8 md:h-8 w-6 h-6 ${
            isOpen ? 'rotate-180' : ''
          }`}
          strokeWidth={3}
        />
      </button>

      {/* Invisible backdrop for click detection */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Vertical Menu - Slides in from left */}
      <div
        ref={sidebarRef}
        className={`fixed left-16 top-1/2 -translate-y-1/2 z-[70] transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-20 pointer-events-none'
        }`}
      >
        <LimelightNav
          items={navItems}
          defaultActiveIndex={0}
          orientation="vertical"
          className="bg-black/90 backdrop-blur-xl border-purple-500/30 shadow-lg shadow-purple-500/20"
          limelightClassName="bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
          iconClassName="text-white"
        />
      </div>
    </>
  )
}
