import React from "react";
import ListItem from "./ListItem";

const List = React.memo(({ todoData, setTodoData }) => {
  // console.log("List Rendering...");
  return (
    <div>
      {todoData.map((item) => (
        <div key={item.id}>
          <ListItem item={item} todoData={todoData} setTodoData={setTodoData} />
        </div>
      ))}
    </div>
  );
});

export default List;
