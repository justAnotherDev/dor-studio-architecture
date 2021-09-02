import { makeStyles } from '@material-ui/core';
import { Link } from 'gatsby';
import React from 'react'
import './projectNavigator.scss'

const ProjectNavigator = ({ navigation, ...props }) => {
  const classes = projectNavStyles(props)
  return (
    <div className={`${classes.projectNav} project-nav`}>
      <div className="prev-project">
        <Link to={`/${navigation.prev.link}`}>
          <h4 className={classes.text}>{navigation.prev.projectName}</h4>
          <span className={classes.extraLightText}>Previous Project</span>
        </Link>
      </div>
      <div className="all-projects">
        <Link className={classes.extraLightText} to="/portfolio/">
          <i className="fa fa-th" />
        </Link>
      </div>
      <div className="next-project">
        <Link to={`/${navigation.next.link}`}>
          <h4 className={classes.text}>{navigation.next.projectName}</h4>
          <span className={classes.extraLightText}>Next Project</span>
        </Link>
      </div>
    </div>
  );
}

const projectNavStyles = makeStyles(theme => ({
  projectNav: { color: theme.palette.gridItem },
  text : { color: theme.palette.text },
  extraLightText: { color: theme.palette.extraLightText }
}))
 
export default ProjectNavigator