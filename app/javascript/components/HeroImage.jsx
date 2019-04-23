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
				<div className="col-6">
					<div className="col hero-overlay"/>
					<div className="wrapper">
						<div className="col hero-text-overlay">
							<h1>Easily manage messaging large groups.</h1>
						</div>
					</div>
				</div>
				<div className="col-6">
					<h2>What are you waiting for?</h2>
					<button className="btn btn-primary">Get Started Now</button>
				</div>
			</div>
		)
	}
}

export default HeroImage