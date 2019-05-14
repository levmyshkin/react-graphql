import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from 'react-dom';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Articles from './Articles';
import Header from "./Header";
import Footer from "./Footer";

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

function Index() {
  return (
    <div>
      <h2>Drupal / GraphQL / React</h2>
      <ApolloProvider client={client}>
        <p>text</p>
      </ApolloProvider>
    </div>
  )
}

function ArticlesList() {
  return <Articles />;
}

function AboutUs() {
  return <h2>About Us</h2>;
}

function ContactUs() {
  return <h2>Contact Us</h2>;
}

function App() {
  return (
    <Router>
        <Header />

        <div>
          <Route path="/" exact component={Index} />
          <Route path="/articles" component={ArticlesList} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
        </div>

        <Footer />
    </Router>
  );
}

export default App;
