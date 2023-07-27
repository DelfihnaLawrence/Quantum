 import {Navbar, Footer , Services} from './components';
 
 import Welcome from './components/Welcome';
 import Transaction from './components/Transaction';
 
 const App=()=> {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
        <Services/>  
        <Transaction/>
        <Footer/>
    </div>
  )
}

export default App
 