local Async = require("defgamesnacks.utils.async")
local JSON = require("defgamesnacks.utils.json")

---@class DefGamesnacks
local DefGamesnacks = {}

local REWARDED_AD_CALLBACK_TYPE = {
    before_reward = 0,
    before_break = 1,
    ad_complete = 2,
    ad_dismissed = 3,
    after_breake = 4
}

DefGamesnacks.REWARDED_AD_CALLBACK_TYPE = REWARDED_AD_CALLBACK_TYPE

local TYPES = {
    NUMBER = "number",
    TABLE = "table"
}

local log = function(...)
end

local DefGamesnacks_private = defgamesnacks

function DefGamesnacks:enable_log(value)
    log =value and pprint or function()end
end

function DefGamesnacks:setup_mock(mock)
    DefGamesnacks_private = DefGamesnacks_private or mock
end

function DefGamesnacks:game_ready()
    log("Send game ready")
    DefGamesnacks_private.game_ready()
end

function DefGamesnacks:send_score(score_value)
    if not score_value or type(score_value) ~= TYPES.NUMBER then
        log("DefGamesnacks:send_score : error cant send score for ", score_value)
        return
    end

    log("Send game ready")
    DefGamesnacks_private.send_score(score_value)
end

function DefGamesnacks:send_level_complete(level_id)
    if not level_id or type(level_id) ~= TYPES.NUMBER then
        log("DefGamesnacks:send_score : error cant send level for ", level_id)
        return
    end

    log("DefGamesnacks:send_level_complete")
    DefGamesnacks_private.send_level_complete(level_id)
end

function DefGamesnacks:send_game_over()
    log("DefGamesnacks:send_game_over")
    DefGamesnacks_private.send_game_over()
end

function DefGamesnacks:is_audio_enabled()
    log("DefGamesnacks:is_audio_enabled")
    return DefGamesnacks_private.is_audio_enabled()
end

function DefGamesnacks:add_audio_listener(callback_listener)
    log("DefGamesnacks:add_audio_listener")
    DefGamesnacks_private.add_audio_listener(function(script_instance, message_id, message)
        if callback_listener then
            callback_listener(script_instance, message, message_id)
        end
    end)
end

function DefGamesnacks:add_rewarded_ad_listener(callback_listener)
    log("DefGamesnacks:add_rewarded_ad_listener")
    DefGamesnacks_private.add_rewarded_ad_listener(function(script_instance, message_id, message)
        if callback_listener then
            callback_listener(script_instance, message, message_id)
        end
    end)
end

function DefGamesnacks:add_rewarded_ad_listener_callbacks(callbacks)
    assert(callbacks, "Callbacks cant be nil")
    assert(type(callbacks) == TYPES.TABLE, "invalid callbacks type")

    log("DefGamesnacks:add_rewarded_ad_listener_callbacks")
    DefGamesnacks_private.add_rewarded_ad_listener(function(script_instance, message_id, message)
        local callback_type = message.callback_type
        if not message then
            return
        end

        local callback = callbacks[callback_type]

        if callback then
            callback(script_instance, message, message_id)
        end
    end)
end

function DefGamesnacks:check_rewarded_ad_opportunity()
    log("DefGamesnacks:check_rewarded_ad_opportunity")
    DefGamesnacks_private.check_rewarded_ad_opportunity()
end

function DefGamesnacks:show_rewarded_ad()
    log("DefGamesnacks:show_rewarded_ad")
    DefGamesnacks_private.show_rewarded_ad()
end

function DefGamesnacks:is_show_rewarded_ad_ready()
    return DefGamesnacks_private.is_rewarded_ad_ready()
end

return DefGamesnacks