import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import WebSocketClient from './network/WebSocketClient';

var webSocketClient = new WebSocketClient();
webSocketClient.connect('http://localhost:8080/');

var config =
{
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics:
    {
        default: 'arcade'
    },
    scene: new MainScene(webSocketClient)
};

var game = new Phaser.Game(config);