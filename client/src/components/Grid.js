import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import Modal from "./Modal";

const rows = 10,
  columns = 10;

function Grid({ hasSelected, setHasSelected }) {
  const { socket } = useContext(SocketContext);
  const [gridState, setGridState] = useState({});
  const [block, setBlock] = useState({
    row: "",
    col: "",
  });

  const [open, setOpen] = useState(false);

  const handleClick = (row, col) => {
    setBlock({ row, col });
    setOpen(true);
  };

  useEffect(() => {
    if (socket)
      socket.on("current-state", (data) => {
        setGridState(data);
      });
  }, [socket]);

  return (
    <>
      <div>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: "flex" }}>
            {Array.from({ length: columns }, (_, colIndex) => (
              <div
                style={
                  hasSelected || gridState[`${rowIndex}-${colIndex}`]
                    ? { pointerEvents: "none" }
                    : { pointerEvents: "auto" }
                }
                className="cell"
                key={`col-${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                <p
                  style={{
                    fontSize: "25px",
                    color: "#83bd3f",
                    fontWeight: "600",
                  }}
                >
                  {gridState[`${rowIndex}-${colIndex}`]}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {open ? <Modal {...{ block, setHasSelected, setOpen }} /> : null}
    </>
  );
}

export default React.memo(Grid);
