import { barOffset, progressBaseX, progressWidth, progressHeight } from "../coordsAndSizes";
import { clamp, getColorFromValue, ColorValue } from "../util";
import TimerBarBase from "./TimerBarBase";

/**
 * A timer bar that displays progress as a filled bar with customizable colors.
 * Extends TimerBarBase to provide visual progress indication through foreground and background bars.
 */
export default class BarTimerBar extends TimerBarBase {
    private _bgColor: [number, number, number, number];
    private _fgColor: [number, number, number, number];
    private _fgWidth: number;
    private _fgX: number;
    private _progress: number;

    /**
     * Creates a new BarTimerBar instance.
     * @param title The display title for the timer bar
     * @param progress Initial progress value between 0.0 and 1.0
     */
    constructor(title: string, progress: number) {
        super(title);

        this._thin = true;
        this._bgColor = [155, 155, 155, 255];
        this._fgColor = [240, 240, 240, 255];
        this._fgWidth = 0.0;
        this._fgX = 0.0;

        this._progress = progress;
    }

    /** Gets the current progress value between 0.0 and 1.0. */
    get progress(): number {
        return this._progress;
    }

    /** Gets the background color as RGBA values. */
    get backgroundColor(): [number, number, number, number] {
        return this._bgColor;
    }

    /** Gets the foreground (progress bar) color as RGBA values. */
    get foregroundColor(): [number, number, number, number] {
        return this._fgColor;
    }

    /** Sets the progress value and updates the visual representation. */
    set progress(value: number) {
        this._progress = clamp(value, 0.0, 1.0);
        this._fgWidth = progressWidth * this._progress;
        this._fgX = (progressBaseX - progressWidth * 0.5) + (this._fgWidth * 0.5);
    }

    /** Sets the background color of the progress bar. */
    set backgroundColor(value: ColorValue) {
        this._bgColor = getColorFromValue(value);
    }

    /** Sets the foreground (progress fill) color of the progress bar. */
    set foregroundColor(value: ColorValue) {
        this._fgColor = getColorFromValue(value);
    }

    /**
     * Draws the progress bar including background and foreground elements.
     * @param y The Y coordinate for drawing the progress bar
     */
    draw(y: number): void {
        super.draw(y);

        y += barOffset;
        DrawRect(progressBaseX, y, progressWidth, progressHeight, this._bgColor[0], this._bgColor[1], this._bgColor[2], this._bgColor[3]);
        DrawRect(this._fgX, y, this._fgWidth, progressHeight, this._fgColor[0], this._fgColor[1], this._fgColor[2], this._fgColor[3]);
    }
}
