
var member = {	
	authCheck : function(options){ //일반회원가입 - 가입항목
		if(typeof options != "undefined"){
			
			var option = JSON.parse(options);
			
			if(typeof option.result.NAME != "undefined"){
				$("#korNm").val(option.result.NAME);
			}
			
			if(typeof option.result.CI != "undefined"){
				$("#ci").val(option.result.CI);
			}
			
			if(typeof option.result.DI != "undefined"){
				$("#di").val(option.result.DI);
			}
			
			if(typeof option.result.MOBILE_NO != "undefined"){
				if(option.result.MOBILE_NO.length == 11){
					$("#cpNum1").val(option.result.MOBILE_NO.substring(0,3));
					$("#cpNum2").val(option.result.MOBILE_NO.substring(3,7));
					$("#cpNum3").val(option.result.MOBILE_NO.substring(7,11));
				}
			}
			
			$("#authCheck").addClass("disabled");			
			
			var option = {
				"ci" : $("#ci").val(),
				"mode" : "check"
			}
			member.memberCheck(JSON.stringify(option));
		}else{
			auth.nice();
		}
	}
	, mypage02AuthCheck : function(options){ //마이페이지 본인인증 체크
		if(typeof options != "undefined"){
			
			var option = JSON.parse(options);
			
			if(typeof option.result.CI != "undefined"){
				if($("#ci").val() != ""){
					//본인인증 체크
					var ciOption = {
						"ci" : $("#ci").val(),
						"ciCheckVal" : option.result.CI,
						"memIdCheckVal" : $("#memId").val(), 
						"mode" : "modifyCheck"
					}
					member.memberCheck(JSON.stringify(ciOption));
				}
				
				$("#ci").val(option.result.CI);
			}
			
			if(typeof option.result.NAME != "undefined"){
				$("#korNm").val(option.result.NAME);
			}
			
			if(typeof option.result.DI != "undefined"){
				$("#di").val(option.result.DI);
			}
			
			if(typeof option.result.MOBILE_NO != "undefined"){
				if(option.result.MOBILE_NO.length == 11){
					$("#cpNum1").val(option.result.MOBILE_NO.substring(0,3));
					$("#cpNum2").val(option.result.MOBILE_NO.substring(3,7));
					$("#cpNum3").val(option.result.MOBILE_NO.substring(7,11));
				}
			}
			$("#authCheck").addClass("disabled");
			$("#ciChange").val("Y"); 
			
			
			
		}else{
			auth.nice();
		}
	}
	, publicStep1 : function(options){ //일반회원가입 - 약관동의
		location.href = '/html/member/signFront01.do';
	}
	, publicStep2 : function(){ //일반회원가입 - 가입항목
		$("#form1").attr("action","/html/member/signFront02.do");
		$("#form1").submit();
	}
	, publicStep2Save : function(){ //일반회원가입 - 가입항목
		$.ajax({
			url: "/html/member/signFront02Save.do",
			type : "post",
            data : $("#form1").serialize(),
            success : function(data) {
            	var json = data.JSON;
            	if(json.status == "OK"){
            		//alertPop("정상적으로 처리되었습니다.");
            		
            		if($("#mode").val() == "등록"){
            			//location.href = '/umlg/umlg01.do';
            			member.publicStep3();
            		}else{
            			location.href = '/html/Mypage/umim01.do';
            		}
            	}else{
            		if(json.status == "ER00"){
            			if(json.message == "MSG01"){
            				alertPop("필수값 오류입니다.");
            			}else if(json.message == "MSG02"){
            				alertPop("아이디가 이미 존재합니다.");
            			}else if(json.message == "MSG03"){
            				alertPop("회원 정보 수정이 되지 않았습니다.");
            			}else if(json.message == "MSG04"){
            				alertPop("세션 변경에 실패 했습니다.");
            			}else if(json.message == "MSG99"){
            				alertPop("필수 입력 값을 입력하여주세요.");
            			}else if(json.message == "MSG98"){
            				alertPop("뉴스레터 구독 신청이 이미 등록된 이메일입니다.");
            			}else{
            				alertPop(json.message);
            			}
            		}
            	}
            },
            error : function(xhr) {
//                alertPop("error : "+xhr.responseText);            	
            	alertPop("error : 회원가입에 실패하였습니다.");
            }
		});	
	}
	, publicStep3 : function(){ //일반회원가입 - 가입완료
		$("#form1").attr("action","/html/member/signFront03.do");
		$("#form1").submit();
	}
	, memberCheck : function(options){
		var option = {
			"ci" : "",
			"mode" : "check"
		}
		
		if(typeof(options) != "undefined") {
			$.extend(option, JSON.parse(options));
		}
		
		$.ajax({
			url: "/html/member/memberCheckFront01.do",
			type : "post",
            data : option,            
            success : function(data) {
            	if(data.JSON.status == "OK"){
            		
            	}else{
            		if(data.JSON.status == "ER01"){
            			alertPop("이미 회원계정이 있습니다.", function(){
            				location.href = "/umlg/umlg01.do";
            			});
            		}else if(data.JSON.status == "ER02"){
            			alertPop("회원 본인인인증과 다릅니다. 다시해주시기바랍니다.", function(){
            				location.reload();
            			});
            			
            		}
            	}
            },
            error : function(xhr) {
                //alertPop("error :: "+xhr.responseText);
            }
		});
	}
}