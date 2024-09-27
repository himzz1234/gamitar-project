import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export default function GridHistory({ open, setOpen }) {
  const [history, setHistory] = useState({});
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("grid-history", (data) => {
        setHistory((prev) => ({ ...prev, ...data }));
      });
    }

    return () => {
      if (socket) {
        socket.off("grid-history");
      }
    };
  }, [socket]);

  return (
    <div
      onClick={() => setOpen(false)}
      className={`modal-container ${!open ? "hide" : "show"}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal">
        {!history ? (
          <h4>No history to be found!</h4>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
          >
            {Object.keys(history).map((key) => (
              <div key={key}>
                <h4 style={{ fontSize: "18px" }}>{key}</h4>
                <div
                  style={{
                    paddingLeft: "10px",
                    marginTop: "10px",
                    rowGap: "10px",
                  }}
                >
                  {history[key].updates.map((update, index) => {
                    const { row, col, unicodeCharacter } = update;

                    return (
                      <p key={index}>
                        Block [{row},{col}] updated with {unicodeCharacter}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
