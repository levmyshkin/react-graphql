import React from 'react';

const NodeTeaser = ({ node }) => (
  <div>
    <h3>{node.title}</h3>
    <div>{node.body.value}</div>
  </div>
);

export default NodeTeaser;