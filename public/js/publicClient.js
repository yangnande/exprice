/**
 * byteArray to string
 * @param {Array} arr byteArray
 */
function byteToString(arr) {
	if(typeof arr === 'string') {
		return arr;
	}
	var str = '',
		_arr = arr;
	for(var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);
		if(v && one.length == 8) {
			var bytesLength = v[0].length;
			var store = _arr[i].toString(2).slice(7 - bytesLength);
			for(var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2);
			}
			str += String.fromCharCode(parseInt(store, 2));
			i += bytesLength - 1;
		} else {
			str += String.fromCharCode(_arr[i]);
		}
	}
	return str;
}
/**
 * byteArray 密文
 */
// 正式
var ivP = '57,55,57,49,48,50,55,51,52,49,55,49,49,56,49,57'
var qenP = '102,111,111,114,101,116,116,68,55,118,99,66,97,119,116,51'
var penP = '85,86,105,99,48,54,116,112,88,103,77,78,105,65,112,109'
// 灰度
var ivT = '49,50,51,52,53,54,55,56,57,48,49,50,51,52,53,54'
var qenT = '66,72,116,81,82,101,112,88,69,66,87,108,101,55,67,74'
var penT = '116,54,77,111,69,90,57,52,115,48,98,68,79,97,119,115'
/**
 * aes加密
 * @message 需要加密的字符串
 */
function encryptByAES (message) {
	// var keyHex = CryptoJS.enc.Utf8.parse(key);
	var key = CryptoJS.enc.Utf8.parse(byteToString(qenP.split(',')));
	var iv  = CryptoJS.enc.Utf8.parse(byteToString(ivP.split(',')));
	if (window.location.href.indexOf('leadeon-cmcc-static-test') > -1) {
		key = CryptoJS.enc.Utf8.parse(byteToString(qenT.split(',')));
		iv  = CryptoJS.enc.Utf8.parse(byteToString(ivT.split(',')));
	}
	message = CryptoJS.enc.Utf8.parse(message);
	var encrypted = CryptoJS.AES.encrypt(message, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC
	});
	return encrypted.toString();
};
/**
 * aes解密
 * @message 需要加密的字符串
 */
function decryptByAES (message) {
	// var keyHex = CryptoJS.enc.Utf8.parse(key);
	var key = CryptoJS.enc.Utf8.parse(byteToString(penP.split(',')));
	var iv  = CryptoJS.enc.Utf8.parse(byteToString(ivP.split(',')));
	if (window.location.href.indexOf('leadeon-cmcc-static-test') > -1) {
		key = CryptoJS.enc.Utf8.parse(byteToString(penT.split(',')));
		iv  = CryptoJS.enc.Utf8.parse(byteToString(ivT.split(',')));
	}
	var decrypted = CryptoJS.AES.decrypt(message, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC
	});
	return CryptoJS.enc.Utf8.stringify(decrypted);
};

/* change $.ajax */
(function($){
    //首先备份下jquery的ajax方法
    var _ajax = $.ajax;
    //重写jquery的ajax方法
    $.ajax = function (opt) {
		// 如果符合条件 就加密
		if (typeof opt.beforeSend !== 'function' && !opt.noEncrypt && ((opt.url.indexOf('https://op.clientaccess.10086.cn/') > -1||opt.url.indexOf('https://app.10086.cn/') > -1) && opt.url.indexOf('.json') < 0)) {
			opt.data = encryptByAES(opt.data)
			opt.beforeSend = function(request) {
				request.setRequestHeader('x-qen', '1');
            }
		}
		if (opt.url.indexOf('?undefined=') < 0) {
			opt.url = opt.url.replace('?undefined', '')
		}
        //备份opt中error和success方法
        var fn = {
			success: function(data, textStatus){}
        }

        if(opt.success){
            fn.success = opt.success;
        }

        // ajax 扩展增强处理
        var _opt = $.extend(opt, {
            // 成功之后需要解密 载回调
            success: function(data, textStatus, request){
				// 如果有这个 x-pen 就说明返回数据是加密的
				if (request.getResponseHeader('x-pen') === '1') {
					// 返回格式必须为 json 所以后台套了个 body 让数据变成 json 格式， 其实真实的数据是 body 的 值
					data = decryptByAES(data.body)
					data = JSON.parse(data);
				}
                fn.success(data, textStatus,request);
            }
        });
        return _ajax(_opt);
    };
})(jQuery);

/**
 * 公共的js
 */
