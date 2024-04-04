import { Card, Button, Form } from 'react-bootstrap'
import { supabase } from '../supabaseClient';
import { useState } from 'react';

function ProductCards(props) {
  const product = props.product

  const [name, setName] = useState(product.name)
  const [description, setdescription] = useState(product.description)
  const [edit, setEdit] = useState(false)

  // Updating Products..

  async function updateProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({
          name: name,
          description: description
        })
        .eq("id", product.id)

      if (error) throw error

      window.location.reload()

    } catch (errror) {
      console.log(error, "error uccrred in updating product.")
    }

  }
  // Deleting a product.

  async function deleteProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id)

    if(error) throw error
    window.location.reload()

    } catch (error) {
      console.log(error, "error occurred in deleting products.")
    }

  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {edit == false ?
          <>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Button variant='danger' onClick={() => deleteProduct()}>Delete product</Button>
            <Button variant='secondary' onClick={() => { setEdit(true) }}>Edit Product</Button>
          </>
          :
          <>
            <h4>editing </h4>
            <br />
            <Form.Label>Product Name.</Form.Label>
            <Form.Control
              type="text"
              id="name"
              defaultValue={product.name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Product Description.</Form.Label>
            <Form.Control
              type="text"
              id="description"
              defaultValue={product.description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <br></br>
            <Button onClick={() => updateProduct()}>Update product in SP DB</Button>
            <Button variant='secondary' onClick={() => { setEdit(false) }}>Go Back</Button>
          </>
        }
      </Card.Body>
    </Card>
  )
};
export default ProductCards;