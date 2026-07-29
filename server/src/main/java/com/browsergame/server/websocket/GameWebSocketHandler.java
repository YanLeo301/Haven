package com.browsergame.server.websocket;

import java.util.concurrent.ConcurrentMap;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.browsergame.server.game.GameState;
import com.browsergame.server.game.Player;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Component
public class GameWebSocketHandler extends TextWebSocketHandler
{
    private final SessionStore sessionStore;
    private final GameState gameState;

    public GameWebSocketHandler(SessionStore sessionStore, GameState gameState)
    {
        this.sessionStore = sessionStore;
        this.gameState = gameState;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
        String payload = message.getPayload();
        System.out.println("Received: " + payload);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(payload);

        int x = jsonNode.get("x").asInt();
        int y = jsonNode.get("y").asInt();

        if (gameState.getPlayer(session.getId()) != null)
        {
            Player player = gameState.getPlayer(session.getId());
            player.setPos(x, y);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session)
    {
        System.out.println("Connected: " + session.getId());
        sessionStore.add(session.getId(), session);
        gameState.add(session.getId(), new Player(session.getId()));
    }
    //TODO: delete sessionStore and gameState entry on disconnect

    //TODO: send Player objects as json 
    @Scheduled(fixedRate = 500)
    public void broadcast() throws Exception
    {
        ConcurrentMap<String, WebSocketSession> sessionMap = sessionStore.getSessionMap();

        sessionMap.forEach((sessionId, session) -> 
        {
            try 
            {
                if (session.isOpen())
                {
                    session.sendMessage(new TextMessage("Broadcast"));
                }
            } 
            catch (Exception e) 
            {
                System.out.println("Failed to send message to session: " + sessionId);
                System.out.println(e.toString());
            }
        });
    }

    //TODO: Seperate game logic from network logic maybe if needed
}