import { useContext, useEffect, useState } from "react";
import Grid from "./components/Grid";
import { SocketContext } from "./context/SocketContext";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import GridHistory from "./components/GridHistory";

function App() {
  const [count, setCount] = useState(60);
  const { socket } = useContext(SocketContext);
  const [currentOnline, setCurrentOnline] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);
  const [open, setOpen] = useState(false);

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
    <>
      <div className="main">
        <div>
          <div className="main-header">
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <PiUsersThreeFill size={25} color="green" />
              <h3>{currentOnline.length}</h3>
            </div>
            {hasSelected && (
              <div
                style={{ display: "flex", alignItems: "center", columnGap: 5 }}
              >
                <IoTimeOutline size={20} color="red" />
                <p style={{ color: "red", fontWeight: "600" }}>
                  {formatTime(count)}
                </p>
              </div>
            )}
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setOpen(true)}
            >
              <MdManageHistory size={20} />
            </button>
          </div>
          <Grid {...{ hasSelected, setHasSelected }} />
        </div>
      </div>

      <GridHistory {...{ open, setOpen }} />
    </>
  );
}

export default App;
