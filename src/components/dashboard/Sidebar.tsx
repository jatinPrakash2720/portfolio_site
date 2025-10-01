'use client'

import {
  User,
  FolderOpen,
  Mail,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  user?: {
    name: string
    avatar: string
    username: string
  }
}

export default function Sidebar({ user }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const menuItems = [
    { Icon: User, label: 'Profile', href: '/profile' },
    { Icon: FolderOpen, label: 'Projects', href: '/projects' },
    { Icon: Mail, label: 'Contact Us', href: '/contact' },
  ]

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col justify-between py-4 transition-all duration-300 ${
        isExpanded ? 'w-64 px-4 bg-black/80 backdrop-blur-sm' : 'w-20 px-3'
      }`}
    >
      {/* Profile Avatar - Keep intact */}
      {user && (
        <div className="relative group cursor-pointer">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover hover:ring-2 ring-white/20 transition-all"
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
            2
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div
        className={`flex flex-col gap-2 ${isExpanded ? 'items-stretch' : 'items-center'}`}
      >
        {menuItems.map(({ Icon, label, href }) => (
          <button
            key={label}
            title={label}
            onClick={() => {
              // For now, just log - you can implement actual navigation later
              // router.push(href)
            }}
            className={`flex items-center gap-3 rounded-2xl hover:bg-white/10 transition-all group ${
              isExpanded
                ? 'w-full px-3 py-2 justify-start'
                : 'w-12 h-12 justify-center'
            }`}
          >
            <Icon
              size={20}
              className="group-hover:scale-110 transition-transform flex-shrink-0"
            />
            {isExpanded && (
              <span className="text-sm font-medium text-white/90 whitespace-nowrap">
                {label}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="w-12 h-12 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center group"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun
            size={20}
            className="group-hover:scale-110 transition-transform text-yellow-400"
          />
        ) : (
          <Moon
            size={20}
            className="group-hover:scale-110 transition-transform text-blue-600"
          />
        )}
      </button>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center group"
        title={isExpanded ? 'Collapse' : 'Expand'}
      >
        {isExpanded ? (
          <ChevronLeft
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        ) : (
          <ChevronRight
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        )}
      </button>
    </aside>
  )
}
