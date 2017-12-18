/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-18 00:23:32
*/

import React from "react";
import { graphql, compose } from "react-apollo";
import Paper from "material-ui/Paper";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import s from "./ConversationDrawer.css";
import gql from 'graphql-tag';


function TodoApp({ data: { conversations, refetch } }) {
  if (conversations && conversations.length) {
      return (
       <div>
         <button onClick={() => refetch()}>
           Refresh
         </button>
         {conversations.map(function(listValue){
               return <li>{listValue.id}</li>;
         })}
       </div>
      )
  }
  return (
    <div>empty so far</div>
  )
}

const DemoWithData = graphql(gql`
        query {
          conversations {
          id
          visitor
          client
          mode
          updatedAt
          }
        }
      `)(TodoApp)

 
class ConversationDrawer extends React.Component {
  render() {
    return (
      <DemoWithData/>
    );
  }
}

export default withStyles(s)(ConversationDrawer);