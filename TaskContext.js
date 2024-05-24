import { router } from "expo-router";
import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState({});

  function addTask(task) {
    //lägger till task i current/previous state
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  //skicka in updataded task i fubnktionen
  function updateTask(updatedTask) {
    setTasks((prevTasks) =>
      //mappar igenom curretn/previous tasks och kollar om task i arrayen matchar den uppdaterade som man skickar in. Om den matchar- returnera uppdaterade tasks annars returnera previous/current tasks
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    // setDeleteButtonCLicked(true);
    router.back();
  }

  function completeTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }

  function addComment(taskId, comment) {
    setComments((prevComments) => {
      const taskComments = prevComments[taskId] || [];
      return { ...prevComments, [taskId]: [...taskComments, comment] };
    });
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        comments,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
        addComment,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
