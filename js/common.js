var layerOpener;

$( window ).resize(function() { //창크기 감지
	open_chatroom();
});

function open_chatroom(){
	var windowWidth = $( window ).width();
	if(windowWidth <= 940) {
		$(".gnav.pc").hide();
		$(".gnav.mobile").show();
	} else {
		$(".gnav.pc").show();
		$(".gnav.mobile").hide();
	}
}

//공통 레이어 팝업 닫기
$(document).on("click","[data-layer-close='contentPop']", function(e){
	e.preventDefault();
	$(".pop-contents").dialog('close'); //닫기		
});

$(document).ready(function(){
	open_chatroom();
	
	jQuery.extend({
		tkPost : function(url, data, successFn, opener) {
			// progressbar 시작
			progressbar.show(opener);

			$.ajax({
				beforeSend: function(req) {
					req.setRequestHeader("AJAX", "true");
				},
				type: "POST",
				url: url,
				data: data,
				cache: false, // don't cache the result
				success: function(data) {
					// 에러일경우 에러메세지 표현
					if(data && data.errorMessage) {
						alert(data.errorMessage);
						return;
					}
					if(successFn) {
						successFn(data);
					}
					// progress 종료
					progressbar.hide();
				},
				error: function(xhr, status, error) {
					
				}
			});
		}
	});
	var progressbar = {
			show : function(opener) {
				if(opener) {
					layerOpener = $(opener);
					$('body').append('<div id="loading" class="modal"><p>잠시만 기다려주세요. 데이터 로딩중입니다.</p></div>');
					$('#loading p').attr('tabindex', '-1').focus();
				}
			},
			hide : function() {
				$('#loading').remove();
				if (layerOpener != null) {
					$(layerOpener).focus();
					layerOpener = null;
				}
			}
	};
	
	$("#uniteSearchBtn").on("click", function(e){
		e.preventDefault();
		search.uniteSearch();
	});
	
	$("#search").on("keydown",function(e){
		 if (e.keyCode === 13) {
			 search.uniteSearch();
		 }
	});
	
	$("#layerLoginBtn").click(function(e){ //공통 로그인 레이어팝업
		e.preventDefault();
		login.loginAjax(e);
	});
	
	menu.lnbinit(); //LNB
	//login.checkSession(); //회원 임시주석 CI 체크
});

