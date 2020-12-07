var favourPage = {
    /**
     * 客户端内的用户信息
     */
    jsons: {},

    /**
     * H5+传参形式跳转时拼接需要的uid
     */
    uid: '',

    /**
     * 登录的手机号码
     */
    cellNum: '99999999999',

    /**
     * 用户的登录状态
     */
    loginStatus: '',

    /**
     * 加密的登录手机号码
     */
    telNo: '',

    /**
     * 当前选中页签的id，点击进行切换
     */
    tabId: '',

    /**
     * 当前选中页签的内容展示模式，点击进行切换页签类型
        0：上图下文（瀑布流模式）
        1：左图右文（小图模式）
     */
    tabType: '',

    /**
     * 轮播图接口
     */
    getFavourBannerData: function() {
        publicClient.showLoadPlug(); // 打开转菊
        $.ajax({
            type: 'get',
            url: './json/getsaleAdver.json',
            data: publicClient.getAjaxData(favourPage.jsons, {
                provinceCode: favourPage.jsons.province,
                cityCode: favourPage.jsons.city,
                cellNum: favourPage.cellNum,
                isNewPage: '1'
            }),
            dataType: 'json',
            timeout: 30000,
            success: function(data,textStatus, request) {
                publicClient.closeLoadPlug(); // 关闭转菊
                if (!!data && data.retCode == '000000') {
                    if (window.localStorage) { //如果支持本地存储
                        localStorage.setItem("favour-lunbodata", JSON.stringify(data)); // 存储键名为favour-lunbodata的数据到本地
                    }
                    favourPage.favourBannerPubCode(data);
                } else {
                    favourPage.sessionFailurePromptDB(favourPage.favourBannerPubCode, 'favour-lunbodata');
                }
            },
            error: function(xhr, type) {
                favourPage.sessionFailurePromptDB(favourPage.favourBannerPubCode, 'favour-lunbodata');
            }
        });
    },

    /**
     * 轮播图接口成功的处理逻辑
     * @param {Object} data  // 接口返回的轮播图数据
     */
    favourBannerPubCode: function(data) {
        if (data.rspBody.adverList.length > 0) {
            // 渲染轮播图数据
            var bannerTpl = $('#carousel-templete').html();
            juicer.register('commonGetParamList', favourPage.getParamList);
            var bannerHtml = juicer(bannerTpl, {data: data.rspBody.adverList});
            $('.favour-carousel .swiper-wrapper').html(bannerHtml);
            $('.favour-carousel').removeClass('hidden');

            if ($('.favour-carousel .swiper-slide').length > 1) {
                $('.swiper-sign').removeClass('hidden').text('1/' + data.rspBody.adverList.length);
                favourPage.favourBannerSwiper('.favour-swiper', data.rspBody.adverList.length); //设置轮播图参数
            }   

            favourPage.swiperClick(); // 轮播图点击
        }

    },

    /**
     * 初始化轮播图
     */
    favourBannerSwiper: function (swiperElement, length) {
        var favourBannerSwiper = new Swiper(swiperElement,{
            speed: 500,
            autoplay: {
                delay: 5000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            },
            loop: true, //设置循环轮播
            scrollbarHide: false,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            on:{
                slideChange: function(){
                    $('.swiper-sign').text((this.realIndex + 1) + '/' + length);
                }
            }
        })
    },

    /**
     * 轮播图点击
     */
    swiperClick: function() {
        $('.favour-swiper').on('click', '.carouselItem', function() {
            var swiperJumpData = {
                isShare: $(this).data('isshare'), // 是否分享
                iconCode: $(this).data('iconcode') || '', // icon编码
                actionType: $(this).data('actiontype'), // 跳转方式
                actionUrl: $(this).data('actionurl'), // 跳转地址
                markId: $(this).data('markid'), // 营销id
                isSso: $(this).data('issso'), // 是否sso 1：是；0：否
                loginType: $(this).data('logintype'), // 登录方式 1: 强制登录 2: 非强制登录
                ssoUrlAddr: $(this).data('ssourladdr'), // sso跳转地址
                paramList: $(this).data('paramlist'),  // 拼接参数列表
                verifyType: $(this).data('verifytype')  // 1: 本地native 2: URL传参
            }
            var adverLocation = $(this).data('adverlocation');
            if (swiperJumpData.verifyType == 1 && swiperJumpData.actionType == 2) {
                swiperJumpData.actionType = 1;
            }

            favourPage.commonJump(swiperJumpData.actionType, swiperJumpData, 'banner'); // 公共跳转
        })
    },

    /**
     * icon接口
     */
    getFavourIconData: function() {
        publicClient.showLoadPlug(); // 打开转菊
        $.ajax({
            type: 'get',
            url: './json/getHorizontalBanner.json',
            data: publicClient.getAjaxData(favourPage.jsons, {
                provinceCode: favourPage.jsons.province,
                cityCode: favourPage.jsons.city,
                cellNum: favourPage.cellNum,
                isNewPage: '1'
            }),
            dataType: 'json',
            timeout: 30000,
            success: function(data,textStatus, request) {
                publicClient.closeLoadPlug(); // 关闭转菊
                if (!!data && data.retCode == '000000') {
                    if (window.localStorage) { //如果支持本地存储
                        localStorage.setItem("favour-icondata", JSON.stringify(data)); // 存储键名为favour-icondata的数据到本地
                    }
                    favourPage.favourIconsPubCode(data);
                } else {
                    favourPage.sessionFailurePromptDB(favourPage.favourIconsPubCode, 'favour-icondata');
                }
            },
            error: function(xhr, type) {
                favourPage.sessionFailurePromptDB(favourPage.favourIconsPubCode, 'favour-icondata');
            }
        });
    },

    /**
     * icon接口成功的处理逻辑
     * @param {Object} data  // 接口返回的icon列表的数据
     */
    favourIconsPubCode: function(data) {
        if (data.rspBody.horizontalBannerDbList.length > 0) {
            // 渲染轮播图数据
            var iconTpl = $('#icon-templete').html();
            juicer.register('commonGetParamList', favourPage.getParamList);
            var iconHtml = juicer(iconTpl, {data: data.rspBody.horizontalBannerDbList});
            $('.icons-list').html(iconHtml);
            $('.favour-icons').removeClass('hidden');

            favourPage.iconClick(); //  icon点击
        }
    },

    /**
     * icon区域点击
     */
    iconClick: function() {
        $('.favour-icons').on('click', '.icons-item', function() {
            var iconJumpData = {
                isShare: $(this).data('isshare'), // 是否分享
                iconCode: $(this).data('iconcode'), // icon编码
                actionType: $(this).data('actiontype'), // 跳转方式
                actionUrl: $(this).data('actionurl'), // 跳转地址
                markId: $(this).data('markid'), // 营销id
                isSso: $(this).data('issso'), // 是否sso 1：是；0：否
                loginType: $(this).data('logintype'), // 登录方式 1: 强制登录 2: 非强制登录
                ssoUrlAddr: $(this).data('ssourladdr'), // sso跳转地址
                paramList: $(this).data('paramlist'),  // 拼接参数列表
                verifyType: $(this).data('verifytype')  // 1: 本地native 2: URL传参
            }
            console.log(iconJumpData, 'icon对象数据');
            var adverLocation = $(this).data('adverlocation')
            var wtadd = {'WT.markId': iconJumpData.markId};
            if (iconJumpData.verifyType == 1 && iconJumpData.actionType == 2) {
                iconJumpData.actionType = 1;
            }

            favourPage.commonJump(iconJumpData.actionType, iconJumpData, 'icon'); // 公共跳转
        })
    },

    /**
     * 积分接口
     */
    getIntegral: function () {
        $.ajax({
            type: 'get',
            url: './json/getScoreQuery.json',
            data: publicClient.getAjaxData(favourPage.jsons, {
                cellNum: favourPage.cellNum
            }),
            dataType: 'json',
            timeout: 30000,
            success: function(data) {
                if (data.retCode == '000000') {
                    $('.integral-main').html('您有<span class="integral-color">' + data.rspBody.pointValue + '</span>积分');
                } else {
                    $('.integral-main').html('您有<span class="integral-blackColor"> ---- </span>积分');
                    favourPage.sessionFailurePromptBoss(data, "", "");
                }
                $('.integral-btn').html('积分商城');
            },
            error: function(xhr, type) {
                $('.integral-main').html('您有<span class="integral-blackColor"> ---- </span>积分');
                $('.integral-btn').html('积分商城');
            }
        });
    },

    /**
     * 页面积分商城区域点击
     */
    integralClick: function() {
        $('.integral-btn').unbind()
        $('.integral-btn').on('click', function() {
            if (favourPage.checkPhone()) {
                var integralUrl = 'http://app.jf.10086.cn';
                favourPage.openNewPage({url: integralUrl});
            } else {
                // leadeon.showLogin();
            }
        })
    },

    /**
     * 积分兑换、热门活动的营销区域
     */
    getAreaList: function() {
        publicClient.showLoadPlug(); // 打开转菊
        $.ajax({
            type: 'get',
            url: './json/getIconMarketing.json',
            data: publicClient.getAjaxData(favourPage.jsons, {
                provinceCode: favourPage.jsons.province,
                cityCode: favourPage.jsons.city
            }),
            dataType: 'json',
            timeout: 30000,
            success: function(data,textStatus, request) {
                publicClient.closeLoadPlug() // 关闭转菊
                if (!!data && data.retCode == '000000') {
                    if (window.localStorage) { //如果支持本地存储
                        localStorage.setItem("favour-areaListData", JSON.stringify(data)); // 存储键名为favour-areaListData的数据到本地
                    }
                    favourPage.areaListPubCode(data);
                } else {
                    favourPage.sessionFailurePromptDB(favourPage.areaListPubCode, 'favour-areaListData');
                }
            },
            error: function(xhr, type) {
                favourPage.sessionFailurePromptDB(favourPage.areaListPubCode, 'favour-areaListData');
            }
        });
    },

    /**
     * 积分兑换、热门活动的营销区域接口成功的处理逻辑
     * @param {Object} data  // 接口返回积分兑换、热门活动的营销区域的数据
     */
    areaListPubCode: function(data) {
        if (data.rspBody.iconAreaList.length > 0) {
            var list = data.rspBody.iconAreaList;
            for (var index = 0; index < list.length; index++) {
                if (list[index].areaType == 2 && list[index].marketList.length == 3) {
                    list[index].marketList.splice(0, 1);
                }
            }
            // 渲染积分兑换、热门活动的数据列表
            var TabTpl = $('#areaList-templete').html();
            juicer.register('commonGetParamList', favourPage.getParamList);
            var tabHtml = juicer(TabTpl, {data: list});
            $('.favour-areaList').html(tabHtml);

            favourPage.tabTopMarket(); // tab上方的对象点击
        }
    },

    /**
     *  tab上方的对象点击
     */
    tabTopMarket: function () {
        // tab上方的营销区域活动点击
        $('.favour-areaList').on('click', '.areaList-item', function() {
            var tabTopJumpData = {
                isShare: $(this).data('isshare'), // 是否分享
                iconCode: $(this).data('iconcode'), // icon编码
                actionType: $(this).data('actiontype'), // 跳转方式
                actionUrl: $(this).data('actionurl'), // 跳转地址
                markId: $(this).data('markid'), // 营销id
                isSso: $(this).data('issso'), // 是否sso 1：是；0：否
                loginType: $(this).data('logintype'), // 登录方式 1: 强制登录 2: 非强制登录
                ssoUrlAddr: $(this).data('ssourladdr'), // sso跳转地址
                paramList: $(this).data('paramlist')  // 拼接参数列表
            }
            var adverLocationCode = $(this).data('adverlocationcode');
            var wtadd = {'WT.markId': tabTopJumpData.markId};
            console.log(tabTopJumpData, 'tab顶部对象数据', adverLocationCode);

            favourPage.commonJump(tabTopJumpData.actionType, tabTopJumpData, 'tabTopMarket'); // 公共跳转
        })

        // tab上方的营销区域更多点击
        $('.favour-areaList').on('click', '.scrollBox-more', function() {
            var tabTopMoreJumpData = {
                isShare: '0', // 是否分享
                iconCode: '', // icon编码
                actionType: $(this).data('actiontype'), // 跳转方式
                actionUrl: $(this).data('actionurl'), // 跳转地址
                markId: '', // 营销id
                isSso: $(this).data('issso'), // 是否sso 1：是；0：否
                loginType: $(this).data('logintype'), // 登录方式 1: 强制登录 2: 非强制登录
                ssoUrlAddr: $(this).data('ssourladdr'), // sso跳转地址
                paramList: $(this).data('paramlist')  // 拼接参数列表
            }
            var wtadd = {'WT.markId': tabTopMoreJumpData.markId};
            var areaId = $(this).data('areaid');
            console.log(tabTopMoreJumpData, 'tab顶部更多对象数据');
            favourPage.commonJump(tabTopMoreJumpData.actionType, tabTopMoreJumpData, 'tabTopMoreMarket'); // 公共跳转
        })
    },

    /**
     * 获取页面的页签tab列表，栏目列表
     */
    getTabListData: function() {
        publicClient.showLoadPlug(); // 打开转菊
        $.ajax({
            type: 'get',
            url: './json/getCategoryPageTabInfo.json',
            data: publicClient.getAjaxData(favourPage.jsons, {
                provinceCode: favourPage.jsons.province,
                cityCode: favourPage.jsons.city
            }),
            dataType: 'json',
            timeout: 30000,
            success: function(data,textStatus, request) {
                publicClient.closeLoadPlug() // 关闭转菊
                if (!!data && data.retCode == '000000') {
                    if (window.localStorage) { //如果支持本地存储
                        localStorage.setItem("favour-tabListData", JSON.stringify(data)); // 存储键名为favour-tabListData的数据到本地
                    }
                    favourPage.tabPubCode(data);
                } else {
                    favourPage.sessionFailurePromptDB(favourPage.tabPubCode, 'favour-tabListData');
                }
            },
            error: function(xhr, type) {
                favourPage.sessionFailurePromptDB(favourPage.tabPubCode, 'favour-tabListData');
            }
        });
    },

    /**
     * 页签tab列表接口成功的处理逻辑
     * @param {Object} data  // 接口返回的页签tab列表的数据
     */
    tabPubCode: function (data) {
        if (data.rspBody.pageTabList.length > 0) {
            // 渲染tab列表
            var TabTpl = $('#tabList-templete').html();
            var tabHtml = juicer(TabTpl, {data: data.rspBody.pageTabList});
            $('.favour-tabList').html(tabHtml);
            $('.favour-tabBox').removeClass('hidden');

            // 渲染tab对应的多少个营销区域容器
            var marketBoxListTpl = $('#marketBoxList-templete').html();
            var marketBoxListHtml = juicer(marketBoxListTpl, {data: data.rspBody.pageTabList});
            $('.favour-marketBox').html(marketBoxListHtml);

            // 渲染底部营销区域最小高度
            $('.favour-marketBox .marketBox-list').css('min-height', Math.ceil($(window).innerHeight() - $('.favour-tabBox').height() + 10) + 'px');
            if (data.rspBody.pageTabList.length <= 1) {
                $('.favour-tabBox').addClass('hidden');
                $('.favour-interval').removeClass('hidden');
            } else if (data.rspBody.pageTabList.length <= 5) {
                $('.favour-tabList li').addClass('marginZero');
                $('.favour-tabList').addClass('around');
            }
            if (data.rspBody.pageTabList.length > 1) {
                favourPage.tabMouting(); // tab吸顶效果
            }
            favourPage.tabClick(); // tab点击
        } 
    },
    
    /**
     * 页签tab进行吸顶
     */
    tabMouting: function() {
        if ((favourPage.cssSupport('position', 'sticky') || favourPage.cssSupport('position', '-webkit-sticky')) && publicClient.versions.ios) {
            $('.favour-tabBox').addClass('favour-tabBoxSticky');
        } else {
            // var timer = null;
            $(window).on('scroll',function() {
                // if (!!timer) return
                // timer = setTimeout(function() {
                    var move = window.scrollY;
                    var top1 = document.querySelector('.favour-market').offsetTop;
                    if (move - top1 > 0) {
                        $('.favour-tabBox').addClass('favour-tabBoxFixed');
                        $('.favour-marketBox').addClass('padding120');
                    } else {
                        $('.favour-tabBox').removeClass('favour-tabBoxFixed');
                        $('.favour-marketBox').removeClass('padding120');
                    }
                //     timer = null;
                // }, 0)
            })
        }
    },

    /**
     * 判断用户的当前设备是否支持定位属性 position：sticky
     */
    cssSupport: function(attr, value) {
        var element = document.createElement('div');
        if (attr in element.style) {
          element.style[attr] = value;
          return element.style[attr] === value;
        } else {
          return false;
        }
    },

    /**
     * 页签tab列表点击
     */
    tabClick: function() {
        $('.favour-tabBox').on('click', '.tabList-item', function() {
            var tabName = $(this).attr('tabName');
            favourPage.tabId = $(this).attr('tabId');
            favourPage.tabType = $(this).attr('tabType');
            $('.favour-tabBox .tabList-item').removeClass('tabList-itemActive').eq($(this).index()).addClass('tabList-itemActive');
            $('.favour-marketBox .marketBox-list').removeClass('marketBox-listActive').eq($(this).index()).addClass('marketBox-listActive');
            var scrollLeft = $('.favour-tabList').scrollLeft();
            var itemOffsetLeft = $(this).offset().left;
            var itemDis = $(this).width() / 2 + itemOffsetLeft;
            var windowW = $(window).innerWidth();
            if (itemDis > windowW / 2) {
                var dis = Math.abs(itemDis - windowW / 2) + scrollLeft;
                $(".favour-tabList").animate({ scrollLeft: dis}, 300);
            } else {
                var dis = scrollLeft - Math.abs(itemDis - windowW / 2);
                $(".favour-tabList").animate({ scrollLeft: dis}, 300);
            }
            if ($('.favour-marketBox .marketBox-list').eq($(this).index()).find('.market-item').length <= 0) {
                favourPage.getMarketBoxData();
            }
        })
        $('.favour-tabBox .tabList-item').eq(0).click();
    },

    /**
     * 获取页面的页签下的内容列表
     */
    getMarketBoxData: function() {
        publicClient.showLoadPlug(); // 关闭转菊
        $.ajax({
            type: 'get',
            url: './json/getCategoryPageTabContent.json',
            data: publicClient.getAjaxData(favourPage.jsons, {
                provinceCode: favourPage.jsons.province,
                cityCode: favourPage.jsons.city,
                cellNum: favourPage.cellNum,
                tabId: favourPage.tabId,
                tabType: favourPage.tabType
            }),
            dataType: 'json',
            timeout: 30000,
            success: function(data,textStatus, request) {
                publicClient.closeLoadPlug(); // 关闭转菊
                if (!!data && data.retCode == '000000') {
                    if (window.localStorage) { //如果支持本地存储 
                        localStorage.setItem("favour-marketData", JSON.stringify(data)); // 存储键名为favour-marketData的数据到本地
                    }
                    favourPage.marketPubCode(data);
                } else {
                    favourPage.sessionFailurePromptDB(favourPage.marketPubCode, '');
                }
            },
            error: function(xhr, type) {
                favourPage.sessionFailurePromptDB(favourPage.marketPubCode, '');
            }
        });
    },

    /**
     * 营销区域接口成功的处理逻辑
     * @param {Object} data  // 接口返回的tab列表当前点击id的数据
     */
    marketPubCode: function(data) {
        if (data.rspBody.pageTabContentList.length > 0) {
            // 瀑布流模式
            var list = null;
            if (data.rspBody.tabType == '0') {
                list = favourPage.setMarketElementHeight(JSON.parse(JSON.stringify(data.rspBody.pageTabContentList)));
                for (var index = 0; index < list.length; index++) {
                    list[index].top = favourPage.setMarketElementTop(index, list);
                }
                for (var i = 0; i < list.length; i++) {
                    list[i].height = (list[i].height / 46.875).toFixed(6);
                }
            } else {
                list = data.rspBody.pageTabContentList;
            }
            var marketBoxTpl = $('#marketBox-templete').html();
            juicer.register('commonGetParamList', favourPage.getParamList);
            console.log(list,'list')
            var marketBoxHtml = juicer(marketBoxTpl, {data: list, type: data.rspBody.tabType});
            $('.marketBox-list' + data.rspBody.tabId).html(marketBoxHtml);
            var creatPattr = {
                class: "noMore",
                text: "---- 没有更多了 ----",
            }
            if (data.rspBody.tabType == '0') {
                var lastHeight = Number(list[list.length - 1].top) + Number(list[list.length - 1].height);
                var lastSecondHeight =  Number(list[list.length - 2].top) + Number(list[list.length - 2].height);
                var creatPtop = lastHeight > lastSecondHeight ? lastHeight : lastSecondHeight;
                creatPattr.style = 'position: absolute; left: 0; top: ' + creatPtop + 'rem';
            }
            $("<p>", creatPattr).appendTo('.marketBox-list' + data.rspBody.tabId);

            favourPage.tabBottomMarket(); // tab底部的对象点击
        }
    },

    /**
     * 设置当前元素的高度
     * @param {Object} data  // 接口返回的tab列表当前点击id的数据
     */
    setMarketElementHeight: function (lists) {
        var data = lists;
        for (var index = 0; index < data.length; index++) {
            data[index].label1 = data[index].label1.trim()
            data[index].label2 = data[index].label2.trim()
            if (!!data[index].label1.trim() || !!data[index].label2.trim()) {
                if (data[index].markName.length > 9) {
                    data[index].height = 356;
                } else {
                    if (!!data[index].markSubtitle) {
                        data[index].height = 356;
                    } else {
                        data[index].height = 316;
                    }
                }
            } else {
                if (data[index].markName.length > 9) {
                    data[index].height = 300;
                } else {
                    if (!!data[index].markSubtitle) {
                        data[index].height = 300;
                    } else {
                        data[index].height = 260;
                    }
                }
            }
        }
        return data;
    },

    /**
     * 获取当前元素定位的高度
     * @param {Number} index1 // 当前遍历数据的下标
     * @param {Object} data  // 接口返回的tab列表当前点击id的数据
     */
    setMarketElementTop: function(index1, data) {
        var h = 0; // 元素定位的高度
        var oddList = []; // 奇数下标的数组，存在比当前下标小的下标数据
        var evenList = []; // 偶数数下标的数组，存在比当前下标小的下标数据
        var realList = null; // 最后计算的下标元素的数组
        if (index1 == 0 || index1 == 1) {
            h = 0;
        } else {
            for (var index = 0; index < index1; index++) {
                if (index1 % 2 == 0 && index % 2 == 0) {
                    oddList.push(index);
                } else if (index1 % 2 == 1 && index % 2 == 1) {
                    evenList.push(index);
                }
            }
            if (index1 % 2 == 0) {
                realList = oddList;
            } else {
                realList = evenList;
            }
            for (var index = 0; index < realList.length; index++) {
                h += data[realList[index]].height;
            }
            h += realList.length * 20;
        }
        return (h / 46.875).toFixed(6);
    },

    
    /**
     * tab底部的对象点击
     */
    tabBottomMarket: function() {
        $('.marketBox-listActive').on('click', '.market-item', function() {
            var tabBottomJumpData = {
                isShare: $(this).data('isshare'), // 是否分享
                iconCode: $(this).data('iconcode'), // icon编码
                actionType: $(this).data('actiontype'), // 跳转方式
                actionUrl: $(this).data('actionurl'), // 跳转地址
                markId: $(this).data('markid'), // 营销id
                isSso: $(this).data('issso'), // 是否sso 1：是；0：否
                loginType: $(this).data('logintype'), // 登录方式 1: 强制登录 2: 非强制登录
                ssoUrlAddr: $(this).data('ssourladdr'), // sso跳转地址
                paramList: $(this).data('paramlist')  // 拼接参数列表
            }
            console.log(tabBottomJumpData, 'tab底部对象数据');
            var wtadd = {'WT.markId': tabBottomJumpData.markId};

            favourPage.commonJump(tabBottomJumpData.actionType, tabBottomJumpData, 'tabBottomMarket'); // 公共跳转
        })
        
    },

    /**
     * 页面跳转的公共方法
     * @param {Object} actionType //跳转的方式 1 H5跳转或自定义分组 2 H5 + 传参 4 原生页面客户端基础功能跳转 6 插件化跳转
     * @param {Object} data  //跳转的参数都处理到里面
     * @param {String} sign  //当前点击的是营销区域还是icon传英文名称 营销区域 market
     */
    commonJump: function(actionType, data, sign) {
        // console.log('11111', actionType)
        // console.log('22222', data)
        // console.log('33333', sign)
        if (actionType == 1) {// H5跳转或自定义分组
            favourPage.jumpAndShare(data.actionUrl, data, sign);
        } else if (actionType == 2) { // H5 + 传参
            if (data.loginType == 1) { // 强制登录
                if (!favourPage.checkPhone()) { // 未登录
                    leadeon.showLogin(); // 拉起登录
                } else {
                    // 用户已登录 登录状态也相应更改
                    favourPage.jump(data, sign); // 进行跳转前的逻辑处理
                }
            } else if (data.loginType == 2) { // 非强制登录
                favourPage.jump(data, sign); // 进行跳转前的逻辑处理
            }
        } else if (actionType == 4) {  // 原生页面，调用客户端基础功能跳转
            favourPage.goNativePage(data.iconCode);
        } else if (actionType == 6) { // 插件化
            var pluginPackage = data.pluginPackage, // 插件化包名
                pluginPage = data.pluginPage; // 插件化启动页面
            leadeon.startPlugin({ // 调起客户端插件 (只有安卓有这能力，ios没有)
                debug: false,
                pluginPackageName: pluginPackage, // 插件的包名称
                pluginPageName: pluginPage, // 启动页面的名称
                success: function(res) {},
                error: function(res) {}
            });
        }
    },

    /**
     * H5+传参形式的页面跳转 （非强制登录时直接进入该方法）
     * 首页轮播，通栏广告和icon公用方法，只有首页轮播才有 isShare字段
     * @param {Object} obj  //商品列表数据
     * @param {String} sign  //当前点击的是营销区域还是icon传英文名称 营销区域 market
     */
    jump: function(obj, sign) {
        var ssoUrl = obj.ssoUrlAddr; //URL传参地址 是sso登录时才有此值
        var isSso = obj.isSso; //是否SSO  1：是；0：否
        var paramList = obj.paramList; //参数列表
        var questionMarkIndex = obj.actionUrl.indexOf("?"); //？首次出现的位置
        var paramListUrl = favourPage.getParamListUrl(paramList, favourPage.jsons); //参数拼接
        var timestamp = new Date().getTime(); //若是sso跳转，则要加上时间戳
        if (isSso == 0) { //非sso再进行这个操作
            //判断URL有没有问号，若没有则第一个参数前为？，若有则是&
            if (questionMarkIndex == -1) { //没有问号
                obj.actionUrl += '?'; //加上问号
                paramListUrl = paramListUrl.substring(1); //去掉前面的&
            } else if (obj.actionUrl.substring(questionMarkIndex) == '?') {
                paramListUrl = paramListUrl.substring(1); //去掉前面的&
            }
        }
        if (obj.loginType == 1) { //强制登录
            if (isSso == 1) { //已登录并且是SSO，SSO地址+正常地址+参数+时间戳
                var URL = ssoUrl + obj.actionUrl + paramListUrl + "&timestamp=" + timestamp;
            } else { //已登录且不是SSO，正常地址+参数
                var URL = obj.actionUrl + paramListUrl;
            }
        } else if (obj.loginType == 2) { //非强制登录，正常地址+参数
            var URL = obj.actionUrl + paramListUrl;
        }
        if (URL.indexOf('timestamp') < 0 && URL.indexOf('v.cmcc-cs.cn') > -1 && publicClient.versions.ios) {
            if (URL.indexOf('?') > -1) {
                URL = URL + "&timestamp=" + timestamp;
            } else {
                URL = URL + "?timestamp=" + timestamp;
            }
        }
        console.log(URL)
        if (!!URL) favourPage.jumpAndShare(URL, obj, sign);
    },

    /**
     * 打开新页面的方式跳转并增加分享信息
     * @param {String} url  //跳转的url
     * @param {Object} data //跳转时的商品数据信息
     * @param {String} sign  //当前点击的是营销区域还是icon传英文名称 营销区域 market
     */
    jumpAndShare: function(url, data, sign) {
        if (data.isShare == 1) {
            var markId = data.markId
            var funCode = 'DF021';
            var type = sign == 'banner' ? '8' : sign == 'icon' ? '9' : sign == 'tabTopMarket' ? '46' : sign == 'tabBottomMarket' ? '47' : '';
            favourPage.openNewPage({url: url, markId: markId, type: type, funCode: funCode});
        } else {
            favourPage.openNewPage({url: url});
        }
    },

    /**
     * 拼装url参数
     * @param {Object} paramList  //处理后的url需要拼接的参数集合
     * @param {Object} clientInfo  //客户端json对象
     */
    getParamListUrl: function(paramList, clientInfo) {
        var arr = [];
        if (!!paramList) arr = paramList.split('-');
        var paramListUrl = '';
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == 'UID') {
                paramListUrl += '&' + favourPage.uid;
            } else if (arr[i] == 'provinceCode') {
                paramListUrl += '&provinceCode=' + clientInfo.province;
            } else if (arr[i] == 'cityCode') {
                paramListUrl += '&cityCode=' + clientInfo.city;
            } else if (arr[i] == 'clientVer') {
                paramListUrl += '&clientVer=' + clientInfo.version;
            } else if (arr[i] == 'devType') {
                paramListUrl += '&devType=' + clientInfo.st;
            } else if (arr[i] == 'clientId') {
                paramListUrl += '&clientId=' + clientInfo.clientID;
            } else if (arr[i] == 'scnType') {
                paramListUrl += '&scnType=' + clientInfo.sp;
            } else if (arr[i] == 'telNo') {
                paramListUrl += '&telNo=' + favourPage.telNo;
            } else {
                paramListUrl += '&' + arr[i] + '=no' //每一项都没有那么都带上no
            }
        }
        return paramListUrl;
    },

    /**
     * 转换参数
     *  @param {Object} data  // 拼接的参数对象  数据变字符串
     */
    getParamList: function(data) {
        var string = '';
        if (!!data) {
            for (var i = data.length - 1; i >= 0; i--) {
                string += data[i].paramId + '-';
            }
            string = string.substring(0, string.length - 1);
        }
        return string;
    },

    /**
     * 打开新页面公共方法
     *  @param {Object} obj // 跳转时给客户端传的对象
                            obj.url // 跳转的url
                            obj.type // 分享类型
                            obj.funCode // 功能编码
                            obj.markId  // 营销活动ID
                            obj.bizCode // 客户端功能编码
     */
    openNewPage: function (obj) {
        leadeon.newWebview({
            debug: false,
            markID: obj.markId || '', //活动ID
            type: obj.type || '', //（分享类型，内部保留字段，允许不传）  4.0 新增
            funCode: obj.funCode || '', //（功能编码，内部保留字段，允许不传）  4.0 新增
            bizCode: obj.bizCode || '', // 客户端功能编码
            url: obj.url || '', //跳转地址
            success: function(res) {},
            error: function(res) {}
        });
    },

    /** 客户端基础功能跳转页面公共方法
     *  @param {string} iconCode  //功能编码
     */
    goNativePage: function (iconCode) {
        leadeon.goNativePage({
            debug: false,
            bizCode: iconCode
        });
    },

    /**
     *  广告位点击量公共方法
     *  @param {Object} obj // 广告类型的对象
                            obj.markId 营销活动ID
                            obj.adverType // 广告类型
                            obj.eventCode // 事件码值
                            eventResultCode // 事件结果码值
     */

    /** 接口超时处理 (码表、话费余额、需要登录的接口4开头状态码按会话超时处理，否则取缓存数据)
     *  fun 不传代表不会回掉 key 不传代表回掉时不会取缓存数据
     *  @param {string} data  //接口响应
     *  @param {string} fun  //需要执行的方法
     *  @param {string} key  //获取键名为key的本地数据
     */
    sessionFailurePromptBoss: function(data, fun, key) {
        publicClient.closeLoadPlug(); //关闭加载
        var flag = false;
        //以4开头的六位数字，即为会话失败
        if (/^4\d{5}$/.test(data.retCode)) {
            flag = true;
        }
        if (flag) { //先判断是否为会话校验失败
            leadeon.overTime({
                debug: false,
                success: function(res) {},
                error: function(res) {}
            });
        } else if(typeof fun == "function") {
            if (key) { // 不取缓存
                var datas = JSON.parse(localStorage.getItem(key)); //获取键名为key的本地数据
                if (!!datas) { fun(datas) };
            } else {
                var datas = { rspBody: '' };
                fun(datas);
            }
        }
    },

    /** 接口超时处理 (DB接口非000000取缓存数据)
     *  @param {string} fun  //需要执行的方法
     *  @param {string} key  //获取键名为key的本地数据
     */
    sessionFailurePromptDB: function (fun, key) {
        publicClient.closeLoadPlug(); //关闭加载
        var datas = JSON.parse(localStorage.getItem(key)); //获取键名为key的本地数据
        if (!!datas) {
            fun(datas);
        }
    },

    /**
     * 获取用户的登录状态
     */
    checkPhone: function () {
        if(!!favourPage.loginStatus && (favourPage.loginStatus == 1 || favourPage.loginStatus == 2) && !!favourPage.jsons.token && !!favourPage.jsons.phoneNumber && favourPage.jsons.token != '0' && favourPage.jsons.phoneNumber != '0'){
            return true;
        }  else {
            return false;
        }
    },

    /**
     * 获取用户信息
     */
    userStatus: function () {
        favourPage.getFavourBannerData() // 轮播图数据接口
        favourPage.getFavourIconData() // icon区域数据接口
        favourPage.getTabListData() // tab列表数据接口
        favourPage.getAreaList() // 积分兑换、热门活动数据接口
        favourPage.integralClick() // 积分区域点击
    }
}