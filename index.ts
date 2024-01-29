import { getObstacleEvents } from './computer-vision';

interface AutonomousCar {
  isRunning?: boolean;
  respond: (events: Events) => void;
}

interface AutonomousCarProps {
  isRunning?: boolean;
  steeringControl: Steering;
}

interface Events {
  [eventName: string]: boolean;
}

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

class SteeringControl implements Steering {
  execute(command: string) {
    console.log(`Executing: ${command}`);
  }
  turn(direction: string) {
    this.execute(`Executing: Turn ${direction}`);
  }
}

class Car implements AutonomousCar {
  steeringControl;
  isRunning;
  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
    }
    respond(events: Events) {
      if(!this.isRunning) {
        console.log('The car is off.')
      }
      const eventKeys = Object.keys(events);
      Object.keys(eventKeys).forEach((eventKey) => {
        if (!events[eventKey]) {
        // If the event value is falsy, skip this event
        return;
        
        if (eventKey === 'ObstacleLeft') {
          this.steeringControl.turn('right');
        }

        if (eventKey === 'ObstacleRight') {
          this.steeringControl.turn('left');
        }
}
      });
    }
  }

const steering = new SteeringControl();
steering.turn('right');

const autonomousCar = new Car({
  isRunning: true,
  steeringControl: steering,
});
autonomousCar.respond(getObstacleEvents());
