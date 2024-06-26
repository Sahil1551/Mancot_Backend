
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Product from './components/Product'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Order from './components/Order'
import Header from './components/Header'
import PaymentVerification from './components/PaymentVerification'
function App() {
  
  return (
    <Router>
    <Navbar/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Product/:category' element={<Product/>}/>
      <Route path='/Product' element={<Product/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/> 
      <Route path='/Cart' element={<Cart/>}/>
      
      <Route path='Product/Order/:id' element={<Order/>}/>
      
      <Route path='Product/:category/Order/:id' element={<Order/>}/>
      <Route path='/Order/:id' element={<Order/>}/>
      <Route path='/api/paymentVerification' element={<PaymentVerification/>}/>
      <Route path='*'  element={<Home/>}/>
    </Routes>
    <Footer/>
    </Router>
  )
}

export default App
