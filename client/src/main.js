import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import WebSocketClient from './network/WebSocketClient';

var webSocketClient = new WebSocketClient();
webSocketClient.connect('http://localhost:8080/');

const width = 1000;
const height = 600;

var config =
{
    type: Phaser.AUTO,
    width: width,
    height: height,
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
                width: width,
                height: height,
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