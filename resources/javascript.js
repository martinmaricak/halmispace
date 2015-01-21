(function(){

	"use strict";

	//
	//  carousels intervals and disabled the keyboard support
	//

	$(document).ready(function(){

		$('#backgroundCarousel').carousel({
			interval: 10000000, // TODO just one slide for now
			keyboard : false
		});


		$('#partnersCarousel').carousel({
			interval: 4000,
			keyboard : false
		});

	});

})();


/*

 2/ Potom mas screen z tabletu na landscape mode. Je to rozhadzane... da sa s tym nieco spravit? Napriklad ja neviem, donutit ten web, aby ked je taka mala obrazovna nabehol na scrolldown? Alebo nieco take. Vies nieco take ako minimalna vyska a ked nie, tak hodi scroll alebo ja neviem ako sa to robi :D daj mi feedback na to ty.

*/


(function(){

	"use strict";

	//
	//  toggle popups from pricing dialog to the partners dialog
	//

	var pricingDialog = $("#pricingDialog");
	var partnersModal = $("#partnersModal");

	function toggle(){
		pricingDialog.modal("toggle");
		partnersModal.modal("toggle");
	}

	$("#pricingDialog button").on("click", toggle);



})();



(function(){

	"use strict";

	//
	//  deep linking for tracking google analytics
	//  requested by michael, should not be also standard deep linking
	//

	function setDeeplinking(event){
		window.location.hash = $(event.target).data("target");
	}

	function clearDeeplinking(event){
		window.location.hash = "";
	}

	$("nav .menu").on("click", setDeeplinking);
	$("#try").on("click", setDeeplinking);

	$('#pricingDialog').on('hidden.bs.modal', clearDeeplinking);
	$('#partnersModal').on('hidden.bs.modal', clearDeeplinking);
	$('#contactDialog').on('hidden.bs.modal', clearDeeplinking);


})();



(function(){

	"use strict";

	//
	//  sending emails via the rest api
	//


	$("#form1").on("click", function(){
		sendContent(
			$("#formName1")[0].value,
			$("#formEmail1")[0].value,
			$("#formNote1")[0].value
		);
	});

	$("#form2").on("click", function(){
		sendContent(
			$("#formName2")[0].value,
			$("#formEmail2")[0].value,
			$("#formNote2")[0].value
		);
	});

	function sendContent(name, email, note){

		var EMAIL_RECIPIENT = "samuel@ondrek.com";
		var NAME_RECIPIENT = "HalmiSpace";

		if (!email){
			email = "samuel@ondrek.com";
		}

		if (!note){
			note = ":( Uchádzač neposlal žiadnu poznámku.";
		}

		if (!name){
			name = "Uchádzač";
		}

		var toParam = {
			"email": EMAIL_RECIPIENT,
			"name": NAME_RECIPIENT,
			"type": "to"
		};

		var message = "";
		message += "Uchádzač: " + name + "<br/>";
		message += "Email: " + email + "<br/>";
		message += "Poznámka: " + note + "<br/>";


		var messageParam = {
			"from_email": email,
			"to": [toParam],
			"autotext": "true",
			"subject": "HalmiSpace: Nový záujemca o podnájom!",
			"html": message
		};

		var opts = {
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			data: { "key": "9WZGkQuvFHBbuy-p8ZOPjQ",  "message": messageParam },
			type: "POST"
		};

		$.ajax(opts).done(function() {
			$("#partnersModal").modal("hide");
		});

	}


})();