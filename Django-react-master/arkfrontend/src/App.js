import "./App.css";
import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ShippingScreen from "./components/screens/ShippingScreen";
import OrderplacedScreen from "./components/screens/OrderplacedScreen";
import ProfileScreen from "./components/screens/ProfileScreen";


function App() {
  return (
 <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/orderplaced" component={OrderplacedScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
        </Container>
      </main>

      <Footer />
      </Router>
  );
}

export default App;
