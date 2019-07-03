import React from "react"

// this component is the NavBar that will be seen on all pages
class Nav extends React.Component {
	constructor(props) {
		super(props);

	}

	logOut() {
		$.ajax("/users/sign_out", {
				dataType: "JSON",
				type: "DELETE",
				success: ()=> {
					window.flash_messages.addMessage({ id: 6, text: 'You\'ve been successfully logged out.', type: 'notice'})
					var pathname = window.location.pathname
					if (pathname === "/dashboard") {
						
						setTimeout(window.location.replace("/").bind(window.location), 10000)

					}
					else {
						window.location.reload()
					}
				}	
		});
		
	}

	setLogOutFlash() {
		
	}


	//redirect user to dashboard
	goDashboard() {
		window.location.href = "/dashboard"
	}

	//redirect user to sign up page
	goSignUp() {
		window.location.href = "/users/sign_up"
	}

	//redirect user to sign in page
	goSignIn() {
		window.location.href = "/users/sign_in"
	}

	

	renderNavItems() {
		let currentPage = window.location.pathname
		// when the user is logged in
		if (currentPage == "/" && this.props.currentUser) {
			return (
				<div className="navbar-nav pr-2">
			  	<button onClick={this.goDashboard} className="dash-button btn btn-primary nav-item">Dashboard</button>
			  	&nbsp;

			  	<button onClick={this.logOut} className="log-out btn nav-item ml-1">Log Out</button>
			  </div>
			)
		}

		if (currentPage == "/dashboard" && this.props.currentUser) {
			return (
				<div className="navbar-nav pr-2">
			  	<button onClick={this.logOut} className="log-out btn nav-item">Log Out</button>
			  </div>
			)
		}

		else {
			return (
				<div className="navbar-nav pr-2">			  	
			  	<button onClick={this.goSignIn} className="btn log-in nav-item">Log In</button>
			  	&nbsp;
			  	<button onClick={this.goSignUp} className="sign-up btn btn-primary nav-item ml-1">Sign Up Free</button>
			  </div>
			)
		}
	}

	render () {

		let userRedirect
		if (this.props.currentUser) {
			userRedirect = "/dashboard"
		} else {
			userRedirect = "/"
		}

		return (
			<nav className="navbar justify-content-between navbar-expand-lg navbar-light">
				<div className="nav-item pl-3">
					<a className="navbar-brand" href={userRedirect}>
				    {/*image goes here (svg)*/}
				    PING
				  </a>  
				</div>
				<div className="nav-item">
					 <div className="collapse navbar-collapse">
				  	{this.renderNavItems()}
					</div>
				</div>
			  
			 
			</nav>
		)
	}
}

export default Nav