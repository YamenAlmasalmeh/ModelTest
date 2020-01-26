import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CreateIcon from '@material-ui/icons/Create';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
    zIndex: "100",
    overflow: "hidden"
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/" label="Trending" icon={<FlashOnIcon />} />
      <BottomNavigationAction component={Link} to="/favs" label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction component={Link} to="/create" label="Create" icon={<CreateIcon />} />
    </BottomNavigation>
  );
}