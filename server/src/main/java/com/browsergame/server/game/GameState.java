package com.browsergame.server.game;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Component;

@Component
public class GameState
{
    private final ConcurrentMap<String, Player> playerMap;
    private final ConcurrentMap<Integer, Node> nodeMap;

    private static final int MAP_WIDTH = 3000;
    private static final int MAP_HEIGHT = 2000;
    private static final int NODE_COUNT = 100;

    public GameState()
    {
        playerMap = new ConcurrentHashMap<>();
        nodeMap = new ConcurrentHashMap<>();
        generateNodes();
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

    private void generateNodes()
    {
        Random random = new Random();

        for (int i = 0; i < NODE_COUNT; i++)
        {
            int x = random.nextInt(MAP_WIDTH);
            int y = random.nextInt(MAP_HEIGHT);

            nodeMap.put(i, new Node(x, y));
        }
    }

    public ConcurrentMap<Integer, Node> getNodeMap()
    {
        return nodeMap;
    }
}