import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from "./ArticlesView";


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
  )
}

export default Articles;
