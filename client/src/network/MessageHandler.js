export default class MessageHandler extends EventTarget
{
    handle(rawMessage)
    {
        const message = JSON.parse(rawMessage);
        const event = new CustomEvent(message.type, {detail: message});
        this.dispatchEvent(event);
    }
}