import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const GET_CUSTOM_BLOCK_BY_ID = gql`
query{
  blockContentById(id: "2") {
    entityLabel
  ...on BlockContentBasic {
      info
      entityLabel
    }
  }
}
`

function Footer() {
  return (
    <div class="footer">
      <div class="container">
        <Query query={GET_CUSTOM_BLOCK_BY_ID}>
          {({ loading, error, data }) => {
            if (error) return <div>Error ...</div>
            if (loading || !data) return <div>Loading ...</div>;

            return (
              <div>{data.blockContentById.info}</div>
            );
          }}
        </Query>
      </div>
    </div>
  )
}

export default Footer;
