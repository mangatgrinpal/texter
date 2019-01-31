import React from "react"

// this component is the NavBar that will be seen on all pages
class Nav extends React.Component {
	constructor(props) {
		super(props);
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
				  	<a className="nav-item nav-link">Sign Up</a>
				  	<a className="nav-item nav-link">Log In</a>
				  </div>
				</div>
			</nav>
		)
	}
}

export default Nav