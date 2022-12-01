/* 사이트맵 - 기존 사이트맵 부분을 function sitemap으로 묶고 일부 삭제 후 최상단에 이동했습니다. 호출은 Line225, Line582에 날짜주석 붙여 추가했습니다 - 200602*/
function sitemap(){	
	var current = $('.common-header .depth-1 > li.active').index();
	$('.common-header .icon-menu a').on('click', function(){
		$('.dim').fadeIn(200).css('z-index', 12); /* 200602 수정 */
		$('html').addClass('no-scroll');
		$('.sitemap').addClass('on');
		if($(window).outerWidth(true) <= 940 && current >= 0) {
			/* 200602 삭제 var opened = $('.sitemap .depth-1 > li').eq(current).offset().top; */
			$('.sitemap .depth-1 > li').eq(current).addClass('active');
			$('.sitemap .depth-1 > li').eq(current).find('.depth-2').show();
			/* 200602 삭제 $('.sitemap .gnav').scrollTop($('.sitemap .gnav')[0].scrollHeight);*/
		}
	});
	$('.sitemap .btn-close').on('click', function(){
		$('.dim').delay(200).fadeOut(200).css('z-index', 8); /* 200602 수정 */
		$('html').removeClass('no-scroll');
		$('.sitemap').removeClass('on');
		if ($(window).outerWidth(true) <= 940) {
			$('.sitemap .depth-1 > li.active').removeClass();
			$('.sitemap .depth-2').hide();
			$('.sitemap .depth-1 > li.active').find('.depth-2').hide();
		}
	});
	/* if($(window).outerWidth(true) <= 940) { if문 click 이벤트 안쪽으로 이동 200602 */
		$('.sitemap .depth-1 > li').on('click', function(){
			if($(window).outerWidth(true) <= 940){
				$('.sitemap .depth-2:visible').hide();
				$(this).find('.depth-2').show();
				/* 200602 삭제
				var menuH = $('.sitemap .depth-1 > li').outerHeight();
				if ($(this).index() == 0){
					var open = 0;
				}else {
					var open = menuH * ($(this).index() + 1);
				}
				$('.sitemap .gnav').scrollTop(open); */
				$('.sitemap .depth-1 > li.active').not($(this)).removeClass('active');
				$(this).addClass('active');
			}
		});
	/* }if문 click 이벤트 안쪽으로 이동 200602 */
}

