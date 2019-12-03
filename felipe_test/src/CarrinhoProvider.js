import React, { useState } from "react";
import { CarrinhoContext } from "./CarrinhoContext";

export const CarrinhoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState({});
  const [total, setTotal] = useState(0);

  const addProduto = produtoData => {
    setProdutos(currentProdutos => {
      const copyProdutos = { ...currentProdutos };
      const produtoId = produtoData.id;

      if (produtoId in copyProdutos) {
        copyProdutos[produtoId].quantidade++;
      } else {
        copyProdutos[produtoId] = {
          produtoData,
          quantidade: 1,
        };
      }
      return copyProdutos;
    });
    setTotal(total => total + 1);
  };

  const setProdutoQntd = (produtoData, qtd) => {
    let oldQntd = 0; 
    setProdutos(currentProdutos => {
      const copyProdutos = { ...currentProdutos };
      const produtoId = produtoData.id;
      if (produtoId in copyProdutos) {

        oldQntd = copyProdutos[produtoId].quantidade;
        copyProdutos[produtoId].quantidade = qtd;
      } else {
        copyProdutos[produtoId] = {
          produtoData,
          quantidade: qtd,
        };
      }
      return copyProdutos;
    });
    setTotal(total => (total + qtd - oldQntd));
  };

  const removeProduto = produtoId => {
    const copyProdutos = { ...produtos };
    setTotal(total - copyProdutos[produtoId].quantidade);
    delete copyProdutos[produtoId];
    setProdutos(copyProdutos);
  };

  const cleanCarrinho = () => {
      setProdutos({});
      setTotal(0);
  }

  const decrementProduto = produtoId => {
    const copyProdutos = { ...produtos };

    if (produtoId in copyProdutos) {
      copyProdutos[produtoId].quantidade--;
      if (copyProdutos[produtoId].quantidade <= 0) {
        delete copyProdutos[produtoId];
      }
    }

    setProdutos(copyProdutos);
    setTotal(total - 1);
  };

  const getProdutosAsArray = () => (Object.keys(produtos).map((key) => produtos[key]));

  const getCarrinho = (tipoPagamento, parcelasPagamento) => ({
        carrinho: {
            itens:  (Object.keys(produtos).map((key) => ({
                id: produtos[key].produtoData.id, 
                qtd: produtos[key].quantidade,
            }))),
            valorTotal: calculateValorTotal(tipoPagamento, parcelasPagamento),
            formaPagamento: {
                tipo: tipoPagamento,
                parcelas: parcelasPagamento,
            },
        }
    });

  const getTotal = () => total;

  const calculateValorTotal = (tipoPagamento, parcelasPagamento) => {
    let valorTotal = 0;
    Object.keys(produtos).forEach((key) => (
        valorTotal += produtos[key].quantidade * produtos[key].produtoData.price));
    let discount = 1;
    if(tipoPagamento === 'BOLETO') {
        discount -= 0.12;
    } else if (parcelasPagamento <= 3) {
        discount -= 0.05;
    } 

    return valorTotal * discount; 
}

  return (
    <CarrinhoContext.Provider
      value={{
        getProdutosAsArray,
        getCarrinho,
        addProduto,
        decrementProduto,
        removeProduto,
        getTotal,
        setProdutoQntd,
        cleanCarrinho,
        calculateValorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
