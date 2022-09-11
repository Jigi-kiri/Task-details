import * as React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Add } from "@material-ui/icons";

const CreateTaskBtn = () => {
  return (
    <div>
      <Button
        {...{ component: Link, to: '/task/create' }}
        variant="contained"
        color="primary"
        endIcon={<Add />}
      >
        Create Task
      </Button>
    </div>
  )
}

export default CreateTaskBtn