import { useContext, useEffect, useState, useRef } from "react";
import Grid from "./components/Grid";
import { SocketContext } from "./context/SocketContext";

function App() {
  const [count, setCount] = useState(60);
  const { socket } = useContext(SocketContext);
  const [currentOnline, setCurrentOnline] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("online-users", (data) => {
        setCurrentOnline(data);
      });
    }
  }, [socket]);

  const formatTime = (seconds) => {
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `0:${formattedSeconds}`;
  };

  useEffect(() => {
    if (hasSelected) {
      setCount(60);
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev === 0) {
            setHasSelected(false);
            return prev;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [hasSelected]);

  return (
    <div className="main">
      <div>
        <div className="main-header">
          <h3>Online users ({currentOnline.length})</h3>
          {hasSelected && (
            <p style={{ color: "red", fontWeight: "600" }}>
              {formatTime(count)}
            </p>
          )}
        </div>
        <Grid {...{ hasSelected, setHasSelected }} />
      </div>
    </div>
  );
}

export default App;
