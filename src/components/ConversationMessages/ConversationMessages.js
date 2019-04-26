/*
* @Author: Homer
* @Date:   2017-12-24 22:51:29
* @Last Modified by:   homer
* @Last Modified time: 2019-04-26 13:20:45
*/

import React from "react";

class ConversationDrawer extends React.Component {

	render() {
		const { conversation, messages } = this.props;
		return (
			<div>
			{messages && messages.length ? (
                messages.map(message => (
                  <div data-reflen-message-id="{message.id}">
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
