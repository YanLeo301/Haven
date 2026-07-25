package com.browsergame.server.game;

public class Player
{
    private final String id;
    private float x;
    private float y;

    public Player(String playerId)
    {
        id = playerId;
    }

    public float getX()
    {
        return x;
    }

    public float getY()
    {
        return y;
    }

    public void setPos(float newX, float newY)
    {
        x = newX;
        y = newY;
    }

    public String getId()
    {
        return id;
    }
}