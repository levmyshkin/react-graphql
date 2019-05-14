import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from "./ArticlesView";
import {BrowserRouter as Router} from "react-router-dom";

const client = new ApolloClient({
  uri: 'http://drupal-8.7.local/graphql',
});

const GET_NODES_USING_NODE_QUERY = gql`
query{
  nodeQuery(limit: 10, offset: 0, filter: {conditions: [{operator: EQUAL, field: "type", value: ["article"]}]}) {
    entities {
      entityId
      entityCreated
      entityLabel
      
      ... on NodeArticle {
        title
        body {
          value
        }
        fieldImage {
          targetId
          alt
          title
          width
          height
          url
        }
      }
    }
  } 
}
`

function Articles() {
  return (
    <ApolloProvider client={client}>
      <Query query={GET_NODES_USING_NODE_QUERY}>
        {({ loading, error, data }) => {
          if (error) return <div>Error ...</div>
          if (loading || !data) return <div>Loading ...</div>;

          var articlesList = [];

          if (data.nodeById) {
            articlesList[0] = (data.nodeById);
          }

          if (data.nodeQuery) {
            articlesList = (data.nodeQuery.entities);
          }

          return (
            <ArticlesView articles={articlesList} />
          );
        }}
      </Query>
    </ApolloProvider>
  )
}

export default Articles;