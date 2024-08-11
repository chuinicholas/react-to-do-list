import React, { useState } from "react";

function Item({ toDo }) {
  const [isClick, setIsClick] = useState(false);

  function crossOut() {
    setIsClick((prevState) => {
      return !prevState;
    });
  }

  return (
    <li
      style={{ textDecoration: isClick ? "line-through" : "none" }}
      onClick={crossOut}
    >
      {toDo}
    </li>
  );
}

export default Item;
