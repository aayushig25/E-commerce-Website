import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
    <Header />
     <main className="py-3">
       <Container>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/product/:id">
            <ProductPage />
          </Route>
          <Route path="/cart/:id?">
            <CartPage />
          </Route>
       </Container>
     </main>
    <Footer />
    </Router>
  );
}

export default App;
