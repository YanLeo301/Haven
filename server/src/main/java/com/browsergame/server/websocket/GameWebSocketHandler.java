package com.browsergame.server.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.browsergame.server.game.Player;
import com.browsergame.server.game.SessionManager;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

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

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(payload);

        float x = jsonNode.get("x").asFloat();
        float y = jsonNode.get("y").asFloat();

        if (sessionManager.getPlayer(session.getId()) != null)
        {
            Player player = sessionManager.getPlayer(session.getId());
            player.setPos(x, y);
        }

        session.sendMessage(new TextMessage("Server received: " + payload + " at " + System.currentTimeMillis()));
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session)
    {
        System.out.println("Connected: " + session.getId());
        sessionManager.add(session.getId(), new Player(session.getId()));
    }
}