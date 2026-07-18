
export default class WebSocketClient
{
    constructor()
    {
        this.ws = null;
        this.messageHandler = null;
        this.isConnected = false;
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

        this.ws.onclose = () =>
        {
            console.log('Disconnected from server');
        }
    }
}