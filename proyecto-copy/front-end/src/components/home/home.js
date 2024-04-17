import React, { useState } from "react";
import "./home.css";
import Prada from "./images/prada.jpg";
import Fendi from "./images/fendi.jpg";
import Louis from "./images/louis.jpg";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Home = () => {
  const products = [
    { id: 1, name: "Glasses 1", price: 99.99, image: Prada },
    { id: 2, name: "Glasses 2", price: 129.99, image: Fendi },
    { id: 3, name: "Glasses 3", price: 149.99, image: Louis },
  ];

  return (
    <div>
      <div id="banner">
        <h1>Bienvenidos a Optica DAFSJR!</h1>
      </div>
      <div id="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={`Glasses ${product.id}`} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

