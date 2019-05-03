import React from "react"
import HeroImage from "./HeroImage"
import HomeDescription from "./HomeDescription"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { faSms } from "@fortawesome/free-solid-svg-icons"


library.add(fas, faSms)

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