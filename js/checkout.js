
// Exercise 6
function validate() {
	let error = 0;
	
	let fName = document.getElementById("fName");
	let fLastN = document.getElementById("fLastN");
	let fEmail = document.getElementById("fEmail");
	let fPassword = document.getElementById("fPassword");
	let fAddress = document.getElementById("fAddress");
	let fPhone = document.getElementById("fPhone");

	let errorName = document.getElementById("errorName");
	let errorLastN = document.getElementById("errorLastN");  
	let errorEmail = document.getElementById("errorEmail"); 
	let errorPassword = document.getElementById("errorPassword");  
	let errorAddress = document.getElementById("errorAddress");
	let errorPhone = document.getElementById("errorPhone");    
	
	let regExLetras = /^[a-zA-ZÀ-ÿ]+$/;
	let regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	let regExPassword = /^(?=.*[a-zA-Z])(?=.*\d).{4,8}$/
	let regExAddress = /^[a-zA-Z0-9ªº/ ]+$/;
	let regExPhone = /^\d{9}$/;


	if (fName.value.length < 3 || !regExLetras.test(fName.value)) {

		error++;
		fName.classList.add("is-invalid"); 
		errorName.innerHTML = "Aquest camp és obligatori i només ha de contenir lletres amb almenys 3 caràcters";
	}
	else {

		 fName.classList.remove("is-invalid");
		 errorName.innerHTML = "";
	}

	if (fLastN.value.length < 3 || !regExLetras.test(fLastN.value)) {

		error++;
		fLastN.classList.add("is-invalid"); 
		errorLastN.innerHTML = "Aquest camp és obligatori i només ha de contenir lletres amb almenys 3 caràcters";
	}
	else {

		fLastN.classList.remove("is-invalid");
		errorLastN.innerHTML = "";
	}

	if (fEmail.value.length < 3 || !regExEmail.test(fEmail.value)) {

		error++;
		fEmail.classList.add("is-invalid"); 
		errorEmail.innerHTML = "Aquest camp és obligatori i ha de ser una adreça de correu electrònic vàlida";
	}
	else {

		fEmail.classList.remove("is-invalid");
		errorEmail.innerHTML = "";
	}

	if (fPassword.value.length < 3 || !regExPassword.test(fPassword.value)) {

		error++;
		fPassword.classList.add("is-invalid"); 
		errorPassword.innerHTML = "Aquest camp és obligatori i ha de contenir almenys 3 caràcters";
	}
	else {

		fPassword.classList.remove("is-invalid");
		errorPassword.innerHTML = "";
	}

	if (fAddress.value.length < 3 || !regExAddress.test(fAddress.value)) {

		error++;
		fAddress.classList.add("is-invalid"); 
		errorAddress.innerHTML = "Aquest camp és obligatori i ha de contenir almenys 3 caràcters";
	}
	else {

		fAddress.classList.remove("is-invalid");
		errorAddress.innerHTML = "";
	}

	if (fPhone.value.length < 3 || !regExPhone.test(fPhone.value)) {

		error++;
		fPhone.classList.add("is-invalid"); 
		errorPhone.innerHTML = "Aquest camp és obligatori i només pot contenir 9 xifres";
	}
	else {

		fPhone.classList.remove("is-invalid");
		errorPhone.innerHTML = "";
	}


	 
	if(error>0){
		alert("Error");
	}else{
		alert("La vostra comanda s'ha realitzat correctament");
	}

}
