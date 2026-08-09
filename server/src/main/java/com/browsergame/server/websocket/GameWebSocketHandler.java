package com.browsergame.server.websocket;

import java.io.IOException;
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
    private final ObjectMapper objectMapper;

    public GameWebSocketHandler(SessionStore sessionStore, GameState gameState, ObjectMapper objectMapper)
    {
        this.sessionStore = sessionStore;
        this.gameState = gameState;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
        String payload = message.getPayload();
        System.out.println("Received: " + payload);

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

        //TODO: this id must be set as the id of local player by client
        ConnectionMessage connectionMessage = new ConnectionMessage("connection", session.getId());
        String jsonConnectionMessage = objectMapper.writeValueAsString(connectionMessage);

        try
        {
            session.sendMessage(new TextMessage(jsonConnectionMessage));
        }
        catch (IOException | IllegalStateException e)
        {
            System.out.println("Failed to send id to session: " + session.getId());
            System.out.println(e.toString());            
        }
    }
    //TODO: delete sessionStore and gameState entry on disconnect

    @Scheduled(fixedRate = 16)
    public void broadcast() throws Exception
    {
        ConcurrentMap<String, WebSocketSession> sessionMap = sessionStore.getSessionMap();
        ConcurrentMap<String, Player> playerMap = gameState.getPlayerMap();

        GameStateMessage gameStateMessage = new GameStateMessage("gameState", playerMap);
        String gameStateMessageString = objectMapper.writeValueAsString(gameStateMessage);

        sessionMap.forEach((sessionId, session) -> 
        {
            try 
            {
                if (session.isOpen())
                {
                    session.sendMessage(new TextMessage(gameStateMessageString));
                }
            } 
            catch (IOException | IllegalStateException e) 
            {
                System.out.println("Failed to send game state to session: " + sessionId);
                System.out.println(e.toString());
            }
        });
    }

    //TODO: Maybe seperate network logic from game logic
}