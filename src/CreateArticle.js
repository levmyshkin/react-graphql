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

      if (loading) return <p>Loading...</p>;
      if (error) {

        return <p>Error :(</p>;
      }
      let title, body

      return (

        <div class="form-create-article-wrapper">
          <h3>Create Article</h3>
          <p>GraphQL Mutution example</p>
          {
            data
              ? <div>Article has been added!</div>
              : <div></div>
          }
          <form  onSubmit={e => {
            e.preventDefault();
            createArticle({ variables: {
                "input": {
                  title: title.value,
                  body: body.value,
                }
              }});
          }}>
            <div className={'title-wrapper'}>
              <input
                value={title}
                type='text'
                ref={ node =>  title = node }
                placeholder="Title"
              />
            </div>
            <div className={'body-wrapper'}>
              <textarea
                ref={ node =>  body = node }
                placeholder="Body"
              />
            </div>
            <div className={'form-actions'}>
              <button type="submit" >Save</button>
            </div>
          </form>
        </div>
      )
    }}
  </Mutation>
);

export default CreateArticle;