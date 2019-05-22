/*
* @Author: Homer
* @Date:   2017-12-24 22:51:29
* @Last Modified by:   homer
* @Last Modified time: 2019-05-22 17:35:26
*/

import BaseComponent from '../BaseComponent';

class ConversationDrawer extends BaseComponent {

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
