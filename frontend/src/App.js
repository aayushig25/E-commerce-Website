import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import CartPage from './pages/CartPage'
import PaymentPage from './pages/PaymentPage'
import OrderPage from './pages/OrderPage'
import UserListPage from './pages/UserListPage'
import ProductListPage from './pages/ProductListPage'
import OrderListPage from './pages/OrderListPage'
import UserEditPage from './pages/UserEditPage'
import ProductEditPage from './pages/ProductEditPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
    <Header />
     <main className="py-3">
       <Container>
          <Route exact path="/"> <HomePage /> </Route>
          <Route path="/login"> <LoginPage /> </Route>
          
          <Route path="/register"><RegisterPage /></Route>
          <Route path="/profile"><ProfilePage /></Route>
         
          <Route path="/shipping"><ShippingPage /></Route>
          <Route path="/payment"><PaymentPage /></Route>
          <Route path="/placeorder"><PlaceOrderPage /></Route>
          <Route path="/order/:id"><OrderPage /></Route>
          <Route path="/product/:id"><ProductPage /></Route>
          <Route path="/cart/:id?"><CartPage /></Route>

          <Route path="/admin/userlist"> <UserListPage /> </Route>
          <Route path="/admin/productlist"> <ProductListPage /> </Route>
          <Route path="/admin/user/:id/edit"> <UserEditPage /> </Route>
          <Route path="/admin/product/:id/edit"> <ProductEditPage /> </Route>
          <Route path="/admin/orderlist"><OrderListPage /></Route>
       </Container>
     </main>
    <Footer />
    </Router>
  );
}

export default App;
