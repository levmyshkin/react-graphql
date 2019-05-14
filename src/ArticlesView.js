import React from 'react';
import ArticleTeaser from './ArticleTeaser';

const ArticlesView = ({articles}) => (
  <ul>
    {articles.map(article => <li key={article.entityId}><ArticleTeaser article={article} /></li>)}
  </ul>
);

export default ArticlesView;
