import React from "react"
import MessageList from "./MessageList"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


class MessageCenter extends React.Component {
	constructor(props) {
		super(props);


		
	}






	render() {

		
		
		return (
			<div className="col-12">
				
				<MessageList {...this.props}/>
				

			</div>
		)



	}
}

export default MessageCenter