import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from "./ArticlesView";

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
  nodeById(id: "4") {
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

function Frontpage() {
  return (
    <ApolloProvider client={client}>
      <Query query={GET_NODE_BY_ID}>
        {({ loading, error, data }) => {
          if (error) return <div>Error ...</div>
          if (loading || !data) return <div>Loading ...</div>;

          var articlesList = [];

          if (data.nodeById) {
            articlesList[0] = (data.nodeById);
          }

          return (
            <ArticlesView articles={articlesList} />
          );
        }}
      </Query>
    </ApolloProvider>
  )
}

export default Frontpage;
