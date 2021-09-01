import * as React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Dashboard, PeopleAlt } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    color: 'inherit',
    textDecoration: 'none',

    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export function Sidebar() {
  const classes = useStyles();

  return (
    <Box>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/admin/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/students" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
        </NavLink>
      </List>
    </Box>
  );
}
