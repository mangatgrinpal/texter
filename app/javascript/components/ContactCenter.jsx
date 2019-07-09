import React from "react"
import ContactList from "./ContactList"
import GroupList from "./GroupList"

class ContactCenter extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props)
		return (

			<React.Fragment>
				<nav>
				  <div className="nav nav-tabs" id="nav-tab" role="tablist">
				    <a className="nav-item nav-link active" id="nav-contacts-tab" data-toggle="tab" href="#nav-contacts" role="tab" aria-controls="nav-contacts" aria-selected="true">Contacts</a>
				    <a className="nav-item nav-link" id="nav-groups-tab" data-toggle="tab" href="#nav-groups" role="tab" aria-controls="nav-groups" aria-selected="false">Groups</a>
				  </div>
				</nav>
				<div className="tab-content mh-100" id="nav-tabContent">
				  <div className="tab-pane fade show active mh-100" id="nav-contacts" role="tabpanel" aria-labelledby="nav-contacts-tab">
				  	<ContactList
					  	{...this.props}
							{...this.state} 
							handleInputChange={this.props.handleInputChange} 
							newContact={this.props.newContact}
							deleteContact={this.props.deleteContact}
							addRecipient={this.props.addRecipient}
							deleteRecipient={this.props.deleteRecipient}/>
				  </div>
				  <div className="tab-pane fade mh-100" id="nav-groups" role="tabpanel" aria-labelledby="nav-groups-tab">
				  	<GroupList
					  	{...this.props}
							{...this.state} 
							handleInputChange={this.props.handleInputChange} 
							newGroup={this.props.newGroup}
							deleteGroup={this.props.deleteGroup}
							setSelectedGroup={this.props.setSelectedGroup}/>
				  </div>
				</div>
			</React.Fragment>
		)
	}
}

export default ContactCenter