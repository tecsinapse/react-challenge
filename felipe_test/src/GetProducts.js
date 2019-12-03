import gql from 'graphql-tag';

export const GetProducts = gql`
query produtos {
    allProducts {
          id
          name
          desc
          iconUrl
          url
          license {
              name
          }
          price
          type
    }
  }
`;