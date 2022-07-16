import { styled } from '@mui/material/styles';
import { Link } from 'gatsby';
import React from 'react'
import './projectNavigator.scss'

const PREFIX = 'ProjectNavigator';

const classes = {
  projectNav: `${PREFIX}-projectNav`,
  text: `${PREFIX}-text`,
  extraLightText: `${PREFIX}-extraLightText`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  color: theme.palette.gridItem,
  [`& .${classes.text}`]: { color: theme.palette.text },
  [`& .${classes.extraLightText}`]: { color: theme.palette.extraLightText }
}));

const ProjectNavigator = ({ navigation }) => {

  return (
    <Root className={`${classes.projectNav} project-nav`}>
      <div className="prev-project">
        <Link to={`/projects/${navigation.prev.link}`}>
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
        <Link to={`/projects/${navigation.next.link}`}>
          <h4 className={classes.text}>{navigation.next.projectName}</h4>
          <span className={classes.extraLightText}>Next Project</span>
        </Link>
      </div>
    </Root>
  );
}

export default ProjectNavigator