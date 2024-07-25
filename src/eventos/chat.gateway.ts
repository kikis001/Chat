import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() io: Server

  handleConnection(client: any, ...args: any[]) {
    console.log(`Bienvenido ${client.id}`)
    // return `Bienvenido ${client.id}`
  }
  handleDisconnect(client: any) {
    return "Vuelva pronto";
  }

  afterInit(server: any) {
    console.log('Inicializado');
  }

  @SubscribeMessage("ping")
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const id = client.id;
    console.log(`${id}: ${data}`)
    return data;
  }
}
