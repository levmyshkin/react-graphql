import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const ArticleTeaser = ({ article }) => (
  <div>
    <h3>{article.title}</h3>
    <div>{ReactHtmlParser(article.body.value)}</div>
  </div>
);

export default ArticleTeaser;