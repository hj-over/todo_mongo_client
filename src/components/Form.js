import React, { useCallback } from "react";

const Form = React.memo(({ todoValue, setTodoValue, addTodoSubmit }) => {
  // console.log("Form Rendering...");
  const changeTodoValue = useCallback(
    (event) => {
      // console.log(event.target.value);
      setTodoValue(event.target.value);
    },
    [setTodoValue]
  );

  return (
    <>
      <form onSubmit={addTodoSubmit} className="flex pt-2">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          className="w-full px-3 py-3 mr-4 text-gray-500 border rounded shadow "
          value={todoValue}
          onChange={changeTodoValue}
        />
        <input
          type="submit"
          className="p-2 text-blue-500 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
        />
      </form>
    </>
  );
});

export default Form;
