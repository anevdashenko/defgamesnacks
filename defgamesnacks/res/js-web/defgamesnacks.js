(function(scope){
    function createSafeCallback(callback){
        return function(){
            if (callback){
                return callback.apply(null, arguments);
            }

            return null;
        }
    }

    var DefGamesnacks = {
        _isInited : false,

        _purchaseCompleteCallback : null,

        initialize : function(){

        },

        isSDKAvailable : function(){
            return window.GAMESNACKS !== undefined;
        },

        gameReady : function(){
            GAMESNACKS.gameReady();
        },

        sendScore : function(score){
            GAMESNACKS.sendScore(score);
        },

        sendGameOver : function(score){
            GAMESNACKS.gameOver();
        },

        sendLevelComplete : function(level){
            GAMESNACKS.levelComplete(level);
        },

        isAudioEnabled : function(){
            return GAMESNACKS.isAudioEnabled();
        },

        subscribeToAudioUpdates : function(callback){
            GAMESNACKS.subscribeToAudioUpdates(callback);
        },

        checkRewardedAdOpportunity : function(callbacks){
            GAMESNACKS.rewardedAdOpportunity(callbacks);
        }

    };


    DefGamesnacks.initialize();

    scope.DefGamesnacksSDK = DefGamesnacks;

})(this);