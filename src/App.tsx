import './index.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  )
}

export default App