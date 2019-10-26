const { ApolloServer, gql } = require("apollo-server");
const { products } = require("./data.js");

const schema = gql`
  enum ProductType {
    CONCESSIONARIA
    MONTADORA
  }

  enum FormaPagamentoTipo {
    CARTAO
    BOLETO
  }

  type License {
    name: String
  }

  type Product {
    id: ID
    name: String
    desc: String
    iconUrl: String
    url: String
    license: License
    price: String
    type: ProductType
  }

  input ItemCompra {
    id: ID
    qtd: Int
  }

  input FormaPagamento {
    tipo: FormaPagamentoTipo
    parcelas: Int
  }

  input Carrinho {
    itens: [ItemCompra]
    valorTotal: Float
    formaPagamento: FormaPagamento
  }

  type Query {
    allProducts: [Product]
  }

  type Mutation {
    finalizar(carrinho: Carrinho): Boolean
  }
`;

const resolvers = {
  Query: {
    allProducts: () => products
  },
  Mutation: {
    finalizar: (parent, args, context, info) => {
      console.log(args);
      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs: schema, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Rodando em ${url}`);
});
