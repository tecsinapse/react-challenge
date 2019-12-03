import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import {Table} from '@tecsinapse/ui-kit/build/Table/Table';
import {Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { GetProducts } from "./GetProducts";
import {CarrinhoContext} from './CarrinhoContext';

const getColumns = (addProduto) => ([
    {
        title: '',
        field: 'iconUrl',
        customRender: row => {
          return (
            <div> 
                <img src={row.iconUrl} alt={row.iconUrl} />
            </div>
          );
        },
    },
    {
        title: 'Produto',
        field: 'name',
        options: {
          filter: true,
        },
    },
    {
      title: 'Valor (R$)',
      field: 'price',
      options: {
        filter: true,
        numeric: true,
      },
    },
    {
      title: '',
      field: '',
      customRender: row => {
        return (
          <div style={{
              display: 'flex',
              justifyContent: 'center',
          }}> 
            <Button variant="contained" onClick={() => addProduto(row)}>
                Adicionar ao Carrinho
            </Button>
          </div>
        );
      },
    },
  ]);

export const Produtos = () => {
    const { data, loading, error } = useQuery(GetProducts);
    const carrinho = useContext(CarrinhoContext);

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;

    const onFilterData = filteredData => {
        // eslint-disable-next-line no-console
        console.log(filteredData);
    };
    console.log(data);

    return (
    <Paper style={{ width: '100%', height: '100%' }}>
        <Table
          columns={getColumns(carrinho.addProduto)}
          data={data.allProducts}
          rowId={row => row.id}
          onFilterData={onFilterData}
        />
      </Paper>
    );
}