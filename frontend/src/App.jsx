import Home from './component/Home'
import { Routes,Route, Navigate } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import { useAuth } from './context/Authprovider'

function App() {
  const [authuser]=useAuth();
  console.log(authuser)
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={authuser?<Home/>:<Navigate to={"/login"}/>}/>*/}
         <Route path='/signup' element={authuser?<Navigate to={"/"}/>:<Signup/>}/>
          <Route path='/login' element={authuser?<Navigate to={"/"}/>:<Login/>}/> 

           <Route path='/' element={<Home/>}/>
         {/* <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>  */}
      </Routes>



      
    </div>
  )
}

export default App  