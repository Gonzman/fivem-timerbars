import { textJustification, generateRandomString, getColorFromValue, drawTextLabel, ColorValue, TextJustification } from "../util";
import { initialX, bgBaseX, bgOffset, bgThinOffset, timerBarWidth, timerBarHeight, timerBarThinHeight, titleScale, titleWrap } from "../coordsAndSizes";

interface TitleDrawParams {
    font: number;
    color: [number, number, number, number];
    scale: number;
    justification: TextJustification;
    wrap: number;
    shadow?: boolean;
}

export default class TimerBarBase {
    protected _id: string;
    protected _thin: boolean;
    protected _titleGxtName: string;
    protected _title: string;
    protected _highlightColor: [number, number, number, number] | null;
    public titleDrawParams: TitleDrawParams;

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

    get title(): string {
        return this._title;
    }

    get titleColor(): [number, number, number, number] {
        return this.titleDrawParams.color;
    }

    get highlightColor(): [number, number, number, number] | null {
        return this._highlightColor;
    }

    set title(value: string) {
        this._title = value;
        AddTextEntry(this._titleGxtName, value);
    }

    set titleColor(value: ColorValue) {
        this.titleDrawParams.color = getColorFromValue(value);
    }

    set highlightColor(value: ColorValue | null) {
        this._highlightColor = value ? getColorFromValue(value) : null;
    }

    drawBackground(y: number): void {
        y += this._thin ? bgThinOffset : bgOffset;

        if (this._highlightColor) {
            DrawSprite("timerbars", "all_white_bg", bgBaseX, y, timerBarWidth, this._thin ? timerBarThinHeight : timerBarHeight, 0.0, this._highlightColor[0], this._highlightColor[1], this._highlightColor[2], this._highlightColor[3]);
        }

        DrawSprite("timerbars", "all_black_bg", bgBaseX, y, timerBarWidth, this._thin ? timerBarThinHeight : timerBarHeight, 0.0, 255, 255, 255, 140);
    }

    drawTitle(y: number): void {
        drawTextLabel(this._title, [initialX, y], this.titleDrawParams);
    }

    draw(y: number): void {
        this.drawBackground(y);
        this.drawTitle(y);
    }

    resetGxt(): void {
        ClearAdditionalText(0, true);
    }
}
