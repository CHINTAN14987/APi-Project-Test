import React from "react";
import { useLocation } from "react-router-dom";

const Product = () => {
  let location = useLocation();

  return (
    <div>
      {location.state.title}
      {console.log(location)}
    </div>
  );
};

export default Product;
