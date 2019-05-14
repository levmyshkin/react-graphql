import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MenuView from "./MenuView";

const client = new ApolloClient({
  uri: 'http://drupal-8.7.local/graphql',
});

const GET_MENU_BY_NAME = gql`
query{
  menuByName(name: "main"){
    links {
      label
      url {
        path
      }
      links {
        label
        url {
          path
        }
      }
    }
  }
}
`

function Header() {
  return (
    <ApolloProvider client={client}>
      <Query query={GET_MENU_BY_NAME}>
        {({ loading, error, data }) => {
          if (error) return <div>Error ...</div>
          if (loading || !data) return <div>Loading ...</div>;

          var menuLinks = data.menuByName.links
          return (
            <div><MenuView menuLinks={menuLinks} /></div>
          );
        }}
      </Query>
    </ApolloProvider>
  )
}

export default Header;