//로그인 팝업
var isLoginClick = false;
var login = {
	paramOptions : {
		
	},
	layerOptions : {
		"layerId" : "#layerLoginDiv",
		"resizePop" : "700px"
	},
	loginAjax : function(e){		
		if(isLoginClick){
			return false;
		}
		isLoginClick = true;
		if( $('#user_id').val() == "" ){
			alertPop('아아디를 입력해주세요.', function(){
				$('.pop-alert').closest('.pop-alert').dialog('close');
				isLoginClick = false;
				$('#user_id').focus();
			});
			return false;
		}else if( $('#user_pw').val() == "" ){
			alertPop('비밀번호를 입력해주세요.', function(){
				$('.pop-alert').closest('.pop-alert').dialog('close');
				isLoginClick = false;
				$('#user_pw').focus();
			});
			return false;
		}
		login.ajaxCaller.getRsaKey();
	},
	open : function(options){
		if(typeof(options) != "undefined") {
			$.extend(login.paramOptions, JSON.parse(options));
		}
		layer.open(JSON.stringify(login.layerOptions));
	},
	close : function(e){
		e.preventDefault();
		layer.close(JSON.stringify(login.layerOptions));
	},
	loginFnOptions : function(fuNm, paramStringify){ //함수Call
		var option = {
			"type" : "1",
			"fuNm" : fuNm,
			"paramStringify" : JSON.parse(paramStringify),
			"menuUrl" : location.pathname, 
			"setMenuId" : $("#setMenuId").val()
		}
		login.open(JSON.stringify(option));
	},
	loginFn : function(fuNm, paramStringify){ //함수Call
		var option = {
			"type" : "3",
			"fuNm" : fuNm,
			"paramStringify" : JSON.parse(paramStringify),
			"menuUrl" : location.pathname, 
			"setMenuId" : $("#setMenuId").val()
		}
		login.open(JSON.stringify(option));
	},
	loginRetrun : function(returnUrl){ //바닥 return
		var option = {
				"type" : "2",
				"returnUrl" : returnUrl
			}
		login.open(JSON.stringify(option));
	}
	/* 2020-06-10.주석 팝업창 사용시
	, makeLoginForm : function(){ //로그인 폼생성
		$("body > #loginForm").remove();
		$("body").append( '<form id="loginForm" style="display:none;"></form>');
				
	}	
	, makeLoginFormElement : function(options){ //로그인 param 생성
		var option = {};
		if(typeof(options) != "undefined") {
			option = JSON.parse(options);
		}
		$.map( option, function( value, key ) {		   
		   $("#loginForm").append('<textArea id="'+key+'" name="'+key+'">'+value+'</textArea>');
		});
	}
	*/
	,
	loginCheck : function(){ //로그인체크
		var bln = false;
		var dataObj = { 
			"mode" : "loginCheck"
		};
		
		$.ajax({
			url: "/umlg/umlgCheckFront01.do",
			type : "post",
            data : dataObj,
            async: false,
            success : function(data) {
            	var json = data.JSON;
            	if(json.status == "OK"){
            		bln = true;
            	}else{
            		bln = false;
            	}
            },
            error : function(xhr) {
                //alert("error :: "+xhr.responseText);
            	bln = false;
            }
		});
		return bln;
	},
	addMenuHtml : function(options){ //로그인 팝업후 메뉴 Call
		var bln = false;
		
		if(typeof(options) != "undefined") {
			option = JSON.parse(options);
			
			$.ajax({
				url: "/common/gnbFront.do",
				type : "post",
	            data : option,
	            async: false,
	            success : function(data) {
	            	
	            	$("#Header").empty();
	            	$("#Header").append(data);
	            	
	            	//gnbInit();
	            	menu.lnbinit(); //LNB Header안에 있을때
	            	
	            	bln = true;
	            },
	            error : function(xhr) {
	                //alert("error :: "+xhr.responseText);
	            	bln = false;
	            }
			});
		}
		
		return bln;
	},
	checkSession : function(){ //본인인증 체크
		
		if(login.loginCheck()){ //로그인체크
			var initGo = true;
						
			if(initGo){
				var dataObj = { 
					"mode" : "ciCheck"
				};
				
				$.ajax({
					url: "/umlg/umlgCheckFront01.do",
					type : "post",
		            data : dataObj,            
		            success : function(data) {
		            	if(data.JSON.status == "ER01"){
		            		var option = {};
		            		//확인필요
		            		//Kakao.loginFnOptions("login.updateLoginMember", JSON.stringify(option)); //본인인증후 ci없데이트 callback
		            	}
		            },
		            error : function(xhr) {
		                //alert("error :: "+xhr.responseText);
		            }
				});
			}
		}
	},
	updateLoginMember : function(options){
		var option = {
			"ci" : ""
		}
		if(typeof(options) != "undefined") {
			$.extend(option, JSON.parse(options));
		}
		$.ajax({
			url: "/html/member/memberUpdateFront01.do",
			type : "post",
            data : option,            
            success : function(data) {
            	if(data.JSON.status == "OK"){
            		alert("정상 처리 되었습니다.");
            	}else{
            		if(data.JSON.message == "MSG03"){
            			alert("수정되지 않았습니다.");
            		}
            	}
            },
            error : function(xhr) {
                //alert("error :: "+xhr.responseText);
            }
		});
	},
	callBack : {
		getRsaKey : function(data) {
			var key = login.cipher.GenerateKey();
			var eId = login.cipher.EncryptTEA(key, $("#user_id").val());
			var ePasswd = login.cipher.EncryptTEA(key, $("#user_pw").val());
			var m = data.publicKeyModulus;
			var e = data.publicKeyExponent;
			var eKey = login.cipher.EncryptRSA(m, e, key);
			var param = {};
			param.id = eId;
			param.passwd = ePasswd;
			param.rsaEKey = eKey;
			param.sleepClearYn = $("#sleepClearYn").val();
			login.ajaxCaller.login(param);
		},
		login : function(data, e){
			if(data.loginErrCnt >= 5){
				$('.pop-alert').closest('.pop-alert').dialog('close');
				alertPop('제한된계정! 관리자에게 문의하세요.');
				isLoginClick = false;
				return false;
			}
			
			if(data.memberCnt > 0){
				if(typeof data.sleepYn != "undefined" && data.sleepYn == "Y"){
					alertPop(data.korNm+"고객님의 계정은 휴면계정 상태로 입니다. <br />휴면계정 상태를 해제하시겠습니까?", function(){
						$("#sleepClearYn").val("Y");
						$("#layerLoginBtn").trigger("click");
					});
				}else{
					//var jsonParam = $("#jsonParam").html();
					var json = login.paramOptions;
					
					var option = {
						"type" : "", //콜방식
						"fuNm" : "", //함수명
						"paramStringify" : "", //함수에 callbak data
						"returnUrl" : "", //redirect될 URL
						"menuUrl" : "", //menu에 보낼 URL
						"setMenuId" : "" //menu에 보낼 ID 
					}
					
					$.extend(option, json);
					
					function openerAddMenuHtml(){
						if(typeof(login.addMenuHtml) == "function") {
							var menuOption = {
								"menuUrl" : option.menuUrl,
								"setMenuId" : option.setMenuId
							}
							login.addMenuHtml(JSON.stringify(menuOption));
						}
					}
					
					if(option.type == "1"){ //함수 options Call bak
						
						//openerAddMenuHtml();
						
						var opnerfnNm = option.fuNm;
						var fn = eval(opnerfnNm);
						
						fn(JSON.stringify(option.paramStringify));
						
					}else if(option.type == "2"){ //페이지 return
						if(option.returnUrl == "" || option.returnUrl == null){
							location.href = '/';
						}else{
							location.href = option.returnUrl;
						}
					}else if(option.type == "3"){ //함수 arguments Call bak
					
						//openerAddMenuHtml();
						
						var paramStringify = option.paramStringify;
					
						var arguments1, arguments2, arguments3, arguments4
						, arguments5, arguments6, arguments7, arguments8;
						
						var i=0;
						
						$.map( paramStringify, function( value, key ) {
							if(i == 0){
								arguments1 = value;
							}else if(i == 1){
								arguments2 = value;
							}else if(i == 2){
								arguments3 = value;
							}else if(i == 3){
								arguments4 = value;
							}else if(i == 4){
								arguments5 = value;
							}else if(i == 5){
								arguments6 = value;
							}else if(i == 6){
								arguments7 = value;
							}else if(i == 7){
								arguments8 = value;
							}
							i++;
						});
							
						var opnerfnNm = option.fuNm;
						var fn = eval(opnerfnNm);
						fn(arguments1, arguments2, arguments3, arguments4, arguments5, arguments6, arguments7, arguments8);
					}
					
					layer.close(JSON.stringify(login.layerOptions));
				}
			} else {
				alertPop("아이디 또는 비밀번호가 잘못되었습니다.");
			}
			isLoginClick = false;
		}
	},
	ajaxCaller : {
		getRsaKey : function(){
			ajax.get("/html/encrypt/rsaPublicKey.do", "", login.callBack.getRsaKey, false, "");
		},
		login : function(param){
			ajax.post("/umlg/umlg01Login.do", param, login.callBack.login, "", false);
		}
	},
	cipher : {
		GenerateKey : function () {
			time = new Date().getTime();
			random = Math.floor(65536*Math.random());
			return (time*random).toString();
		},
		
		EncryptTEA : function(k, text){
			return encrypt(text, k);
		},
		
		EncryptRSA : function(m, e, text){
			var rsa = new RSAKey();
			rsa.setPublic(m, e);
			return rsa.encrypt(text);
		}
	}
}

