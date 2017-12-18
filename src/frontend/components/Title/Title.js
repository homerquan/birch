import React from 'react';
import { graphql, compose } from 'react-apollo';
import s from './Title.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


class Title extends React.Component {
  render() {
    return (
     <div>	
     <h3 className={s.breadcrumb}>Home | <span className={s.title}>{this.props.children}</span></h3> 	
     </div>
    );
  }
}

export default compose(
  withStyles(s),
)(Title);
