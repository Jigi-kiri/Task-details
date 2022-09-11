import * as React from 'react';
import { app } from "./config";
import { Routes, Route } from "react-router-dom";

const Form = React.lazy(() => import("./component/Form"));
const Tasks = React.lazy(() => import("./component/Tasks/Tasks"));
const TaskCreate = React.lazy(() => import("./component/Tasks/TaskCreateForm"));
const TaskUpdate = React.lazy(() => import("./component/Tasks/TaskUpdate"));

function App(props) {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<Form />} // Component for login and register
        />
        <Route
          path='/tasks'
          element={<Tasks />} // Component for listing the tasks
        />
        <Route
          path='/task/create'
          element={<TaskCreate />} // Component for create a task
        />
        <Route
          path='/tasks/task/edit/:id'
          element={<TaskUpdate />} // Componenet for update the task
        />
      </Routes>
    </div>
  );
}

export default App;
