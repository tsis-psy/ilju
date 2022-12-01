/*******************************************************
 * 공통 Ajax 관련
 * Copyright 2016 ⓒSSOCIO. All Rights Reserved.
 *******************************************************/

/**
 * 공통 Ajax
 * @class
 * @version 1.0.0
 */
var ajax = {

	_jsonData : {},
	_callBack : "",
	_errorCallBack : "",
	_dataType : "json",
	_isMask : "",
	_selectRow : "",
	_nextRow : "",
	_sortCode : "",
	_forwardData : {},
	_type : "POST",
	_async : true,
	
	/**
	 * 비동기 통신 (Get)
	 * @example
	 * 
	 * _url : URL {string}
	 * _jsonData : 파라미터 {string}
	 * _callback : 콜백 함수 {object}
	 * _isMask : 로딩중 마스크 함수 {object}
	 * 
	 * ajax.get({ 
	 *     url : "${contextPath}/pdv/pdveNextTest/selectStr.do",
	 *     params : "param1=hello&param2=world&param3=test",
	 *     callback : callbackFunction
	 * });
	 * @param {object} _jsonData
	 */
	get : function(_url, _jsonData, _callBack, _async, _isMask){
//		if(isMobileApp)
		this._jsonData = _jsonData;
		this._callBack = _callBack;
		this._isMask = _isMask;
		this._async = _async;
			
		var ajaxCallBack = this;
		
		$.ajax({
			type : "GET",
			url : _url,
			contentType : 'application/json',
			dataType : ajaxCallBack._dataType,
			data : ajaxCallBack._jsonData,
			async: ajaxCallBack._async,
			beforeSend: function( xhr ) {
				if (ajaxCallBack._isMask) {
					ajaxCallBack._isMask();
				} else {
//					console.log("default is mask");
				}
//				if(isMobileApp){
//				}
			},
			success : function (data) {
				if (ajaxCallBack._callBack) {
					ajaxCallBack._callBack(data); // 콜백 함수 호출
				}
			},
			error : function (err_data) {
				if(err_data.status != "200"){
					if(err_data.status == "500"){
						alert("서버와 통신이 실패 하였습니다.\n잠시 후 다시 시도 해주세요.");
					}
				}
			},
			complete : function(){
//				if(isMobileApp){
//				}
			}
		});
	}
	,
	getData : function(_url, _jsonData, _async, _isMask){
		this._jsonData = _jsonData;
//		this._callBack = _callBack;
		this._isMask = _isMask;
		this._async = _async;
		var ajaxCallBack = this;
		var returnData;
		$.ajax({
			type : "GET",
			url : _url,
			contentType : 'application/json',
			dataType : this._dataType,
			data : JSON.stringify(this._jsonData),
			async: this._async,
			beforeSend: function( xhr ) {
				if (ajaxCallBack._isMask) {
					ajaxCallBack._isMask();
				} else {
					//console.log("default is mask");
				}
			},
			success : function (data) {
//				if (ajaxCallBack._callBack) {
//					ajaxCallBack._callBack(data); // 콜백 함수 호출
//				}
//				return data;
				returnData = data;
			},
			error : function (err_data) {
				if(err_data.status != "200"){
					if(err_data.status == "500"){
						alert("서버와 통신이 실패 하였습니다.\n잠시 후 다시 시도 해주세요.");
					}
				}
			},
			complete : function(){
				
			}
		});
		return returnData;
	}	
	,
	
	/**
	 * 비동기 통신 (Post)
	 * @example
	 * 
	 * _url : URL {string}
	 * _jsonData : 파라미터 {string}
	 * _callback : 콜백 함수 {object}
	 * _isMask : 로딩중 마스크 함수 {object}
	 * 
	 * ajax.post({ 
	 *     url : "${contextPath}/pdv/pdveNextTest/selectStr.do",
	 *     params : "param1=hello&param2=world&param3=test",
	 *     callback : callbackFunction
	 * });
	 * @param {object} _jsonData
	 */
	post : function(_url, _jsonData, _callBack, _errorCallBack, _async, _isMask){
		
		this._url = _url;
		this._jsonData = _jsonData;
		this._callBack = _callBack;
		this._errorCallBack = _errorCallBack;
		this._async = _async;
		this._isMask = _isMask;
			
		var ajaxCallBack = this;
		
		$.ajax({
			type : "POST",
			url : _url,
			contentType : 'application/json',
			dataType : this._dataType,
			async: this._async,
			data : JSON.stringify(this._jsonData),
			beforeSend: function( xhr ) {
				if (ajaxCallBack._isMask) {
					ajaxCallBack._isMask();
				}
			},
			success : function (data) {
				if (ajaxCallBack._callBack) {
					ajaxCallBack._callBack(data); // 콜백 함수 호출
				}
			},
			error : function (err_data) {
				if(err_data.status != "200"){
					if(err_data.status == "500"){
						alert("서버와 통신이 실패 하였습니다.\n잠시 후 다시 시도 해주세요.");
					}
					if (ajaxCallBack._errorCallBack) {
						ajaxCallBack._errorCallBack(err_data); // 콜백 함수 호출
					}
				}
			},
			complete : function(){
//				if(isMobileApp){
//				}
			}			
			
		});
	},
	
	submit : function(_url, _formId, _callBack, _errorCallBack, _async, _isMask){
		
		this._callBack = _callBack;
		this._isMask = _isMask;
		this._errorCallBack = _errorCallBack;
		this._async = _async;
		var ajaxCallBack = this;
		
		var formData = new FormData($("#"+_formId)[0]);
		
		formData.append("orgFileNameTest", "")
		
		$.ajax({
			type: 'POST'
			, async: true
			, url: _url
			, dataType:'json'
			, async: this._async
			, data: formData
			, processData: false
			, contentType: false
			, beforeSend: function( xhr ) {
				if (ajaxCallBack._isMask) {
					ajaxCallBack._isMask();
				}
			},
			success : function (data) {
				if (ajaxCallBack._callBack) {
					ajaxCallBack._callBack(data); // 콜백 함수 호출
				}
			},
			error : function (err_data) {
				if(err_data.status != "200"){
					if(err_data.status == "500"){
						alert("서버와 통신이 실패 하였습니다.\n잠시 후 다시 시도 해주세요.");
					}
					if (ajaxCallBack._errorCallBack) {
						ajaxCallBack._errorCallBack(err_data); // 콜백 함수 호출
					}
				}
			},
			complete : function(){
//				if(isMobileApp){
//				}
			}			
		});
	},
	
	formSubmit : function(_url, _formId, _callBack, _type, _errorCallBack, _async, _isMask ){
		
		this._callBack = _callBack;
		this._errorCallBack = _errorCallBack;
		this._isMask = _isMask;
		this._async = _async;
		this._type = _type;
		
		var ajaxCallBack = this;
		
		var formData = $("#"+_formId).serialize();
		
		$.ajax({
			type: this._type
			, url: _url
			, dataType:this._dataType
			, data: formData
			, async: this._async
			, beforeSend: function( xhr ) {
				if (ajaxCallBack._isMask) {
					ajaxCallBack._isMask();
				}
			},
			success : function (data) {
				if (ajaxCallBack._callBack) {
					ajaxCallBack._callBack(data); // 콜백 함수 호출
				}
			},
			error : function (err_data) {
				if(err_data.status != "200"){
					if(err_data.status == "500"){
						alert("서버와 통신이 실패 하였습니다.\n잠시 후 다시 시도 해주세요.");
					}
					if (ajaxCallBack._errorCallBack) {
						ajaxCallBack._errorCallBack(err_data); // 콜백 함수 호출
					}
				}
			},
			complete : function(){
//				if(isMobileApp){
//				}
			}			
		});
	}
};