var menu = {
	lnbinit : function(){
		var html = "";
		
		html = "";
		html += '<ul id="ulLnb" class="list" style="float: right;">';
			html += '<li class="home">';
			html += '<a href="/"><span>HOME</span></a>';
			html += '</li>';
			
			html += '<li id="lnb1" class="depth-1" style="display:none;">';	
			html += '</li>';
			
			html += '<li id="lnb2" class="depth-2" style="display:none;">';
			html += '</li>';
			
			html += '<li id="lnb3" class="depth-3" style="display:none;">';
			html += '</li>';
			
		html += '</ul>';
		html += '<p id="ulLnbP" class="current" style="display:none;"></p>';
		
		//2020-05-06 : LNB 구조가 바뀔수 있어 태그생성
		if($("#ulLnb").length == 0){
			$(".breadcrumb").append(html);
		}
		
		if($("#ulLnb").length > 0){
			var lnbList = $("#menuOn").val();
			if(lnbList != ''){			
				var lnbLists = lnbList.split(",");
				for(var j=0; j<lnbLists.length; j++){
					var option = {
						"menuId" : lnbLists[j] //메뉴 ID
						, "lnbNum" : j+1 //depth번호
					}
					if(lnbLists[j] != 154 && lnbLists[j] != 154 && lnbLists[j] != 153){
						menu.makeLnb(JSON.stringify(option));
					}
				}
				$("#ulLnb > li > a").on("click",function(){
	        		var classaa = $(this).parent().attr("class");
	        		console.log('.breadcrumb .'+classaa);
					$('.breadcrumb .'+classaa).trigger("click");
				});
			}
		}
	}	
	, makeLnb : function(options){ //뎁스별
		
		var option = {
			"menuId" : ""
			, "lnbNum" : ""
		}
		
		if(typeof(options) != "undefined") {
			$.extend(option, JSON.parse(options));
		}
		$.ajax({
			url: "/common/lnbFront.do",
			type : "post",
            data : option,            
            success : function(data) {
            	var html = '';
            	html += '<a href="#" data-depthLength="'+data.lnbResultList.length+'" class="on" >'+ data.menuVO2.menuDesc +'</a>';
        		html += '<ul class="sub-list">';
    			for(var i=0; i<data.lnbResultList.length; i++){
    				if(data.lnbResultList[i].menuId == 108){
    					if(data.menuVO2.memBerClsCd == 'LS'){
		    				html += '<li class="'+(data.lnbResultList[i].menuId == data.menuVO2.menuId ? 'on' : '')+'">';
							html += '<a href="/html/shin/ls/find.do' + (data.lnbResultList[i].urlParam == null ? '' : ("?"+data.lnbResultList[i].urlParam)) +  '">'+data.lnbResultList[i].menuDesc+'</a>';
							html += '</li>';
						}else{
							html += '<li class="'+(data.lnbResultList[i].menuId == data.menuVO2.menuId ? 'on' : '')+'">';
							html += '<a href="/html/shin/fs/find.do' + (data.lnbResultList[i].urlParam == null ? '' : ("?"+data.lnbResultList[i].urlParam)) +  '">'+data.lnbResultList[i].menuDesc+'</a>';
							html += '</li>';
						}
    				}else{
	    				html += '<li class="'+(data.lnbResultList[i].menuId == data.menuVO2.menuId ? 'on' : '')+'">';
						html += '<a href="' + data.lnbResultList[i].url + (data.lnbResultList[i].urlParam == null ? '' : ("?"+data.lnbResultList[i].urlParam)) +  '">'+data.lnbResultList[i].menuDesc+'</a>';
						html += '</li>';
					}
    			}					
				html += '</ul>';
				
				$("#lnb"+option.lnbNum).append(html);
            	$("#lnb"+option.lnbNum).css("display","");
            	
            	
            	var lnbList = $("#menuOn").val();
        		if(lnbList != ''){			
        			var lnbLists = lnbList.split(",");
        			if(lnbLists.length == data.lnbNum){
                		$("title").text( data.menuVO2.menuDesc+" | 일주학술문화재단");
                	}
        		}
            	
            	var $lnbA = $("#lnb"+option.lnbNum+" > a");
            	var depthLength = Number($lnbA.attr("data-depthLength"));
            	if(depthLength <= 1){
            		$lnbA.css("background-image","none");
            	}
            },
            error : function(xhr) {
                //alert("error :: "+xhr.responseText);
            	
            }
		});
	}
}

