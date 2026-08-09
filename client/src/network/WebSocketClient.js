import MessageHandler from "./MessageHandler";

export default class WebSocketClient
{
    constructor()
    {
        this.ws = null;
        this.messageHandler = new MessageHandler();
        this.pendingMessages = [];
    }
    
    connect(url)
    {
        this.ws = new WebSocket(url);

        this.ws.onopen = () =>
        {
            console.log('Connected to server');
        }

        this.ws.onerror = (error) =>
        {
            console.log('WebSocket error:', error);
        }

        this.ws.onmessage = (message) =>
        {
            this.messageHandler.handle(message.data);
            console.log('Received: ' + message.data);
        }

        this.ws.onclose = () =>
        {
            console.log('Disconnected from server');
        }
    }

    send(data)
    {
        if (this.ws.readyState === WebSocket.OPEN)
        {
            this.ws.send(data);
        }
    }
}