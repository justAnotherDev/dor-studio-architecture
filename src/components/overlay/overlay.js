import React from 'react'

const Overlay = ({ classes, project, portfolio }) => {
  const header = project.project_name
  const subheader = project.project_data.filter(data => data.header === "Project Type").pop().descr
  return (
    <div
      className={classes}
    >
      <div className={`overlay-inner ${portfolio && "portfolio"}`}>
        <div className={`overlay-text ${portfolio && "portfolio"}`}>
          <h4 className="text-header">{header}</h4>
          <h6 className="text-subheader">{subheader}</h6>
        </div>
      </div>
    </div>
  );
}

export default Overlay