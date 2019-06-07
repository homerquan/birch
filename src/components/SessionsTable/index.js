import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@material-ui/styles';
import BaseComponent from '../BaseComponent';
import { columns } from './datatable';
import theme from '../theme';
import config from '../../config';
import styles from './style.css';
import { sessionsQuery, updateConversationPinToTop } from './graphql';

class SessionsTable extends BaseComponent {

  static propTypes = {
    items: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
    addPinned: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { sessionConnection, loading, refetch } = this.props.data;
    const { openDrawer, addPinned } = this.props;

    const options = {
      print: false,
      download: false,
      selectableRows: false,
    };

    if (loading) {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <div>
          {sessionConnection.edges && sessionConnection.edges.length ? (
            <MUIDataTable
              options={options}
              columns={columns(addPinned, openDrawer)}
              data={this.transformConnectionNode(sessionConnection.edges)}
            />
         ) : (
           <div>
             <div className={s.nothing}>
               <div className={s.fun}>
                 <img src="/images/nothing.png" alt="No Conversations" />
               </div>
             </div>
           </div>
            )}
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(compose(
    graphql(updateConversationPinToTop),
    graphql(sessionsQuery, {
      options: props => ({
        variables: { userId: props.userId, appId: props.appId },
        pollInterval: config.pollInterval,
      }),
    }),
  )(SessionsTable));
