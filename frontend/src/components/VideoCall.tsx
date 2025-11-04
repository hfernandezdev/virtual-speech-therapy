import React, { useEffect, useRef, useState } from 'react';

interface VideoCallProps {
  roomUrl: string;
  onCallEnd?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomUrl, onCallEnd }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!roomUrl) return;

    // Para desarrollo, simular conexión exitosa después de 2 segundos
    const timer = setTimeout(() => {
      setIsConnected(true);
      console.log('✅ Video call connected to:', roomUrl);
    }, 2000);

    return () => {
      clearTimeout(timer);
      setIsConnected(false);
    };
  }, [roomUrl]);

  const handleEndCall = () => {
    setIsConnected(false);
    onCallEnd?.();
  };

  // En producción, usaríamos:
  /*
  useEffect(() => {
    if (!roomUrl) return;

    const callFrame = window.DailyIframe.createFrame(iframeRef.current, {
      url: roomUrl,
      showLeaveButton: true,
      iframeStyle: {
        position: 'relative',
        width: '100%',
        height: '100%',
        border: 'none',
        borderRadius: '8px'
      }
    });

    callFrame.join().then(() => {
      setIsConnected(true);
    });

    callFrame.on('left-meeting', () => {
      setIsConnected(false);
      onCallEnd?.();
    });

    return () => {
      callFrame.destroy();
    };
  }, [roomUrl, onCallEnd]);
  */

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Video Call Session</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {isConnected ? 'Conectado' : 'Conectando...'}
          </span>
        </div>
      </div>

      {roomUrl ? (
        <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '400px' }}>
          {/* Simulación de video call para desarrollo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-xl mb-2">Video Call Simulation</p>
              <p className="text-gray-300 mb-4">Room: {roomUrl}</p>
              {isConnected ? (
                <div className="space-y-2">
                  <div className="flex space-x-4 justify-center">
                    <div className="w-32 h-24 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white">Terapeuta</span>
                    </div>
                    <div className="w-32 h-24 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white">Estudiante</span>
                    </div>
                  </div>
                  <button
                    onClick={handleEndCall}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mt-4"
                  >
                    Finalizar Llamada
                  </button>
                </div>
              ) : (
                <div className="animate-pulse">Conectando...</div>
              )}
            </div>
          </div>

          {/* Para producción, descomentar: */}
          {/* <iframe
            ref={iframeRef}
            title="Video Call"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px'
            }}
            allow="camera; microphone; display-capture"
          /> */}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">
            No hay URL de sala configurada. Esta sería generada automáticamente en producción.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
