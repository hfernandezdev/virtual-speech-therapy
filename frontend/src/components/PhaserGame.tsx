import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { useSocket } from '../contexts/SocketContext';

interface PhaserGameProps {
  studentId: string;
  therapistId: string;
  onGameUpdate?: (gameData: any) => void;
}

class WordMatchingScene extends Phaser.Scene {
  private currentWord!: string;
  private options: string[] = [];
  private correctOption!: string;
  private selectedOption: string | null = null;
  private score: number = 0;
  private currentPlayer: 'therapist' | 'student' = 'therapist';

  private onGameUpdate?: (gameData: any) => void;

  constructor() {
    super({ key: 'WordMatchingScene' });
  }

  init(data: { onGameUpdate?: (gameData: any) => void }) {
    this.onGameUpdate = data.onGameUpdate;
  }

  create() {
    this.cameras.main.setBackgroundColor('#4a90e2');

    this.add.text(400, 50, '¡Empareja la palabra!', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.initializeGame();

    this.updatePlayerDisplay();
  }

  private initializeGame() {
    const wordSets = [
      { word: 'GATO', options: ['🐱', '🐶', '🐭', '🐰'], correct: '🐱' },
      { word: 'CASA', options: ['🏠', '🏢', '🏥', '🏫'], correct: '🏠' },
      { word: 'SOL', options: ['☀️', '🌙', '⭐', '☁️'], correct: '☀️' },
      { word: 'AGUA', options: ['💧', '🔥', '🌍', '💨'], correct: '💧' }
    ];

    const currentSet = wordSets[Math.floor(Math.random() * wordSets.length)];
    this.currentWord = currentSet.word;
    this.options = [...currentSet.options].sort(() => Math.random() - 0.5);
    this.correctOption = currentSet.correct;

    this.add.text(400, 120, this.currentWord, {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    this.createOptionButtons();
  }

  private createOptionButtons() {
    const optionPositions = [
      { x: 200, y: 250 },
      { x: 600, y: 250 },
      { x: 200, y: 400 },
      { x: 600, y: 400 }
    ];

    this.options.forEach((option, index) => {
      const button = this.add.text(optionPositions[index].x, optionPositions[index].y, option, {
        fontSize: '64px',
        color: '#ffffff',
        fontFamily: 'Arial',
        backgroundColor: '#2c3e50',
        padding: { x: 20, y: 10 }
      })
      .setOrigin(0.5)
      .setInteractive();

      button.on('pointerdown', () => {
        this.selectOption(option, button);
      });
    });
  }

  private selectOption(option: string, button: Phaser.GameObjects.Text) {
    if (this.selectedOption) return;

    this.selectedOption = option;

    if (option === this.correctOption) {
      button.setBackgroundColor('#27ae60');
      this.score += 10;

      this.createParticles(button.x, button.y);

      this.time.delayedCall(1000, () => {
        this.nextRound();
      });
    } else {
      button.setBackgroundColor('#e74c3c');

      this.time.delayedCall(1000, () => {
        this.nextRound();
      });
    }

    this.onGameUpdate?.({
      selectedOption: option,
      isCorrect: option === this.correctOption,
      score: this.score,
      currentWord: this.currentWord
    });
  }

  private createParticles(x: number, y: number) {
    for (let i = 0; i < 10; i++) {
      const circle = this.add.circle(x, y, 5, 0xffffff, 1);

      this.tweens.add({
        targets: circle,
        x: x + (Math.random() - 0.5) * 200,
        y: y + (Math.random() - 0.5) * 200,
        alpha: 0,
        scale: 0,
        duration: 600,
        ease: 'Power2',
        onComplete: () => circle.destroy()
      });
    }
  }

  private nextRound() {
    this.selectedOption = null;
    this.switchPlayer();
    this.scene.restart();
  }

  private switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'therapist' ? 'student' : 'therapist';
    this.updatePlayerDisplay();
  }

  private updatePlayerDisplay() {
    const existingDisplay = this.children.getByName('playerDisplay');
    if (existingDisplay) {
      existingDisplay.destroy();
    }

    this.add.text(400, 500, `Turno: ${this.currentPlayer === 'therapist' ? 'Terapeuta' : 'Estudiante'}`, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    })
    .setOrigin(0.5)
    .setName('playerDisplay');

    this.add.text(400, 540, `Puntuación: ${this.score}`, {
      fontSize: '20px',
      color: '#f1c40f',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
  }
}

const PhaserGame: React.FC<PhaserGameProps> = ({ studentId, therapistId, onGameUpdate }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null);
  const { socket, isConnected } = useSocket();
  const [gameState, setGameState] = useState({
    score: 0,
    currentPlayer: 'therapist' as 'therapist' | 'student',
    currentWord: ''
  });

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      scene: [WordMatchingScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
    };

    (config as any).scene = new WordMatchingScene();
    (config as any).scene.init({ onGameUpdate: handleGameUpdate });

    gameInstance.current = new Phaser.Game(config);

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
        gameInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on('game-state-update', (gameData: any) => {
      setGameState(gameData);
    });

    socket.emit('join-game-room', {
      studentId,
      therapistId,
      room: `game-${studentId}-${therapistId}`
    });

    return () => {
      socket.off('game-state-update');
    };
  }, [socket, isConnected, studentId, therapistId]);

  const handleGameUpdate = (gameData: any) => {
    setGameState(prev => ({ ...prev, ...gameData }));
    onGameUpdate?.(gameData);

    if (socket && isConnected) {
      socket.emit('game-update', {
        studentId,
        therapistId,
        gameData: { ...gameState, ...gameData }
      });
    }
  };

  // TODO: Implement sendGameAction if needed in future
  // const sendGameAction = (action: string, data?: any) => {
  //   if (socket && isConnected) {
  //     socket.emit('game-action', {
  //       action,
  //       data,
  //       studentId,
  //       therapistId
  //     });
  //   }
  // };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Therapy Game - Word Matching</h3>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${
            gameState.currentPlayer === 'therapist' ? 'text-blue-600' : 'text-gray-600'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              gameState.currentPlayer === 'therapist' ? 'bg-blue-500' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm">Terapeuta</span>
          </div>
          <div className={`flex items-center space-x-2 ${
            gameState.currentPlayer === 'student' ? 'text-green-600' : 'text-gray-600'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              gameState.currentPlayer === 'student' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm">Estudiante</span>
          </div>
          <div className="text-lg font-bold text-purple-600">
            Score: {gameState.score}
          </div>
        </div>
      </div>

      <div ref={gameRef} className="border-2 border-gray-200 rounded-lg overflow-hidden flex justify-center" />

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Instrucciones:</h4>
        <p className="text-sm text-gray-600">
          • Haz coincidir la palabra con el emoji correcto<br/>
          • Los turnos se alternan entre terapeuta y estudiante<br/>
          • +10 puntos por cada respuesta correcta
        </p>
      </div>
    </div>
  );
};

export default PhaserGame;
