import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import MC from "./baseconfig";
import grass from "../public/textures/blocks/grass_top.png"


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


        };

    }

    render() {
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height

        const cameraPosition = new THREE.Vector3(...this.props.cameraPosition);

        const lookAt = new THREE.Euler(...this.props.cameraLookAt);

        const boxs = this.props.blocks.map((position, index) => {
            return (
                < mesh
                    key={index}
                    position={new THREE.Vector3(...position)}
                >
                    <boxGeometry
                        width={MC.MC_BLOCKSIZE}
                        height={MC.MC_BLOCKSIZE}
                        depth={MC.MC_BLOCKSIZE}
                    />
                    <meshLambertMaterial
                        color={0x292D06}
                    />
                </mesh>
            );
        });

        const d=20;

        return (
            <React3
                mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
                width={width}
                height={height}
                onAnimate={this._onAnimate}
                clearColor={0x6BCAFA}
            >
                <scene>
                    <perspectiveCamera
                        name="camera"
                        fov={90}
                        aspect={width / height}
                        near={0.1}
                        far={400}
                        position={cameraPosition}
                        rotation={lookAt}
                    />
                    <ambientLight
                        color={0xCCCCCC}
                    />

                    {boxs}

                </scene>
            </React3>
        );
    }
}

export default Simple;