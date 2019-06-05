import React from "react"
import MessageList from "./MessageList"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class MessageCenter extends React.Component {
	constructor(props) {
		super(props);
		this.autocomplete = this.autocomplete.bind(this)
		this.messageRecipients = this.messageRecipients.bind(this)
		this.state = {
			fullNames: []
		}
	}

	componentDidMount() {
		// create an array with the javascript object
		let contacts = this.props.userContacts
		let fullNames = Object.values(contacts).map((contact) => {
		    return (contact.first_name + " " + contact.last_name)
		})

		this.setState({fullNames: fullNames})

		let groups = this.props.userGroups
		let groupNames = Object.values(groups).map((group) => {
			return (group.nickname)
		})

		let fullNamesAndGroups = fullNames.concat(groupNames)
		
		this.autocomplete(document.getElementById("contactInput"), fullNamesAndGroups)

	}

	autocomplete(inp, arr) {
	  /*the autocomplete function takes two arguments,
	  the text field element and an array of possible autocompleted values:*/
	  var self = this;
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

	              // this currently only checks if a group's name is in the contact list,
	              // if it is not, it will use the add group function instead of add recipient

	              if (self.state.fullNames.includes(inp.value)) {
	              	self.props.addRecipient(e, inp.value)
	              } else {
	              	self.props.addGroup(e, inp.value)
	              }
	              
	              document.getElementById("contactInput").value = ""
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


	messageRecipients() {
		let recipients = this.props.recipients
		if (recipients.length == 0) {
			return (
				<div className="col-6">
					Add contacts above
				</div>
			)
		} else {

			let messageRecipients = this.props.recipients.map((recipient)=> {
				//using recipient.id in name attribute is bad. pls fix later	
				return (

					<div key={recipient.id} className="badge badge-primary mr-2 mt-2">
						{recipient.first_name} {recipient.last_name} &nbsp;
						<FontAwesomeIcon className="font-awesome-icon" data-id={recipient.id} onClick={this.props.deleteRecipient} icon="times" size="1x" />
					</div>

				)
			})

			return (
				<React.Fragment>

					<div className="col-6">
						{messageRecipients}
					</div>

				</React.Fragment>
			)
		}
	}
	

	render() {
		let textPreview
		if (this.props.message) {
			textPreview =
				<div className="col-md-4 col-sm-4 offset-md-1 offset-sm-1 speech-bubble p-2">
					@{this.props.currentUser.first_name}: {this.props.message}
				</div>
		} else {
			textPreview = <div />
		}
		
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
							<input id="contactInput" type="text" onChange={this.props.handleInputChange} className="form-control" name="recipient" placeholder="Add contacts here" />
						</div>
						<button onClick={this.props.addRecipient} className="btn btn-primary">
							Add
						</button>
						
					</div>
					
					<div className="row">
					
						{this.messageRecipients()}
						<div className="col-6">
							<h5>Preview your text below before you send it.</h5>
						</div>
						
					</div>
					<br/>
					<div className="row">
						<div className="col-6">
							<small>Your name will be prefixed onto your message so your recipients will know who it is.</small>
							
							<textarea type="text" onChange={this.props.handleInputChange} className="form-control" name="message" placeholder={`@${this.props.currentUser.first_name}:`} />
							<span className="justify-content-end">{this.props.message.length + this.props.currentUser.first_name.length + 3}/160</span><br/>
							<small>The character limit above is the max length for a single text message and factors in your prefixed name. Anything over this limit will still be sent, but in multiple SMS messages.</small>
						</div>
						{textPreview}
					</div>
					<br/>
					<button onClick={this.props.sendMessage} className="btn btn-primary">Send Message</button>
				</form>
				<MessageList {...this.props}/>
			</div>
		)
	}
}

export default MessageCenter