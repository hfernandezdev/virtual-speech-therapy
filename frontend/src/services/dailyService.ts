export class DailyService {
  private static baseUrl = 'https://api.daily.co/v1';
  // En producción, esto debería manejarse desde el backend por seguridad

  static async createRoom(roomName: string): Promise<string> {
    // Para desarrollo, simular creación de sala
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://your-domain.daily.co/${roomName}`);
      }, 1000);
    });

    // En producción:
    /*
    const response = await fetch(`${this.baseUrl}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_DAILY_API_KEY}`
      },
      body: JSON.stringify({
        name: roomName,
        privacy: 'public',
        properties: {
          start_audio_off: false,
          start_video_off: false,
          max_participants: 2
        }
      })
    });

    const data = await response.json();
    return data.url;
    */
  }

  static generateRoomName(): string {
    return `therapy-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
