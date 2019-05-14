import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from "./ArticlesView";

function ArticleFull({ nid }) {

  const GET_ARTICLES_VIEWS = gql`
    query {
      articlesGraphqlView {
        results {
          entityLabel
          title
  
          ...on NodeArticle {
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

  return (
    <Query query={GET_ARTICLES_VIEWS}>
      {({loading, error, data}) => {
        if (error) return <div>Error ...</div>
        if (loading || !data) return <div>Loading ...</div>;

        var articlesList = [];

        if (data.articlesGraphqlView) {
          articlesList = (data.articlesGraphqlView.results);
        }

        return (
          <ArticlesView articles={articlesList}/>
        );
      }}
    </Query>
  )

}

export default ArticleFull;
