var DefGamesnacks = {

    $DefGamesnacks : {
        _playerInfoStr : null,
        _callbackJsonMessage : null,
        _showAdFn : null,

        REWARDED_AD_CALLBACK : {
            beforeReward : 0,
            beforeBreak : 1,
            adComplete : 2,
            adDismissed : 3,
            afterBreak : 4
        },

        sendObjectCallback : function(callback, callbackID, value){
            value = value || {};
            var objectStr = JSON.stringify(value);

            DefGamesnacks.sendStringCallback(callback, callbackID, objectStr)
        },

        sendStringCallback : function(callback, callbackID, value){
            value = value || "{}";

            var valueStr = 0;

            valueStr = allocate(intArrayFromString(value), "i8", ALLOC_NORMAL);
            {{{ makeDynCall("viii", "callback") }}}(callbackID, valueStr);
            Module._free(valueStr);
        },

        sendObjectCallbackID : function(callbackID, value){
            DefGamesnacks.sendObjectCallback(DefGamesnacks._callbackJsonMessage, callbackID, value);
        },

        parse_json : function(str){
            if (str == null){
                return null;
            }

            try{
                var jsonObject = JSON.parse(str);
                return jsonObject
            }
            catch(e){
            }

            return null;
        },

        sendRewardedAdCallback : function(callbackID, callbackType){
            let message = {
                callback_type : callbackType
            };

            DefGamesnacks.sendObjectCallbackID(callbackID, message);
        }
    },

    DefGamesnacks_registerCallbacks : function(callbackJsonMessage) {

        DefGamesnacks._callbackJsonMessage = callbackJsonMessage;
    },

    DefGamesnacks_gameReady : function(){
        console.log("DefGamesnacks_gameReady");
        DefGamesnacksSDK.gameReady();
    },

    DefGamesnacks_sendScore : function(score_value){
        console.log("DefGamesnacks_sendScore");
        DefGamesnacksSDK.sendScore(score_value);
    },

    DefGamesnacks_sendGameOver : function(){
        console.log("DefGamesnacks_sendGameOver");
        DefGamesnacksSDK.sendGameOver();
    },

    DefGamesnacks_sendLevelComplete : function(level_id){
        console.log("DefGamesnacks_sendGameOver");
        DefGamesnacksSDK.sendLevelComplete(level_id);
    },
    
    DefGamesnacks_isAudioEnabled : function(){
        return DefGamesnacksSDK.isAudioEnabled();
    },

    DefGamesnacks_subscribeAudioUpdate : function(callbackID){
        DefGamesnacksSDK.subscribeToAudioUpdates(() =>{
            let audioResult = {
                isAudioEnabled : DefGamesnacksSDK.isAudioEnabled()
            };

            DefGamesnacks.sendObjectCallbackID(callbackID, audioResult);
        });
    },

    DefGamesnacks_checkRewardedAdOpportunity : function(callbackRewardAd){
        DefGamesnacks._showAdFn = null;
        console.log("check rewarded AD");

        let callbacks = {
            beforeReward : (showAdFn) => {
                console.log("beforeReward", DefGamesnacks, DefGamesnacks.REWARDED_AD_CALLBACK );
                DefGamesnacks._showAdFn = showAdFn;
                DefGamesnacks.sendRewardedAdCallback(callbackRewardAd, DefGamesnacks.REWARDED_AD_CALLBACK.beforeReward);
            },
            beforeBreak: () => {
                console.log("beforeBreak");
                DefGamesnacks.sendRewardedAdCallback(callbackRewardAd, DefGamesnacks.REWARDED_AD_CALLBACK.beforeBreak);
            },
            adComplete: () => {
                console.log("adComplete");
                DefGamesnacks.sendRewardedAdCallback(callbackRewardAd, DefGamesnacks.REWARDED_AD_CALLBACK.adComplete);
            },
            adDismissed: () => {
                console.log("adDismissed");
                DefGamesnacks.sendRewardedAdCallback(callbackRewardAd, DefGamesnacks.REWARDED_AD_CALLBACK.adDismissed);
            },
            afterBreak: () => {
                console.log("afterBreak");
                DefGamesnacks.sendRewardedAdCallback(callbackRewardAd, DefGamesnacks.REWARDED_AD_CALLBACK.afterBreak);
            }
        };

        GAMESNACKS.rewardedAdOpportunity(callbacks);
    },

    DefGamesnacks_showRewardedAd : function(){
        if (DefGamesnacks._showAdFn == null){
            console.log("DefGamesnacks_showRewardedAd: rewarded ad not ready")
            return;
        }

        console.log("DefGamesnacks_showRewardedAd: calling rewarded ad")
        DefGamesnacks._showAdFn();
        DefGamesnacks._showAdFn = null;
    },

    DefGamesnacks_isShowAdReady : function(){

        return DefGamesnacks._showAdFn != null;
    }

}

autoAddDeps(DefGamesnacks, '$DefGamesnacks');
mergeInto(LibraryManager.library, DefGamesnacks);
