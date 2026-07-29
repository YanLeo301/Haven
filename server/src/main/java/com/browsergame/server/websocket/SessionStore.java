package com.browsergame.server.websocket;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class SessionStore
{
    private final ConcurrentMap<String, WebSocketSession> sessionMap;

    public SessionStore()
    {
        sessionMap = new ConcurrentHashMap<>();
    }

    public WebSocketSession getSession(String sessionId)
    {
        return sessionMap.get(sessionId);
    }

    public ConcurrentMap<String, WebSocketSession> getSessionMap()
    {
        return sessionMap;
    }

    public void add(String sessionId, WebSocketSession session)
    {
        sessionMap.put(sessionId, session);
        System.out.println("Session added: " + sessionId);
    }
}