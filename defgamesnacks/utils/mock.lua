local Mock = {}

Mock.state = {
    is_audio_enabled = false,
    is_rewarded_ad_ready = false
}

function Mock.game_ready()
    -- body
end

function Mock.send_score()
    -- body
end

function Mock.send_level_complete()
    -- body
end

function Mock.send_game_over()
    -- body
end

function Mock.is_audio_enabled()
    return Mock.state.is_audio_enabled
end

function Mock.add_audio_listener()
    -- body
end

function Mock.add_rewarded_ad_listener()
    -- body
end

function Mock.check_rewarded_ad_opportunity()
    -- body
end

function Mock.show_rewarded_ad()
    -- body
end

function Mock.is_rewarded_ad_ready()
    return Mock.state.is_rewarded_ad_ready
end

return Mock