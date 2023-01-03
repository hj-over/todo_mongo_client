import axios from "axios";
import React, { useState } from "react";

const ListItem = React.memo(({ item, todoData, setTodoData }) => {
  // console.log("ListItem Rendering...");

  // 현재 편집 중인지 아닌지를 관리하는 State 생성
  // isEditing  false 라면 목록 보여줌.
  // isEditing  true  라면 편집 보여줌.
  const [isEditing, setIsEditing] = useState(false);

  // 제목을 출력 하고 변경하는 State
  // 편집창에는 타이틀이 먼저 작성되어 있어야 함. (타이틀=할일 목록)
  const [editedTitle, setEditedTitle] = useState(item.title);

  const deleteClick = (id) => {
    if (window.confirm("진짜 지울건가요?")) {
      let body = {
        id: id,
      };
      axios
        .post("/api/post/delete", body)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    /* 클릭된 ID 와 다른 요소들만 걸러서 새로운 배열 생성 */
    const nowTodo = todoData.filter((item) => item.id !== id);
    // console.log("클릭", nowTodo);
    setTodoData(nowTodo);
    // 로컬에 저장한다.(DB 예정)
    // localStorage.setItem("todoData", JSON.stringify(nowTodo));
  };

  const editChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const toggleClick = (id) => {
    // map 을 통해서 this.state.todoData의 completed를  업데이트를 해보자
    const updateTodo = todoData.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });

    let body = {
      id: todoId,
      completed: item.completed,
    };
    //axios 를 통해 MongoDB complete 업데이트 *
    // then(): 서버에서 회신(응답)이 왔을 때 처리
    // catch(): 서버에서 회신(응답)이 없을 때 처리
    axios
      .post("/api/post/updatetoggle", body)
      .then((res) => {
        // console.log(res);
        setTodoData(updateTodo);
      })
      .catch((err) => {
        console.log(err);
      });

    // 로컬에 저장한다.(DB 예정)
    // localStorage.setItem("todoData", JSON.stringify(updateTodo));
  };

  // 현재 item.id 에 해당하는 것만 업데이트 한다.
  const todoId = item.id;
  const updateTitle = () => {
    // 공백 문자열 제거 추가
    let str = editedTitle;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("제목을 입력하세용.");
      setEditedTitle(item.title);
      return;
    }
    let tempTodo = todoData.map((item) => {
      // 모든 todoData 중에 현재 ID 와 같다면
      if (item.id === todoId) {
        // 타이틀 글자를 수정하겠다.
        item.title = editedTitle;
      }
      return item;
    });
    // 데이터 갱신
    let body = {
      id: todoId,
      title: editedTitle,
    };
    // axios 를 이용해서 MongoDB 타이틀 업데이트 *
    axios
      .post("/api/post/updatetitle", body)
      .then((res) => {
        console.log(res.data);
        setTodoData(tempTodo);
        //목록보기로 가기
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // 로컬에 저장한다.(DB 예정)
    // localStorage.setItem("todoData", JSON.stringify(tempTodo));
  };

  if (isEditing) {
    // 편집 일 때 JSX 리턴
    return (
      <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center ">
          <input
            type="text"
            className="w-full px-3 py-2 mr-4 text-gray-500 bg-white boreder rounded"
            value={editedTitle}
            onChange={editChange}
          />
        </div>
        <div className="items-center">
          <button className="px-4 py-2" onClick={updateTitle}>
            Update
          </button>
          <button className="px-4 py-2" onClick={() => setIsEditing(false)}>
            Close
          </button>
        </div>
      </div>
    );
  } else {
    // 목록 일 때 JSX 리턴
    return (
      <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border-rounded">
        <div className="items-center ">
          <input
            type="checkbox"
            defaultChecked={item.completed}
            onChange={() => toggleClick(item.id)}
          />{" "}
          <span className={item.completed ? "line-through" : "none"}>
            {item.title}
          </span>
        </div>
        <div className="items-center">
          <button className="px-4 py-2" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button onClick={() => deleteClick(item.id)}>X</button>
        </div>
      </div>
    );
  }
});

export default ListItem;
