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

	render () {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <a className="navbar-brand" href="#">
			    {/*image goes here (svg)*/}
			    Text Handler
			  </a>
			  <div className="collapse navbar-collapse">
				  <div className="navbar-nav">
				  	<a href="users/sign_up" className="nav-item nav-link">Sign Up</a>
				  	<a href="users/sign_in" className="nav-item nav-link">Log In</a>
				  	<a onClick={this.logOut} className="nav-item nav-link">Log Out</a>
				  	<a href="/dashboard" className="nav-item nav-link">Dashboard</a>
				  </div>
				</div>
			</nav>
		)
	}
}

export default Nav