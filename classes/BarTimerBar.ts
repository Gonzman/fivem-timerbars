import { barOffset, progressBaseX, progressWidth, progressHeight } from "../coordsAndSizes";
import { clamp, getColorFromValue, ColorValue } from "../util";
import TimerBarBase from "./TimerBarBase";

export default class BarTimerBar extends TimerBarBase {
    private _bgColor: [number, number, number, number];
    private _fgColor: [number, number, number, number];
    private _fgWidth: number;
    private _fgX: number;
    private _progress: number;

    constructor(title: string, progress: number) {
        super(title);

        this._thin = true;
        this._bgColor = [155, 155, 155, 255];
        this._fgColor = [240, 240, 240, 255];
        this._fgWidth = 0.0;
        this._fgX = 0.0;

        this._progress = progress;
    }

    get progress(): number {
        return this._progress;
    }

    get backgroundColor(): [number, number, number, number] {
        return this._bgColor;
    }

    get foregroundColor(): [number, number, number, number] {
        return this._fgColor;
    }

    set progress(value: number) {
        this._progress = clamp(value, 0.0, 1.0);
        this._fgWidth = progressWidth * this._progress;
        this._fgX = (progressBaseX - progressWidth * 0.5) + (this._fgWidth * 0.5);
    }

    set backgroundColor(value: ColorValue) {
        this._bgColor = getColorFromValue(value);
    }

    set foregroundColor(value: ColorValue) {
        this._fgColor = getColorFromValue(value);
    }

    draw(y: number): void {
        super.draw(y);

        y += barOffset;
        DrawRect(progressBaseX, y, progressWidth, progressHeight, this._bgColor[0], this._bgColor[1], this._bgColor[2], this._bgColor[3]);
        DrawRect(this._fgX, y, this._fgWidth, progressHeight, this._fgColor[0], this._fgColor[1], this._fgColor[2], this._fgColor[3]);
    }
}
