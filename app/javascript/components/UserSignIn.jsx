import React from "react"

class UserSignIn extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this)
		this.logInUser = this.logInUser.bind(this)
		this.state = {
			email: "",
			password: ""
		}
	}

	componentDidMount() {
		let csrfToken = document.getElementsByName('csrf-token')[0].content
		this.setState({csrfToken: csrfToken})
	}

	handleInputChange(e) {
		const target = e.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		})

	}

	logInUser(e) {
		e.preventDefault();
		let payload = {email: this.state.email, password: this.state.password }
		fetch("/users/sign_in", {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then( (res) => {return res.json()})
	}

	render() {
		return (
			<div className="container-fluid">
			  <div className="row">
			  	
		  		<div className="col-md-4 offset-md-3">
			      <h2>Log in</h2>
			      <form>
			        <div className="field">
			          Email
			          <input onChange={this.handleInputChange} type="text" name="email" className="form-control"/>
			        </div>

			        <div className="field">
			          Password
			          <input onChange={this.handleInputChange} type="password" name="password" className="form-control"/>
			        </div>

			        <br/>
			        <div className="actions">
			          <button onClick={this.logInUser} className="btn btn-primary">Log In</button>
			        </div>
			      <br/>
			      <span>Don't have an account?</span>
			      {/*<%= render "devise/shared/links" %>*/}
			      </form>
			    </div>
			  	
			    
			  </div>
			</div>

		)
	}
}

export default UserSignIn