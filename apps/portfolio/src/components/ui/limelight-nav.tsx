import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react'

// --- Internal Types and Defaults ---

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
)
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

type NavItem = {
  id: string | number
  icon: React.ReactElement
  label?: string
  onClick?: () => void
}

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
  { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
  {
    id: 'default-notifications',
    icon: <DefaultBellIcon />,
    label: 'Notifications',
  },
]

type LimelightNavProps = {
  items?: NavItem[]
  defaultActiveIndex?: number
  onTabChange?: (index: number) => void
  className?: string
  limelightClassName?: string
  iconContainerClassName?: string
  iconClassName?: string
  orientation?: 'horizontal' | 'vertical'
}

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
  orientation = 'horizontal',
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const [isReady, setIsReady] = useState(false)
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const limelightRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (items.length === 0) return

    const limelight = limelightRef.current
    const activeItem = navItemRefs.current[activeIndex]

    if (limelight && activeItem) {
      if (orientation === 'vertical') {
        const newTop =
          activeItem.offsetTop +
          activeItem.offsetHeight / 2 -
          limelight.offsetHeight / 2
        limelight.style.top = `${newTop}px`
        limelight.style.left = '0px'
      } else {
        const newLeft =
          activeItem.offsetLeft +
          activeItem.offsetWidth / 2 -
          limelight.offsetWidth / 2
        limelight.style.left = `${newLeft}px`
        limelight.style.top = '0px'
      }

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50)
      }
    }
  }, [activeIndex, isReady, items, orientation])

  if (items.length === 0) {
    return null
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index)
    onTabChange?.(index)
    itemOnClick?.()
  }

  return (
    <nav
      className={`relative inline-flex items-center rounded-lg bg-card text-foreground border ${
        orientation === 'vertical' ? 'flex-col w-16 py-2' : 'h-16 px-2'
      } ${className}`}
    >
      {items.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={(el) => {
            navItemRefs.current[index] = el
          }}
          className={`relative z-20 flex cursor-pointer items-center justify-center ${
            orientation === 'vertical' ? 'w-full h-14' : 'h-full'
          } p-4 ${iconContainerClassName}`}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
        >
          {cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: `w-6 h-6 transition-opacity duration-100 ease-in-out ${
              activeIndex === index ? 'opacity-100' : 'opacity-40'
            } ${(icon as React.ReactElement<{ className?: string }>).props.className || ''} ${iconClassName || ''}`,
          })}
        </a>
      ))}

      <div
        ref={limelightRef}
        className={`absolute z-10 rounded-full bg-primary ${
          orientation === 'vertical'
            ? 'left-0 w-[5px] h-11 shadow-[50px_0_15px_var(--primary)]'
            : 'top-0 w-11 h-[5px] shadow-[0_50px_15px_var(--primary)]'
        } ${
          isReady
            ? orientation === 'vertical'
              ? 'transition-[top] duration-400 ease-in-out'
              : 'transition-[left] duration-400 ease-in-out'
            : ''
        } ${limelightClassName}`}
        style={
          orientation === 'vertical' ? { top: '-999px' } : { left: '-999px' }
        }
      >
        {orientation === 'horizontal' ? (
          <div className="absolute left-[-30%] top-[5px] w-[160%] h-14 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />
        ) : (
          <div className="absolute top-[-30%] left-[5px] h-[160%] w-14 [clip-path:polygon(100%_5%,0_25%,0_75%,100%_95%)] bg-gradient-to-r from-primary/30 to-transparent pointer-events-none" />
        )}
      </div>
    </nav>
  )
}

export type { NavItem }
