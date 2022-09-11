import * as React from 'react';
import { useLocation } from 'react-router-dom';
const TaskCreateForm = React.lazy(() => import("./TaskCreateForm"));


const TaskUpdate = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div><TaskCreateForm title='Update Task' data={state} edit={true} /></div>
  )
}

export default TaskUpdate