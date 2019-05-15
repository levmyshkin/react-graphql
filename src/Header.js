import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MenuView from "./MenuView";

const GET_MENU_BY_NAME = gql`
query{
  menuByName(name: "main"){
    links {
      label
      url {
        path
      }
      links {
        label
        url {
          path
        }
      }
    }
  }
}
`

function Header() {
  return (
    <div class="header">
      <div class="logo-wrapper">
        <img src="/images/logo.png" class="logo" />
      </div>
      <div class="logo-minsk-wrapper">
        <img src="/images/logo-minsk.png" class="logo-minsk"/>
      </div>
      <div class="top-menu">
        <Query query={GET_MENU_BY_NAME}>
          {({ loading, error, data }) => {
            if (error) return <div>Error ...</div>
            if (loading || !data) return <div>Loading ...</div>;

            var menuLinks = data.menuByName.links
            return (
              <div><MenuView menuLinks={menuLinks} /></div>
            );
          }}
        </Query>
      </div>
    </div>
  )
}

export default Header;
