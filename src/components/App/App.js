import React, { Component } from 'react';
import {
  Route,
  Switch,
  // withRouter,
  Link
} from 'react-router-dom';
import './App.css';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import Carousel from '../Carousel/Carousel';
import { calc, drum, pomodoro, random, weather } from '../../images';
import CalcContainer from '../Calculator/CalcContainer';
import DrumMachine from '../DrumMachine/DrumMachine';
import Layer from '../Layer/Layer';
import PomodoroClock from '../PomodoroClock/PomodoroClock';
import RandomQuoteMachine from '../RandomQuoteMachine/RandomQuoteMachine';
import WeatherApp from '../WeatherApp/WeatherApp';
import ProjectWrapper from '../ProjectWrapper/ProjectWrapper';
import scrollIntoView from '../../utility/scrollIntoView';
import ProjectSlide from '../ProjectSlide/ProjectSlide';

class App extends Component {
  componentsMap = {
    'random-quote-machine': {
      component: RandomQuoteMachine,
      title: 'Random Quote Machine',
      image: random,
      description: 'Get random quotes about design.',
      stack: 'React, Redux, Redux-Thunk, REST API'
    },
    'drum-machine': {
      component: DrumMachine,
      title: 'Drum Machine',
      image: drum,
      description: 'Drop some beats.',
      stack: 'React, Redux, SASS'
    },
    'calc': {
      component: CalcContainer,
      title: 'Calculator',
      image: calc,
      description: 'Simple javascript calculator.',
      stack: 'React, Redux, Redux-Thunk'
    },
    'pomodoro-clock': {
      component: PomodoroClock,
      title: 'Pomodoro Clock',
      image: pomodoro,
      description: 'Use the Pomodoro Technique to help you increase your focus.',
      stack: 'React, SASS'
    },
    'weather-app': {
      component: WeatherApp,
      title: 'Weather App',
      image: weather,
      description: 'Check weather in your current location or in other cities.',
      stack: 'React, SASS, REST API'
    }
  }

  projectsRef = React.createRef();
  scrollToProjects = () => {
    scrollIntoView(this.projectsRef.current);
  }

  // handle hover
  container = document.body;
  hasHoverClass = false;
  lastTouchTime = 0;

  // enable hover affect on mousemove and touchstart events
  enableHover = (e) => {
    if (this.hasHoverClass) return;
    // filter touch emulated mousemove events that are trigered after touchend event
    const filterDelta = 650;
    if (e.type !== 'touchstart' && performance.now() - this.lastTouchTime < filterDelta) return;

    this.container.classList.add('hasHover');
    this.hasHoverClass = true;
  };

  // disable hover affect on touchend
  disableHover = (e) => {
    if (!this.hasHoverClass) return;

    this.container.classList.remove('hasHover');
    this.hasHoverClass = false;
  };

  // save time of the last touchend event
  updateLastTouchTime = () => {
    this.lastTouchTime = performance.now();
  };

  componentDidMount() {
    document.addEventListener('touchend', this.updateLastTouchTime, true);
    document.addEventListener('touchend', this.disableHover, true);
    document.addEventListener('touchstart', this.enableHover, true);
    document.addEventListener('mousemove', this.enableHover, true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.updateLastTouchTime, true);
    document.removeEventListener('touchend', this.disableHover, true);
    document.removeEventListener('touchstart', this.enableHover, true);
    document.removeEventListener('mousemove', this.enableHover, true);

    this.disableHover();
  }


  render() {
    const projectSlideArray = Object.keys(this.componentsMap).map(value =>
      <ProjectSlide
        imgUrl={this.componentsMap[value].image}
        title={this.componentsMap[value].title}
        description={this.componentsMap[value].description}
        stack={this.componentsMap[value].stack}
        key={value}
      >
        <Link to={"/" + value} tabIndex="-1" children="explore" />
      </ProjectSlide>
    );

    return (
      <div className="App" >
        <Welcome onClick={this.scrollToProjects} />
        <Projects ref={this.projectsRef}>
          <Carousel >
            {projectSlideArray}
          </Carousel>
        </Projects>

        <Switch>
          <Route path="/layer" component={Layer} />
          <Route
            path="/:project"
            render={
              ({ history, match }) => {
                const projectName = match.params.project,
                  Project = this.componentsMap[projectName].component,
                  title = this.componentsMap[projectName].title;
                return (
                  <Layer history={history}>
                    <ProjectWrapper title={title} className={`${projectName}-wrapper`} history={history}>
                      <Project />
                    </ProjectWrapper>
                  </Layer>
                );
              }
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;