//TODO: receive remote player data and pass it to scene to render
export default class WebSocketClient
{
    constructor()
    {
        this.ws = null;
        this.messageHandler = null;
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

        //TODO: process the game state data
        this.ws.onmessage = (message) =>
        {
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