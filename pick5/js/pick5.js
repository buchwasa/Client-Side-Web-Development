function pick5() {
	'use strict';

	for (let i = 1; i <= 5; ++i) {
		document.getElementById("result" + i.toString()).value = Math.floor(Math.random() * 10);
	}
} 

function init() {
	'use strict';
	document.getElementById('generate').onclick = pick5;
} 
window.onload = init;