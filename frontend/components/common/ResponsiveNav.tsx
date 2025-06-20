'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '#' },
  { label: 'Cart (0)', href: '#' },
  { label: 'Notifications', href: '#' },
  { label: 'My Account', href: '#' }
]

const ResponsiveNav = () => {
  const pathname = usePathname()
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1200)
    }

    handleResize() // on mount
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav
      className={`
        fixed z-50
        ${isLargeScreen ? 'top-0 left-0 right-0' : 'bottom-4 left-1/2 transform -translate-x-1/2'}
        bg-white text-gray-800 shadow-md
        px-4 py-2
        ${isLargeScreen ? 'hidden xl:flex justify-center gap-8' : 'flex justify-around w-[90%] sm:w-[465px] sm:rounded-full sm:gap-6 sm:justify-center'}
        sm:px-6 sm:py-3
        sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2
        max-w-full
        sm:fixed
        sm:z-50
        sm:flex
        sm:bg-white
        sm:shadow-lg
        sm:transition-all
        sm:duration-300
        sm:ease-in-out
        sm:items-center
        sm:text-sm
        sm:text-gray-700
        sm:font-medium
        sm:border sm:border-gray-200
        sm:bg-opacity-95
        sm:backdrop-blur-md
        sm:space-x-2
        sm:space-y-0
        sm:flex-row
        sm:gap-4
        sm:flex-wrap
        sm:justify-around
        sm:rounded-md
        sm:overflow-hidden
        sm:sm:rounded-none sm:sm:w-full sm:sm:bottom-0 sm:sm:left-0 sm:sm:transform-none
      `}
    >
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`p-2 sm:p-1 sm:px-2 hover:text-red-600 transition ${
            pathname === item.href ? 'text-red-500 font-semibold' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default ResponsiveNav
