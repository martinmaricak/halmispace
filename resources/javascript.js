(function(){

	"use strict";

	$(document).ready(function(){

		$('#carousel').carousel({
			interval: 10000,
			keyboard : false
		});


		$('#partnersCarousel').carousel({
			interval: 3000,
			keyboard : false
		});


	});

})();


(function(){

	"use strict";

	$("#pricingDialog button").on("click", function(){
		$("#pricingDialog").modal("toggle");
		$("#partnersModal").modal("toggle");
	});

	$("#pricingDialog a").on("click", function(){
		$("#pricingDialog").modal("toggle");
		$("#partnersModal").modal("toggle");
	});

})();

