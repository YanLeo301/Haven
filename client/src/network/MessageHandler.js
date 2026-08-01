export default class MessageHandler extends EventTarget
{
    handle(rawMessage)
    {
        const message = JSON.parse(rawMessage);
        //TODO: event listeners in LocalPlayer (or MainScene) for setting id and in MainScene to render RemotePlayers with game state data
        const event = new CustomEvent(message.type, {detail: message});
        this.dispatchEvent(event);
    }
}