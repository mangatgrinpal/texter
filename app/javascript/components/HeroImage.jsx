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
		var backgrounds = [ "https://s3-us-west-1.amazonaws.com/ginnysbucket/dev-images/girl-texting-edited.jpeg", "https://s3-us-west-1.amazonaws.com/ginnysbucket/dev-images/group-texting-edited.jpeg" ];
		var heroImage = $(".hero-image");
		let i = 0


		// sets hero-image to images in backgrounds array using i to access index
		function cycleImage(){
			heroImage.css({
				"background-image": "url(" + backgrounds[i] + ")"
			})
			// increment i to see next image
			i++;

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