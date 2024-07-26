import { OnModuleInit, Scope } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection{
  @WebSocketServer() 
  // tiene la información de todos los clientes conectados
  private server: Server;

  afterInit() {
    console.log("Inicializado")
  }

  handleConnection(client: any, ...args: any[]) {
    client.emit('pong', "Bienvenido al canal")
  }

  @SubscribeMessage('ping')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any): void {
    console.log(`${client.id}: ${data}`);
    client.emit('pong', "Bienvenido");
  }

}
