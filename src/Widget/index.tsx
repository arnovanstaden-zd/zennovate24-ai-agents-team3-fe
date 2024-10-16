import styles from './Widget.module.scss';
import sparklesSVG from '../assets/sparkles.svg';
import closeSVG from '../assets/close.svg';
import { useEffect, useState } from 'react';
import Bubbles from './Bubbles';
import { useReactMediaRecorder } from 'react-media-recorder';

const Widget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });

  let ws: WebSocket;

  useEffect(() => {
    // Only attempt to send if the mediaBlobUrl is available
    if (!mediaBlobUrl) return;

    // Create a new WebSocket connection
    ws = new WebSocket('ws://localhost:8080');
    setFetching(true);

    ws.onopen = () => {
      console.log('WebSocket connection opened');

      // Fetch the media content as binary data
      fetch(mediaBlobUrl)
        .then((response) => response.blob()) // Convert the media URL into a Blob
        .then((blob) => {
          // Convert Blob to ArrayBuffer to send as binary data
          blob.arrayBuffer().then((buffer) => {
            ws.send(buffer); // Send binary data through WebSocket
            console.log('Media sent via WebSocket');
          });
        })
        .catch((error) => console.error('Error fetching media:', error));
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
    setFetching(false);
    stopRecording();
    if (ws) ws.close();
  };

  useEffect(() => {
    return () => handleClose();
  }, []);

  const isRecording = status === 'recording';

  return (
    <div className={styles.Widget}>
      {!open ? (
        <button className={styles.widgetEntry} onClick={() => setOpen(true)}>
          <img src={sparklesSVG} alt='' />
        </button>
      ) : (
        <div className={styles.content}>
          <button className={styles.closeButton} onClick={handleClose}>
            <img src={closeSVG} alt='' />
          </button>
          {!fetching ? (
            !isRecording ? (
              <div
                className={styles.startRecording}
                onClick={() => {
                  startRecording();
                }}
              >
                Click to start recording
              </div>
            ) : (
              <div
                className={styles.recording}
                onClick={() => {
                  stopRecording();
                }}
              >
                <div className={styles.recordCircle}>
                  <div className={styles.circle}></div>
                </div>
                <h4>Recording...</h4>
                <p>Click to stop</p>
              </div>
            )
          ) : (
            <div className={styles.thinking}>
              <Bubbles />
              <h4>Thinking...</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Widget;
