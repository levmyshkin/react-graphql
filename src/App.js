import React from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ArticlesView from './ArticlesView';

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

// const articles = [
//   {
//     id: 1,
//     title: 'First article',
//     body: {
//       value: 'This is the first article'
//     }
//   },
//   {
//     id: 2,
//     title: 'Second article',
//     body: {
//       value: 'This is the second article'
//     }
//   }
// ]


// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <AppComponent />
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     </ApolloProvider>
//   );
// }

function App() {
  // client.query({
  //   query: gql`
  //           query {
  //             nodeById(id: "1") {
  //               entityId
  //               entityCreated
  //
  //               title
  //               status
  //
  //               ... on NodeArticle {
  //                 fieldImage {
  //                   targetId
  //                   alt
  //                   title
  //                   width
  //                   height
  //                   url
  //                 }
  //               }
  //             }
  //           }
  //         `,
  // })
  //   .then(articles => console.log(articles))
  //   .catch(error => console.error(error));

  // return (
  //   <ApolloProvider client={client}>
  //     <div className="App">
  //
  //
  //       <Query client={client} query={GET_NODE}>
  //         {({ data: { articles }, loading }) => {
  //           console.log(articles)
  //           if (loading || !articles) {
  //             return <div>Loading ...</div>;
  //           }
  //           var articlesList = [];
  //           articlesList.append(articles.data.nodeById);
  //
  //           //console.log(articlesList)
  //           return (
  //             <ArticlesView articles={articlesList} />
  //           );
  //         }}
  //       </Query>
  //     </div>
  //   </ApolloProvider>
  // );

  return (
    <Query client={client} query={GET_NODE_BY_ID}>
      {({ loading, error, data }) => {
        console.log(data);
        if (error) return <div>Error ...</div>
        if (loading || !data) return <div>Loading ...</div>;
        var articlesList = [];
        articlesList[0] = (data.nodeById);
        console.log(articlesList);
        return (
          <ArticlesView articles={articlesList} />
        );
      }}
    </Query>
  );
}

export default App;
