import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GetProducts } from "./GetProducts";
import { Header } from "./Header";
import { Produtos } from "./Produtos";
import { Carrinho } from "./Carrinho";
import { CarrinhoProvider } from "./CarrinhoProvider";

import "./App.css";

function App() {
  const [page, setPage] = useState("produtos");
  
  return (
    <CarrinhoProvider>
      <div className="App">
        <Header page={page} handlePage={(e, newPage) => setPage(newPage)} />
        {page === "produtos" ? <Produtos /> : <Carrinho />}
      </div>
    </CarrinhoProvider>
  );
}

export default App;
