import React from 'react'
import PropTypes from 'prop-types'

class Alert extends React.Component {

	componentDidMount() {
		this.timer = setTimeout(
			this.props.onClose,
			this.props.timeout
		);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	alertClass(type) {

		let classes = {
			error: 'alert-danger',
			alert: 'alert-warning',
			notice: 'alert-info',
			success: 'alert-success'
		};
		return classes[type] || classes.success
	}

	render() {
		let message = this.props.message;
		let alertClassName = `alert ${ this.alertClass(message.type) }`;

		return (
			<div className="flash-alerts">
				<div className={ alertClassName }>
					<button className='close' 
						onClick={ this.props.onClose }> 
						&times; 
					</button>
					{ message.text }
				</div>
			</div>			
		);
	}
}



Alert.propTypes = {
	onClose: PropTypes.func,
	timeout: PropTypes.number,
	message: PropTypes.object.isRequired
};

Alert.defaultProps = {
	timeout: 3000
}

export default Alert

