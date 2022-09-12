import * as React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useFormik } from "formik";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles((theme) =>
  createStyles({
    element: {
      margineRight: theme.spacing(2)
    },
    buttonWrapper: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    radioWrapper: {
      marginTop: "25px",
      marginRight: "280px"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    root: {
      width: "100%",
      margin: theme.spacing(1),
    },
  })
)
let count = 1;
const TaskCreateForm = ({
  title = "Crete Task",
  data,
  edit
}) => {
  const task = {
    id: "",
    name: "",
    description: "",
    taskStatus: "PENDING"
  }
  const navigator = useNavigate();
  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: edit ? data : task,
    onSubmit: (values) => onFormSubmit && onFormSubmit(values),
    enableReinitialize: true
  });

  const onFormSubmit = (value) => {
    const items = JSON.parse(localStorage.getItem("task")) || [];
    if (edit) {
      const index = items && items.findIndex(el => el.id === data.id);
      items[index] = value;
      localStorage.setItem("task", JSON.stringify(items));
    } else {
      if (items.length) {
        value.id = parseInt(items[items.length - 1].id) + count;
      } else { value.id = count++ }
      const newItems = JSON.stringify([...items, value])
      localStorage.setItem("task", newItems);
    }
  }

  const chilePage = () => {
    navigator("/tasks");
  }

  const clasess = useStyle();
  return (
    <React.Fragment>
      <div className={clasess.root}>
        <Typography style={{ margin: 50 }}>
          <strong>{title}</strong>
        </Typography>
        <Box display="flex" flexDirection="row" style={{ margin: 50 }}>
          <Box display="flex" flexDirection="column" width="70%">
            <Box mb={3} display="flex" flexDirection="row" justifyContent="space-between">
              <TextField
                label="Name"
                required
                className={clasess.element}
                value={values.name}
                name="name"
                onChange={handleChange}
                helperText="Please enter Task Name"
              />
              <TextField
                label="Description"
                required
                onChange={handleChange}
                value={values.description}
                className={clasess.element}
                name="description"
                helperText="Please enter Task Detail"
              />
            </Box>
            <Box className={clasess.radioWrapper} mb={3} display="flex" flexDirection="row" justifyContent="space-between">
              <FormControl component="fieldset">
                <Typography variant="body2">Task Status</Typography>
                <RadioGroup
                  name="taskStatus"
                  onChange={handleChange}
                  value={values.taskStatus}
                >
                  <FormControlLabel value="PENDING" control={<Radio color='primary' />} label="Pending" />
                  <FormControlLabel value="COMPLETED" control={<Radio color='primary' />} label="Completed" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box className={clasess.buttonWrapper} flexDirection="row" justifyContent="space-between">
              <Button
                color="primary"
                variant="contained"
                type='submit'
                onClick={(e) => {
                  handleSubmit(e)
                  setTimeout(() => {
                    chilePage();
                  }, 1000)
                }}
              >
                {edit ? "Update" : "Submit"}
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </React.Fragment >
  )
}

export default TaskCreateForm