import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

class GroupList extends React.Component {
	constructor(props) {
		super(props)
		
	}

	componentDidMount() {
		
		
	}

	


	groupList() {
		let groups = this.props.userGroups

		

		if (groups.length == 0) {
			return (
				<div>
					<br/>
					<p>You haven't created any groups yet. Make one now.</p>
				</div>
			)
			
		} else {

			
			
			let groupNames = groups.map((group)=> {
				
	
				return (

					<li key={group.id} className="list-group-item">
						<div className="row">
							<div className="col-md-3 col-sm-3">
								{group.nickname}
							</div>
							<div className="col-md-3 col-sm-3">
								{group.contacts.length}
								
							</div>
							
							<div className="col-md-6 col-sm-6">
								<a value={group.id} onClick={this.props.setSelectedGroup} className="badge badge-primary">Manage Group</a>
								&nbsp;
								<a value={group.id} onClick={this.props.deleteGroup} className="badge badge-danger">Delete Group</a>
							</div>
						</div>
						
						{/*Make sure to find a more efficient way to create delete button later.*/}
					</li>
				)
				
			})	
		

			return (
				<React.Fragment>
					<ul className="list-group group-list-headers">
						<li className="list-group-item">
							<div className="row">
								<div className="col-md-3 col-sm-3">
									<strong>Nickname</strong>

								</div>
								<div className="col-md-3 col-sm-3">
									<strong>Members</strong>
									
								</div>
								
									
							</div>
						</li>
					</ul>
					<ul className="list-group group-list">
						
							{groupNames}
					</ul>
				</React.Fragment>
				
					
			)

		}
	}

	


	


	render () {
		
		return (
			<div className="container">
				<div className="row">
					<div className="col pt-3">
						<h3>Create a New Group</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3 col-sm-3">
						Nickname
					</div>
				</div>
				<form autoComplete="off">
					<div className="form-row">
						<div className="col">
							<input type="text" value={this.props.nickname} onChange={this.props.handleInputChange} className="form-control" name="nickname" placeholder="Group Name"/>
						</div>
						
						<div className="col">
							<button onClick={this.props.newGroup} className="btn btn-primary">Create Group</button>
						</div>
					</div>
				</form>

				<div className="row mt-5">
					<div className="col mt-5">
						{this.groupList()}
					</div>
				</div>
			</div>
		)
	}
}

export default GroupList