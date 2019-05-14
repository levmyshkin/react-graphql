import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Articles from './Articles';
import ArticlesGraphqlView from './ArticlesGraphqlView';
import ArticleFull from './ArticleFull';
import Frontpage from './Frontpage';
import Header from "./Header";
import Footer from "./Footer";


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

function ContactUs() {
  return <h2>Contact Us</h2>
}

function App() {
  return (
    <Router>
        <Header />

        <div>
          <Route path="/" exact component={Index} />
          <Route path="/about-graphql" component={AboutGraphQL} />
          <Route path="/articles" component={ArticlesList} />
          <Route path="/articles-views" component={ArticlesViews} />
          <Route path="/contact-us" component={ContactUs} />
        </div>

        <Footer />
    </Router>
  );
}

export default App;
