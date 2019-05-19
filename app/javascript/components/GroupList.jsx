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
						<tr key={group.id}>
							<td>
								{group.nickname}
							</td>
							<td>
							</td>
							
							<td>
								<button className="badge badge-primary">Add Contacts</button>
								&nbsp;
								<button value={group.id} onClick={this.props.deleteGroup} className="badge badge-danger">Delete Group</button>
							</td>
							{/*Make sure to find a more effecient way to create delete button later.*/}
						</tr>
				)
			})

			return (
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">Nickname</th>
							<th scope="col">Members</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						
						{groupNames}
						
					</tbody>
				</table>
					
			)

		}
	}

	


	


	render () {
		
		return (
			<div className="col-12 pt-3">
				<div className="row">
					<div className="col">
						<h3>Create a New Group</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3 col-sm-3">
						Nickname
					</div>
					{/*<div className="col-md-3 col-sm-3">
						Last Name
					</div>
					<div className="col-md-3 col-sm-3">
						Phone Number
					</div>*/}
				</div>
				<form autoComplete="off">
					<div className="form-row">
						<div className="col">
							<input type="text" value={this.props.nickname} onChange={this.props.handleInputChange} className="form-control" name="nickname" placeholder="Group Name"/>
						</div>
						{/*<div className="col">
							<input type="text" value={this.props.last_name} onChange={this.props.handleInputChange} className="form-control" name="last_name" placeholder="Last Name"/>
						</div>
						<div className="col">
							<input type="tel" value={this.props.phone_number} onChange={this.props.handleInputChange} className="form-control"	name="phone_number" placeholder="(xxx)xxx-xxxx"/>
						</div>*/}
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