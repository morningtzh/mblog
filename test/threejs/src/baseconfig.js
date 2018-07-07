

class BaseConfig {
    constructor() {
        this.MC_BLOCKSIZE = 10;
        this.MC_POINT = {
            X: 0,
            Y: 1,
            Z: 2,
        };

        this.MC_DIRECTION = {
            UP: Symbol('UP'),
            DOWN: Symbol('DOWN'),
            LEFT: Symbol('LEFT'),
            RIGHT: Symbol('RIGHT'),
            FRONT: Symbol('FRONT'),
            BACK: Symbol('BACK'),
        };

        this.MC_SPEED = {
            WALK: 10,
            RUN: 20,
        };

        this.MC_VISION_LIMIT = {
            TOP: 10,
            BOTTOM: -10,
        };
    }
}

export default new BaseConfig();
