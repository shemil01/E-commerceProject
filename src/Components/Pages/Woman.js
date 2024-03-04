import React from 'react'
import NavBar from '../Nav'
import { useNavigate } from 'react-router-dom'
import ProductData from "../ProductData";
import UseTitle from '../Custum/CustumHook';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import Footer from '../Footer';


const Woman = () => {
  UseTitle('Woman')
  const dataNavigate=useNavigate()
  const products=ProductData
  const data=products.filter((shoes)=>shoes.gender==='Women')
  console.log(products)
console.log(data)
  return (
    <div>
      <NavBar />
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:'space-around'}}>
      {data.map((shoes) => {
        return (
          <MDBCard style={{ width: "20em" }}>
            <MDBCardImage src={shoes.image} position="top" alt="..." />
            <MDBCardBody>
              <MDBCardTitle>{shoes.name}</MDBCardTitle>
              <MDBCardText>${shoes.price}</MDBCardText>
              <MDBBtn onClick={() =>dataNavigate("/Cart")}>Add to Cart</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        );
      })}
      </div>
      <Footer />
      </div>
      
  )
}

export default Woman