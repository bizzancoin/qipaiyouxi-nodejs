/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debuging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
//if (cc.sys && cc.sys.isNative) {
//    var paths = jsb.fileUtils.getSearchPaths();
//    paths = [jsb.fileUtils.getWritablePath()+"update"].concat(paths);
//    jsb.fileUtils.setSearchPaths([]);
//}

 function screenChange(isW)
 {
	 var size = cc.view.getFrameSize();  
	 var w=size.width;var h=size.height;
     w=Math.max(size.width,size.height);
     h=Math.min(size.width,size.height);     
	 MjClient.size={width:w,height:h};
	 cc.view.setFrameSize(w,h);
	 cc.view.adjustViewPort(true);
	 cc.view.resizeWithBrowserSize(true);
     cc.view.setDesignResolutionSize(w,h, cc.ResolutionPolicy.NO_BORDER);
	 postEvent("resize");
 }
 
cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
	
    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
	cc.eventManager.addCustomListener("resizew",function(){  screenChange(1)});
    cc.eventManager.addCustomListener("resizeh",function(){  screenChange(2)});
	
	cc.view.setResizeCallback(screenChange);
	screenChange();
	
	//if (initResourceDir)
    //	initResourceDir();

	// Adjust viewport meta
    // Setup the resolution policy and design resolution size
    // Instead of set design resolution, you can also set the real pixel resolution size
    // Uncomment the following line and delete the previous line.
    // cc.view.setRealPixelResolution(960, 640, cc.ResolutionPolicy.SHOW_ALL);
    // The game will be resized when browser size change
    //load resources
    cc.log("******:"+JSON.stringify(json_res[MjClient.getAppType()]))
    var game_res = json_res[MjClient.getAppType()].concat(sound_res[MjClient.getAppType()]);

    cc.LoaderScene.preload(game_res, function () {
        MjClient.Scene=new JSScene();
        if (cc.sys.OS_WINDOWS == cc.sys.os) {
            if( cc.sys.isNative && jsb.fileUtils.isFileExist("TestManager.js")) {
                require("TestManager.js")
            }
        }
        cc.director.runScene(MjClient.Scene);

        if (cc.sys.OS_WINDOWS == cc.sys.os) {
            if(cc.sys.isNative && jsb.fileUtils.isFileExist("TestManager.js")) {
                MjClient.Scene._afterRunScene();
            }
        }

        // 按钮添加点击声音
        ccui.Button.prototype.addTouchEventListenerOrigin = ccui.Button.prototype.addTouchEventListener
        ccui.Button.prototype.addTouchEventListener = function (selector, target,isCommonClickMusicEnabled) {
            var _selector = function (sender, type){
                if ( type === ccui.Widget.TOUCH_ENDED && (isCommonClickMusicEnabled !== false) ){
                    if(((MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&  MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ) || (MjClient.isUseUIv3 && MjClient.isUseUIv3())) && 
                    	MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ)
                    {
                    	if (reallyPlayEffect)
                    		reallyPlayEffect("sound/button_click.mp3",false);
                    	else
                        	cc.audioEngine.playEffect("sound/button_click.mp3",false);
                    }
                }
                selector.call(this,sender,type)
            }
            this.addTouchEventListenerOrigin(_selector,target)
        };
        ccui.Button.prototype.addClickEventListenerOrigin = ccui.Button.prototype.addClickEventListener
        ccui.Button.prototype.addClickEventListener = function (callback,isCommonClickMusicEnabled){
            var _callBack = function(target){
                if ( isCommonClickMusicEnabled !== false ){
                    if(((MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&  MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ) || (MjClient.isUseUIv3 && MjClient.isUseUIv3())) && 
                        MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ)
                    {
                    	if (reallyPlayEffect)
                    		reallyPlayEffect("sound/button_click.mp3",false);
                    	else
                        	cc.audioEngine.playEffect("sound/button_click.mp3",false);
                    }
                }
                callback.call(this,target)
            }
            this.addClickEventListenerOrigin(_callBack)
        }


    }, this);
};
cc.game.run();