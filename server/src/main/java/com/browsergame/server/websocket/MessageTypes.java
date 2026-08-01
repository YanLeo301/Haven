package com.browsergame.server.websocket;

@SuppressWarnings("unused")
class ConnectionMessage
{
    private final String type;
    private final String id;

    public ConnectionMessage(String id) 
    {
        type = "connection";
        this.id = id;
    }
}