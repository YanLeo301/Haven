package com.browsergame.server.websocket;

import java.util.concurrent.ConcurrentMap;

import com.browsergame.server.game.Player;

record ConnectionMessage(String type, String id) {}

record GameStateMessage(String type, ConcurrentMap<String , Player> gameStateMap) {}