import React from 'react'
import { Button,Card } from 'react-bootstrap'

function ServiceCard({service,jwt}) {

  const redirect = () =>{
    window.location.replace(service.url + "/" + jwt)
  }

  return (
    <Card bg={service.cardColor} className='h-100 p-3'>
      <Card.Body>
        <Card.Title >{service.name}</Card.Title>
        <Card.Text>
        {service.description}
        </Card.Text>
      </Card.Body>
      <Button className='' onClick={redirect}>Visit service</Button>
    </Card>
  )
}

export default ServiceCard