import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {BrowserRouter as Router} from "react-router-dom";


const GET_CUSTOM_BLOCK_BY_ID = gql`
query{
  blockContentById(id: "2") {
    entityLabel
  ...on BlockContentBasic {
      info
      entityLabel
    }
  }
}
`

function Footer() {
  return (
    <Query query={GET_CUSTOM_BLOCK_BY_ID}>
      {({ loading, error, data }) => {
        if (error) return <div>Error ...</div>
        if (loading || !data) return <div>Loading ...</div>;

        return (
          <div>{data.blockContentById.info}</div>
        );
      }}
    </Query>
  )
}

export default Footer;
