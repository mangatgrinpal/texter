import React from "react"
import HeroImage from "./HeroImage"
import HomeDescription from "./HomeDescription"
import Footer from "./Footer"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"




library.add(fas)

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {

		return (
			<div className="container-fluid">
				
				<HeroImage currentUser={this.props.currentUser}/>
				
				
				<HomeDescription />

				<Footer />
				
			</div>
		)
	}
}

export default Home