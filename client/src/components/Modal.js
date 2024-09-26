import React, { useContext, useRef } from "react";
import { SocketContext } from "../context/SocketContext";

export default function Modal({ block, setHasSelected, setOpen }) {
  const inputRef = useRef(null);
  const { socket } = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;
    socket.emit("cell-selected", {
      row: block.row,
      col: block.col,
      unicodeCharacter: inputRef.current.value,
    });

    setOpen(false);
    setHasSelected(true);
  };

  return (
    <div onClick={() => setOpen(false)} className="modal-container">
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="form-input"
            type="text"
            placeholder="Enter unicode character"
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
