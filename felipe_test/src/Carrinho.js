import React, { useContext, useState } from "react";
import { Table } from "@tecsinapse/ui-kit/build/Table/Table";
import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "@apollo/react-hooks";
import Radio from "@material-ui/core/Radio";
import {ConfirmationAlert} from '@tecsinapse/ui-kit/build/Alerts/ConfirmationAlert';

import { FinalizarMutation } from "./FinalizarMutation";
import { CarrinhoContext } from "./CarrinhoContext";

const getColumns = setProdutoQntd => [
  {
    title: "Produto",
    field: "produtoData.name"
  },
  {
    title: "",
    field: "",
    customRender: row => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{ inputProps: { min: 0, max: 99999 } }}
            margin="normal"
            variant="outlined"
            defaultValue={row.quantidade}
            onChange={e =>
              setProdutoQntd(row.produtoData, parseInt(e.target.value, 10))
            }
          />
        </div>
      );
    }
  }
];

const getColumnsReadOnly = () => [
  {
    title: "Produto",
    field: "produtoData.name"
  },
  {
    title: "Quantidade",
    field: "quantidade"
  },
  {
    title: "Valor",
    field: "produtoData.price",
    customRender: row => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          R$ {row.produtoData.price}
        </div>
      );
    }
  },
  {
    title: "Total",
    field: "quantidade",
    customRender: row => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          R$ {row.quantidade * row.produtoData.price}
        </div>
      );
    }
  }
];

const tableOptions = {
  selection: true
};
export const Carrinho = () => {
  const [finalizar, { data, loading, error }] = useMutation(FinalizarMutation);
  const carrinho = useContext(CarrinhoContext);
  const [tipoPagamento, setTipoPagamento] = useState("CARTAO");
  const [parcelasPagamento, setParcelasPagamento] = useState(1);

  if (loading) return <p>Enviando Comprar!</p>;
  if (error) return <p>ERROR</p>;


    if(data) {
        return (
            <ConfirmationAlert
            show
            text="Status da Compra"

          >
          <Typography>
            {data.finalizar ? "Parabens, compra executada com sucesso!" : "Falha interna. Tente mais tarde!"}
          </Typography>
          </ConfirmationAlert> 
        )
    }

  const onFilterData = filteredData => {
    // eslint-disable-next-line no-console
    console.log(filteredData);
  };

  const handleChangeTipoPagamento = event => {
    setTipoPagamento(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Paper style={{ width: "60%", height: "90%" }}>
        <Table
          columns={getColumns(carrinho.setProdutoQntd)}
          data={carrinho.getProdutosAsArray()}
          rowId={row => row.id}
          onFilterData={onFilterData}
          options={tableOptions}
          toolbarOptions={{
            title: "Itens",
            actions: [
              {
                key: "no-icon",
                label: "Remover",
                onClick: selectedRows => {
                  carrinho.removeProduto(selectedRows.produtoData.id);
                }
              }
            ]
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "6px 6px"
          }}
        >
          <Button variant="contained" onClick={() => carrinho.cleanCarrinho()}>
            Limpar Carrinho
          </Button>
          <Button
            variant="contained"
            onClick={() => {
                console.log(carrinho.getCarrinho(tipoPagamento, parcelasPagamento));
              finalizar({
                variables: carrinho.getCarrinho(tipoPagamento, parcelasPagamento)
              });
            }}
          >
            Finalizar
          </Button>
        </div>
      </Paper>
      <Paper style={{ width: "35%", height: "auto" }}>
        <Table
          columns={getColumnsReadOnly()}
          data={carrinho.getProdutosAsArray()}
          rowId={row => row.id}
          onFilterData={onFilterData}
          toolbarOptions={{
            title: "Resumo de compra"
          }}
        />
        <div
          style={{
            margin: "6px 6px"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: 'start',
            }}
          >
            <div>
              <Radio
                checked={tipoPagamento === "CARTAO"}
                onChange={handleChangeTipoPagamento}
                value="CARTAO"
                name="radio-button-demo"
                inputProps={{ "aria-label": "A" }}
              />{" "}
              Cartão de Credito
            </div>
            <div>
              <Radio
                checked={tipoPagamento === "BOLETO"}
                onChange={handleChangeTipoPagamento}
                value="BOLETO"
                name="radio-button-demo"
                inputProps={{ "aria-label": "BOLETO" }}
              />{" "}
              Boleto
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "40%"
            }}
          >
            <div>Parcelas</div>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{ inputProps: { min: 1, max: 12 } }}
              margin="normal"
              variant="outlined"
              defaultValue={1}
              onChange={e => setParcelasPagamento(parseInt(e.target.value, 10))}
            />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "40%"
              }}
            >
              <div>Valor Total (R$)</div>
              <div>
                {carrinho.calculateValorTotal(tipoPagamento, parcelasPagamento)}
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};
