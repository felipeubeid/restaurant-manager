import React, { useState, useEffect } from 'react'
import { Home, Users, ClipboardList, MenuIcon, BarChart3, Package, ChevronRight, ChevronLeft } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const AppSidebar = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/finances', icon: BarChart3, label: 'Finances' },
    { to: '/orders', icon: ClipboardList, label: 'Orders' },
    { to: '/menu', icon: MenuIcon, label: 'Menu' },
    { to: '/staff', icon: Users, label: 'Staff' },
    { to: '/inventory', icon: Package, label: 'Inventory' },
  ]

  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => { // Handle window resize to toggle sidebar visibility
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768)
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const linkClass = ({ isActive }) => // Dynamic class for active link
    `flex items-center rounded-lg transition-colors duration-200 ease-in-out ${
      isActive
        ? 'bg-yellow-100 text-yellow-800 shadow-sm scale-[1.03] '
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
    } ${isOpen ? 'gap-3 px-4 py-2 justify-start' : 'px-3 py-2 justify-center'}`

  return (
    <>
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-300 shadow-sm h-screen transition-all duration-500 flex flex-col overflow-hidden ${
      isOpen ? window.innerWidth < 768 ? 
        'fixed top-0 left-0 w-64 h-full z-50' // Fullscreen
        : 'w-64' // Desktop expanded 
        : 'w-0' // Collapsed 
        }`}>
         <div className={`p-6 flex flex-col h-full transition-all duration-500 ease-in-out ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
            {/* Header with toggle */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-yellow-400 to-red-400 p-4 rounded-full flex items-center justify-center w-12 h-12">
                  <FontAwesomeIcon icon={faStroopwafel} className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Restaurant</h2>
                  <h2 className="text-xl font-bold -mt-1">Manager</h2>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition ml-2"
                title="Collapse">
                  <ChevronLeft size={23} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map(({ to, icon: Icon, label }, i) => (
                <NavLink key={to} to={to} className={linkClass}
                  style={{ // Transition styles for opening/closing
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'ease-in-out',
                  opacity: isOpen ? 1 : 0,
                  // transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
                  pointerEvents: isOpen ? 'auto' : 'none',}}>
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
      {/* Toggle button to collapse sidebar */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-8 left-0 z-30 bg-white border border-gray-300 rounded-r-full px-1 py-2 shadow hover:bg-gray-100 transition"
          title="Expand">
          <ChevronRight size={20} />
        </button>
      )}
    </>
  )
}

export default AppSidebar