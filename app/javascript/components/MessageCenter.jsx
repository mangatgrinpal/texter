import React from "react"

class MessageCenter extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.messageRecipients = this.messageRecipients.bind(this)
		this.autocomplete = this.autocomplete.bind(this)
		this.addRecipient = this.addRecipient.bind(this)
		this.state = {
			contacts: [],
			contact: "",
			message: ""
		}
	}

	componentDidMount() {
		let csrfToken = document.getElementsByName('csrf-token')[0].content
		this.setState({csrfToken: csrfToken})


		this.autocomplete(document.getElementById("contactInput"), this.props.userContacts.map((contact)=>{
			return contact.first_name
		}))

	}

	autocomplete(inp, arr) {
	  /*the autocomplete function takes two arguments,
	  the text field element and an array of possible autocompleted values:*/
	  var currentFocus;
	  /*execute a function when someone writes in the text field:*/
	  inp.addEventListener("input", function(e) {
	      var a, b, i, val = this.value;
	      /*close any already open lists of autocompleted values*/
	      closeAllLists();
	      if (!val) { return false;}
	      currentFocus = -1;
	      /*create a DIV element that will contain the items (values):*/
	      a = document.createElement("DIV");
	      a.setAttribute("id", this.id + "autocomplete-list");
	      a.setAttribute("class", "autocomplete-items");
	      /*append the DIV element as a child of the autocomplete container:*/
	      this.parentNode.appendChild(a);
	      /*for each item in the array...*/
	      for (i = 0; i < arr.length; i++) {
	        /*check if the item starts with the same letters as the text field value:*/
	        
	        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
	          /*create a DIV element for each matching element:*/
	          b = document.createElement("DIV");
	          /*make the matching letters bold:*/
	          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
	          b.innerHTML += arr[i].substr(val.length);
	          /*insert a input field that will hold the current array item's value:*/
	          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
	          /*execute a function when someone clicks on the item value (DIV element):*/
	              b.addEventListener("click", function(e) {
	              /*insert the value for the autocomplete text field:*/
	              inp.value = this.getElementsByTagName("input")[0].value;
	              /*close the list of autocompleted values,
	              (or any other open lists of autocompleted values:*/
	              closeAllLists();
	          });
	          a.appendChild(b);
	        }
	      }
	  });
	  /*execute a function presses a key on the keyboard:*/
	  inp.addEventListener("keydown", function(e) {
	      var x = document.getElementById(this.id + "autocomplete-list");
	      if (x) x = x.getElementsByTagName("div");
	      if (e.keyCode == 40) {
	        /*If the arrow DOWN key is pressed,
	        increase the currentFocus variable:*/
	        currentFocus++;
	        /*and and make the current item more visible:*/
	        addActive(x);
	      } else if (e.keyCode == 38) { //up
	        /*If the arrow UP key is pressed,
	        decrease the currentFocus variable:*/
	        currentFocus--;
	        /*and and make the current item more visible:*/
	        addActive(x);
	      } else if (e.keyCode == 13) {
	        /*If the ENTER key is pressed, prevent the form from being submitted,*/
	        e.preventDefault();
	        if (currentFocus > -1) {
	          /*and simulate a click on the "active" item:*/
	          if (x) x[currentFocus].click();
	        }
	      }
	  });
	  function addActive(x) {
	    /*a function to classify an item as "active":*/
	    if (!x) return false;
	    /*start by removing the "active" class on all items:*/
	    removeActive(x);
	    if (currentFocus >= x.length) currentFocus = 0;
	    if (currentFocus < 0) currentFocus = (x.length - 1);
	    /*add class "autocomplete-active":*/
	    x[currentFocus].classList.add("autocomplete-active");
	  }
	  function removeActive(x) {
	    /*a function to remove the "active" class from all autocomplete items:*/
	    for (var i = 0; i < x.length; i++) {
	      x[i].classList.remove("autocomplete-active");
	    }
	  }
	  function closeAllLists(elmnt) {
	    /*close all autocomplete lists in the document,
	    except the one passed as an argument:*/
	    var x = document.getElementsByClassName("autocomplete-items");
	    for (var i = 0; i < x.length; i++) {
	      if (elmnt != x[i] && elmnt != inp) {
	      x[i].parentNode.removeChild(x[i]);
	    }
	  }
	}
		/*execute a function when someone clicks in the document:*/
		document.addEventListener("click", function (e) {
		    closeAllLists(e.target);
		});
	}

	handleInputChange(e) {
		const target = e.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		})

	}

	messageRecipients() {
		let recipients = this.state.contacts
		if (recipients.length == 0) {
			return (
				<div className="col-6">
					Add contacts above
				</div>
			)
		} else {
			debugger
			let messageRecipients = this.state.contacts.map((recipient)=> {
				return (
					<div className="badge badge-primary">
						{recipient.first_name} {recipient.last_name}
					</div>
				)
			})
		}

		return (
			<div>
				{messageRecipients}
			</div>
		)
	}

	sendMessage(e) {
		e.preventDefault()
		fetch("messages/", {
			method: "POST",
			body: JSON.stringify({message: {body: this.state.message }, contact: this.state.contact }),
			headers: {
				"X-CSRF-Token": this.state.csrfToken,
				"Content-Type": "application/json"
			}
		})
		.then( (res) => { return res.json() } )
		.then( (data) => console.log(data) )
	}

	addRecipient(e) {
		e.preventDefault()
		this.setState({contacts: this.state.contacts << this.state.contact, contact: ""})
	}

	render() {
		
		return (
			<div className="col-12">
				<div className="row">
					<div className="col">
						<h3>Send a message</h3>
					</div>
				</div>
				<form autoComplete="off">
					<div className="row">
						<div className="col-6 autocomplete">
							<input id="contactInput" type="text" onChange={this.handleInputChange} value={this.state.contact} className="form-control" name="contact" placeholder="Add contacts here" />
						</div>
						<button onClick={this.addRecipient} className="btn btn-primary">
							Add
						</button>
					</div>
					
					<div className="row">
						<div className="col-12">
							{this.messageRecipients()}
						</div>
					</div>
					<br/>
					<div className="row">
						<div className="col-6">
							<textarea type="text" onChange={this.handleInputChange} className="form-control" name="message" placeholder="Message goes here" />
						</div>
					</div>
					<br/>
					<button onClick={this.sendMessage} className="btn btn-primary">Send Message</button>
				</form>
				<div>
					render sent messages here
				</div>
			</div>
		)
	}
}

export default MessageCenter