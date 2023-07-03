import React, { ChangeEvent,KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { Button } from "./components/Button";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addtask: (newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState<string>("");
  const changeFilterAll = props.changeFilter("all");
  const changeFilterActive = props.changeFilter("active");
  const changeFilterComleted = props.changeFilter("completed");

  const tsarChangeFilter = (value: string) => {
    props.changeFilter("completed");
  };

  const addTaskHandler = () => {
    props.addtask(title);
    setTitle("");
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        addTaskHandler();
    }
  }

  const mappedTask = props.tasks.map((t) => {
    const removeTaskHandler = () => {
      props.removeTask(t.id);
    };
    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={removeTaskHandler}>x</button>
      </li>
    );
  })

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {mappedTask}
      </ul>
      <div>
        
        <Button callBack={() => {tsarChangeFilter ("all")}} name={"all"}/>
        <Button callBack={() => {tsarChangeFilter ("active")}} name={"active"}/>
        <Button callBack={() => {tsarChangeFilter ("completed")}} name={"completed"}/>
      </div>
    </div>
  );
}



