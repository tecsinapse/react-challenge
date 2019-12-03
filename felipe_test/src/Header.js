import React, { useContext } from "react";
import { AppBar } from "@tecsinapse/ui-kit/build/Menu/AppBar/AppBar";

import IconButton from "@material-ui/core/IconButton";
import { mdiBell, mdiOneUp, mdiShieldHalfFull, mdiTurtle } from "@mdi/js";
import Icon from "@mdi/react";
import { makeStyles, styled, useTheme } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {CarrinhoContext} from './CarrinhoContext';

const StyledAppBar = styled(AppBar)({
  top: 0,
  left: 0,
  right: 0
});

export const Header = ({page, handlePage}) => {
  const carrinho = useContext(CarrinhoContext);
  return (
    <AppBar
      leftIcons={
        <div style={{ display: "flex" }}>
          <Typography variant="h5">Tecsinapse Store</Typography>
        </div>
      }
      menuBar={false}
      disableBreadcrumb
      rightIcons={
        <div style={{
          display: 'flex',
        }}>
          <ToggleButtonGroup
            value={page}
            exclusive
            onChange={handlePage}
            aria-label="page selection"
          >
            <ToggleButton value="produtos" aria-label="produto page">
              <Typography>
                  Produtos
              </Typography>
            </ToggleButton>
            <ToggleButton value="carrinho" aria-label="carrinho page">
            <Typography>
                  Carrinho
              </Typography>
            </ToggleButton>
            
          </ToggleButtonGroup>

          <div style={{
                backgroundColor: 'white',
                marginLeft: '6px',
                width: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
          }}>
            <Typography>
              {carrinho.getTotal()}
            </Typography>
          </div>
        </div>
      }
    />
  );
};
