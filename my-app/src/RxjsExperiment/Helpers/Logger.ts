export const Logger = function (message:string,data:unknown):void
{
    const date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()} ${message} ${data?JSON.stringify(data):''}`);
}