import React from "react"

// this component is the NavBar that will be seen on all pages
class Nav extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<nav className="navbar navbar-light bg-light">
			  <a className="navbar-brand" href="#">
			    {/*image goes here (svg)*/}
			    Text Handler
			  </a>
			</nav>
		)
	}
}

export default Nav