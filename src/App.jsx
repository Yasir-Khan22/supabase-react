import { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Row, Col, Button, Form, CardText } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductCards from "./components/ProductCards"
import { supabase } from "./supabaseClient"

// Q2ZqNqEDjJr6irWb 

function App() {

  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [products, setProducts] = useState([]);

  console.log(name)
  console.log(description)

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10)
      if (error) throw error;

      if (data !== null && data.length > 0) {
        setProducts(data)
      }

    } catch (error) {
      console.log(error, "Error Occurred while fetching.")
    }
  }


  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name,
          description: description
        })
        .single();

        if (error) throw error;

        window.location.reload();

    } catch (error) {
      console.log(error, "Error Occurred while creating.");
    }
  }
  console.log(products)



  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Store Brands.</Navbar.Brand>
          <Nav>
            <Nav.Item>
              yasirkhanzada.com
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Create Product for Supabase Products.</h3>
            <Form.Label>Product Name.</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Product Description.</Form.Label>
            <Form.Control
              type="text"
              id="description"
              onChange={(e) => setdescription(e.target.value)}
            />
            <br></br>
            <Button onClick={() => createProduct()}>Create product in SP DB</Button>
          </Col>
        </Row>
        <hr />
        <h3>current database items.</h3>
        <Row xs={1} lg={3} className='g-4'>
          {products.map((product) => (
            <Col>
              <ProductCards product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default App
