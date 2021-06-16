#define EXTENSION_NAME defgamesnacks
#define LIB_NAME "defgamesnacks"
#define MODULE_NAME "defgamesnacks"

#define DLIB_LOG_DOMAIN LIB_NAME
#include <dmsdk/sdk.h>
#include <dmsdk/dlib/log.h>
#include "luautils.h"
#include "defgamesnacks.h"
#include "callback_container.h"

#if defined(DM_PLATFORM_HTML5)

enum CallbackID {
    CallbackAudioUpdate, 
    CallbackRewardAd, 
    CallbackCount
};

LuaCallbackContainer jsCallbacks[CallbackCount];

static int gameReady(lua_State* L)
{
    DefGamesnacks_gameReady();
    return 0;
}

static int sendScore(lua_State* L)
{
    int scoreValue = luaL_checknumber(L, 1);
    DefGamesnacks_sendScore(scoreValue);
    return 0;
}

static int sendGameOver(lua_State* L)
{
    DefGamesnacks_sendGameOver();
    return 0;
}

static int sendLevelComplete(lua_State* L)
{
    int levelId = luaL_checknumber(L, 1);
    DefGamesnacks_sendLevelComplete(levelId);
    return 0;
}

static int isAudioEnabled(lua_State* L)
{
    bool isAudioEnabled = DefGamesnacks_isAudioEnabled();
    lua_pushboolean(L, isAudioEnabled);
    return 1;
}

static int addAudioListener(lua_State* L)
{
    jsCallbacks[CallbackAudioUpdate].AddListener(L, 1, false);
    DefGamesnacks_subscribeAudioUpdate(CallbackAudioUpdate);
    return 0;
}

static int addRewardedAdListener(lua_State* L)
{
    jsCallbacks[CallbackRewardAd].AddListener(L, 1, false);
    return 0;
}

static int checkRewardedAdOpportunity(lua_State* L)
{
    DefGamesnacks_checkRewardedAdOpportunity(CallbackRewardAd);
    return 0;
}

static int showRewardedAd(lua_State* L)
{
    DefGamesnacks_showRewardedAd();
    return 0;
}

static int isShowRewardedAdReady(lua_State* L)
{
    bool isRewardedReady = DefGamesnacks_isShowAdReady();
    lua_pushboolean(L, isRewardedReady);
    return 1;
}

static void onCallbackMessage(int callbackID, const char* message)
{
    if (callbackID < 0 || callbackID >= CallbackCount)
    {
        dmLogError("Callback id %d out of range", callbackID)
        return;
    }

    jsCallbacks[callbackID].SendMessageJsonObject("", message);
}

static const luaL_reg Module_methods[] =
{
    {"game_ready", gameReady},
    {"send_score", sendScore},
    {"send_game_over", sendGameOver},
    {"send_level_complete", sendLevelComplete},
    {"is_audio_enabled", isAudioEnabled},
    {"add_audio_listener", addAudioListener},
    {"add_rewarded_ad_listener", addRewardedAdListener},
    {"check_rewarded_ad_opportunity", checkRewardedAdOpportunity},
    {"show_rewarded_ad", showRewardedAd},
    {"is_rewarded_ad_ready", isShowRewardedAdReady},

    {0, 0}
};

static void LuaInit(lua_State* L)
{
    int top = lua_gettop(L);
    luaL_register(L, MODULE_NAME, Module_methods);
    lua_pop(L, 1);
    assert(top == lua_gettop(L));
}

#endif

dmExtension::Result AppInitializedefgamesnacksExtension(dmExtension::AppParams* params) {
    return dmExtension::RESULT_OK;
}

dmExtension::Result InitializedefgamesnacksExtension(dmExtension::Params* params) {
	#if defined(DM_PLATFORM_HTML5)
		LuaInit(params->m_L);
        DefGamesnacks_registerCallbacks(onCallbackMessage);
	#else
		printf("Extension %s is not supported\n", MODULE_NAME);
	#endif

	return dmExtension::RESULT_OK;
}

dmExtension::Result AppFinalizedefgamesnacksExtension(dmExtension::AppParams* params) {
	return dmExtension::RESULT_OK;
}

dmExtension::Result FinalizedefgamesnacksExtension(dmExtension::Params* params) {
	return dmExtension::RESULT_OK;
}

dmExtension::Result UpdatedefgamesnacksExtension(dmExtension::Params* params) {
	return dmExtension::RESULT_OK;
}

DM_DECLARE_EXTENSION(defgamesnacks, LIB_NAME, AppInitializedefgamesnacksExtension, AppFinalizedefgamesnacksExtension, InitializedefgamesnacksExtension, UpdatedefgamesnacksExtension, 0, FinalizedefgamesnacksExtension)