/* File Attach */
function fileUpload(){
	var uploadFile = $('.file-attach input[type="file"]');
	uploadFile.off("change").on('change', function(){
		if(window.FileReader){
			if($(this)[0].files[0] != null && typeof $(this)[0].files[0] != 'undefined'){
				var filename = $(this)[0].files[0].name;
			} else {
				var filename = "";
			}
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		
		if("pdf" == $(this).attr("data-type")){
			if (!filename.toLowerCase().match(/.(pdf)$/i)) {
				$('.pop-confirm').dialog('close');
				alertPop("등록가능한 파일 확장자는 pdf입니다.");
				$(this).val("");
				$(this).prev().find('.file-name .placeholder').hide();
				$(this).prev().find('.file-name .text').text(filename);
				$("#"+$(this).attr("data-deleteId")+'_'+$(this).attr("data-seq")).remove();
				return false;
			}
			
			var nMaxImageSize = 30*1024*1024;
			var size = $(this)[0].files[0].size;
			if(nMaxImageSize < size){
				alertPop("등록가능한 파일 사이즈는 30MB입니다.");
				$(this).val("");
				return false;
			}
		} else if("zip" == $(this).attr("data-type")){
			if (!filename.toLowerCase().match(/.(zip)$/i)) {
				$('.pop-confirm').dialog('close');
				alertPop("등록가능한 파일 확장자는 zip입니다.");
				$(this).val("");
				$(this).prev().find('.file-name .placeholder').hide();
				$(this).prev().find('.file-name .text').text(filename);
				$("#"+$(this).attr("data-deleteId")+'_'+$(this).attr("data-seq")).remove();
				return false;
			}
			
			var nMaxImageSize = 30*1024*1024;
			var size = $(this)[0].files[0].size;
			if(nMaxImageSize < size){
				alertPop("등록가능한 파일 사이즈는 30MB입니다.");
				$(this).val("");
				return false;
			}
			
		} else if("zip|hwp|docx|pdf" == $(this).attr("data-type")){
			if (!filename.toLowerCase().match(/.(zip|hwp|docx|pdf)$/i)) {
				$('.pop-confirm').dialog('close');
				alertPop("등록가능한 파일 확장자는 zip, hwp, docx, pdf입니다.");
				$(this).val("");
				$(this).prev().find('.file-name .placeholder').hide();
				$(this).prev().find('.file-name .text').text(filename);
				$("#"+$(this).attr("data-deleteId")+'_'+$(this).attr("data-seq")).remove();
				return false;
			}
			
			var nMaxImageSize = 30*1024*1024;
			var size = $(this)[0].files[0].size;
			if(nMaxImageSize < size){
				alertPop("등록가능한 파일 사이즈는 30MB입니다.");
				$(this).val("");
				return false;
			}
		} else if("image" == $(this).attr("data-type")){
			if (!filename.toLowerCase().match(/(\.|\/)(gif|jpe?g|png)$/i)) {
				$('.pop-confirm').dialog('close');
				alertPop("등록가능한 파일 확장자는 gif, jpg, jpeg, png입니다.");
				$(this).val("");
				$(this).prev().find('.file-name .placeholder').hide();
				$(this).prev().find('.file-name .text').text(filename);
				$("#"+$(this).attr("data-deleteId")+'_'+$(this).attr("data-seq")).remove();
				return false;
			}
			
			var nMaxImageSize = 30*1024*1024;
			var size = $(this)[0].files[0].size;
			if(nMaxImageSize < size){
				alertPop("등록가능한 파일 사이즈는 30MB입니다.");
				$(this).val("");
				return false;
			}
		}
		
		/**
		 * 파일 업로드시 삭제 버튼 추가
		 **/
		if("" != $(this).attr("data-deleteId") && typeof $(this).attr("data-deleteId") != "undefined"){
			$("#"+$(this).attr("data-deleteId")+'_'+$(this).attr("data-seq")).remove();
			var html = '<a href="javascript:;" id="'+$(this).attr("data-deleteId")+'_'+$(this).attr("data-seq")+'" data-saveFileName="" data-saveFilePath="" data-seq="" class="btn-del">삭제</a>';
			$(this).prev().find('.file-name').after(html);
			eventReset();
		}
		
		$(this).prev().find('.file-name .placeholder').hide();
		$(this).prev().find('.file-name .text').text(filename);
	});
}

/* 이메일 셀렉트 */
function domainSelect(target){
	var domainInput = $(target).prev().find('.domain-input');
	if ($(target).val() == '직접 입력') {
		domainInput.val('').focus();
	} else {
		domainInput.val($(target).val());
	}
}

/* 헤더 및 퀵메뉴 fixed */
function sticky(){
	var headerH = $('.header-wrap').outerHeight(true);
	var headerTop = $('.header-wrap').offset().top;
	$(window).on('scroll', function(){
		$('.quick-menu').fadeIn(200);
		var scrollTop = $(this).scrollTop();
		if (scrollTop > headerTop){
			$('.common-header').addClass('stuck');
		}else if (scrollTop <= headerTop) {
			$('.common-header').removeClass('stuck');
		}
	});
}

/* 레이어팝업 */
function closePop(event){
	$(event).closest('.pop-contents').dialog('close').remove();
	$('html, body').css({'overflow':'auto', 'height': '100%'});   // scroll hidden 해제
	$('#element').off('scroll touchmove mousewheel');    //터치무브 및 마우스 휠 스크롤 가능
}

function resizePop(maxWidth){
	var lastDialog = $('.ui-dialog').eq($('.ui-dialog').length - 1);
	lastDialog.css({
		'max-width': maxWidth,
		'left': '50%',
		'transform': 'translateX(-50%)', /* 20200616 수정 */
	});
}

function positionPop(){
	var scrollTop = $(window).scrollTop();
	var windowH = $(window).innerHeight();
	var contentH = $('.ui-dialog').innerHeight();
	if ( contentH >= windowH ){
		$('.ui-dialog').css('top', scrollTop);
	}else {
		$('.ui-dialog').css('top', scrollTop + ((windowH - contentH) / 2));
	}
}
function alertPop(msg, fn){ //alert 형태 팝업
	$('html, body').css({'overflow':'hidden', 'height': '100%'});  // 모델팝업 중 html,body의 scroll을 hidden 시킴
	$('#element').on('scroll touchmove mousewheel', function(event){  //터치무브와 마우스휠 스크롤 방지
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	$('body').append('<div class="pop-alert"></div>');
	$('.pop-alert').dialog({
		classes: {
			'ui-dialog': 'alert'
		}, 
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: '90%',
		buttons: {
			'확인': function(){
				if(fn){
					fn();
				} else {
					$(this).closest('.pop-alert').dialog('close');
				}
			}
		},
		show: { effect: "fadeIn", duration: 300 },
		open: function(){
			$(this).parent().children().children('.ui-dialog-titlebar-close').hide();
			$(this).append(msg);
			resizePop('400px');
		},
		close: function(){
			$(this).closest('.pop-alert').remove();
			$('html, body').css({'overflow':'auto', 'height': '100%'});   // scroll hidden 해제
			$('#element').off('scroll touchmove mousewheel');    //터치무브 및 마우스 휠 스크롤 가능
		}
	}).dialog('open');
}

function foo(){ //dummy function
	alert('확인');
}

function confirmPop(msg, fn){ //confirm 형태 팝업
	$('html, body').css({'overflow':'hidden', 'height': '100%'});  // 모델팝업 중 html,body의 scroll을 hidden 시킴
	$('#element').on('scroll touchmove mousewheel', function(event){  //터치무브와 마우스휠 스크롤 방지
		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$('body').append('<div class="pop-confirm"></div>');
	$('.pop-confirm').dialog({
		classes: {
			'ui-dialog': 'confirm'
		},
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: '90%',
		show: { effect: "fadeIn", duration: 300 },
		buttons: {
			'취소': function(){
				$(this).closest('.pop-confirm').dialog('close');
			},
			'확인': function(){
				if (fn) {
					fn();
				}else {
					$(this).closest('.pop-confirm').remove();
				}
			}				
		},
		open: function(){
			$(this).append(msg);
			resizePop('400px');
		},
		close: function(){
			$(this).closest('.pop-confirm').remove();
			$('html, body').css({'overflow':'auto', 'height': '100%'});   // scroll hidden 해제
			$('#element').off('scroll touchmove mousewheel');    //터치무브 및 마우스 휠 스크롤 가능
		}
	}).dialog('open');
}

function contentPop(w, url){
	$('.pop-contents').hide(); /* 200928 추가 */
	$('#loading').show(); /* 200928 추가 */
	$('html').addClass('no-scroll'); //scroll hidden - 200924 추가
//	$('html, body').css({'overflow':'hidden', 'height': '100%'});  // 모델팝업 중 html,body의 scroll을 hidden 시킴
	$('#element').on('scroll touchmove mousewheel', function(event){  //터치무브와 마우스휠 스크롤 방지
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	
	$('body').append('<div class="pop-contents"></div>');
	$('.pop-contents').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		classes: {
			'ui-dialog': 'content'
		},
		width: '90%',
		show: { effect: "fadeIn", duration: 200, delay: 100 }, /* 200616 수정 */
		open: function(){
			$(this).load(url, function(){
				var img = $(this).find('img').length;
				if (img > 0){
					/* console.log(img); 200616 삭제*/
					$('img').on('load', function(){
						resizePop(w);
						positionPop();
					});
				}else {
					resizePop(w);
					positionPop();
				}

				$('.pop-contents .textarea textarea').overlayScrollbars({});

				/*200528 추가*/
				$('.terms .field-inner').overlayScrollbars({});
				/**/

				$('.pop-contents input.date').datepicker({
					dateFormat : 'yy-mm-dd',
					dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
				});
				
				$('.pop-contents').show(); /* 200928 추가 */
				$('#loading').hide(); /* 200928 추가 */
			});
		},
		close: function(){
			$(this).closest('.pop-contents').remove();
			$('html').removeClass('no-scroll'); // scroll hidden 해제 - 200924 추가
//			$('html, body').css({'overflow':'auto', 'height': '100%'});   // scroll hidden 해제
			$('#element').off('scroll touchmove mousewheel');    //터치무브 및 마우스 휠 스크롤 가능
		}
	}).dialog('open');
}

/* 200528 추가 */
function pastTerms(url, ver){
	var loadTxt = url + ' #' + ver.value;
	$('.terms .field').load(loadTxt, function(){
		$('.terms .field-inner').overlayScrollbars({}); //20200623 개발추가
	});
	
}
/**/

$(function(){
	sitemap(); 	/* 200602 추가 */
	setTimeout(function() {
		AOS.init({
			duration: 600
		});
	}, 200);

	if ($('.common-header').length > 0){
		sticky();
	}

	/* 셀렉트박스 */
	$(document).on('change', 'select', function(){
		$(this).addClass('selected');
	});
	$(document).on('focusout', 'select', function(){
		$(this).removeClass('selected');
	});

	/* textarea 스크롤 */
	$('.textarea textarea').overlayScrollbars({});
	$('.textarea .text').overlayScrollbars({});

	/* 파일첨부 파일명 삭제 */
	$('.file-attach .btn-del').on('click', function(){
		$(this).prev().find('.text').empty();
		$(this).prev().find('.placeholder').show();
	});

	/* 헤더 검색 */
	$('.icon-search a').on('click', function(){
		$('.dim').fadeIn(200);
		$('.search-bar').fadeIn(100);
		$('.common-header').css({'background-color': '#fff', 'z-index': 12,}); /* 200616 수정 */				
		if ($(window).outerWidth(true) >= 940){
			$('.icon-search-close').addClass('on');
			$(this).parent().hide();
		}else {
			$('.common-header >.inner').hide();
		}
	});
	$('.icon-search-close a').on('click', function(){
		$(this).parent().removeClass('on');
		$('.icon-search').show();
		$('.search-bar').fadeOut(100);
		$('.common-header').css('z-index',8);	
		$('.dim').fadeOut();
	});
	$('.search-bar .btn-close').on('click', function(){
		if ($(window).outerWidth(true) <= 940){
			$('.common-header >.inner').show();
		}
		$('.search-bar').fadeOut(100);
		$('.common-header').css('z-index',8);
		$('.dim').fadeOut();
		$('html').removeClass('no-scroll');
	});

	/* GNAV */
	/* 221027edit */
	$('.common-header .depth-2').css({'border':'0.1rem solid #ebebeb','border-top':'0rem'});
	
	$('.common-header .depth-1 > li > a').on('mouseenter', function(){
		var current = $('.common-header .depth-1 > li > a').index(this);
			$('.common-header .depth-2').eq(current).addClass('on');
			$('.common-header .depth-2').css('background','#fff');
		//$('.common-header').addClass('on');
	});
	$('.common-header .depth-1 > li').on('mouseleave', function(){
		$('.common-header .depth-1 > li').on('mouseenter', function(){
			$('.common-header .depth-2').removeClass('on');
		});
		$('.common-header .depth-1 > li').on('mouseleave', function(){
			$('.common-header .depth-2').removeClass('on');
		});
	});
	$('.common-header .depth-2').on('mouseleave', function(){
		$('.common-header .depth-2').removeClass('on');
		//$('.common-header').removeClass('on');
	});
	/* 221027add */
	$(".common-header .top-menu > li.icon-user > a").on("mouseenter", function () {
	  $(".common-header .user-depth-2").addClass("on");
	});
	$(".common-header .top-menu > li.menu-login > a").on("mouseenter", function () {
		  $(".common-header .user-depth-2").removeClass("on");
	});
	$(".common-header .top-menu > li.icon-search > a").on("mouseenter", function () {
		  $(".common-header .user-depth-2").removeClass("on");
	});
	$(".common-header .top-menu > li.icon-user .user-depth-2").on("mouseleave", function () {
	  $(".common-header .user-depth-2").removeClass("on");
	});
	/* 221027fin */

	/* 사이트맵 - function sitemap으로 묶고 일부 삭제 후 최상단으로 이동 - 200602, 확인 후 본 주석처리 부분은 삭제부탁드립니다 
	var current = $('.common-header .depth-1 > li.active').index();
	$('.common-header .icon-menu a').on('click', function(){
		$('.dim').fadeIn(200);
		$('html').addClass('no-scroll');
		$('.sitemap').addClass('on');
		if($(window).outerWidth(true) <= 940 && current >= 0) {
			var opened = $('.sitemap .depth-1 > li').eq(current).offset().top;
			$('.sitemap .depth-1 > li').eq(current).addClass('active');
			$('.sitemap .depth-1 > li').eq(current).find('.depth-2').show();
			$('.sitemap .gnav').scrollTop($('.sitemap .gnav')[0].scrollHeight);
		}
	});
	$('.sitemap .btn-close').on('click', function(){
		$('.dim').delay(200).fadeOut(200);
		$('html').removeClass('no-scroll');
		$('.sitemap').removeClass('on');
		if ($(window).outerWidth(true) <= 940) {
			$('.sitemap .depth-1 > li.active').removeClass();
			$('.sitemap .depth-2').hide();
			$('.sitemap .depth-1 > li.active').find('.depth-2').hide();
		}
	});
	if($(window).outerWidth(true) <= 940) {
		$('.sitemap .depth-1 > li').on('click', function(){
			$('.sitemap .depth-2:visible').hide();
			$(this).find('.depth-2').show();
			var menuH = $('.sitemap .depth-1 > li').outerHeight();
			if ($(this).index() == 0){
				var open = 0;
			}else {
				var open = menuH * ($(this).index() + 1);
			}
			$('.sitemap .gnav').scrollTop(open);
			$('.sitemap .depth-1 > li.active').not($(this)).removeClass('active');
			$(this).addClass('active');
		});
	}
	*/

	/* 플로팅 메뉴 */
	$('.quick-menu .icon-toggle').on('click', function(){
		$('.quick-menu').toggleClass('open');
	});

	/* 200528 수정 */
	$('.quick-menu > li').on('click', function(){
		if ( $(this).hasClass('icon-ask') ){
			$('.dim').fadeIn(200);
			$('.popup-ask.question').addClass('on');
			$('html').addClass('no-scroll');
		}else if ( $(this).hasClass('icon-news') ){
			$('.dim').fadeIn(200);
			$('.popup-ask.newsletter').addClass('on');
			$('html').addClass('no-scroll');
		}else if ( $(this).hasClass('icon-top') ){ /* 200624 icon-top 조건 추가 */
			$('body, html').stop().animate({
				'scrollTop': 0
			}, 300);
		}
	});
	$('.popup-ask .ask-close').on('click', function(){
		$('.dim').delay(200).fadeOut(200);
		$('.popup-ask').removeClass('on');
		$('html').removeClass('no-scroll');
	});
	/**/
	
	/* breadcrumb */
	var $currentDepth1 = $('.common-header .depth-1 > li.active');
	var $currentDepth2 = $('.common-header .depth-2 > li.active');
	var $currentDepth3 = $('.common-header .depth-3 a.active');
	var $depth1 = $('.breadcrumb .depth-1');
	var $depth2 = $('.breadcrumb .depth-2');
	var $depth3 = $('.breadcrumb .depth-3');
	$depth1.children('a').text($currentDepth1.children('a').text());
	$depth1.find('.sub-list > li').eq($currentDepth1.index()).addClass('on');
	$depth2.children('a').text($currentDepth2.children('a').text());
	$depth2.children('.sub-list').eq($currentDepth1.index()).children('li').eq($currentDepth2.index()).addClass('on');

	if ($currentDepth1.index() < 0) {
		$depth1.hide();
		$('.breadcrumb .current').show();
	}
	if ($currentDepth2.index() < 0) {
		$depth2.hide();
	}
	if ($currentDepth3.index() < 0) {
		$depth3.hide();
	}
	var $depth3Clone = $depth2.find('.on').children('.sub-list').clone();
	$depth3.append($depth3Clone);

	$depth1.on('click', function(){
		if($(this).find('.sub-list li').length > 0){ // 20200610 수정 하위없을시 열림 막기 
			$(this).find('.sub-list').slideToggle('fast');
		}		
		$depth2.find('.sub-list').hide();
		$depth3.find('.sub-list').hide();
	});
	$depth1.find('.sub-list a').on('click', function(){
		var depth1Title = $(this).text();
		var depth2Title = $depth2.children('.sub-list').eq($(this).parent().index()).children('li:first-child').children('a').text();
		$depth1.children('a').text(depth1Title);
		$depth1.find('.on').removeClass('on');
		$(this).parent().addClass('on');
		$depth2.children('a').text(depth2Title);
		if ($depth2.css('display') == 'none') {
			$depth2.show();
		}
		var $depth2Target = $depth2.children('.sub-list').eq($depth1.find('.on').index());
		if ( $depth2Target.children('li:first-child').find('.sub-list').length == 0 ){
			$depth3.hide();
		}else {
			var depth3Clone = $depth2Target.children('li:first-child').find('.sub-list').clone();
			$depth3.children('.sub-list').remove();
			$depth3.append(depth3Clone);
			$depth3.children('a').text(depth3Clone.children('li:first-child').text());
			$depth3.show();
		}
	});

	$depth2.on('click', function(){
		if($(this).find('.sub-list li').length > 0){ // 20200610 수정 하위없을시 열림 막기 
			$depth2.children('.sub-list').eq($depth1.find('.on').index()).slideToggle('fast');
		}
		$depth3.find('.sub-list').hide();
	});
	$depth2.find('.sub-list a').on('click', function(){
		$depth2.find('.on').removeClass('on');
		$(this).parent().addClass('on');
		$depth2.children('a').text($(this).text());
		if ($(this).next().hasClass('sub-list')) {
			var depth3Clone = $(this).next().clone();
			$depth3.children('.sub-list').remove();
			$depth3.append(depth3Clone);
			$depth3.children('a').text(depth3Clone.children('li:first-child').text());
			$depth3.show();
		}else {
			$depth3.hide();
		}
	})

	$depth3.on('click', function(){
		if($(this).find('.sub-list li').length > 0){ // 20200610 수정 하위없을시 열림 막기 
			$(this).children('.sub-list').slideToggle('fast');
		}
		$currentDepth2.next()
	});

	$('.breadcrumb .list > li').on('blur mouseleave', function(){
		$(this).children('.sub-list').slideUp('fast');
	});

	//Tab - 200616 수정 및 추가
	/* 삭제 $('[data-role=tab]').find('li:first-child').find('a').addClass('active');
	$('[data-role=tab-cont]').children(':first-child').addClass('active');*/
	var hiddenCont = $('[data-role=tab-cont]').children().not('.active');
	hiddenCont.hide();
	setTimeout(function(){
		hiddenCont.find('.top-intro').find('.aos-animate').removeClass('aos-animate');
	}, 300);

	$('[data-role=tab] li').on('click', function(){
		var tabCont = $(this).parents('[data-role=tab]').next('[data-role=tab-cont]');
		$(this).siblings().find('.active').removeClass('active');
		$(this).children().addClass('active');
		tabCont.children(':visible').hide().removeClass('active');
		tabCont.children().eq($(this).index()).show().addClass('active');
		AOS.refresh();
		tabCont.children().find('.top-intro').find('.aos-init').removeClass('aos-animate');
		tabCont.children().find('.full-visual').removeClass('aos-animate');
		tabCont.children().find('.underline').removeClass('underline').addClass('underline-off');
		setTimeout(function(){
			tabCont.children(':visible').find('.top-intro').find('.aos-init').addClass('aos-animate').attr('data-aos-delay', 0);
			tabCont.children(':visible').find('.full-visual').addClass('aos-animate').attr('data-aos-delay', 0);
			tabCont.children(':visible').find('.underline-off').addClass('underline').removeClass('underline-off');
		},1);
		
		if("0" == $(this).index()){
			$("#fsUl").show();
			$("#lsUl").hide();
			$("#jwUl").hide();
			$("#hoUl").hide();
		} else if("1" == $(this).index()){
			$("#fsUl").hide();
			$("#lsUl").show();
			$("#jwUl").hide();
			$("#hoUl").hide();
		} else if("2" == $(this).index()){
			$("#fsUl").hide();
			$("#lsUl").hide();
			$("#jwUl").show();
			$("#hoUl").hide();
		} else if("3" == $(this).index()){
			$("#fsUl").hide();
			$("#lsUl").hide();
			$("#jwUl").hide();
			$("#hoUl").show();
		}
	});

	$('[data-role=tab]').on('mouseover focus', function(){
		$('[data-role=tab-cont]').children(':hidden').find('.top-intro').find('.aos-init').removeClass('aos-animate');
		$('[data-role=tab-cont]').children(':hidden').find('.full-visual').removeClass('aos-animate');
	});
	/**/

	//file attach
	$(document).on('click', '.file-attach input[type="file"]', function(){
		fileUpload();
	});

	//dropdown
	$('.dropdown > a').on('click', function(){
		if (!$(this).hasClass('active')){
			$(this).addClass('active');
			$(this).next().slideDown('fast');
		}else {
			$(this).removeClass('active');
			$(this).next().slideUp('fast');
		}
	});
	$('.dropdown').on('blur mouseleave', function(){
		$(this).children('ul').slideUp('fast');
		$(this).children('a').removeClass('active');
	});

	/* var myPath = document.getElementById("common-path");
	var length = myPath.getTotalLength();
	console.log(length); */

	/* 서브페이지 섹션별 상단 라인 그리기 */
	$('#intro-path').stop().animate({'strokeDashoffset': 4468}, 1500, 'linear');
	$('#service-path').stop().animate({'strokeDashoffset': 4588}, 1500, 'linear');
	$('#apply-path').stop().animate({'strokeDashoffset': 5392}, 1500, 'linear');
	$('#news-path').stop().animate({'strokeDashoffset': 2513}, 1500, 'linear');
	$('#community-path').stop().animate({'strokeDashoffset': 0}, 1500, 'linear', function(){
		$('#community-path02').stop().animate({'strokeDashoffset': 0}, 200, 'linear');
	});
	$('#common-path').stop().animate({'strokeDashoffset': 4364}, 1500, 'linear');
	$('.page-visual .object').addClass('on');

	/* 서브페이지 뉴스레터 */
	var swiper = new Swiper('.board-thumbnail .list .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 30,
		loop: true,
		speed: 500,
		navigation: {
			nextEl: '.board-thumbnail .list .swiper-button-next',
			prevEl: '.board-thumbnail .list .swiper-button-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			941: {
				slidesPerView: 4,
				spaceBetween: 30,
			}
		}
	});

	/* 서브페이지 아코디언 */
//	$('.apply-faq .accordion').find('li').eq(0).find('a').next().css('display', 'block');

	$('.apply-faq .accordion').on('click', 'a', function(e) {
		e.preventDefault();

		if($(this).parents('li').attr('class') === 'active') {
			$(this).parents('li').removeClass('active');
			$(this).next().slideUp();
		} else {
			$(this).parents('li').addClass('active');
			$(this).next().slideDown();
		}
	});
	
	/* 서브페이지 모션 - 200601 추가 */
	var fadeInDelay = {'data-aos': 'fade-in', 'data-aos-once': 'true', 'data-aos-delay': 400};
	var fadeIn = {'data-aos': 'fade-in', 'data-aos-once': 'true'};

	$('.board-header').attr(fadeIn);
	$('.board-list').attr(fadeInDelay);
	$('.board-view').attr(fadeIn);
	$('.board-thumbnail').attr(fadeIn);
	$('.board-gallery > li').each(function(index, item){
		$(item).attr({'data-aos': 'fade-up', 'data-aos-delay': 50 * index, 'data-aos-once': 'true'});
	});
	$('.board-webzine > li:nth-child(odd)').attr({'data-aos': 'fade-right', 'data-aos-once': 'true'});
	$('.board-webzine > li:nth-child(even)').attr({'data-aos': 'fade-left', 'data-aos-once': 'true'});
	$('.thumbnail-list > li').each(function(index, item){
		$(item).attr({'data-aos': 'fade-up', 'data-aos-delay': 50 * index, 'data-aos-once': 'true'});
	});
	$('.section-apply .content-wrap').attr(fadeInDelay);
	$('.section-mypage .content-wrap').attr(fadeInDelay);
	$('.section-member .content-wrap').attr(fadeInDelay);
	$('.common-search .content-wrap').attr(fadeInDelay);
	$('div.status').attr(fadeIn);
	$('div.status > ul > li').each(function(index, item){
		$(item).attr({'data-aos': 'zoom-in', 'data-aos-once': 'true', 'data-aos-delay': 200 * index});
	});
	/**/
});

/* $(function(){ 07월 23일 삭제 */
	/* 서브페이지 풀 비쥬얼영역 */
	/*if($('body').find('.full-visual').length === 0){
		return false;
	} else {
		$(window).on('scroll resize', function() {
			var $window = $(window);
			var scrollY = $window.scrollTop();
			var $body = $('body');
			var bodyHeight = $body.height();
			var $fullVisual = $('.full-visual');
			var visualHeight = $fullVisual.height();
			var $img = $fullVisual.find('.img');
			var imgHeight = $img.height();
			var imgOffsetTop = $fullVisual.offset().top;

			var rate = (imgHeight / 2) / Number(imgOffsetTop + visualHeight);
			var result = - rate * scrollY;
			var startY = bodyHeight > imgOffsetTop ? 0 : imgOffsetTop - bodyHeight;
			var endY = bodyHeight > imgOffsetTop ? imgOffsetTop + visualHeight : imgOffsetTop + visualHeight;

			if(scrollY >= startY && scrollY <= endY) $img.css('top', result);
		});
	}
}); */

/* 윈도우 리사이징 시 gnb depth2 show/hide 여부 */
/*
$(window).resize(function(){
	if ($(window).outerWidth(true) > 940) {
		$('.sitemap .depth-2').show();
	}
});
*/
$(window).resize(function(){
	sitemap(); /* 200602 추가 */
	if ($(window).outerWidth(true) > 940) {
		$('.sitemap .depth-2').show();
		//$('.sitemap .active').removeClass('active'); /* 200602 추가 */
	}else { /*else 이하 200602 추가 */
		$('.sitemap .depth-2').hide();
		$('.sitemap .active .depth-2').show();
	}
});