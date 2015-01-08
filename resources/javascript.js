(function(){

	"use strict";

	$(document).ready(function(){

		$('#backgroundCarousel').carousel({
			interval: 10000,
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

	var pricingDialog = $("#pricingDialog");
	var partnersModal = $("#partnersModal");

	function toggle(){
		pricingDialog.modal("toggle");
		partnersModal.modal("toggle");
	}

	$("#pricingDialog button").on("click", toggle);

})();

