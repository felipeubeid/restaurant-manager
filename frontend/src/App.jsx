import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import React from "react"
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Finances from './pages/Finances'
import Orders from './pages/Orders'
import Menu from './pages/Menu'
import Staff from './pages/Staff'
import Inventory from './pages/Inventory'
import NotFound from './pages/NotFound'

const App = () => {
  // Create the router with routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/finances' element={<Finances />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/staff' element={<Staff />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )
  return <RouterProvider router={router}/>
}

export default App
