import './App.css';
import Nav from './Components/Nav';
import Landingpage from './Pages/Landingpage';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import SalonRegister from './Pages/SalonRegister';
import ClientRegister from './Pages/ClientRegister';
import RegisterModal from './Components/RegisterModal';
import { BrowserRouter, BrowserRouter as Router,Route, Routes} from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
   <Routes>
     <Route exact path="/" element={<Landingpage/>}/>
     <Route path="/Login" element={<Login/>}/>
     <Route path="/SalonRegister" element={<SalonRegister/>}/>
     <Route path="/ClientRegister" element={<ClientRegister/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
