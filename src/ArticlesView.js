import React from 'react';
import ArticleTeaser from './ArticleTeaser';

const ArticlesView = ({articles}) => (
  <div class="articles">
    {articles.map(article => <div key={article.entityId}><ArticleTeaser article={article} /></div>)}
  </div>
);

export default ArticlesView;
