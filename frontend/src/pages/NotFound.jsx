import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Button } from "@/components/ui/button";
 
const NotFound = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
        <FaExclamationTriangle className='text-yellow-400 text-6xl mb-4' />
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">404 Not Found</h1>
        <p className="font-medium mb-5 text-gray-600 -mt1">This page does not exist</p>
        <Link to="/">
            <Button>Go to Home</Button>
        </Link>
    </section>
  )
}

export default NotFound
