!function($){
    $(document).ready(function() {
		
		var $dylay = jQuery('#dylay');
		
		var couleurs = ["rgba(219,56,92, 0.6)", "rgba(104,197,255, 0.6)", "rgba(151,90,193, 0.6)", "rgba(193,70,136, 0.6)", "rgba(168,123,187, 0.6)", "rgba(41,186,116, 0.6)", "rgba(148,189,36, 0.6)", "rgba(240,61,44, 0.6)", "rgba(56,155,217, 0.6)", "rgba(32,187,185, 0.6)", "rgba(255,100,7, 0.6)", "rgba(255,49,66, 0.6)", "rgba(255,156,0, 0.6)", "rgba(244,71,164, 0.6)", "rgba(32,187,185, 0.6)", "rgba(76,180,65, 0.6)", "rgba(57,99,214, 0.6)", "rgba(37,139,116, 0.6)", "rgba(120,101,227, 0.6)", "rgba(255,180,0, 0.6)", "rgba(32,169,255, 0.6)"];
		$('>div>span', $dylay).each(function() {
			$(this).css('background-color', couleurs[Math.floor(Math.random() * couleurs.length)]);
		});
		
		$dylay.dylay({
			speed: 1500,
			selector : '>div',
			easing: 'easeOutElastic'
		});
				
		$('#filters a').on('click', function () {
			$dylay.dylay('filter', $(this).data('filter'));	
			return false;
		});

		$('#sorts a').on('click', function () {
			$dylay.dylay('sort', $(this).data('sort-by'), jQuery(this).data('sort-way'));	
			return false;
		});
    	
    });
}(window.jQuery);
