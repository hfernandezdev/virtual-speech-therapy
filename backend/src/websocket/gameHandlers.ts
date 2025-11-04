import { Server as SocketServer, Socket } from 'socket.io';

interface GameRoom {
  studentId: string;
  therapistId: string;
  sockets: Set<string>;
  gameState: any;
}

const gameRooms = new Map<string, GameRoom>();

export const setupGameHandlers = (io: SocketServer) => {
  io.on('connection', (socket: Socket) => {
    console.log('🔌 Cliente conectado para juego:', socket.id);

    socket.on('join-game-room', (data: { studentId: string; therapistId: string; room: string }) => {
      const { studentId, therapistId, room } = data;

      socket.join(room);
      console.log(`🎮 Socket ${socket.id} unido a room: ${room}`);

      if (!gameRooms.has(room)) {
        gameRooms.set(room, {
          studentId,
          therapistId,
          sockets: new Set([socket.id]),
          gameState: {
            score: 0,
            currentPlayer: 'therapist',
            currentWord: ''
          }
        });
      } else {
        const gameRoom = gameRooms.get(room)!;
        gameRoom.sockets.add(socket.id);
      }

      const gameRoom = gameRooms.get(room);
      if (gameRoom) {
        socket.emit('game-state-update', gameRoom.gameState);
      }
    });

    socket.on('game-update', (data: { studentId: string; therapistId: string; gameData: any }) => {
      const room = `game-${data.studentId}-${data.therapistId}`;
      const gameRoom = gameRooms.get(room);

      if (gameRoom) {
        gameRoom.gameState = { ...gameRoom.gameState, ...data.gameData };

        socket.to(room).emit('game-state-update', gameRoom.gameState);

        console.log(`🔄 Game update en room ${room}:`, data.gameData);
      }
    });

    socket.on('game-action', (data: { action: string; data: any; studentId: string; therapistId: string }) => {
      const room = `game-${data.studentId}-${data.therapistId}`;

      socket.to(room).emit('game-action', {
        action: data.action,
        data: data.data,
        from: socket.id
      });
    });

    socket.on('disconnect', () => {
      console.log('❌ Cliente desconectado del juego:', socket.id);

      gameRooms.forEach((room, roomName) => {
        if (room.sockets.has(socket.id)) {
          room.sockets.delete(socket.id);

          if (room.sockets.size === 0) {
            gameRooms.delete(roomName);
          }
        }
      });
    });
  });
};
