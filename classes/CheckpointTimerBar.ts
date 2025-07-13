import { checkpointBaseX, checkpointOffsetX, checkpointOffsetY, checkpointWidth, checkpointHeight } from "../coordsAndSizes";
import { clamp, getColorFromValue, ColorValue } from "../util";
import TimerBarBase from "./TimerBarBase";

export default class CheckpointTimerBar extends TimerBarBase {
    static readonly state = {
        inProgress: 0,
        completed: 1,
        failed: 2
    } as const;

    private _color: [number, number, number, number];
    private _inProgressColor: [number, number, number, number];
    private _failedColor: [number, number, number, number];
    private _checkpointStates: Record<number, number>;
    private _numCheckpoints: number;

    constructor(title: string, numCheckpoints: number) {
        super(title);

        this._thin = true;
        this._color = [255, 255, 255, 255];
        this._inProgressColor = [255, 255, 255, 51];
        this._failedColor = [0, 0, 0, 255];
        this._checkpointStates = {};
        this._numCheckpoints = clamp(numCheckpoints, 0, 16);

        for (let i = 0; i < this._numCheckpoints; i++) {
            this._checkpointStates[i] = CheckpointTimerBar.state.inProgress;
        }
    }

    get numCheckpoints(): number {
        return this._numCheckpoints;
    }

    get color(): [number, number, number, number] {
        return this._color;
    }

    get inProgressColor(): [number, number, number, number] {
        return this._inProgressColor;
    }

    get failedColor(): [number, number, number, number] {
        return this._failedColor;
    }

    set color(value: ColorValue) {
        this._color = getColorFromValue(value);
    }

    set inProgressColor(value: ColorValue) {
        this._inProgressColor = getColorFromValue(value);
    }

    set failedColor(value: ColorValue) {
        this._failedColor = getColorFromValue(value);
    }

    setCheckpointState(index: number, newState: number): void {
        if (index < 0 || index >= this._numCheckpoints) {
            return;
        }

        this._checkpointStates[index] = newState;
    }

    setAllCheckpointsState(newState: number): void {
        for (let i = 0; i < this._numCheckpoints; i++) {
            this._checkpointStates[i] = newState;
        }
    }

    draw(y: number): void {
        super.draw(y);
        y += checkpointOffsetY;

        for (let i = 0, cpX = checkpointBaseX; i < this._numCheckpoints; i++) {
            const state = this._checkpointStates[i] ?? CheckpointTimerBar.state.inProgress;
            const drawColor = state === CheckpointTimerBar.state.failed
                ? this._failedColor
                : state === CheckpointTimerBar.state.completed
                    ? this._color
                    : this._inProgressColor;

            DrawSprite("timerbars", "circle_checkpoints", cpX, y, checkpointWidth, checkpointHeight, 0.0, drawColor[0], drawColor[1], drawColor[2], drawColor[3]);

            cpX -= checkpointOffsetX;
        }
    }
}
