import React,{useEffect, useState} from 'react'
import { Navbar,Button,Container,Image } from 'react-bootstrap'
import logo from '../img/Logo.jpg'
import data from '../Data/data.ts'
import MathWorkSheet from '../Components/MathWorkSheet.tsx'
import { useNavigate,useLocation } from 'react-router-dom'
import User from '../Data/user.ts'
import axios from 'axios'


function HomePage() {
  
  const {state} = useLocation();
  // const [jwt,setJwt] = useState("")
  const[loggedIn,setLoggedIn] = useState(undefined as User|undefined)
  const navigate = useNavigate()

  useEffect(()=>{
    if(state != null){

      // const headers = {
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Bearer ' + state.token
      // };
      // setJwt(state.token)

      if(loggedIn === undefined || !loggedIn){
        // axios.get(`${data.ssoServiceUrl + "Whoami"}`,{headers}).then((res) => {
        //   setLoggedIn(res.data as User)
        // }).catch((err) => {
        //   console.log(err)
        //   navigate("/Login")
        // })
        // if(data.user.email == undefined) {
          // navigate('/Login')
        // } else {
          setLoggedIn(data.user)
        // }
      }
    }else{
      navigate("/Login")
    }
  },[loggedIn,state])

  const logOut = () =>{
    navigate("/Login")
    data.user = {};
    setLoggedIn(undefined)
  }

  return (
    <>
    <Navbar bg="light" expand="lg" className='mb-5'>
      <Container>
      <Image id="logoimg" fluid ={true} src={logo} style={{ maxWidth: "70px"}}></Image>
      <Button id="logout_btn" variant="warning" size="lg" type="submit" className='mb-3' onClick={logOut}>
          Log out
      </Button>
      </Container>
    </Navbar>
    <Container className="min-vh-100">
      <MathWorkSheet>
      </MathWorkSheet>
    </Container>
    </>
  )
}

export default HomePage