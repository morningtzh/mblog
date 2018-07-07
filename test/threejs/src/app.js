import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import Simple from './simple';
import MC from './baseconfig';
import perlinNosie from "./perlinNoise"

import { Row, Col, Button } from 'antd';



function polar2Vector(p, angle) {
    return [p * Math.cos(angle), p * Math.sin(angle)];
}

function cartesian2Polar(x, y) {
    const p = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const angle = Math.atan(y / x);
    // angle = (x<0.5 && x>-0.5) ? Math.abs(angle) * y/Math.abs(y) : angle;

    return [p, angle];
}

class App extends Component {
    constructor(props) { 
        super(props);

        const len = 10;

        let blocks = [];

        for (let i = 1; i < 256; i++) {
            let x = parseInt(i / 16);
            let z = i % 16;
            let y = parseInt(perlinNosie(x * 0.01, z * 0.01));

            for (let j = 0; j < y; j++) {
                blocks.push([x * MC.MC_BLOCKSIZE, j * MC.MC_BLOCKSIZE, z * MC.MC_BLOCKSIZE]);
            }
        }

        console.log(blocks);
        this.state = {
            blocks,
            cameraPosition: [0, 0, 100],
            cameraLookAt: [0, Math.PI, 0],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.addEventListener('keydown', (event) => {
        }, true);

        document.addEventListener('keypress', (event) => {
            switch (event.key) {
                case 'w':
                    this.cameraPositionChange(MC.MC_DIRECTION.FRONT, event.shiftKey);
                    break;
                case 's':
                    this.cameraPositionChange(MC.MC_DIRECTION.BACK, event.shiftKey);
                    break;
                case 'a':
                    this.cameraPositionChange(MC.MC_DIRECTION.LEFT, event.shiftKey);
                    break;
                case 'd':
                    this.cameraPositionChange(MC.MC_DIRECTION.RIGHT, event.shiftKey);
                    break;
                case ' ':
                    this.cameraPositionChange(MC.MC_DIRECTION.UP);
                    break;
                default:
                    break;
            }
        }, true);

        document.addEventListener('mousemove', (event) => {
            this.lookAtChange([event.movementX, event.movementY]);
        }, true);

        document.addEventListener('click', (event) => {
        }, true);

        document.addEventListener('wheel', (event) => {
        }, true);
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    lookAtChange(direction) {
        const { cameraLookAt } = this.state;

        cameraLookAt[1] += (Math.PI * direction[0]) / 100;

        this.setState({
            cameraLookAt,
        });
    }

    cameraPositionChange(direction, superMode) {
        const { cameraLookAt, cameraPosition } = this.state;
        const speed = superMode ? MC.MC_SPEED.RUN : MC.MC_SPEED.WALK;

        let changeX = 0;
        let changeY = 0;
        let changeZ = 0;

        switch (direction) {
            case MC.MC_DIRECTION.FRONT:
                [changeZ, changeX] = polar2Vector(speed, cameraLookAt[1] + Math.PI);
                break;

            case MC.MC_DIRECTION.BACK:
                [changeZ, changeX] = polar2Vector(speed, cameraLookAt[1]);

                break;

            case MC.MC_DIRECTION.LEFT:
                [changeZ, changeX] = polar2Vector(speed, cameraLookAt[1] - (Math.PI / 2));

                break;

            case MC.MC_DIRECTION.RIGHT:

                [changeZ, changeX] = polar2Vector(speed, cameraLookAt[1] + (Math.PI / 2));

                break;

            case MC.MC_DIRECTION.UP:
                changeY = speed;
                break;

            default:
                break;
        }

        cameraPosition[MC.MC_POINT.X] += changeX;
        cameraPosition[MC.MC_POINT.Y] += changeY;
        cameraPosition[MC.MC_POINT.Z] += changeZ;

        this.setState({
            cameraPosition,
        });
    }

    render() {
        const { cameraLookAt, cameraPosition } = this.state;

        console.log(cameraPosition, cameraLookAt);

        return (
            <div>
                <Row>


                    <Col span={10} key={100}>
                        <p>{`${cameraPosition.map(value => Math.floor(value)).join(', ')} -> ${cameraLookAt.map(value => Math.floor(value / Math.PI)).join(', ')}`} </p>
                    </Col>
                    <Col span={14} key={101}>
                        {this.state.debugStr}
                    </Col>
                </Row>
                <Simple
                    blocks={this.state.blocks}
                    cameraPosition={cameraPosition}
                    cameraLookAt={cameraLookAt}
                />
            </div>
        );
    }
}

App.propTypes = {};

ReactDOM.render(<App/>, document.body);
