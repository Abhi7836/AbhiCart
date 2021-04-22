import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Row,Col,Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Rating from '../components/Rating'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {loading: loadingUpdate,error: errorUpdate,success: successUpdate,} = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {'Content-Type': 'multipart/form-data',},}
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
       <Row className='justify-content-md-center'>
       <Col xs={12} md={6}>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
          <Form onSubmit={submitHandler}>
            <Form.Group as={Row} controlId='name'>
              <Form.Label column md={3}>Name</Form.Label>
              <Col>
              <Form.Control
                className="border border-dark"
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='price'>
              <Form.Label column md={3}>Price</Form.Label>
              <Col>            
              <Form.Control
                className="border border-dark"
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
              </Col> 
            </Form.Group>

            <Form.Group  as={Row} controlId='image'>
              <Form.Label  column md={3}>Image</Form.Label>
              <Col>
              <Form.Control hidden
                className="border border-dark"
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              
              <Form.File    
                className="border border-dark file"
                id='image-file'
                label={image} 
                custom
                style={{color :'red'}}
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
              </Col>
            </Form.Group>
      
            <Form.Group as={Row} controlId='brand'>
              <Form.Label column md={3}>Brand</Form.Label>
              <Col>
              <Form.Control
                className="border border-dark"
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='countInStock'>
              <Form.Label column md={3}>Count In Stock</Form.Label>
              <Col>
              <Form.Control
                className="border border-dark"
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='category'>
              <Form.Label column md={3}>Category</Form.Label>
              <Col>
              <Form.Control
                className="border border-dark"
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}  controlId='description'>
              <Form.Label column md={3}>Description</Form.Label>
              <Col>
              <Form.Control
                className="border border-dark"
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
              </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col><Col md={4}>
        <Card className='my-3 p-3  rounded'>
             <Card.Img src={image} variant='top'/>
         <Card.Body>
          <Card.Title as='div'><strong>{name}</strong><p>{brand}</p></Card.Title>
         <Card.Text as='div'>
             <Rating value={product.rating} text={`${product.numReviews}reviews`}/>
         </Card.Text>
         <Card.Text as='h4'>₹{price} <strong> {countInStock} Pices</strong></Card.Text>
         <Card.Text as='div'>{category}</Card.Text>
         <Card.Text as='div'>{description}</Card.Text>
         </Card.Body>
       </Card>
      </Col>
      </Row>
    </>
  )
}

export default ProductEditScreen