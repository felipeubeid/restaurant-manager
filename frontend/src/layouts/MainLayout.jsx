import React from 'react'
import { Outlet } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#fcfcfd]">
      <AppSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
