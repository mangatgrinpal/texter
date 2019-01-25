import React from "react"
import HeroImage from "./HeroImage"
import HomeDescription from "./HomeDescription"

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {

		return (
			<div className="container-fluid">
				
				<HeroImage/>
				
				
				<HomeDescription/>

			</div>
		)
	}
}

export default Home