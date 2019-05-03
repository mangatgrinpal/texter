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
			  	<a href="/dashboard" className="nav-item nav-link">Dashboard</a>
			  	<a href="javascript:void(0)" onClick={this.logOut} className="nav-item nav-link">Log Out</a>
			  </div>
			)
		}

		if (currentPage == "/dashboard" && this.props.currentUser) {
			return (
				<div className="navbar-nav">
			  	<a onClick={this.logOut} className="nav-item nav-link">Log Out</a>
			  </div>
			)
		}

		else {
			return (
				<div className="navbar-nav">			  	
			  	<button className="nav-item nav-link">Log In</button>
			  	<button className="nav-item nav-link">Sign Up Free</button>
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
				    Ping
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