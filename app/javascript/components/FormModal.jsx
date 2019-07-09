import React from "react"

class FormModal extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		
		return (
			<div className="modal" id="formModalCenter" tabIndex="-1" role="dialog" aria-labelledby="formModalCenterTitle" aria-hidden="true">
			  <div className="modal-dialog modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="formModalCenterTitle">Error</h5>
			      </div>
			      <div className="modal-body">
			        {this.props.errorMessage}
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}

export default FormModal