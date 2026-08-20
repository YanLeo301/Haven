import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import WebSocketClient from './network/WebSocketClient';

var webSocketClient = new WebSocketClient();
webSocketClient.connect('http://localhost:8080/');

const WIDTH = 3000;
const HEIGHT = 2000;

var config =
{
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics:
    {
        default: 'matter',
        matter:
        {
            gravity:
            {
                x: 0,
                y: 0,
            },
            setBounds:
            {
                x: 0,
                y: 0,
                width: WIDTH,
                height: HEIGHT,
                thickness: 64,
                left: true,
                right: true,
                top: true,
                bottom: true,
            }
        }
    },
    scene: new MainScene(webSocketClient, webSocketClient.messageHandler)
};

var game = new Phaser.Game(config);