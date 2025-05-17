import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashBoard from '../Pages/DashBoard'
import BookPop from '../Pages/BookPop'
import Header from '../compoments/Header'
import Login from '../Pages/Login'
import Sign from '../Pages/Sign'
import { AuthRoute } from './AuthRoute'
import { ProtectedRoute } from './ProtectedRoute'
import Cart from '../Pages/Cart'
const Router = () => {
    return (
        <>

            <BrowserRouter>
                {/* <Header /> */}
                <Routes>

                    <Route path='/' element={<DashBoard />} />
                    <Route path='/book/:id' element={<BookPop />} />

                    {/* login and sign up auth routing  */}

                    <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
                    <Route path='/sign' element={<AuthRoute><Sign /></AuthRoute>} />

                    {/* cart */}

                    <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
