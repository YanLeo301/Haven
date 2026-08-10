package com.browsergame.server.game;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Component;

@Component
public class GameState
{
    private final ConcurrentMap<String, Player> playerMap;

    public GameState()
    {
        playerMap = new ConcurrentHashMap<>();
    }

    public Player getPlayer(String sessionId)
    {
        return playerMap.get(sessionId);
    }

    public void add(String sessionId, Player player)
    {
        playerMap.put(sessionId, player);
        System.out.println("Player added: " + sessionId);
    }

    public void remove(String sessionId)
    {
        playerMap.remove(sessionId);
    }

    public ConcurrentMap<String, Player> getPlayerMap()
    {
        return playerMap;
    }
}