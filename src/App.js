
import './App.css';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Addproduct from './components/Add_product.js';
import ProductList from './components/ProductList.js';
import UpdateProduct from './components/UpdateProduct.js';
import 'bootstrap/dist/css/bootstrap.css';
import PrivateComponent from './components/PrivateComponent.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Nav />
<Routes>
  <Route element = {<PrivateComponent />} >
  <Route path="/" element={<ProductList />} />
  <Route path="/Add_product" element={<Addproduct />} />
  <Route path="/update/:id" element={<UpdateProduct />} />
  <Route path="/logout" element={<h1>Logout component</h1>} />
  <Route path="/profile" element={<h1>Profile component</h1>} />
  </Route>
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
</Routes>
     </BrowserRouter>
     <Footer />
    </div>
  );
}

export default App;
