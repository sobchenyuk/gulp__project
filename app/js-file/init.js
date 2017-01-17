(function($) {

	$('.item__botton').hover(
		function(){
			$(this).parents('.flex__item').addClass('flex__item_active');

			if($('flex__item_active')){
				var flexItemActive = document.querySelector(".flex__item_active").firstElementChild;
				flexItemActive.classList.add('flex__item_class');
			}
		},
		function(){
		  $(this).parents('.flex__item').removeClass('flex__item_active');

		  $('.flex__item_hover').removeClass('flex__item_class');
		});

	$('.botton__prise').hover(
		function(){
			$(this).parents('.price__descript').addClass('price__active');
		},
		function(){
			$(this).parents('.price__descript').removeClass('price__active');
		}
	);
	
	
}(jQuery));



(function($) {
	
	
	var menu =  $('#menu').offset();
	
	console.log(menu);
	
	$(window).scroll(function(){
		if($(this).scrollTop()>menu.top){
			//$('#menu').addClass('fixed');
			$(".menu").slideDown(100);
		}
		else if ($(this).scrollTop()<menu.top){
			//$('#menu').removeClass('fixed');
			$(".menu").slideUp(100);
		}
	});
}(jQuery));

(function () {
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true,
		/*centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false*/
    });
})();

(function () {
	var placeholderText,span,error;
	function validPattern(elem) {
		if(elem.value.length < 1){
			event.preventDefault();
			elem.classList.remove("invalid");
			elem.classList.remove("valid");
			elem.className += "invalid";
			span = document.createElement('span');
			span.className = "error";
			span.innerHTML = "Укажите "+placeholderText;
			placeholderText= elem.placeholder;
			span.innerHTML = "Укажите "+placeholderText;
			elem.parentNode.appendChild(span);
		}else{
			elem.classList.remove("invalid");
			elem.classList.remove("valid");
			elem.className = "valid";
		}
	}
	function testValid() {
		error = document.querySelectorAll('span.error');
		if(error){
			for(var i = 0;i< error.length; i++){
				error[i].parentNode.removeChild(error[i]);
			}
		}
		for(var i = 0;i< form.elements.length; i++) {
			if (form.elements[i].type == 'text') {
				validPattern(form.elements[i]);
			}
		}
	}
	form.addEventListener("submit", testValid, true )
})();


(function($) {
	
	$('.scrollto').bind( "click", function() {
		$('html, body').stop().animate({
			scrollTop: $("#block-1").offset().top //указать тот элемент к которому будет опускатся скролл
		}, 500);
		return false;
	});



		$("a.ancLinks").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html,body').animate( { scrollTop: destination }, 1100 );
			return false;
		});




	var arr =['#btn-2','#btn-1','.container__botton .botton','.block_06 .botton'];
	
	for (var i = 0, cnt = arr.length; i < cnt; i++){
		funcClick(arr[i]);	
	}

	function funcClick(bnt) {
		$(bnt).click( function(event){ // лoвим клик пo ссылки с id="go"
			event.preventDefault(); // выключaем стaндaртную рoль элементa
			$('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
				function(){ // пoсле выпoлнения предъидущей aнимaции
					$('#modal_form')
						.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
						.animate({opacity: 1, top: '40%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
				});
		});
		
	}
	
	/* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
	$('#modal_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function(){ // пoсле aнимaции
					$(this).css('display', 'none'); // делaем ему display: none;
					$('#overlay').fadeOut(400); // скрывaем пoдлoжку
				}
			);
	});


}(jQuery));