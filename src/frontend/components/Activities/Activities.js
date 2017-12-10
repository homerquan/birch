/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 17:55:06
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Timeline, TimelineEvent} from 'react-event-timeline';

class Activities extends React.Component {
  render() {
    return (
      <div>
       <h2>Activities</h2>
       <h4>Updated 1 min ago</h4>
       <Timeline>
            <TimelineEvent title="John Doe sent a SMS"
                           createdAt="2016-09-12 10:06 PM"
                           icon={<i className="material-icons md-18">textsms</i>}
            >
                I received the payment for $543. Should be shipping the item within a couple of hours.
            </TimelineEvent>
            <TimelineEvent
                title="You sent an email to John Doe"
                createdAt="2016-09-11 09:06 AM"
                icon={<i className="material-icons md-18">email</i>}
            >
                Like we talked, you said that you would share the shipment details? This is an urgent order and so I
                    am losing patience. Can you expedite the process and pls do share the details asap. Consider this a
                    gentle reminder if you are on track already!
            </TimelineEvent>
        </Timeline>
      </div>  
    );
  }
}

export default compose()(Activities);
