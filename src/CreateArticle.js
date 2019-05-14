import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


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



const CreateArticle = (props) => (
  <Mutation mutation={CREATE_ARTICLE} >
    {(createArticle, { loading, error, data }) => {
      if (data) {
        // @todo add notification.
      }
      if (loading) return <p>Loading...</p>;
      if (error) {

        return <p>Error :(</p>;
      }
      let title, body

      return (
        <form  onSubmit={e => {
          e.preventDefault();
          createArticle({ variables: {
              "input": {
                title: title.value,
                body: body.value,
              }
            }});
        }}>
          <input
            value={title}
            type='text'
            ref={ node =>  title = node }
            placeholder="Title"
          />
          <textarea
            ref={ node =>  body = node }
            placeholder="Body"
          />
          <button type="submit" >Save</button>
        </form>
      )
    }}
  </Mutation>
);

export default CreateArticle;