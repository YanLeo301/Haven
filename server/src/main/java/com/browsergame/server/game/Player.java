package com.browsergame.server.game;

public class Player
{
    private final String id;
    private int x;
    private int y;

    public Player(String playerId)
    {
        id = playerId;
    }

    public int getX()
    {
        return x;
    }

    public int getY()
    {
        return y;
    }

    public void setPos(int newX, int newY)
    {
        x = newX;
        y = newY;
    }

    public String getId()
    {
        return id;
    }
}