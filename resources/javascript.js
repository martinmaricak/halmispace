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



(function(){

	"use strict";

	//
	//  toggle popups from pricing dialog to the partners dialog
	//

	var cennik = $("#cennik");
	var ponuka = $("#ponuka");

	function toggle(){
		cennik.modal("toggle");
		ponuka.modal("toggle");
	}

	$("#cennik button").on("click", toggle);



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

	$('#cennik').on('hidden.bs.modal', clearDeeplinking);
	$('#ponuka').on('hidden.bs.modal', clearDeeplinking);
	$('#kontakt').on('hidden.bs.modal', clearDeeplinking);


})();



(function(){

	"use strict";

	//
	//  sending emails via the rest api
	//


	$("#form1").on("click", function(e){
		e.preventDefault();
		sendContent(
			$("#formName1")[0].value,
			$("#formEmail1")[0].value,
			$("#formNote1")[0].value,
			$("#events1")[0].value,
			function(){
				$("#formName1").css("display", "none");
				$("#form1").css("display", "none");
				$("#formEmail1").css("display", "none");
				$("#formNote1").css("display", "none");
				$("#events1").css("display", "none");
				$(".events-align label").css("display", "none");
				$("#mobilethanks").css("display", "block");
			}
		);
	});

	$("#form2").on("click", function(e){
		e.preventDefault();
		sendContent(
			$("#formName2")[0].value,
			$("#formEmail2")[0].value,
			$("#formNote2")[0].value,
			$("#events2")[0].value
		);
	});

	function sendContent(name, email, note, newsletter, callback){

		var EMAIL_RECIPIENT = "samuel@ondrek.com"; // "pridajsa@halmispace.sk";
		var NAME_RECIPIENT = "HalmiSpace";
		var wantsReceiveEmail = "Áno, mám záujem dostávať newsletter.";

		if (!email){
			email = ":( Uchádzač nespokytol žiadny email.";
		}

		if (!note){
			note = ":( Uchádzač neposlal žiadnu poznámku.";
		}

		if (!name){
			name = "Uchádzač";
		}

		if (newsletter!=="on"){
			wantsReceiveEmail = "Nemám záujem dostávať newsletter.";
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
		message += "Newsletter: " + wantsReceiveEmail + "<br/>";


		var messageParam = {
			"from_email": email,
			"to": [toParam],
			"autotext": "true",
			"subject": "Uchádzač o coworking: " + name,
			"html": message
		};

		var opts = {
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			data: { "key": "9WZGkQuvFHBbuy-p8ZOPjQ",  "message": messageParam },
			type: "POST",
			crossDomain: true,
			success: function(msg){ console.info("success email message", msg[0]); },
			error : function(){ alert("Vyskytla sa chyba, kontaktuj nas na pridajsa@halmispace.sk!") }
		};

		$.ajax(opts).done(function(){
			$("#formName1")[0].value = "";
			$("#formEmail1")[0].value = "";
			$("#formNote1")[0].value = "";
			$("#formName2")[0].value = "";
			$("#formEmail2")[0].value = "";
			$("#formNote2")[0].value = "";
			$("#thanks").addClass("active");
			callback();
		});

	}


})();