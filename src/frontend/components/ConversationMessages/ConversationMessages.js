/*
* @Author: Homer
* @Date:   2017-12-24 22:51:29
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-25 12:34:41
*/

import React from "react";

class ConversationDrawer extends React.Component {

	render() {
		const { conversation, messages } = this.props;
		return (
			<div>
			{messages && messages.length ? (
                messages.map(message => (
                  <div data-convospot-message-id="{message.id}">
                  <Paper className={message.source === 'visitor'? s.messageBulk + " " + s.visitorBulk : s.messageBulk } zDepth={1}>
                    {message.text}
                  </Paper>  
                  </div>
                ))
              ) : (
                <div> no message here </div>
              )}
            </div>
		)
	}
}
