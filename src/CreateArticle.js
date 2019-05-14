import React, { Component } from 'react'
import {ApolloProvider, Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import ApolloClient from "apollo-client";

const CREATE_ARTICLE = gql`
  mutation($input: ArticleInput!) {
    createArticle(input: $input) {
      entity {
        entityId
      }
      errors
      violations {
        message
      }
    }
  }
`



class CreateArticle extends Component {
  state = {
    title: '',
    body: '',
  }


  render() {
    const { title, body } = this.state
    return (
      <div>

        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
            type="text"
            placeholder="Title"
          />
          <textarea
            className="mb2"
            value={body}
            onChange={e => this.setState({ body: e.target.value })}
            placeholder="Body"
          />
        </div>
        {/*<button onClick={`... you'll implement this 🔜`}>Submit</button>*/}
        <Mutation mutation={CREATE_ARTICLE} variables={{ input: {title: title, body: body} }}>
          {createArticle => <button onClick={createArticle}>Submit</button>}
        </Mutation>

      </div>
    )
  }

}

export default CreateArticle;