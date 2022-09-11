import * as React from "react";
import {
  Chip,
  Grid,
  Paper,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      width: 300,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: "5",
    },
    typo: { marginTop: theme.spacing(5) },
  })
);


const Information = ({
  children,
  color,
  style,
  label,
  value,
  labelColor,
  className,
  tooltip,
}) => {
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid container>
        <Grid container spacing={3}>
          <Grid item xs={children ? 8 : 12}>
            <Grid item xs={8}>
              <Chip
                size="medium"
                color="primary"
                style={{ backgroundColor: labelColor, color: "white" }}
                label={<Typography variant="h6">{label}</Typography>}
              />
            </Grid>
            <Grid className={classes.typo}>
              {tooltip ? (
                <Tooltip title={value}>
                  <Typography variant="h4">{value}</Typography>
                </Tooltip>
              ) : (
                <Typography variant="h4">{value}</Typography>
              )}
            </Grid>
          </Grid>
          {children && (
            <Grid item xs={4}>
              {children}
            </Grid>
          )}
        </Grid>
      </Grid>{" "}
    </Paper>
  );
};

export default Information;