var publicClient = {
	/**
	 * 获取并设置当前的ip和端口号，给手机客户端跳转用
	 * v2.1北京二期灰度环境(客户端接入地址)：https://clientaccess.10086.cn/leadeon-cmcc-biz-V2.1-test/
	 * v2.0北京二期正式环境(客户端接入地址)：https://clientaccess.10086.cn/leadeon-cmcc-biz/
	 * 西安内网测试商城：http://192.168.10.101:6088/biz-orange/
	 * 西安外网测试商城：http://111.20.119.234:9080/biz-orange/
	 */
	hostport: "https://app.10086.cn/biz-V2.2/",
	/**
	 * v2.2西安外网地址：http://111.20.119.234:9080/biz-orange/
	 * v2.2灰度地址：https://app.10086.cn/biz-V2.2/
	 * v2.2正式地址：https://app.10086.cn/biz-orange/
	 */
	/**
	 * 2.2推送接口地址
	 * 西安测试内网环境：http://192.168.10.113:8090/leadeon-cmcc-pushServerbiz-V2.2/
	 * 西安测试外网环境：http://111.20.119.234:2113/leadeon-cmcc-pushServerbiz-V2.2/
	 * 北京正式环境：https://push.clientaccess.10086.cn/leadeon-cmcc-pushServerbiz-V2.2/
	 */
	hostport_PUSH: "https://push.clientaccess.10086.cn/leadeon-cmcc-pushServerbiz-V2.2/",
	/**
	 * 跳转到流量充值地址
	 */
	flow:"https://app.10086.cn/leadeon-flow/",
	/**
	 * 根据传过来的字符串返回时间格式的字符串：年月日时分秒
	 * 201410101224,如果大于13位就显示秒，小于13位就不显示秒
	 * return 2014-10-10 12:24
	 */
	getDateString: function (da) {
		var year = da.substring(0, 4);
		var month = da.substring(4, 6);
		var day = da.substring(6, 8);
		var hour = da.substring(8, 10);
		var minute = da.substring(10, 12);
		var ordertime = "";
		if (da.length > 13) {
			var ss = da.substring(12, 14);
			ordertime = year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + ss;
		} else {
			ordertime = year + "-" + month + "-" + day + "  " + hour + ":" + minute;
		}
		return ordertime;
	},
	/**
	 * 小数点后两位处理办法
	 * @param mon
	 * eg1：mon = 50 return 50.00；
	 * eg2 ：mon = 50.000 return 50.00
	 */
	floating: function (mon) {
		var mon = Math.floor(mon * 1000) / 1000;
		var sMon = String(mon); //把数字类型转换成字符串类型
		var demical = sMon.indexOf("."); //取得小数点号的位置
		if (demical > 0) {
			var subb = sMon.substring(0, demical + 3); //取开始位置到小数点后2位
			mon = (Number(subb)); //转换成数字
		}
		mon = mon.toFixed(2);
		return mon;
	},
	/**
	 * js获取项目根路径，如： http://localhost:8080/leadeon-cmcc-static
	 */
	getRootPath: function () {
		var hrefs = window.document.location.href; //得到地址的地址
		var pos = hrefs.indexOf(window.document.location.pathname);
		var localhostPaht = hrefs.substring(0, pos);
		//获取主机地址之后的目录，如：leadeon-cmcc-static/v2.0/js/public/publicClient.js
		var pathName = window.document.location.pathname;
		//获取带"/"的项目名，如：/leadeon-cmcc-static
		var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
		return localhostPaht + projectName;
	},
	/**
	 * 对ajax中data中的数据封装
	 * @param objJson 手机客户端json对象
	 * @param objPam reqBody里面的json对象
	 */
	getAjaxData: function (objJson, objPam) {
		//推送标识
		var cid = !!objJson.CID ? objJson.CID : objJson.cid;
		//加密级别
		var en = !!objJson.EN? objJson.EN : objJson.en;
		//会话信息
		var t = !!objJson.TOKEN? objJson.TOKEN : objJson.token;
		//设备型号
		var sn = !!objJson.SN ? objJson.SN : objJson.sn;
		//客户端版本号
		var cv = !!objJson.VERSION ? objJson.VERSION : objJson.version;
		//系统类型 int
		var st = !!objJson.ST ? objJson.ST : objJson.st;
		//系统版本号
		var sv = !!objJson.SV ? objJson.SV : objJson.sv;
		//屏幕分辨率
		var sp = !!objJson.SP ? objJson.SP : objJson.sp;
		//客户端安全ID
		var xk = !!objJson.XK ? objJson.XK : objJson.xk;
		//渠道编码
		var xc = !!objJson.CHANNEL ? objJson.CHANNEL : objJson.channel;
		var imei=!!objJson.imei? objJson.imei:"";
		//联网方式
		var nt=!!objJson.nt? objJson.nt:"";
		//手机品牌
		var sb=!!objJson.sb? objJson.sb:"";
		//选择的省编码
		var prov=!!objJson.PROVINCE? objJson.PROVINCE:objJson.province;
		//选择的城市编码
		var city=!!objJson.CITY? objJson.CITY:objJson.city;
		//登录手机号
		var tel=!!objJson.USERPHONENUM? objJson.USERPHONENUM:objJson.phoneNumber;
		return JSON.stringify({
			"cid": cid,
			"en": en,
			"t": t,
			"sn": sn,
			"cv": cv,
			"st": st,
			"sv": sv,
			"sp": sp,
			"xk": xk,
			"xc":xc,
			"imei":imei,
			"nt":nt,
			"sb":sb,
			"prov":prov,
			"city":city,
			"tel":tel,
			"reqBody": objPam
		});
	},

	/**
	 *  调查问卷 （每次进入页面 3秒后展示蒙层，点击可跳转；不点击5秒后消失）
	 *  @param {Object} userInfo  用户信息
	 *  @param {String} uid  登录用户uid
	 *  @param {String} telNo  登录用户加密手机号
	 *  @param {String} pageFlag  页面标识
	 *  @param {String} type  分享类型 必须是字符串（否则ios打开新页面带分享app会奔溃）
	 */
	showExamine: function(userInfo, uid, telNo, pageFlag, type){
		// 进入页面时间
		var startTime = new Date().getTime()
		$.ajax({
			// type: 'get',
			// url: '../../jsonData/flowArea/getQuaryShake.json',
			type: 'post',
			url: publicClient.hostport + 'DH/quaryShake/getData?' + userInfo.token,
			data: publicClient.getAjaxData(userInfo, {
				provinceCode: userInfo.loginProvince,
				cityCode: userInfo.loginCity,
				pageFlag: pageFlag
			}),
			dataType: 'json',
			timeout: 30000,
			success: function (data) {
				if (data.retCode === '000000' && data.rspBody && data.rspBody.shakeData && data.rspBody.shakeData.markName) {
					var shakeData = data.rspBody.shakeData
					var endTime = new Date().getTime()
					// 接口花费时间
					var remainTime = (endTime - startTime) < 3000 ? (endTime - startTime) : 0;
					// 剩余时间（接口请求时间大于等于3000毫秒）则剩余时间为0 即立即显示蒙层
					//        （接口请求时间小于3000毫秒）则剩余时间为 3000 - 接口花费时间
					var restTime = remainTime === 0 ? 0 : 3000 - remainTime;
					if("undefined" == typeof ($(".examine").attr("id")) || undefined == $(".examine").attr("id")){ //调查问卷层不存在
						var str = '<div id="examine" class="examine"><div class="text ellipsis">' + shakeData.markName + '</div><div class="close"></div></div>';
						// 进入页面3秒后显示
						setTimeout(function(){
							$("body").append(str)
							$('.examine').fadeIn()
							// android文字不居中
  							if (navigator.userAgent.indexOf('Android') > -1) {
								$('.examine .text').css({'padding-top':'0.170667rem'})
							}
							// 不点击5秒后消失
							setTimeout(function(){
								$('.examine').fadeOut('normal', function(){ $('.examine').remove() })
							}, 5000)
						}, restTime)
						// 点击关闭
						$(".examine .close").unbind() //移除点击事件
						$("body").on("click", '.examine .close', function(ev){
							ev.stopPropagation()
							$('.examine').fadeOut('normal', function(){ $('.examine').remove() })
						})
						// 点击跳转
						$("body").on("click", '.examine', function(){
							publicClient.setWebtrends(userInfo, 'llzq_wjdc',  {'WT.markId': shakeData.markId}); //插码
							// 单点统计
							publicClient.printLog({
								"adverType": '125',
								"markId": shakeData.markId || '0'
							}, userInfo)
							if (!!shakeData.markUrl) {
								if (shakeData.markType == 1) { //H5或自定义分组
									if (shakeData.shareConfig == 1) { // 有分享
										publicClient.openshare({ markId: shakeData.markId, type: type, funCode: '', bizCode: '', url: shakeData.markUrl })
									} else { // 无分享
										publicClient.openshare({ markId: '', type: '', funCode: '', bizCode: '', url: shakeData.markUrl })
									}
								} else if (shakeData.markType == 2) { //H5 +传参
									if (shakeData.loginType == 1) { //强制登录
										if (!userInfo.phoneNumber) { //未登录
											leadeon.showLogin(); //拉起登录
										} else {
											//用户已登录 登录状态也相应更改
											publicClient.examineJump(shakeData, type, userInfo, uid, telNo); //进行跳转前的逻辑处理
										}
									} else if (shakeData.loginType == 2) { //非强制登录
										publicClient.examineJump(shakeData, type, userInfo, uid, telNo); //进行跳转前的逻辑处理
									}
								}
							}
						})
					}
				}
			}
		});
	},

    /**
     * H5+传参形式的页面跳转
     * @param {Object} data  内容数据
	 * @param {String} type  分享类型
	 * @param {Object} userInfo  用户信息
	 * @param {String} uid  登录用户uid
	 * @param {String} telNo  登录用户加密手机号
    */

    examineJump: function (data, type, userInfo, uid, telNo) {
        var ssoUrl = data.ssoUrlAddr; //URL传参地址 是sso登录时才有此值
        var isSso = data.isSso; //是否SSO  1：是；0：否
        var loginType = data.loginType;
        var questionMarkIndex = data.markUrl.indexOf("?"); //？首次出现的位置
		var paramListUrl = publicClient.getParamListUrl(data.paramList, userInfo, uid, telNo); //参数拼接
        var URL = '';
        if (isSso == 0) { //非sso再进行这个操作
            //判断URL有没有问号，若没有则第一个参数前为？，若有则是&
            if (questionMarkIndex == -1) { //没有问号
                data.markUrl += '?'; //加上问号
                paramListUrl = paramListUrl.substring(1); //去掉前面的&
            } else if (data.markUrl.substring(questionMarkIndex) == '?') {
                paramListUrl = paramListUrl.substring(1); //去掉前面的&
            }
        }
        if (loginType == 1) { //强制登录
            if (isSso == 1) { //已登录并且是SSO，SSO地址+正常地址+参数+时间戳
                var timestamp = new Date().getTime(); //若是sso跳转，则要加上时间戳
                URL = ssoUrl + data.markUrl + paramListUrl + "&timestamp=" + timestamp;
            } else { //已登录且不是SSO，正常地址+参数
                URL = data.markUrl + paramListUrl;
            }
        } else if (loginType == 2) { //非强制登录，正常地址+参数
            URL = data.markUrl + paramListUrl;
        } else {
            URL = data.markUrl
        }
        if (URL != '') {
			if (data.shareConfig == 1) { // 有分享
				publicClient.openshare({ markId: data.markId, type: type, funCode: '', bizCode: '', url: URL })
			} else { // 无分享
				publicClient.openshare({ markId: '', type: '', funCode: '', bizCode: '', url: URL })
			}
        }
    },

	/**
     * 拼装url参数
     * @param {Object} paramList 参数集合
     * @param {Object} userInfo 客户端userInfo
	 * @param {String} uid  登录用户uid
	 * @param {String} telNo  登录用户加密手机号
    */
    getParamListUrl: function (paramList, userInfo, uid, telNo) {
		if (!!paramList && paramList.length > 0) {
			var arr = [];
				paramListUrl = '';
			for (var i = 0; i < paramList.length; i++) {
				arr.push(paramList[i].paramId)
			}
			for (var i = arr.length - 1; i >= 0; i--) {
				if (arr[i] == 'UID') {
					paramListUrl += '&' + uid;
				} else if (arr[i] == 'provinceCode') {
					paramListUrl += '&provinceCode=' + userInfo.province;
				} else if (arr[i] == 'cityCode') {
					paramListUrl += '&cityCode=' + userInfo.city;
				} else if (arr[i] == 'clientVer') {
					paramListUrl += '&clientVer=' + userInfo.version;
				} else if (arr[i] == 'devType') {
					paramListUrl += '&devType=' + userInfo.st;
				} else if (arr[i] == 'clientId') {
					paramListUrl += '&clientId=' + userInfo.clientID;
				} else if (arr[i] == 'scnType') {
					paramListUrl += '&scnType=' + userInfo.sp;
				} else if (arr[i] == 'telNo') {
					paramListUrl += '&telNo=' + telNo;
				} else {
					paramListUrl += '&' + arr[i] + '=no' //每一项都没有那么都带上no
				}
			}
			return paramListUrl;
		} else {
			return '';
		}
	},


	/**
	 * 加载层
	 */
	showLoadPlug: function () {
    // 定制结构
	// 	var html =
	// 		'<div class="js-loading-bg">' +
	// 			'<div class="js-loading-main">' +
	// 				'<div class="js-loading-cmcc"></div>' +
	// 				'<div class="js-loading-dots">' +
	// 					'<i></i>' +
	// 					'<i></i>' +
	// 					'<i></i>' +
	// 				'</div>' +
	// 			'</div>' +
	// 		'</div>';

    // // 如果没有loading
    // var $loading = $('.js-loading-bg');
	// 	if ($loading.length == 0) {
	// 		$('body').append(html)
	// 	} else {
	// 		$loading.show()
	// 	}
		if("undefined" == typeof ($(".load-plug").attr("id")) || undefined == $(".load-plug").attr("id")){ //加载层不存在
			var row = "<div class='load-plug' id='load-plug'><div class='o-wrap'><div class='o-lay'><div class='loading'></div>";
				row += "</div></div></div>";
			$("body").append(row);
			$(".load-plug").unbind(); //移除点击事件
			$(".load-plug").on("click",function(){  //移除加载层
				$(this).remove();
			});
		}
},
	/**
	 * 关闭加载层(调用html5)
	 */
	closeLoadPlug: function () {
		// if ($('.js-loading-bg').length > 0) {
		// 	$('.js-loading-bg').hide()
		// }
		if("undefined" != typeof ($(".load-plug").attr("id")) && undefined != $(".load-plug").attr("id")){ //加载层存在

			$(".load-plug").remove();
		}
	},
	/**
	 * 展示信息提示弹出框(调用html5)
	 * @param msg 提示信息
	 * @param bt 按钮上的文字
	 */
	showDialogPlug: function (msg, bt) {

		if ("undefined" == typeof ($(".dialog-plug").attr("id")) || undefined == $(".dialog-plug").attr("id")) { //提示框不存在
			var row = "<div class='dialog-plug' id='dialog-plug'><div class='d-wrap'><div class='d-lay'><div class='d-con'>" +
				"<p class='d-tex onepx'>" + msg + "</p><p class='d-btn'>" + bt + "</p></div></div></div></div>";
			$("body").append(row);

			$(".dialog-plug .d-btn").unbind(); //移除点击事件
			$(".dialog-plug .d-btn").fastClick(function (e) { //移除加载层
				//				alert(msg)
				$(".dialog-plug").remove();
				e.preventDefault(); // 防止fastClick点击穿透
			});
		} else {
			$(".dialog-plug .d-tex").html(msg);
			$(".dialog-plug .d-btn").html(bt);
		}
	},
	/**
	 * toast信息提示
	 * @param {Object} msg 提示信息
	 * @param {Object} time 设置显示时长  单位为毫秒
	 */
	toastPlug: function (msg, time) {
		if ("undefined" == typeof ($(".toast").attr("id")) || undefined == $(".toast").attr("id")) { //提示框不存在
			var row = "<div class='toast' id='toast' style='width: 100%; position: fixed; top: 50%; text-align: center; z-index: 999999'>";
			row += "<p id='toa-text' style='color:#FFFFFF;background-color:rgba(0,0,0,0.8); display: inline-block; margin: auto; border-radius: 3px; padding: 8px 10px;'>" + msg + "</p>";
			row += "</div>";
			$("body").append(row);
			$(".toast").fadeIn(1000);
			setTimeout(function () {
				$(".toast").fadeOut(1000);
			}, time);
		} else {
			$("#toa-text").html(msg);
			$(".toast").fadeIn(1000);
			setTimeout(function () {
				$(".toast").fadeOut(1000);
			}, time);
		}
	},

	/**
	 * toast信息提示   msg：提示信息文字；time：设置时长；type：1,成功；2,失败；3,警告；4,提示；callback：回调；
	 */
	toastPrompt: function(msg, time, type, callback) {
		// 开始标签
        var template = '';
        // 图片路径
        var img = '';
        // 提示信息
        var prompt = '<p>' + msg + '</p>';
        // 结束标签
		var end = '</div>'

		switch(type) {
			case 1:
				img = '<p class="toast-img toastIcon-success"></p>';
				break;
			case 2:
				img = '<p class="toast-img toastIcon-error"></p>';
				break;
			case 3:
				img = '<p class="toast-img toastIcon-remind"></p>';
				break;
		}

		if(type == 4) {
			template += '<div class="toastBlock toast-big">' + prompt + end;
		}else {
			template += '<div class="toastBlock toast-small">' + img + prompt + end;
		}

		$('body').append(template);
		$('.toastBlock').fadeIn(500);
		setTimeout(function() {
			$('.toastBlock').fadeOut(500, function() {
				$(this).remove();
				// 回调
				if(typeof callback === 'function') {
					callback();
				}
			});
		}, time)
	},

	/**
	 * boxtoast提示
	 * @param {Object} msg 提示信息
	 * @param {boolean} isright 提示类型 正确的还是错误的
	 * @param {Object} time 设置显示时长  单位为毫秒
	 */
	boxToastPlug: function (msg, isright, time) {
		if ("undefined" == typeof ($(".boxToast").attr("id")) || undefined == $(".boxToast").attr("id")) { //提示框不存在
			console.log(11111111111)
			var row = '<div id="BoxToastPlug" class="boxToast"><div class="boxToast-box">';
			if(isright){
				row += '<div class="boxToast-icon icon-right"></div>';
			}else{
				row += '<div class="boxToast-icon icon-left"></div>';
			}
			row += '<p class="boxToast-text">' + msg + '</p></div></div>';
			$("body").append(row);
			$(".boxToast").fadeIn(1000);
			setTimeout(function () {
				$(".boxToast").fadeOut(1000);
			}, time);
		} else {
			$("#BoxToastPlug .boxToast-text").html(msg);
			$(".boxToast").fadeIn(1000);
			setTimeout(function () {
				$(".boxToast").fadeOut(1000);
			}, time);
		}
	},
	/**
	 * 单个按钮带回掉提示框
	 */
	singleButBack: function (msg, btntxt, confirm) {
		var row = '<div class="lookOuterDiscounted" id="lookOuterDiscounted"><div class="contentBox"><div class="text onepx">' + msg + '</div><div class="btnOuter" id="btnOuter">' + btntxt + '</div></div></div>';
		if (!!$("#lookOuterDiscounted")) {
			$(".lookOuterDiscounted").remove();
			$("#btnOuter").unbind();
		}
		$("body").append(row);
		$("#btnOuter").fastClick(function(){
			$(".lookOuterDiscounted").remove();
			confirm()
		});
	},

  /**
	 * 打开新页面携带分享参数
	 *  @param {Object} openobj
	 *     {
	 * 		  markId: 活动id,
	 *        type: 分享类型(4.0 新增),
	 *        funCode: 分享业务编码(4.0 新增),
	 *        bizCode: 功能编码,
	 *        url: 页面地址url
	 *     }
	 *
	 */
	openshare: function(openobj) {
		leadeon.newWebview({
			debug: false,
			markID: openobj.markId || '',     //活动ID
			type: openobj.type || '',         //（分享类型，内部保留字段，允许不传）  4.0 新增
			funCode: openobj.funCode || '',   //（功能编码，内部保留字段，允许不传）  4.0 新增
			bizCode: openobj.bizCode || '',   // 客户端功能编码
			url: openobj.url || '',           //跳转地址
			success: function(res) {},
			error: function(res) {}
		})
	},


	/**
	 * 确认和取消插件
	 * @param {Object} param1 左边按钮文字
	 * @param {Object} param2 右边按钮文字
	 * @param {Object} inform 提示信息
	 * @param {Object} confirm1 左边按钮js事件名字
	 * @param {Object} confirm2 右边按钮js事件名字
	 */
	confirmPlug: function (param1, param2, inform, confirm1, confirm2) {
		var row = "<div id='confirmPlug' style='position: fixed;top: 0;z-index: 1001;width: 100%;height:100%;background-color:rgba(0,0,0,0.5);color:#333333;font-size:14px;'>";
		row += "<div style='width: 100%;height: 100%;display:table;'>";
		row += "<div style='vertical-align:middle; display:table-cell;'>";
		row += "<div id='inform' style='background-color: #FFFFFF; width:70%; max-width: 300px; min-width: 250px; margin: auto; text-align:center; border-radius: 6px;word-wrap:break-word;word-break:break-all'>";
		row += "<p class='confirmPlug-text onepx' style='padding:20px 15px 15px; font-size:15px;'>" + inform + "</p>";
		row += "<div style='width: 100%; color: #0085CF; font-size:16px;'>";
		row += "<div class='confirmPlug-btn onepx' style='float:left;width: 50%; text-align: center; margin-left: -1px;' id='c-left'><p style='padding: 12px 0;'>" + param1 + "</p></div>";
		row += "<div style='float:left;width: 50%; text-align: center;' id='c-right'><p style='padding: 12px 0;'>" + param2 + "</p></div>";
		row += "<div style='clear: both;'></div>";
		row += "</div></div></div></div></div>";
		if (!!$("#confirmPlug")) {
			$("#confirmPlug").remove();
			$("#c-left").unbind();
			$("#c-right").unbind();
		}
		$("body").append(row);
		$("#c-left").fastClick(function (e) { //点击左边按钮事件
			confirm(confirm1);
		});
		$("#c-right").fastClick(function (e) { //点击右边按钮事件
			confirm(confirm2);
		});
		//通用的部分,confirmS方法名字
		function confirm(confirmS) {
			if ("delete" == confirmS || null == confirmS || "" == confirmS) {
				$("#confirmPlug").remove();
				$("#c-left").unbind();
				$("#c-right").unbind();
			} else {
				$("#confirmPlug").remove();
				$("#c-left").unbind();
				$("#c-right").unbind();
				confirmS(); //执行js方法
			}
		}
	},
	/**
	 *判断客户端是iOS还是Android等移动终端
	 */
	versions: function () {
		var u = navigator.userAgent;
		return {
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios系统
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或系统
			wp: u.indexOf('IEMobile') > -1, //Windows Phone系统
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			Safari: u.indexOf("Safari") > -1, //判断是否Safari浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') > -1 //是否web应该程序，没有头部与底部
		};
	}(),
	/**
	 * 主动获取客户端信息(调用客户端的)
	 * @param objFun 为传入js对象的回调方法
	 */
	getUserInfo: function (objFun) {
		var msg = {
			"CODE": 100,
			"BUSINESSNAME": "getUserInfo"
		};
		fashion.invokeMobile(msg, objFun);
	},
	/**
	 * 重新鉴权回到登陆页面(调用客户端的)
	 */
	repeatLogon: function () {
		var codeM;
		if(publicClient.versions.android){
			codeM = 28
		} else {
			codeM = 5
		}
		var msg = {
			"CODE": codeM,
			"BUSINESSNAME": "repeatLogon"
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 设置页面标题(调用客户端的)
	 */
	setTitle: function (title) {
		var msg = {
			"CODE": 8,
			"BUSINESSNAME": "setTitle",
			"TITLE": title
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 弹出框(调用客户端的)
	 * @param MESSAGE 提示内容
	 * @param FLAG 业务标示
	 * @param LEFTTEXT 左按钮显示内容
	 * @param RIGHTTEXT 右按钮显示内容
	 */
	showDialog: function (MESSAGE, FLAG, LEFTTEXT, RIGHTTEXT) {
		var msg = {
			"CODE": 9,
			"BUSINESSNAME": "showDialog",
			"MESSAGE": MESSAGE,
			"FLAG": FLAG == null ? "" : FLAG,
			"LEFTTEXT": LEFTTEXT == null ? "" : LEFTTEXT,
			"RIGHTTEXT": RIGHTTEXT == null ? "" : RIGHTTEXT
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 立即支付，
	 * @param {String} SESSIONID 订单令牌
	 * @param {String} TYPE 支付类型，0，商户客户端发起的订单(sesionid(需要补录)，如：交通罚款；或订单号，如：生活缴费：水电等)
						1，cmpay直接支付订单(订单号)
						2，缴话费订单（包括和聚宝充值）
						3，收付款；
						4，和聚宝；
						5，电子券；
						6，付款到银行；
						7，省网厅缴话费模式(sesionid代替订单号)；
						8，集团网厅缴话费模式(sesionid代替订单号)；
	 * @param {String} CALLBACKURL 支付完毕打开的页面
	 * @param {String} objFun 为传入js对象的回调方法
	 */
	payiPos: function (SESSIONID, TYPE, CALLBACKURL, objFun) {
		var msg = {
			"CODE": 14,
			"BUSINESSNAME": "payiPos",
			"SESSIONID": SESSIONID,
			"TYPE": TYPE,
			"CALLBACKURL": CALLBACKURL
		};
		fashion.invokeMobile(msg, objFun);
	},
	/**
	 * 分享显示和隐藏
	 * @param {Object} BUSINESSNAME JS回调名称
	 * @param {Object} ob int 类型，1 表示隐藏，0表示显示
	 */
	shareStore: function (BUSINESSNAME, ob) {
		var msg = {
			"CODE": 16,
			"BUSINESSNAME": BUSINESSNAME,
			"FLAG": ob
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 打开新页面(2.6修改)
	 * @param {String} url
	 * @param {String} MARKID 活动id
	 * @param {String} refreshFlag 打开的页面是否需要被刷新传true或false，默认不传为false
	 */
	openNewPage: function (url, MARKID, refreshFlag) {
		if ('undefined' === typeof MARKID) {
			MARKID = "";
		}
		var refreshFlagOne = false;
		if (!!refreshFlag) {
			refreshFlagOne = refreshFlag;
		}
		var msg = {
			"CODE": 21,
			"BUSINESSNAME": "openNewPage",
			"refreshFlag": refreshFlagOne,
			"MARKID": MARKID,
			"URL": url
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 拉起登陆
	 */
	showlogin: function () {
		var msg = {
			"CODE": 22,
			"BUSINESSNAME": "showlogin"
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 获取用户登录状态
	 * @param objFun 为传入js对象的回调方法
	 */
	isLogin: function (objFun) {
		var msg = {
			"CODE": 23,
			"BUSINESSNAME": "isLogin"
		};
		fashion.invokeMobile(msg, objFun);
	},
	/**
	 * 分享接口调用2.3版本修改
	 * @param CONTENT 分享内容
	 * @param TITLE 分享标题
	 * @param IMAGE 分享图片URL
	 * @param URL 点击后跳转链接
	 */
	shareMsg: function (CONTENT, TITLE, IMAGE, URL) {
		var msg = {
			"CODE": 24,
			"BUSINESSNAME": "shareMsg",
			"CONTENT": CONTENT,
			"TITLE": TITLE,
			"IMAGE": IMAGE,
			"URL": URL
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 属于2.4客户端新能力，2.4以下版本不能使用
	 * 跳转客户端指定位置
	 * @param {String} BUSCODE
	 */
	jump: function (BUSCODE) {
		var msg = {
			"CODE": 60,
			"BUSCODE": BUSCODE
		};
		fashion.invokeMobile(msg, publicClient.test_cb)
	},

	/**
	 * 调用发送短信功能
	 * @param {String} CONTENT
	 * @param {String} USERPHONENUM
	 */
	sms: function (CONTENT, USERPHONENUM) {
		var msg = {
			"CODE": 25,
			"BUSINESSNAME": "sms",
			"CONTENT": CONTENT,
			"USERPHONENUM": USERPHONENUM
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 拨打电话（V2.2新增）
	 * @param {String} PHONENUMBER 手机号码
	 */
	callPhoto: function (PHONENUMBER) {
		var msg = {
			"CODE": 54,
			"BUSINESSNAME": "CallPhone",
			"PHONENUMBER": PHONENUMBER
		};
		fashion.invokeMobile(msg, publicClient.test_cb);
	},
	/**
	 * 获取Token
	 * @param {String} objFun 为传入js对象的回调方法
	 */
	getToken: function (objFun) {
		var msg = {
			"CODE": 27,
			"BUSINESSNAME": "getToken"
		};
		fashion.invokeMobile(msg, objFun);
	},
	/**
	 * 调用手机通讯录
	 * @param {String} objFun 为传入js对象的回调方法
	 */
	getContacts: function (objFun) {
		var msg = {
			"CODE": 29,
			"BUSINESSNAME": "getContacts"
		};
		fashion.invokeMobile(msg, objFun);
	},
	/**
	 * 手机号码查询通讯录姓名
	 * @param {String} objFun 为传入js对象的回调方法
	 * @param {String} phoneNo 手机号
	 */
	getContactName: function (objFun, phoneNo) {
		var msg = {
			"CODE": 30,
			"BUSINESSNAME": "getContactName",
			"USERPHONENUM": phoneNo
		};
		fashion.invokeMobile(msg, objFun);
	},
	/**
	 * 加密功能(2.6新增)
	 * @param {Object} objFun
	 * @param {Object} str
	 */
	encryptString: function (objFun, str) {
		var msg = {
			"CODE": 63,
			"BUSINESSNAME": "encryptString",
			"str": str
		};
		fashion.invokeMobile(msg, objFun);
	},
	/**
	 * js去除字符串内所有的空格
	 */
	removeSpace: function (obj) {
		if (null != obj) {
			return obj.replace(/\s/ig, "");
		} else {
			return "";
		}
	},
	/**
	 * 截取url字符串
	 * @param {Object} name
	 */
	getQueryString: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (null != r) return decodeURIComponent(r[2]);
		return null;
	},
	/**
	 * 对url进行解码
	 * @param {Object} url
	 * return 返回json对象
	 */
	curParam: function (url) {
		//对url进行解码
		url = decodeURI(url);
		var obj = new Object();
		var paramStr = url.substring(url.indexOf("?") + 1, url.length);
		var paramArr = paramStr.split("&");
		for (var i = 0; i < paramArr.length; i++) {
			var objArr = paramArr[i].split("=");
			obj[$.trim(objArr[0])] = objArr[1] ? objArr[1] : "";
		}
		return obj;
	},
	/**
	 * 序列化json为参数
	 * <desc> 将json对象序列化为http get参数  </desc>
	 * <desc> {"a":"123","b":"456"} 序列化为 a=123&b=456</desc>
	 * @param {Object} jsonObject
	 */
	serializeJson: function (jsonObject) {
		var str = "";
		for (var name in jsonObject) {
			str += "&" + name + "=" + ((jsonObject[name]) ? jsonObject[name] : "");
		}
		if (null != str && "" != str) {
			str = str.substring(1, str.length);
		}
		return str;
	},

	/**
	 * 判断请求返回的状态码是否是session失效
	 * 如果返回true，则需要调用publicClient.repeatLogon();
	 * 返回false，则各业务自己处理
	 * @param {Object} retCode
	 */
	sessionFailure: function (retCode) {
		var flag = false;
		//以4开头的六位数字，即为会话失败
		if (/^4\d{5}$/.test(retCode)) {
			flag = true;
		}
		return flag;
	},
	/**
	 * 判断会话是否失效，如果失效跳转登陆，不失效提示信息
	 * @param {Object} data 后台返回的json数据
	 * @param {Object} btn 按钮的文字信息
	 */
	sessionFailurePrompt: function (data, btn) {
		publicClient.closeLoadPlug(); //关闭加载
		var flag = false;
		//以4开头的六位数字，即为会话失败
		if (/^4\d{5}$/.test(data.retCode)) {
			flag = true;
		}
		if (flag) { //先判断是否为会话校验失败
			//判断leadeon对象是否存在
			if(!!leadeon)
			{
				leadeon.overTime();
			}
			else
			{
				publicClient.repeatLogon();
			}
		} else if ("1" == data.retCode.substring(1, 2)) { //如果第二位是1就弹窗提示
			publicClient.showDialogPlug(data.retDesc, btn ? btn : "知道了");
		} else if ("2" == data.retCode.substring(1, 2)) { //如果第二位是2就toast提示
			publicClient.toastPlug(data.retDesc, 3000);
		} else {
			publicClient.showDialogPlug(data.retDesc, btn ? btn : "知道了");
		}
	},
	/**
	 * leadeon.js新能力专用会话失效
	 * 判断会话是否失效，如果失效跳转登陆，不失效提示信息
	 * @param {Object} data 后台返回的json数据
	 * @param {Object} btn 按钮的文字信息
	 */
	new_sessionFailurePrompt: function (data, btn) {
		publicClient.closeLoadPlug(); //关闭加载
		var flag = false;
		//以4开头的六位数字，即为会话失败
		if (/^4\d{5}$/.test(data.retCode)) {
			flag = true;
		}
		if (flag) { //先判断是否为会话校验失败
			leadeon.overTime();
		} else if ("1" == data.retCode.substring(1, 2)) { //如果第二位是1就弹窗提示
			publicClient.showDialogPlug(data.retDesc, btn ? btn : "知道了");
		} else if ("2" == data.retCode.substring(1, 2)) { //如果第二位是2就toast提示
			publicClient.toastPlug(data.retDesc, 3000);
		} else {
			publicClient.showDialogPlug(data.retDesc, btn ? btn : "知道了");
		}
	},
	/**
	 * 获取历史记录
	 * @param {Object} name  本地存储变量名称
	 * @param {Object} amount  存储数目
	 */
	getHistory: function (name, amount) {
		if (window.localStorage) //如果支持本地存储
		{

			var his = localStorage.getItem(name);
			//      	alert("getHistory="+his);
			if (null != his && "" != his.trim()) { //如果数据不为空
				var hisList = his.split("-");
				if (hisList.length > amount) {

					var tt = hisList.length - amount;
					for (var i = 0; i < tt; i++) {
						hisList.splice(0, 1); //移除数组前面多余的内容
					}
					for (var i = 0; i < hisList.length; i++) {
						if (i == 0) {
							his = hisList[i];
						} else {
							his = his + "-" + hisList[i];
						}
					}
					localStorage.setItem(name, his); //把移除了多余的历史记录的手机号存储到本地
				}
				hisList.reverse(); //倒序
				return hisList;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	/**
	 * 设置历史
	 * @param {Object} name  定义变量名称
	 * @param {Object} cont  历史内容
	 */
	setHistory: function (name, cont) {

		if (window.localStorage) { //如果支持本地存储
			var his = ""; //历史记录的字符串
			var hisList = publicClient.getHistory(name); //获取历史记录集合
			if (null != hisList && 0 < hisList.length) { //如果号码历史记录不为null，则将历史内容去重复后添加至尾部；否则将直接存储。
				var tempHisList = new Array();
				for (var i = 0; i < hisList.length; i++) {
					if (hisList[i] != cont) { //如果存储内容在历史记录中不存在，则添加到临时数组中
						tempHisList.push(hisList[i]);
					}
				}
				tempHisList.reverse(); //进行倒序排序，因为获取到的hisList是倒序排序后的集合。
				tempHisList.push(cont); //将当前号码添加到集合尾部
				his = tempHisList.join("-"); //用‘-’连接号码
			} else {
				his = cont; //直接存储
			}
			localStorage.setItem(name, his); //本地存储
		}
	},
	/**
	 * 插码
	 * @param {Object} objJson 手机客户端json对象
	 * @param {String} objID 当前点击元素的id
	 * @param {Object} objADD 新增的json对象
	 */
	setWebtrends: function (objJson, objID, objADD) {
		try {
			//代码兼容
			var cid = "undefined" == (typeof objJson.CID) ? objJson.cid : objJson.CID;
			var cv = "undefined" == (typeof objJson.VERSION) ? objJson.version : objJson.VERSION;
			var channel = "undefined" == (typeof objJson.CHANNEL) ? objJson.channel : objJson.CHANNEL;
			var province = "undefined" == (typeof objJson.PROVINCE) ? objJson.province : objJson.PROVINCE;
			var city = "undefined" == (typeof objJson.CITY) ? objJson.city : objJson.CITY;
			var userphonenum = "undefined" == (typeof objJson.USERPHONENUM) ? objJson.phoneNumber : objJson.USERPHONENUM;
			var osType = "undefined" == (typeof objJson.OSTYPE) ? objJson.osType : objJson.OSTYPE;
			if (!!objJson.ostype) {
				osType = objJson.ostype
			}
			if (!!_tag) {
				_tag.setMobile(userphonenum)
			}
			if ("undefined" != (typeof channel) && "" != channel) {
				var av = "APP_" + osType + "_" + cv;
				var argsSet = {
					"WT.cid": cid,
					"WT.prov": province,
					"WT.city": city,
					"WT.mobile": userphonenum,
					"WT.channel": channel,
					"WT.aav": cv,
					"WT.av": av,
					"WT.event": objID
				};
				if (undefined != objADD && "" != objADD) {
					for (var key in objADD) {
						argsSet[key] = objADD[key];
					}
				}
				Webtrends.multiTrack({
					args: argsSet
				});
			}
			else
	   		{
	   			if(publicClient.versions.mobile)
	   			{
	   				channel="web";
	   			}
	   			else
	   			{
	   				channel="pc";
	   			}
	   			//如果渠道号是web说明是在浏览器中，和杨杰协商的
	   			var argsSet={"WT.channel":channel,"WT.event":objID};
	   			Webtrends.multiTrack({args:argsSet});
	   		}
		} catch (e) {}
	},
	/**
	 * 广告点击量统计
	 * @param {Object} data  对象，传入数据参考接口编码40012
	 * @param {Object} jsons 获取的用户信息
	 */
	printLog: function (data, objJson) {
		try {
			var userphonenum = "undefined" == (typeof objJson.USERPHONENUM) ? objJson.phoneNumber : objJson.USERPHONENUM;
			var cv = "undefined" == (typeof objJson.VERSION) ? objJson.version : objJson.VERSION;
			var province = "undefined" == (typeof objJson.PROVINCE) ? objJson.province : objJson.PROVINCE;
			var city = "undefined" == (typeof objJson.CITY) ? objJson.city : objJson.CITY;
			var sysType = ""; //系统类型
			if (publicClient.versions.ios) { //ios系统
				sysType = "2";
			} else if (publicClient.versions.android) { //安卓系统
				sysType = "1";
			} else {}
			//未登录状态下取不到用户手机号码，手动赋空值
			if ('undefined' == typeof userphonenum) {
				userphonenum = "99999999999";
			}
			var adverList = [];
			if(!!data.markId)
			{
				data.markId=Number(data.markId);
			}
			data.cellNum=userphonenum;
			data.clientVer=cv;
			data.sysType=sysType;
			data.provinceCode=province;
			data.cityCode=city;
			adverList.push(data);
			//		alert(publicClient.getAjaxData(home.jsons,{"cellNum":home.jsons.USERPHONENUM,"clientVer":home.jsons.VERSION,"sysType":sysType,"provinceCode":home.jsons.PROVINCE,"cityCode":home.jsons.CITY,"adverType":adverType,"adverLocation":adverLocation,"sysTime":""}));
			$.ajax({
				type: "post",
				url: publicClient.hostport + "SA/advertisingClickNew/printLog",
				data: publicClient.getAjaxData(objJson, {
					"adverList": adverList
				}),
				dataType: "json",
				timeout: 50000,
				success: function () {

				},
				error: function (xhr, type) {}
			});
		} catch (error) {

		}
	},
	/**
	 * 功能点击量,统计
	 * @param {String} businessSteps 业务步骤
	 * @param {Object} jsons 获取的用户信息
	 */
	functionOfClicks: function (businessSteps, objJson) {

		var userphonenum = "undefined" == (typeof objJson.USERPHONENUM) ? objJson.phoneNumber : objJson.USERPHONENUM;
		var province = "undefined" == (typeof objJson.PROVINCE) ? objJson.province : objJson.PROVINCE;
		var city = "undefined" == (typeof objJson.CITY) ? objJson.city : objJson.CITY;
		var channel = "undefined" == (typeof objJson.CHANNEL) ? objJson.channel : objJson.CHANNEL;
		//未登录状态下取不到用户手机号码，手动赋99999999999
		if ('undefined' == typeof userphonenum || 'null' == typeof userphonenum || 'object' == typeof userphonenum) {
			userphonenum = "99999999999";
		}
		if ('undefined' == typeof channel) {
			channel = "#";
		}
		var funcList = [];
		var funcListJson = {
			"businessCode": "#",
			"businessSteps": businessSteps,
			"channel": channel,
			"provinceCode": province,
			"cityCode": city,
			"event": "#",
			"pageInfo": "#",
			"phoneNumber": userphonenum,
			"title": "#"
		};
		funcList.push(funcListJson);
		//		alert(publicClient.getAjaxData(home.jsons,{"cellNum":home.jsons.USERPHONENUM,"clientVer":home.jsons.VERSION,"sysType":sysType,"provinceCode":home.jsons.PROVINCE,"cityCode":home.jsons.CITY,"adverType":adverType,"adverLocation":adverLocation,"sysTime":""}));
		$.ajax({
			type: "post",
			url: publicClient.hostport + "SA/funcClickNew/printLog",
			data: publicClient.getAjaxData(objJson, {
				"funcList": funcList
			}),
			dataType: "json",
			timeout: 50000,
			success: function () {

			},
			error: function (xhr, type) {}
		});
	},
	/**
	 * 拉起客户端并且打开下载页面
	 * @param {String} targetUrl 需要在客户端内部打开的网址
	 * @param {String} functionCode 客户端编码
	 */
	pullAppDownload: function (targetUrl,functionCode) {
		//实现功能：当前浏览器或webview打开下载页面并唤起客户端，客户端内部webview打开目标网址
		var page="https://app.10086.cn/activity/transit/transferDownload.html";
		if(!!targetUrl)
		{
			page+="?targetUrl="+encodeURIComponent(targetUrl);
		}
		else if(!!functionCode)
		{
			page+="?functionCode="+functionCode;
		}
		window.location.href=page;
	},

	/**
	 * 返回距 1970 年 1 月 1 日之间的毫秒数
	 * t参数格式例子：2016-04-28 14:54
	 */
	getTime: function (t) {
		var time = new Date(Date.parse(t.replace(/-/g, "/")));
		return time.getTime();
	},

	// 获取uid
	getUid: function (token) {
		return token.match(/UID=\w+/g)[0];
	},

	// 套餐ID
	packageId: [1006269, 1006659, 1006716, 1007315, 1007391, 1007454, 1008289, 1008593, 1008687, 1008716, 1008833, 1008945, 1009003, 1009581, 1009695, 1011404, 1011694, 1013148, 1014354, 1014704, 1015943, 1016437, 1016802, 1017367, 1018917, 1024083, 1025725, 1029247, 1029375, 1029382, 1029384, 1029392, 1029393, 1029398, 1029399, 1029400, 1029401, 1029405, 1029409, 1029415, 1029420, 1029425, 1031596, 1031970, 1033680, 1033687, 1033706, 1033722, 1033725, 1033727, 1033730, 1033732, 1033739, 1033742, 1033747, 1033748, 1033751, 1033753, 1033755, 1033761, 1033770, 1033776, 1033777, 1033784, 1033791, 1033803, 1033807, 1033823, 1033835, 1033884, 1033901, 1033914, 1033917, 1033992, 1034007, 1034008, 1034027, 1034028, 1035161],

	// 流量ID
	flowId: [1029324, 1029440, 1029908, 1024610, 1029259, 1034657, 1029511, 1030192, 1029820, 1029390, 1034728, 1029438, 1034673, 1029249, 1029439, 1029229, 1029386, 1029328, 1030140, 1029426, 1029226, 1031507, 1031962, 1032057, 1032049, 1032198, 1032068, 1034920, 1031979, 1034892, 1034925],

	// 是否继续执行后面的代码
	isContinue: true,

	// 是否套餐时间
	getIsPackageTime: function (sysTime) {
		var curTime = this.getTime(sysTime); //当前时间
		var t1 = this.getTime('2016-06-15 00:00:00');
		var t2 = this.getTime('2016-07-01 00:00:00');
		if (curTime > t1 && curTime < t2) {
			return true;
		} else {
			return false;
		}
	},

	// 是否流量时间
	getIsFlowTime: function (sysTime) {
		var curTime = this.getTime(sysTime); //当前时间
		var t1 = this.getTime('2016-05-10 00:00:00');
		var t2 = this.getTime('2016-05-17 00:00:00');
		if (curTime > t1 && curTime < t2) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * sso跳转
	 * @param {String} prodId 商品id
	 * @param {Object} clientInfo 页面对象
	 */
	openSso: function (prodId, clientInfo) {
		var uid = publicClient.getUid(clientInfo.TOKEN);
		var city = newCity.reNewCity(clientInfo.CITY)
		var url = 'https://login.10086.cn/AppSSO.action?targetChannelID=12012&targetUrl=http://touch.10086.cn/goods/' + clientInfo.PROVINCE + '_' + city + '_' + prodId + '_0' + '.html&TransactionID=' + prodId + '&' + uid;
		publicClient.openNewPage(url);
		publicClient.isContinue = false;
	},
	/**
	 * 活动商品跳转
	 * @param {String} prodId 商品id
	 * @param {Boolean} isLogin 是否登陆,true、false
	 * @param {Object} clientInfo 页面对象
	 */
	jumpAct: function (prodId, isLogin, clientInfo) {
		var isPackage = false;
		var isFlow = false;
		for (var i = 0; i < publicClient.packageId.length; i++) {
			if (publicClient.packageId[i] == prodId) {
				isPackage = true;
				break;
			}
		}
		for (var i = 0; i < publicClient.flowId.length; i++) {
			if (publicClient.flowId[i] == prodId) {
				isFlow = true;
				break;
			}
		}
		// 套餐
		if (isPackage) {
			this.getGoodsAttr(prodId, clientInfo, function (data) {
				var sysTime = data.rspBody.sysTime;
				var isPackageTime = publicClient.getIsPackageTime(sysTime);

				//            console.log('套餐时间：', isPackageTime)

				if (!isLogin && isPackageTime) {
					publicClient.showlogin();
					publicClient.isContinue = false;
					return;
				}

				if (isPackageTime) {
					publicClient.openSso(prodId, clientInfo)
				}
			})
			return;
		} else {
			publicClient.isContinue = true;
		}


		// 业务流量
		if (isFlow) {
			this.getGoodsAttr(prodId, clientInfo, function (data) {
				var sysTime = data.rspBody.sysTime;
				var isFlowTime = publicClient.getIsFlowTime(sysTime);

				//            console.log('流量时间：', isFlowTime)

				if (!isLogin && isFlowTime) {
					publicClient.showlogin();
					publicClient.isContinue = false;
					return;
				}

				if (isFlowTime) {
					publicClient.openSso(prodId, clientInfo)
				}
			})
			return;
		} else {
			publicClient.isContinue = true;
		}
	},




	// 获取商品属性
	getGoodsAttr: function (prodId, clientInfo, callback) {
		publicClient.showLoadPlug();
		$.ajax({

			type: 'post',
			url: publicClient.hostport + 'SHD/goodsAttr/getGoodsAttr',
			data: publicClient.getAjaxData(clientInfo, {
				prodId: parseInt(prodId)
			}),
			dataType: 'json',
			timeout: 800,
			async: false,
			success: function (data) {
				publicClient.closeLoadPlug();
				if (data.retCode === '000000') {
					callback(data);
				} else {
					publicClient.new_sessionFailurePrompt(data, '知道了');
				}
			},
			error: function (xhr, type) {
				publicClient.closeLoadPlug();
				publicClient.showDialogPlug('请求无法受理，请稍后再试!', '知道了');
			}
		});
	},
	/**
	 * 3.2充值缴费,提交支付请求并且拉起支付SDK
	 * @param {Object} jsons 用户信息的json对象
	 * @param {Object} orderId 订单号
	 * @param {Object} amount 支付金额
	 * @param {Object} chargeMoney 充值金额
	 * @param {Object} rechargeNo 被充值的手机号
	 */
	setRechargeSDK: function (jsons, orderId, amount, chargeMoney, rechargeNo) {
		if (jsons.token == null || jsons.token == 'null' || jsons.token == undefined || jsons.token == 'undefined') {
			jsons.token = ''
		}
		if (jsons.phoneNumber == null || jsons.phoneNumber == 'null' || jsons.phoneNumber == undefined || jsons.phoneNumber == 'undefined') {
			jsons.phoneNumber = ''
		}

		//发起支付请求
		$.ajax({
			type: "post",
			url: publicClient.hostport + "CHW/getPayToken/getPayToken?" + jsons.token,
			//		    		url :publicClient.hostport+"getPayToken/getPayToken",//会话不接入，测试地址
			data: publicClient.getAjaxData(jsons, {
				"orderId": orderId,
				"payWay": "SDK",
				"amount": amount,
				"chargeMoney": chargeMoney,
				"rechargeNo": rechargeNo
			}),
			dataType: "json", //设置返回的数据类型
			timeout: 30000, //设置超时时间
			success: function (dataTwo) {
				publicClient.closeLoadPlug(); //关闭进度条
				if (dataTwo.retCode == "000000") {
					//调用新客户端能力拉起统一支付sdk
					leadeon.getNewPay({
						debug: false,
						channelID: '20', //渠道号20代表充值
						orderID: orderId, //订单号
						success: function (res) {},
						error: function (res) {}
					});
				} else if (dataTwo.retCode == "530008") {
					publicClient.showDialogPlug("现在办理业务的小伙伴太热情了，网络有点忙，请稍后再来。", "知道了");
				} else {
					if (dataTwo.retCode == "0001" || /^4\d{5}$/.test(dataTwo.retCode)) { //会话失败了
						publicClient.repeatLogon();
					} else {
						//弹出框，提示失败原因
						publicClient.showDialogPlug("现在办理业务的小伙伴太热情了，网络有点忙，请稍后再来。", "知道了");
					}
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				publicClient.closeLoadPlug(); //关闭进度条
				publicClient.showDialogPlug("现在办理业务的小伙伴太热情了，网络有点忙，请稍后再来。", "知道了");
			}
		});
	},
	/**
	 * 商城买手机，提交支付请求并且拉起支付SDK
	 * @param {Object} jsons 用户信息的json对象
	 * @param {Object} orderId 订单号
	 * @param {Object} prodId 商品id
	 * @param {Object} skuId
	 */
	setMallSDK: function (jsons, orderId, prodId, skuId) {
		$.ajax({
			type: "post",
			url: publicClient.hostport + "SHS/payReqOrder/pay?" + jsons.token,
			//		    	url :publicClient.hostport+"payReqOrder/pay",//会话不接入，测试地址
			data: publicClient.getAjaxData(jsons, {
				"orderId": orderId,
				"prodId": prodId,
				"skuId": skuId,
				"payWay": "SDK",
				//		    			"amount":Number(payData.amount),
				"cellNum": jsons.phoneNumber,
				"callbackUrl": window.location.href.substring(0, window.location.href.indexOf("v2.0")) + "v2.0/pages/mall/home/productlist.html?ptype=70000&mallFloorType=3"
			}),
			dataType: "json", //设置返回的数据类型
			timeout: 30000, //设置超时时间
			success: function (dataTwo) {
				//	    			alert("enterRecharge="+JSON.stringify(dataTwo));
				//$("#payBtn").removeClass("disable");//移除按钮不可用状态
				publicClient.closeLoadPlug(); //关闭进度条
				//		    			alert(JSON.stringify(dataTwo));
				if (dataTwo.retCode == "000000") {
					if(!!dataTwo.rspBody.orderId){
						orderId=dataTwo.rspBody.orderId;
					}
					//调用新客户端能力拉起统一支付sdk
					leadeon.getNewPay({
						debug: false,
						channelID: '11', //渠道号11代表商城销售子系统(商品售卖)
						orderID: orderId, //订单号
						success: function (res) {},
						error: function (res) {}
					});
				} else {
					//判断会话是否失效，如果失效跳转登陆，不失效提示信息
					publicClient.new_sessionFailurePrompt(dataTwo, "知道了");
					if(/^4\d{5}$/.test(dataTwo.retCode)) {
						leadeon.overTime({
						  debug: false,
						  success: function(res) {},
						  error: function(res) {}
						})
					}else {
						publicClient.showDialogPlug(dataTwo.retDesc, '知道了');
					}
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				publicClient.closeLoadPlug(); //关闭进度条
				publicClient.showDialogPlug("请求无法受理，请稍后再试!", "知道了");
			}
		});
	},
	/**
	 * 将日期转换成毫秒，便于比较时间大小
	 * @dates 时间格式：2016-09-05 10:17:34
	 */
	getMS: function (dates) {
		var time = new Date(Date.parse(dates.replace(/-/g, "/")));
		return time.getTime();
	},
	/**
	 * 获取网址前面公共部分
	 */
	getPublicUrl: function () {
		return window.location.href.substring(0, window.location.href.indexOf('v2.0'))
	},
	/**
	 * des加密
	 * @message 需要加密的字符串
	 * @key 密钥
	 */
	encryptByDES: function (message, key) {
		var keyHex = CryptoJS.enc.Utf8.parse(key);
		var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	},
	/**
	 * des解密
	 * @ciphertext 密文，ciphertext = encryptByDES(message, key)
	 * @key 密钥
	 */
	decryptByDES: function (ciphertext, key) {
		var ciphertext = decodeURIComponent(ciphertext)
		var keyHex = CryptoJS.enc.Utf8.parse(key);
		var decrypted = CryptoJS.DES.decrypt({
			ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
		}, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	},
	/**
	 * 3.8版本及以上调用情感化插件接口，根据接口返回显示情感化插件
	 * @key page
	 * 10.详单查询
	 * 11.我的账单--客户端
	 * 12.充值订单
	 * 13.套餐余量--客户端
	 * 14.套餐订购列表
	 * 15.业务办理列表
	 * 16.配件商品列表
	 * 17.手机商品列表
	 */
	assistiveControl:function(page, userinfo){
		if (!userinfo.phoneNumber) {
			res.phoneNumber = "" //没有手机号就传空串
		}
		//请求后台看这个页面能不能用情感化插件
		$.ajax({
			type: "post",
			url: publicClient.hostport + "DN/emotionMarket/getEmotionMarketNew/second",
			data: publicClient.getAjaxData(userinfo, {
				"provinceCode":userinfo.province,
				"cityCode":userinfo.city,
				"cellNum":userinfo.phoneNumber,
				"location":page
			}),
			dataType: "json", //设置返回的数据类型
			timeout: 30000, //设置超时时间
			success: function (data) {
				if (data.retCode=="000000") {
					//isShow为1就是能用情感化插件
					if (!!data.rspBody&&!!data.rspBody.pageList&&!!data.rspBody.pageList[0]&&data.rspBody.pageList[0].isShow==1) {
						var pageList=data.rspBody.pageList[0];
						var paramList=[];
						var ssoUrlAddr="";
						if (!!pageList.ssoUrlAddr) {
							ssoUrlAddr=pageList.ssoUrlAddr;
						}
						if (!!pageList.paramList) {
							paramList=pageList.paramList;
						}
						//调用客户端情感化插件能力--只有3.8及以上版本才有
						leadeon.assistiveControl({
							debug: false,
							id:pageList.id,    //情感化插件id
							iconUrl:pageList.iconUrl,    //图标图片URL
							actionUrl:pageList.actionUrl,    //跳转H5页面URL
							isShare:pageList.isShare,    //是否分享  0：否；1：是 默认为0
							verifyType:pageList.verifyType,    //登录认证方式  1：H5；2：URL传参 默认为1
							loginType:pageList.loginType,    //登录方式  1：强制登录 2：非强制登录 默认为2
							isSso:pageList.isSso,    //是否SSO  1：是；0：否
							ssoUrlAddr:ssoUrlAddr,    //URL传参地址，是sso登录时才有此值
							location:page,
							paramList:paramList,
							success: function(res) {},
							error: function(res) {}
						});
					}
				}
			},
			error: function () {}
		})
	},
	/**
	 * 只能使用老的客户端能力，判断是否iphone预售，然后sso跳转
	 *@prodId 商品id
	 *@clientInfo 页面的json对象
	 *@ISLOGIN 登录状态,true为登录
	 *@method 需要执行的方法
	 */
	JumpPresale:function(prodId,clientInfo,ISLOGIN,method)
	{
		var st="";//用于记录iphone预售的商品id数组集合
		//判断是正式环境还是灰度环境
		if(window.location.href.indexOf("/leadeon-cmcc-static-test/")>-1)
		{
			st=[1024701,1024702];
		}
		else
		{
			st=[1045170,1045171,1045210,1045212,1045217,1045218];
		}
		var bo=false;//用于记录这个商品id是否在iphone预售集合中
		for(var i=0;i<st.length;i++)
		{
			if(st[i]==prodId)
			{
				bo=true;
				break;
			}
		}
		if(bo)
		{
			//判断是否登录
			if(ISLOGIN==false)
			{
				publicClient.showlogin();//调用登录
			}
			else
			{
				var timestamp=new Date().getTime();//时间戳
				var ste="";
				var uid = publicClient.getUid(clientInfo.TOKEN);
				if(window.location.href.indexOf("/leadeon-cmcc-static-test/")>-1)
				{
					if(1024701==prodId)
					{
						ste=encodeURIComponent("http://m.mall.178.139.com/goods/100_100_1024701_1036436.html");
					}
					else
					{
						ste=encodeURIComponent("http://m.mall.178.139.com/goods/100_100_1024702_1036437.html");
					}
				}
				else
				{
					if(1045170==prodId||1045210==prodId||1045217==prodId)
					{
						var urls="http://touch.10086.cn/goods/"+clientInfo.PROVINCE+"_"+clientInfo.PROVINCE+"_1045170_1039968.html";
						ste=encodeURIComponent(urls);
					}
					else
					{
						var urls="http://touch.10086.cn/goods/"+clientInfo.PROVINCE+"_"+clientInfo.PROVINCE+"_1045171_1039974.html";
						ste=encodeURIComponent(urls);
					}
				}
				publicClient.openNewPage("https://login.10086.cn/AppSSO.action?targetChannelID=12012&targetUrl="+ste+"&TransactionID=" + prodId + '&' + uid+"&timestamp="+timestamp);
				// var uid = publicClient.getUid(clientInfo.TOKEN);
				// var city = newCity.reNewCity(clientInfo.CITY)
				// var url = 'https://login.10086.cn/AppSSO.action?targetChannelID=12012&targetUrl=http://touch.10086.cn/goods/' + clientInfo.PROVINCE + '_' + city + '_' + prodId + '_0' + '.html&TransactionID=' + prodId + '&' + uid;
				// publicClient.openNewPage(url);
			}
		}
		else
		{
			method();
		}
	},
	/**
	 * 是否为本地测试环境
	 */
	isLocalTest: false,
	/**
	 * 回调
	 *
	 * @param obj
	 */
	test_cb: function (obj) {
		if (null == obj || null == obj.RESULT || "" == obj.RESULT || null == obj.CODE || "" == obj.CODE) {
			return;
		}
		if (obj.RESULT != "ok") {
			return;
		}
	},
	/**
	 * 过滤器，用于把传入的图片地址转换成webp格式，其中ios要分版本判断，用之前需要把客户端的用户信息传入publicClient的jsons中
	 * @userInfoJsons 传入的客户端用户信息
	 * @imageUrl 传入的图片url地址，返回最终想要的url
	 */
	filterWebp:function(userInfoJsons,imageUrl){
		if(!!imageUrl)
		{
			if(imageUrl.toLowerCase().indexOf(".gif")>-1)
			{
				return imageUrl;//gif图片转换webp以后会静止不动，所以不能使用
			}
		}
		else
		{
			return imageUrl;//图片为空原样返回
		}
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/leadeon/i)=="leadeon") {
		//在手机营业厅的webview内
			if(!!userInfoJsons && !!userInfoJsons.version && !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
				//如果是ios系统
				var splwebp=userInfoJsons.version.split(".");
				var splwebpOne=String(splwebp[0])+String(splwebp[1]);
				if(!!splwebp[2])
				{
					splwebpOne=splwebpOne+String(splwebp[2]);
				}
				else
				{
					splwebpOne=splwebpOne+"0";
				}
				//如果ios版本号大于等于6.1.5，版本号中有3个点属于灰度包，有2个点属于生产包
				if(Number(splwebpOne)>614)
				{
					return "webp"+imageUrl+".webp";
				}
				else
				{
					return imageUrl;
				}
			}
			else{
				//如果是安卓系统
				return imageUrl+".webp";
			}
		}else{
		//不在手机营业厅的webview内,可能在Android、Windows系统上
			if(ua.indexOf('Android') > -1||ua.indexOf('Windows') > -1){
				return imageUrl+".webp";
			}
			else{
				return imageUrl;//其他的系统例如ios不支持webp格式图片
			}
		}
	}
};


/**
 * 数组增加去重功能
 * 调用例子：[1, 2, 3].unique();
 */
Array.prototype.unique = function () {
	var res = [];
	var json = {};
	for (var i = 0; i < this.length; i++) {
		if (!json[this[i]]) {
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
}


/**
 * 页面滚动后不触发touchend事件
 * 使用方法：给需要处理的元素祖先元素添加类stopTouchendAfterScroll
 */
;
(function () {
	var elements = document.querySelectorAll('.stopTouchendAfterScroll');

	function stopTouchendPropagationAfterScroll(element) {
		var locked = false;
		element.addEventListener('touchmove', function (ev) {
			locked || (locked = true, element.addEventListener('touchend', stopTouchendPropagation, true));
		}, true);

		function stopTouchendPropagation(ev) {
			ev.stopPropagation();
			element.removeEventListener('touchend', stopTouchendPropagation, true);
			locked = false;
		}
	}

	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		stopTouchendPropagationAfterScroll(element)
	}
})();