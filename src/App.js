import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Articles from './Articles';
import ArticlesGraphqlView from './ArticlesGraphqlView';
import ArticleFull from './ArticleFull';
import Frontpage from './Frontpage';
import Header from "./Header";
import Footer from "./Footer";
import CreateArticle from "./CreateArticle";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "react-apollo";


const client = new ApolloClient({
  uri: 'http://drupal-8.7.local/graphql',
  // request: operation => {
  //   operation.setContext({
  //     headers: {
  //       authorization: `Bearer ACCESS_TOKEN`,
  //     },
  //   });
  // },
});

function Index() {
  return <Frontpage />
}

function ArticlesList() {
  return <Articles />
}

function AboutGraphQL() {
  return <ArticleFull nid={5} />
}

function ArticlesViews() {
  return <ArticlesGraphqlView />
}

function ArticleAdd() {
  return <CreateArticle />
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />

        <div>
          <Route path="/" exact component={Index} />
          <Route path="/about-graphql" component={AboutGraphQL} />
          <Route path="/articles" component={ArticlesList} />
          <Route path="/articles-views" component={ArticlesViews} />
          <Route path="/create-article" component={ArticleAdd} />
        </div>

        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
