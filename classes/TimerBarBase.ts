import { textJustification, generateRandomString, getColorFromValue, drawTextLabel, ColorValue, TextJustification } from "../util";
import { initialX, bgBaseX, bgOffset, bgThinOffset, timerBarWidth, timerBarHeight, timerBarThinHeight, titleScale, titleWrap } from "../coordsAndSizes";

/** Configuration object for title text drawing parameters. */
interface TitleDrawParams {
    font: number;
    color: [number, number, number, number];
    scale: number;
    justification: TextJustification;
    wrap: number;
    shadow?: boolean;
}

/**
 * Base class for all timer bar types providing common functionality for title display, background rendering, and GXT text management.
 * Serves as the foundation for specialized timer bar implementations with customizable appearance and behavior.
 */
export default class TimerBarBase {
    protected _id: string;
    protected _thin: boolean;
    protected _titleGxtName: string;
    protected _title: string;
    protected _highlightColor: [number, number, number, number] | null;
    public titleDrawParams: TitleDrawParams;

    /**
     * Creates a new TimerBarBase instance.
     * @param title The display title for the timer bar
     */
    constructor(title: string) {
        this._id = generateRandomString(8);
        this._thin = false;
        this._titleGxtName = `TMRB_TITLE_${this._id}`;
        this._title = title;
        this._highlightColor = null;

        this.titleDrawParams = {
            font: 0,
            color: [240, 240, 240, 255],
            scale: titleScale,
            justification: textJustification.right,
            wrap: titleWrap
        };

        AddTextEntry(this._titleGxtName, title);
    }

    /** Gets the timer bar's title text. */
    get title(): string {
        return this._title;
    }

    /** Gets the timer bar's title color as RGBA values. */
    get titleColor(): [number, number, number, number] {
        return this.titleDrawParams.color;
    }

    /** Gets the timer bar's highlight color as RGBA values, or null if no highlight is set. */
    get highlightColor(): [number, number, number, number] | null {
        return this._highlightColor;
    }

    /** Sets the timer bar's title text and updates the GXT entry. */
    set title(value: string) {
        this._title = value;
        AddTextEntry(this._titleGxtName, value);
    }

    /** Sets the timer bar's title color. */
    set titleColor(value: ColorValue) {
        this.titleDrawParams.color = getColorFromValue(value);
    }

    /** Sets the timer bar's highlight color, or null to remove highlighting. */
    set highlightColor(value: ColorValue | null) {
        this._highlightColor = value ? getColorFromValue(value) : null;
    }

    /**
     * Draws the background rectangle for the timer bar.
     * @param y The Y coordinate for drawing the background
     */
    drawBackground(y: number): void {
        y += this._thin ? bgThinOffset : bgOffset;

        if (this._highlightColor) {
            DrawSprite("timerbars", "all_white_bg", bgBaseX, y, timerBarWidth, this._thin ? timerBarThinHeight : timerBarHeight, 0.0, this._highlightColor[0], this._highlightColor[1], this._highlightColor[2], this._highlightColor[3]);
        }

        DrawSprite("timerbars", "all_black_bg", bgBaseX, y, timerBarWidth, this._thin ? timerBarThinHeight : timerBarHeight, 0.0, 255, 255, 255, 140);
    }

    /**
     * Draws the title text for the timer bar.
     * @param y The Y coordinate for drawing the title
     */
    drawTitle(y: number): void {
        drawTextLabel(this._title, [initialX, y], this.titleDrawParams);
    }

    /**
     * Draws the complete timer bar including background and title.
     * @param y The Y coordinate for drawing the timer bar
     */
    draw(y: number): void {
        this.drawBackground(y);
        this.drawTitle(y);
    }

    /**
     * Clears the GXT text entries associated with this timer bar.
     */
    resetGxt(): void {
        ClearAdditionalText(0, true);
    }
}
