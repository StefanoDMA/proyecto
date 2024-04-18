import React, { useState } from "react";
import "./home.css";
import Prada from "./images/prada.jpg";
import Fendi from "./images/fendi.jpg";
import Louis from "./images/louis.jpg";
import Gucci from "./images/Gucci.jpg";
import Supreme from "./images/Supreme.jpeg";
import Boss from "./images/Boss.jpg";
import Boss2 from "./images/Boss2.jpg";
import Dior from "./images/Dior.jpg";
import Dior2 from "./images/Dior2.jpg";
import CarolinaHerrera from "./images/CarolinaHerrera.jpg";
import CarolinaHerrera2 from "./images/CarolinaHerrera2.jpg";
import VersaceB from "./images/VersaceB.jpg";
import versaceN from "./images/versaceN.jpg";
import Rayban from "./images/Rayban.jpg";
import RayBan2 from "./images/RayBan2.jpg"
import ChopardM from "./images/ChopardM.jpg";
import Chopard2 from "./images/Chopard2.jpg";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Home = () => {
  const products = [
    { id: 1, name: "Prada", price: 99.99, image: Prada },
    { id: 2, name: "Fendi", price: 129.99, image: Fendi },
    { id: 3, name: "Louis", price: 120.60, image: Louis },
    { id: 4, name: "Gucci", price: 160.00, image: Gucci },
    { id: 5, name: "Supreme", price: 130.00, image: Supreme },
    { id: 6, name: "Boss Motorcycle", price: 80.99, image: Boss },
    { id: 7, name: "Boss ", price: 66.99, image: Boss2 },
    { id: 8, name: "Dior Black", price: 189.99, image: Dior },
    { id: 9, name: "Dior Casual", price: 170.00, image: Dior2 },
    { id: 11, name: "Carolina Herrera Red", price: 100.00, image: CarolinaHerrera },
    { id: 12, name: "Carolina Herrera", price: 50.00, image: CarolinaHerrera2 },
    { id: 13, name: "Versace White", price: 180.00, image: VersaceB },
    { id: 15, name: "Versace Black", price: 180.00, image: versaceN },
    { id: 16, name: "RayBan Green", price: 190.00, image: Rayban },
    { id: 17, name: "RayBan Black", price: 125.99, image: RayBan2 },
    { id: 18, name: "Chopard Women", price: 200.00, image: ChopardM },
    { id: 19, name: "Chopard Black", price: 230.00, image: Chopard2 },
    

  ];

  return (
    <div>
      <div id="banner">
        <h1>Bienvenidos a Optica Popular!</h1>
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

