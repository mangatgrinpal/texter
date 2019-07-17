import React from "react"

const Footer = () => {

	return (
		<React.Fragment>
			<div className="row footer">
				<div className="col-md-12 col-sm-12">
					<div className="row links">
						<div className="col-md-6 col-sm-6 py-5 text-center py-auto">
							<p>Stay connected and reach your clients today</p>
						</div>
						<div className="col-md-6 col-sm-6 py-5">
							<ul>
								<li className="py-1">
									<a href="/users/sign_up">Sign up now</a>
								</li>
								<li className="py-1">
									<a href="/users/sign_in">Sign in</a>
								</li>
								<li className="py-1">
									<a href="/terms">Terms & Conditions</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row copyright">
						<div className="col-md-12 col-sm-12 text-center py-3">
							&copy; {new Date().getFullYear()} Copyright: <a href="/"> PING </a>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Footer