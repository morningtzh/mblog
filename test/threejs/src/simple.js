import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

class Simple extends React.Component {
    constructor(props, context) {
        super(props, context);

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.

        this.state = {
            cubeRotation: new THREE.Euler(),
            cameraPosition: new THREE.Vector3(0, 0, 200),
        };

        this.direction = 1;

        this._onAnimate = () => {
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.
            if(Math.abs(this.state.cameraPosition.x) > 3) {
                this.direction = 0 - this.direction;
            }

            this.setState({
                cubeRotation: new THREE.Euler(
                    this.state.cubeRotation.x + 0.1,
                    this.state.cubeRotation.y + 0.1,
                    0,
                ),
                cameraPosition: new THREE.Vector3(
                    this.state.cameraPosition.x + (0.1 * this.direction),
                    this.state.cameraPosition.y + (0.1 * this.direction),
                    this.state.cameraPosition.z,
                ),
            });
        };

        const len = 100;
        this.a = [
            [len, len, 0],
            [len, -len, 0],
            [len, 0, len],
            [len, 0, -len],
            [-len, len, 0],
            [-len, -len, 0],
            [-len, 0, len],
            [-len, 0, -len],
            [0, len, len],
            [0, len, -len],
            [0, -len, len],
            [0, -len, -len],
        ];
    }

    render() {
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height

        const boxs = this.a.map((position, index) => {
            return (
                < mesh
                    key={index}
                    position={new THREE.Vector3(...position)}
                >
                    <boxGeometry
                        width={10}
                        height={10}
                        depth={10}
                    />
                    <meshBasicMaterial
                        color={0x333333}
                    />
                </mesh>
            );
        });

        return (
            <React3
                mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
                width={width}
                height={height}
                onAnimate={this._onAnimate}
            >
                <scene>
                    <perspectiveCamera
                        name="camera"
                        fov={90}
                        aspect={width / height}
                        near={0.1}
                        far={400}

                        position={this.state.cameraPosition}
                    />
                    <object3d>
                        <pointLight
                            position={new THREE.Vector3(0, 0, 0)}
                            color="0x0000ff"
                        />
                        {boxs}
                    </object3d>



                </scene>
            </React3>
        );
    }
}

ReactDOM.render(<Simple/>, document.body);