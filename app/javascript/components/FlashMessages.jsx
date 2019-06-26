import React from 'react'
import Alert from './Alert'
import PropTypes from 'prop-types';


import { CSSTransitionGroup } from 'react-transition-group';



class FlashMessages extends React.Component {
	constructor(props) {
		super(props);
		this.state = { messages: props.messages };

		window.flash_messages = this;
	}

	addMessage(message) {
		let messages = Object.assign([], this.state.messages)
		messages.push(message)

		this.setState({ messages: messages });
	}

	removeMessage(message) {
		let index = this.state.messages.indexOf(message);
		let messages = Object.assign([], this.state.messages)
		messages.splice(index, 1)


		this.setState({ messages: messages });
	}

	render() {

		let alerts = this.state.messages.map( message =>
			<Alert key={ message.id } message={ message }
				onClose={ ()=> this.removeMessage(message) } />
		);

		return (
			<CSSTransitionGroup
				transitionName='alerts'
				transitionEnter={false}
				transitionLeaveTimeout={500}>
				{ alerts }
			</CSSTransitionGroup>
		);
	}
}

FlashMessages.propTypes= {
	messages: PropTypes.array.isRequired
};

export default FlashMessages