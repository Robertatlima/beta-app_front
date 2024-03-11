import React from "react";
import ProductList from "../components/Products/Products";
import AppBarComponent from "../components/AppBar/AppBar";

function Home() {
  return (
    <div>
      <AppBarComponent />
      <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-8">
        <ProductList perPage={9} />
      </div>
    </div>
  );
}

export default Home;
