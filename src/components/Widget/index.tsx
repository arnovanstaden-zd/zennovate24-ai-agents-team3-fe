import styles from './Widget.module.scss';
import { useEffect, useState } from 'react';
import ThinkingBubbles from './ThinkingBubbles';
import { useReactMediaRecorder } from 'react-media-recorder';
import SpeakingBubbles from './SpeakingBubbles';

const API_URL = import.meta.env.VITE_API_URL;

const Widget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    'idle' | 'recording' | 'fetching' | 'speaking'
  >('idle');
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { video: false }
  );
  let ws: WebSocket;

  useEffect(() => {
    // Only attempt to send if the mediaBlobUrl is available
    if (!mediaBlobUrl) return;

    // Create a new WebSocket connection
    ws = new WebSocket(API_URL || '');
    setStatus('fetching');

    ws.onopen = () => {
      console.log('WebSocket connection opened');

      fetch(mediaBlobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Convert Blob to ArrayBuffer to send as binary data
          blob.arrayBuffer().then((buffer) => {
            ws.send(buffer); // Send binary data through WebSocket
            console.log('Media sent via WebSocket');
          });
        })
        .catch((error) => console.error('Error fetching media:', error));

      // remove this
      setTimeout(() => {
        setStatus('speaking');
      }, 3000);
    };

    ws.onmessage = (event) => {
      console.log('Received response from server:', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws) ws.close();
    };
  }, [mediaBlobUrl]);

  const handleClose = () => {
    setOpen(false);
    setStatus('idle');
    stopRecording();
    if (ws) ws.close();
  };

  useEffect(() => {
    return () => handleClose();
  }, []);

  return (
    <div className={styles.Widget}>
      {!open ? (
        <button className={styles.widgetEntry} onClick={() => setOpen(true)}>
          <img src='/sparkles.svg' alt='' />
        </button>
      ) : (
        <div className={styles.content}>
          <button className={styles.closeButton} onClick={handleClose}>
            <img src='/close.svg' alt='' />
          </button>
          {status === 'idle' && (
            <div
              className={styles.idle}
              onClick={() => {
                startRecording();
                setStatus('recording');
              }}
            >
              Click to start recording
            </div>
          )}
          {status === 'recording' && (
            <div
              className={styles.recording}
              onClick={() => {
                stopRecording();
                setStatus('fetching');
              }}
            >
              <div className={styles.recordCircle}>
                <div className={styles.circle}></div>
              </div>
              <h4>Recording...</h4>
              <p>Click to stop</p>
            </div>
          )}
          {status === 'fetching' && (
            <div className={styles.thinking}>
              <ThinkingBubbles />
              <h4>Thinking...</h4>
            </div>
          )}
          {status === 'speaking' && <SpeakingBubbles />}
        </div>
      )}
    </div>
  );
};

export default Widget;
