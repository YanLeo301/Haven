package com.browsergame.server.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.browsergame.server.game.SessionManager;

@Component
public class GameWebSocketHandler extends TextWebSocketHandler
{
    private final SessionManager sessionManager;

    public GameWebSocketHandler(SessionManager sessionManager)
    {
        this.sessionManager = sessionManager;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
        String payload = message.getPayload();
        System.out.println("Received: " + payload);

        session.sendMessage(new TextMessage("Server received: " + payload + " at " + System.currentTimeMillis()));
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session)
    {
        System.out.println("Connected: " + session.getId());
    }
}

//TODO: update sessionManager on connect and process Messages from client