import logo from './logo.svg';
import './App.css';

import SendMessage from "./components/SendMessage";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import SubNav from './components/layout/SubNav';

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }} className='wrapper'>
      
      <Header />
      <SubNav/>
      
      <SendMessage />
      <Footer />
    </div>
  );
}

export default App;
