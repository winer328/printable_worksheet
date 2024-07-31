import React,{useState} from 'react'
import { Card, Button, Form,Image,Alert } from 'react-bootstrap'
import logo from '../img/Logo.png'
import axios from 'axios';
import data from '../Data/data.ts';
import { useNavigate } from 'react-router-dom';

function LogInForm() {

  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showValidation, setShowValidation] = useState(false);


  const isFormValid = mail && password;

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!isFormValid){
      setShowValidation(true);
    }else{
        const log_user = {
          "Mail": mail,
          "Password" : password
        }
        // axios.post(`${data.ssoServiceUrl + "Login"}`,log_user).then(
        //   (res) => {
        //     navigate("/Home",{state: {token: res.data.token}})
        //   }
        // ).catch((err) =>{
        //   setShow(true);
        // })
        if(log_user.Mail == 'test@gmail.com' && log_user.Password == '123') {
          data.user = log_user;
          navigate("/Home",{state: {token: '123123123'}})
        } else {
          setShow(true);
        }

    }
  };

  const handleMailChange = (event) => {
    setMail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
      <>
        {show &&(
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Invalid user data!</Alert.Heading>
        </Alert>
     )}
      {showValidation &&(
          <Alert variant="danger" onClose={() => setShowValidation(false)} dismissible>
          <Alert.Heading>Please fill in all fields!</Alert.Heading>
        </Alert>
     )}
    <Card style={{ width: '40%', boxShadow: '0px 0px 12px 2px black' }}  bg="primary">
      <Card.Body className='text-center d-flex flex-column  justify-content-center align-items-center'>
        <Image fluid ={true} src={logo} style={{ maxWidth: "30%"/* , filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'*/}}></Image>
        <Form style={{ width: '80%' }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='text-light' style={{ fontSize: '1.8em' }}>Mail:</Form.Label>
            <Form.Control type="text" value={mail} style={{ fontSize: '1.2em' ,padding: '10px'}}onChange={handleMailChange} placeholder="Enter mail" />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label style={{ fontSize: '1.8em' }} className='text-light'>Password:</Form.Label>
            <Form.Control style={{ fontSize: '1.2em' ,padding: '10px'}} value={password} onChange={handlePasswordChange} type="password" placeholder="Enter Password" />
          </Form.Group>
          <Button variant="danger" size="lg" type="submit" className='mb-3'>
            Log in
          </Button>
        </Form>
      </Card.Body>
    </Card>
      </>
  )
}

export default LogInForm