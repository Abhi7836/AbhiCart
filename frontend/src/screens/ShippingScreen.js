import React, { useState } from 'react'
import { Form, Button,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [fullname,setFullname] = useState(shippingAddress.fullname)
  const [mobileno,setMobileno] = useState(shippingAddress.mobileno)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [state, setState] = useState(shippingAddress.state)
  const [pincode, setPincode] = useState(shippingAddress.pincode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ fullname,mobileno,address, city, state, pincode, country}))
    history.push('/payment')
  }

  return (
    <FormContainer>
     <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} controlId='fullname'>
          <Form.Label column md={3} >Full Name</Form.Label>
          <Col>
          <Form.Control
            className="border border-dark"
            type='text'
            placeholder='Enter full name'
            value={fullname}
            required
            onChange={(e) => setFullname(e.target.value)}
          ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group  as={Row} controlId='mobileno'>
          <Form.Label column md={3}>Moile number</Form.Label>
          <Col>
          <Form.Control
            className="border border-dark"
            type='text'
            placeholder='Enter Mobile number'
            value={mobileno}
            required
            onChange={(e) => setMobileno(e.target.value)}
          ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='address'>
          <Form.Label column md={3} >Address</Form.Label>
          <Col>
          <Form.Control
          className="border border-dark"
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='city'>
          <Form.Label column md={3} >City</Form.Label>
          <Col>
          <Form.Control
          className="border border-dark"
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='state'>
          <Form.Label column md={3}>State</Form.Label>
          <Col>
          <Form.Control
          className="border border-dark"
            type='text'
            placeholder='Enter State'
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='pinCode'>
          <Form.Label column md={3}>Pin Code</Form.Label>
          <Col>
          <Form.Control
          className="border border-dark"
            type='text'
            placeholder='Enter postal code'
            value={pincode}
            required
            onChange={(e) => setPincode(e.target.value)}
          ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='country'>
          <Form.Label column md={3}>Country</Form.Label>
          <Col>
          <Form.Control
          className="border border-dark"
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
          </Col>
        </Form.Group>

          <Button type='submit' variant='primary'>
          Continue
          </Button>

      </Form>

    </FormContainer>
  )
}

export default ShippingScreen