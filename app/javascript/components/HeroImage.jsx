import React from "react"


//this component is for the hero image and its content such as buttons/links
class HeroImage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.changeBackground()
	}


	//function that changes hero-image every few seconds
	changeBackground() {
		let baseURL = "https://s3-us-west-1.amazonaws.com/ginnysbucket/dev-images/"
		let backgrounds = [ "girl-texting-edited.jpeg", "group-texting-edited.jpeg", "texting-lady-edited.jpeg" ];
		let heroImage = document.getElementById("hero-image")
		let i = 0


		// sets hero-image to images in backgrounds array using i to access index
		function slideShow() {
			heroImage.className += " fadeOut";
			setTimeout(()=> {
				heroImage.style.backgroundImage = "url(" + baseURL + backgrounds[i] + ")";

				heroImage.className = "row";
			}, 1000)
			i++;
			if (i == backgrounds.length) { i = 0; }
			setTimeout(slideShow, 5000);
		}
		slideShow();
	}

	goSignUp() {
		window.location.href = "/users/sign_up"
	}



	render () {

		let instruction, button
		if (!this.props.currentUser) {
			instruction = "Click below to begin messaging"
			button = <button onClick={this.goSignUp} className="btn btn-primary">Sign Up Free</button>
		} 

		return (
			<React.Fragment>
				<div className="row" id="hero-image" />
				<div className="row hero-image">
					<div className="col-md-12">
						<div className="row">

							<div className="col-md-12 hero-overlay"/>
							
							<div className="col-md-6 offset-md-3 hero-text-overlay">
								<h1>Built with convenience in mind</h1>
								<h3>{instruction}</h3>
								{button}
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
			
		)
	}
}

export default HeroImage