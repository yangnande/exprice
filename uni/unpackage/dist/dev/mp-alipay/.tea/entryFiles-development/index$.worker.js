if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/uni-icons/uni-icons?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/nav-bar/nav-bar?hash=4f3f44db986be84bb3e7c699e0f2fdbffe19a890');
require('../../components/tab/tab?hash=4f3f44db986be84bb3e7c699e0f2fdbffe19a890');
require('../../components/list-scroll/list-scroll?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/like/like?hash=4f3f44db986be84bb3e7c699e0f2fdbffe19a890');
require('../../components/list-card/list-card?hash=9b0d67a36df429e889d1c6c7d3a61288e5ee9ecf');
require('../../components/uni-load-more/uni-load-more?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/list/list-item?hash=34d567f05cd625162b1dad08e8f1af1c125ee53c');
require('../../components/list/list?hash=97a3f0b49d18befee70a599d5f62115682226a62');
require('../../components/list-author/list-author?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/comment-box/comment-box?hash=8ea9ec845f06bf2eb254020cdeff541077e2f3e7');
require('../../components/uni-transition/uni-transition?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-popup/uni-popup?hash=63f3d097e78ac04213190ce4a92c81860617f7b4');
require('../../components/gaoyia-parse/components/wxParseImg?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/gaoyia-parse/components/wxParseVideo?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/gaoyia-parse/components/wxParseAudio?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/gaoyia-parse/components/wxParseTable?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/gaoyia-parse/components/wxParseTemplate11?hash=a361c7ac70b2787bb4f6403e4c358d47459fda55');
require('../../components/gaoyia-parse/components/wxParseTemplate10?hash=6c4e9abbffbecad61906e6dc41748b4d59f45350');
require('../../components/gaoyia-parse/components/wxParseTemplate9?hash=c9057e49060debe052702330528fc94e4b9b60ec');
require('../../components/gaoyia-parse/components/wxParseTemplate8?hash=2ce376d0bfc8ab3b633b1b0572cbd15e139d65e0');
require('../../components/gaoyia-parse/components/wxParseTemplate7?hash=317daab1ac18eb06d5a0a23df6bce19633f5c70a');
require('../../components/gaoyia-parse/components/wxParseTemplate6?hash=ba6ed979d4307e5d23e8ca1eba1d3b2961802024');
require('../../components/gaoyia-parse/components/wxParseTemplate5?hash=d2cf2f62b014565845ccb6840f14ce4451c5d8d1');
require('../../components/gaoyia-parse/components/wxParseTemplate4?hash=0b50ca34a01d9058789fe579fd3f94be1995b2e2');
require('../../components/gaoyia-parse/components/wxParseTemplate3?hash=bd2ada6053b65761b2f5af702556f9965413b241');
require('../../components/gaoyia-parse/components/wxParseTemplate2?hash=95c942216591538e03a0e8c7f6a230cd28ee9fdb');
require('../../components/gaoyia-parse/components/wxParseTemplate1?hash=f3b709744e77e1929ebad2bdd986ffe1c677bb07');
require('../../components/gaoyia-parse/components/wxParseTemplate0?hash=c0769a429d7e44d1639efe4cc1dbe15185cbf634');
require('../../components/gaoyia-parse/parse?hash=dedbcb6e82c26b76fab92362d643f5fc6465c464');
require('../../pages/index/index?hash=9c4fb7b8ba09c6a583425c53e44b303f539ffcd2');
require('../../pages/my/my?hash=af30089a14de5bba22f51cbb6b3d48bc536087f6');
require('../../pages/follow/follow?hash=24598a6ab067acfc8b77bafe13803f0e435fc30d');
require('../../pages/home-search/home-search?hash=c2e9ea9ab28e24aff41c0609ed528adcd36d052f');
require('../../pages/home-label/home-label?hash=0cc0efa7d622664baeb3a4df7a801da917807a32');
require('../../pages/home-detail/home-detail?hash=b35d3e4703abd1f87f093298e0ae21a26ddc4e9f');
require('../../pages/detail-comments/detail-comments?hash=de00674b6bbbd163bf2c28b9630293f3390a70fe');
require('../../pages/my-article/my-article?hash=82ce4421ae1b7f6406dbf035910f161a5d741d28');
require('../../pages/feedback/feedback?hash=af30089a14de5bba22f51cbb6b3d48bc536087f6');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}