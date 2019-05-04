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
		var baseURL = "https://s3-us-west-1.amazonaws.com/ginnysbucket/dev-images/"
		var backgrounds = [ "girl-texting-edited.jpeg", "group-texting-edited.jpeg" ];
		var heroImage = $(".hero-image");
		let i = 0


		// sets hero-image to images in backgrounds array using i to access index
		function cycleImage(){
			// heroImage.fadeIn(1000);
			heroImage.css({
				"background-image": "url(" + baseURL + backgrounds[i] + ")"
			})
			
			
			// increment i to see next image

			i++;
			//heroImage.fadeOut(1000);
			// setTimeout( ()=> {
			// 	heroImage.removeClass("active")}, 5000)
			
			// until you reach an index outside of the array, then set i back to 0 to start over
			if (i == backgrounds.length) {
				i = 0;
			}
		}

		//setInterval takes in two arguments, the function and the time in milliseconds until its called again
		setInterval(cycleImage, 5000);
		cycleImage();
	}



	render () {

		return (
			<div className="row hero-image">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12 hero-overlay"/>
						<div className="col-md-6 offset-md-3 hero-text-overlay">
							<h1>Built with convenience in mind</h1>
							<h3>Click below to begin messaging</h3>
							<button className="btn btn-primary">Sign Up Free</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default HeroImage