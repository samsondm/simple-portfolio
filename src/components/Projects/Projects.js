import React from 'react';
import './Projects.scss';

const Projects = React.forwardRef(({ children }, ref) => (
  <section className="projects min-height-flex-fix" ref={ref}>
    <div>
      <h1 className="projects__header">Projects</h1>
      {children}
    </div>
  </section>
));

export default Projects;