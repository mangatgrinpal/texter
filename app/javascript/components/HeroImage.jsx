import React from "react"

//this component is for the hero image and its content such as buttons/links
class HeroImage extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {

		return (
			<div className="row hero-image">
				<div className="col-6">
					<h1>Send Text Messages</h1>
				</div>
				<div className="col-6">
					<h2>Hello</h2>
					<button className="btn btn-primary">Get Started Now</button>
				</div>
			</div>
		)
	}
}

export default HeroImage