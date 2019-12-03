import gql from 'graphql-tag';

export const FinalizarMutation = gql`
    mutation finalizar($carrinho: Carrinho) {
        finalizar(carrinho: $carrinho)
    }  
`;