import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from "./ArticlesView";

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
  )
}

export default Frontpage;
