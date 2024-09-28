import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Category from './pages/Category';
import Product from './pages/Product';
import Subcategory from './pages/Subcategory';
import Signup from './components/Signup';
import Login from './components/Login';

export const backendUrl= "http://localhost:5050/"

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <Routes>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/category' element={<Category />} />
              <Route path='/products' element={<Product />} />
              <Route path='/subcategory' element={<Subcategory />} />
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
