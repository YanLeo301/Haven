package com.browsergame.server.game;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Component;

@Component
public class SessionManager
{
    private final ConcurrentMap<String, Player> sessionMap;

    public SessionManager()
    {
        sessionMap = new ConcurrentHashMap<>();
    }

    public Player getPlayer(String sessionId)
    {
        return sessionMap.get(sessionId);
    }
}