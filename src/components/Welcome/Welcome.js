import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import faCodepen from '@fortawesome/fontawesome-free-brands/faCodepen';
import faAngleDoubleDown from '@fortawesome/fontawesome-free-solid/faAngleDoubleDown';
import './Welcome.css';

const Welcome = ({ onClick }) => (
  <section className="welcome min-height-flex-fix">
    <div className="welcome__content">
      <div className="welcome__hi">
        Hi, my name is Dmitry.<br />
        I'm junior frontend developer.
      </div>
      <div className="welcome__links">
        <a
          title="Github"
          href="https://github.com/samsondm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} size="sm" className="welcome__links__icon" />
        </a>
        <a
          title="Codepen"
          href="https://codepen.io/samsondm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faCodepen} size="sm" className="welcome__links__icon" />
        </a>
      </div>
    </div>
    <div className="welcome__scroll-container">
      <FontAwesomeIcon icon={faAngleDoubleDown} className="welcome__scroll-icon" onClick={onClick} />
    </div>
  </section>
);

export default Welcome;