#pragma once

#include <dmsdk/sdk.h>

#if defined(DM_PLATFORM_HTML5)

typedef void (*CallbackMessage)(int callbackId, const char* message);


extern "C" {
    void DefGamesnacks_registerCallbacks(CallbackMessage callbackIDMessage);
    
    void DefGamesnacks_gameReady();
    void DefGamesnacks_sendScore(int scoreValue);
    void DefGamesnacks_sendGameOver();
    void DefGamesnacks_sendLevelComplete(int levelId);
    bool DefGamesnacks_isAudioEnabled();
    void DefGamesnacks_subscribeAudioUpdate(int callbackID);
    void DefGamesnacks_checkRewardedAdOpportunity(int callbackID);
    void DefGamesnacks_showRewardedAd();
    bool DefGamesnacks_isShowAdReady();
}


#endif