var layer = { //공통 레이어 팝업 호출
		
	dimClass : '.ui-widget-overlay.ui-front'
		
	, open : function(options){
		var option = {
			"layerId" : "",
			"resizePop" : "460px"
		}
		
		if(typeof(options) != "undefined") {
			$.extend(option, JSON.parse(options));
		}
		
		if(option.layerId == ""){
			alert("layerId 필수입니다.");
		}else{			
			
			$(option.layerId).css("display","");			
			
			$(option.layerId).dialog({
				modal: true,
				resizable: false,
				draggable: false,
				classes: {
					'ui-dialog': 'content'
				},
				width: '90%',
				height: 'auto',
				show: { effect: "fadeIn", duration: 300 },
				open: function(){
					resizePop(option.resizePop);
				}
			});
		}
	}
	, close : function(options){
		var option = {
			"layerId" : ""
		}
		
		if(typeof(options) != "undefined") {
			$.extend(option, JSON.parse(options));
		}
		
		$(option.layerId).dialog('close'); //닫기		
		$("body > "+layer.dimClass).css("display","none"); //dim처리
	}
}

var search = {
	uniteSearch : function(){
		
		if($("body > #uniteSearchform").length == 0){
			var html = '';	
			html += '<form id="uniteSearchform" name="uniteSearchform" action="/html/UniteSearch/unitesearchfront01.do" method="post">';
				html += '<input type="hidden" name="uniteSearchCondition1" value="all" />';
				html += '<input type="hidden" name="uniteSearchKeyword2" value="" />';
			html += '</form>';
			
			$("body").append(html);
		}
		
		$("input[name='uniteSearchKeyword2']").val($("#search").val());		
		$("#uniteSearchform").submit();
	}
}

