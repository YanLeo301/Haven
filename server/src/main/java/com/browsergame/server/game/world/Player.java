package com.browsergame.server.game.world;

import java.awt.geom.Point2D;

public class Player
{
    private final String id;
    private Point2D.Float pos;

    public Player(String playerId, Point2D.Float spawnPoint)
    {
        id = playerId;
        pos = spawnPoint;
    }

    public Point2D.Float getPos()
    {
        return pos;
    }

    public void setPos(Point2D.Float newPos)
    {
        pos = newPos;
    }

    public String getId()
    {
        return id;
    }
}