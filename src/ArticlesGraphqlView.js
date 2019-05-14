import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from "./ArticlesView";

function ArticleFull({ nid }) {

  const client = new ApolloClient({
    uri: 'http://drupal-8.7.local/graphql',
  });

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
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )

}

export default ArticleFull;
