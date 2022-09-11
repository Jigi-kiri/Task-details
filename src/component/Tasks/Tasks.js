import * as React from 'react';
import {
  Typography,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from "@material-ui/core";
import { BorderColor, Delete } from "@material-ui/icons";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import { red } from '@material-ui/core/colors';
import InfoStaticstics from '../Stat';
import CreateTaskBtn from './CreateTaskBtn';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogWrapper: {
      textAlign: "center",
      "& .MuiDialog-container": {
        width: "100%",
      },
      "& .MuiDialogContent-root": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        marginRight: "auto",
        marginLeft: "auto",
      },
      btnSpace: {
        marginRight: theme.spacing(2),
      },
      stateWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: "10px",
      },
      stat: { margin: theme.spacing(1) },
    }
  })
);


const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const [taskId, setTaskId] = React.useState("")
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("task"));
    setTasks(data || [])
  }, []);

  console.log("tasks", tasks);
  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = () => {
    const index = tasks.indexOf(taskId);
    if (index === -1) {
      const tempArrya = tasks.filter((el) => el.id !== taskId);
      localStorage.setItem('task', JSON.stringify(tempArrya));
      setTasks([...tempArrya]);
      setOpen(false);
    }
  }

  const handleTaskStatus = (id) => {
    const newArray = tasks.map((item) =>
      (item.id === id && item.taskStatus === "PENDING") ?
        { ...item, taskStatus: "COMPLETED" } :
        (item.id === id && item.taskStatus === "COMPLETED") ?
          { ...item, taskStatus: "PENDING" } : item
    )
    setTasks(newArray);
  }

  const pendingTask = tasks && tasks.filter(el => el.taskStatus === "PENDING");
  const completedTask = tasks && tasks.filter(el => el.taskStatus === "COMPLETED");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: "",
      headerName: "Action",
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <ButtonGroup
              size="small"
              color="primary"
              variant="text"
              aria-label="password policy action buttons"
            >
              <Tooltip title="Edit"> // Unable to complete Edit funtionlity due to time constraints
                <Button
                  disable={true}
                  {...{
                    component: Link,
                    to: "/tasks/task/edit/" + params.row.id,
                    state: params.row
                  }}
                >
                  <BorderColor fontSize="small" />
                </Button>
              </Tooltip>
              {params.row.taskStatus === "PENDING" && (
                <Tooltip title="Mark Completed">
                  <Button
                    onClick={() => {
                      setTaskId(params.row.id);
                      handleTaskStatus(params.row.id);
                    }}
                  >
                    <AssignmentTurnedInIcon fontSize="small" />
                  </Button>
                </Tooltip>
              )}
              {params.row.taskStatus === "COMPLETED" && (
                <Tooltip title="Mark Pending">
                  <Button
                    onClick={() => {
                      setTaskId(params.row.id);
                      handleTaskStatus(params.row.id);
                    }}
                  >
                    <AssignmentIcon fontSize="small" />
                  </Button>
                </Tooltip>
              )}
              <Tooltip title="Delete">
                <Button
                  onClick={() => {
                    setTaskId(params.row.id);
                    setOpen(true);
                  }}
                >
                  <Delete fontSize="small" style={{ color: red[400] }} />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </div>
        )
      }
    },
  ]

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: "10px",
      }}>
        <InfoStaticstics
          className={classes.stat}
          label={"PENDING"}
          value={pendingTask.length}
          labelColor={"#ff5722"}
        >
        </InfoStaticstics>
        <InfoStaticstics
          className={classes.stat}
          label={"COMPELTED"}
          value={completedTask.length}
          labelColor={"#7caf01"}
        >
        </InfoStaticstics>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: "10px",
        margin: 10
      }}>
        <CreateTaskBtn />
      </div>
      <div style={{ height: 400, width: '100%', margin: "20px", padding: "20px" }}>
        <Typography style={{ margin: "20px" }} variant="h5">Pending Task</Typography>
        {pendingTask.length ? (
          <DataGrid
            rows={pendingTask}
            columnBuffer={2}
            columns={columns}
            getRowId={(row) => row.name + row.description}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        ) : <h4>No Pending task found</h4>
        }
      </div>

      <div style={{ height: 400, width: '100%', margin: "20px", padding: "20px" }}>
        <Typography style={{ margin: "20px" }} variant="h5">Compeleted Task</Typography>
        {tasks.length ? (
          <DataGrid
            rows={completedTask}
            columnBuffer={2}
            columns={columns}
            getRowId={(row) => row.name + row.description}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        ) : <h4>No competed task found</h4>
        }
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        className={classes.dialogWrapper}
      >
        <DialogTitle> Task Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the task? {taskId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.btnSpace}
            color="primary"
            autoFocus
            onClick={handleDelete}>
            Yes
          </Button>
          <Button color="primary" onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Tasks;