var newLetter = {
	save : function(options){
		var option = { 
			"mode" : ""
			, "callbackFn" : ""
			, "callbackOitions" : ""
			, "noMsg" : "Y"
		};
		
		if(typeof(options) != "undefined") {
			$.extend(option, JSON.parse(options));
		}
		
		$.ajax({
			url: "/html/newsletterEmailFront01.do",
			type : "post",
			data : option,
			success : function(data) {
				var json = data.JSON;
				var txtStr = (option.mode == '등록' ? '수신' : '철회');
					
				if(json.status == "OK"){
					if(option.noMsg == "Y"){
						if(json.check == "1"){
							alert("뉴스레터 "+txtStr+"동의처리가 되어 "+txtStr+"되었습니다");
						}else{
							alert(txtStr+"되었습니다");
						}	
						
						if(option.callbackFn != ""){
							var fn = eval(option.callbackFn);					
							fn(JSON.stringify(option.callbackOitions));
						}
					}
				}else{
					if(json.status == "ER01"){
						alert("이미 수신목록이 있습니다. "); //비회원
					}else if(json.status == "ER02"){
						alert("이미 수신되었습니다.");
					}else if(json.status == "ER03"){
						alert("이미 수신목록이 있습니다.");
					}else if(json.status == "ER04"){
						alert("이메일 정보가 없습니다. 마이페이지에서 수정하시기 바랍니다.");           			
					}else if(json.status == "ER05" || json.status == "ER07"){
						alert("회원정보 수신 수정에 오류가있습니다.");
					}else if(json.status == "ER06"){
						alert("수신되지 않았습니다.");
					}else if(json.status == "ER07"){
						alert("회원정보 철회 수정에 오류가있습니다.");
					}else if(json.status == "ER08"){
						alert("철회되지 않았습니다."); //비회원
					}else {
						//alert(json.status);
					}
				}
			},
			error : function(xhr) {
				alert("error :: "+xhr.responseText);
			}
		});
	}
}

var auth = {
	nice : function(){
		window.open("/popup/nice/checkplus_main.jsp","authNice","width=500, height=500");
	}
}

var rsa = {
		create : function(rsaPublicKeyModulus,rsaPpublicKeyExponent){
			var rsa
			rsa = new RSAKey();
			rsa.setPublic(rsaPublicKeyModulus, rsaPpublicKeyExponent);
			return rsa;
		},
		generateKey : function(){
		    var time = new Date().getTime();
		    var random = Math.floor(65536*Math.random());
		    var result = (time*random).toString();    
		    if(result.length > 16){
		    	var paddingCount = 16 - result.length;
		    	for (var i = 0 ; i < paddingCount ; i ++){
		    		// padding 값 추가
			    	result = result + "8";
			    	}
		    } 
		    return result;    
		}
}