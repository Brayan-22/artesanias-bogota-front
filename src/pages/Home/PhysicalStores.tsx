import React from "react";
import { Button } from 'react-bootstrap';

const PhysicalStores = () => {
  return (
    <section className="d-flex mt-5">
      <div className="vh-100" style={{  width: "50%" }}>
        <img src="/src/assets/images/home/physical-stores-image.jpg" alt=""  style={{width:"100%", height:"100%"}}/>
      </div>
      <div className="position-relative physic-stores vh-100 d-flex justify-content-center align-items-center" style={{ width: "50%", backgroundColor:"#AEA434" }}>
        <Button variant="dark" className="position-absolute top-70">Comprar Ahora</Button>
      </div>
    </section>
    
  );
};

export default PhysicalStores;
