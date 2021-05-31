import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Signup from "./components/Signup"
import Cake from './components/Cake';

import './App.css';


var details = {
  username :    "Ashish Ithape",
  projectname : "CakeShop",
  logo:         process.env.PUBLIC_URL + '/logo.png',
}

function App() {
  return (
    <div className="App">
      <Navbar details = {details} ></Navbar>
      <Carousel></Carousel>
      <Cake></Cake>
      <Signup></Signup>
    </div>
  );
}

export default App;
