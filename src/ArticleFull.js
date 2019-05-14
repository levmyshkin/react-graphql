import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from "./ArticlesView";

function ArticleFull({ nid }) {

  const GET_NODE_BY_ID = gql`
    query nodeById($nid: String!){
      nodeById(id: $nid) {
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
        ... on NodePage {
          body {
            value
          }
        }
      }
    }
    `

  return (
    <Query query={GET_NODE_BY_ID} variables={{ nid }}>
      {({loading, error, data}) => {
        if (error) return <div>Error ...</div>
        if (loading || !data) return <div>Loading ...</div>;

        var articlesList = [];

        if (data.nodeById) {
          articlesList[0] = (data.nodeById);
        }

        return (
          <ArticlesView articles={articlesList}/>
        );
      }}
    </Query>
  )

}

export default ArticleFull;
