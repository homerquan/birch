/*
* @Author: Homer
* @Date:   2017-12-24 22:51:29
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-25 12:34:41
*/


class ConversationDrawer extends React.Component {

	render() {
		const conversation = this.props.conversation;
		const { messages, loading, refetch } = this.props.data;
		return (
			<div>
			{messages && messages.length ? (
              messages.map(message => (
                <div> {message.id} {message.text} </div>
              ))
            ) : (
              <div> no message here </div>
            )}
            </div>
		)
	}
}
