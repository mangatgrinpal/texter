import React from "react"
import ContactList from "./ContactList"
import GroupList from "./GroupList"

class ContactCenter extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		
		return (

			<React.Fragment>
				<nav>
				  <div className="nav nav-tabs" id="nav-tab" role="tablist">
				    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Contacts</a>
				    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Groups</a>
				  </div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
				  <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
				  	<ContactList
					  	{...this.props}
							{...this.state} 
							handleInputChange={this.props.handleInputChange} 
							newContact={this.props.newContact}
							deleteContact={this.props.deleteContact}
							addRecipient={this.props.addRecipient}
							deleteRecipient={this.props.deleteRecipient}/>
				  </div>
				  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
				  	<GroupList
					  	{...this.props}
							{...this.state} 
							handleInputChange={this.props.handleInputChange} 
							newGroup={this.props.newGroup}
							deleteGroup={this.props.deleteGroup}/>
				  </div>
				</div>
			</React.Fragment>
		)
	}
}

export default ContactCenter