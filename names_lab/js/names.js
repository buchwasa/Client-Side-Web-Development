// This script concatenates two strings together to format a name.

// Function called when the form is submitted.
// Function formats the text and returns false.
function formatNames() {
	let formattedName;
	let origFirstName = document.getElementById("firstName").value;
	let origLastName = document.getElementById("lastName").value;
	let uFirst = origFirstName.charAt(0).toUpperCase();
	let uLast = origLastName.charAt(0).toUpperCase();

	let firstName = uFirst + origFirstName.slice(1);
	let lastName = uLast + origLastName.slice(1);

	formattedName = lastName + ", " + firstName;
	document.getElementById("result").value = formattedName;
	
	return false;
} 

function init() {
   if (document && document.getElementById) {
      document.getElementById('theForm').onsubmit = formatNames;
   }
}

window.onload = init;
