import React from "react"

// this component is the NavBar that will be seen on all pages
class Nav extends React.Component {
	constructor(props) {
		super(props);
	}

	logOut () {
		$.ajax("/users/sign_out", {
				dataType: "JSON",
				type: "DELETE",
				success: ()=> {
					alert("You've been successfully logged out.")
					var pathname = window.location.pathname
					if (pathname === "/dashboard") {
						window.location.replace("/")
					}
					else {
						window.location.reload()
					}
				}
		});
	}

	

	renderNavItems() {
		let currentPage = window.location.pathname
		// when the user is logged in
		if (currentPage == "/" && this.props.currentUser) {
			return (
				<div className="navbar-nav">
			  	<button className="dash-button btn btn-primary nav-item">Dashboard</button>
			  	&nbsp;
			  	<button onClick={this.logOut} className="log-out btn nav-item">Log Out</button>
			  </div>
			)
		}

		if (currentPage == "/dashboard" && this.props.currentUser) {
			return (
				<div className="navbar-nav">
			  	<button onClick={this.logOut} className="log-out btn nav-item">Log Out</button>
			  </div>
			)
		}

		else {
			return (
				<div className="navbar-nav">			  	
			  	<button className="btn log-in nav-item">Log In</button>
			  	&nbsp;
			  	<button className="sign-up btn btn-primary nav-item">Sign Up Free</button>
			  </div>
			)
		}
	}

	render () {

		return (
			<nav className="navbar justify-content-between navbar-expand-lg navbar-light">
				<div className="nav-item">
					<a className="navbar-brand" href="/">
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