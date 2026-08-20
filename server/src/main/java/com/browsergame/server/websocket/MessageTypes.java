package com.browsergame.server.websocket;

import java.util.concurrent.ConcurrentMap;

import com.browsergame.server.game.Node;
import com.browsergame.server.game.Player;

record ConnectionMessage(String type, String id) {}

record PlayerPosMessage(String type, ConcurrentMap<String , Player> playerMap) {}

//TODO: this should be send on connection and when node is consumed
record NodePosMessage(String type, ConcurrentMap<Integer, Node> nodeMap) {}