import React from 'react';
import { Routes,Route} from 'react-router-dom'
import CreateBook from './Pages/CreateBook';
import DeleteBook from './Pages/DeleteBook';
import EditBook from './Pages/EditBook';
import Home from './Pages/Home';
import Wishlist from './Pages/Wishlist';
import Showbook from './Pages/Showbook';
import LandingPage from './Pages/LandingPage';


const App = () => {
  return (
  <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/books/create" element={<CreateBook />}/>
    <Route path="/books/details/:id" element={<Showbook />}/>
    <Route path="/books/edit/:id" element={<EditBook />}/>
    <Route path="/books/delete/:id" element={<DeleteBook />}/>
    <Route path="/wishlist" element={<Wishlist/>} />
    {/* <Route path="" element={}/> */}
  </Routes>
  )
}

export default App
