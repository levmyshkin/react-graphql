import React from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from './ArticlesView';

const client = new ApolloClient({
  uri: 'http://drupal-8.7.local/graphql',
  // request: operation => {
  //   operation.setContext({
  //     headers: {
  //       authorization: `Bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`,
  //     },
  //   });
  // },
});

const GET_NODE_BY_ID = gql`
query {
  nodeById(id: "1") {
    entityId
    entityCreated
  
    title
    status
  
    ... on NodeArticle {
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
`

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


function App() {
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
  );
}

export default App;
