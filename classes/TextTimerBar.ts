import { textJustification, getColorFromValue, drawTextLabel, ColorValue, TextJustification } from "../util";
import { initialX, textOffset, textScale, textWrap } from "../coordsAndSizes";
import TimerBarBase from "./TimerBarBase";

interface TextDrawParams {
    font: number;
    color: [number, number, number, number];
    scale: number;
    justification: TextJustification;
    wrap: number;
}

export default class TextTimerBar extends TimerBarBase {
    protected _textGxtName: string;
    protected _text: string;
    public textDrawParams: TextDrawParams;

    constructor(title: string, text: string) {
        super(title);

        this._textGxtName = `TMRB_TEXT_${this._id}`;
        this._text = text;

        this.textDrawParams = {
            font: 0,
            color: [240, 240, 240, 255],
            scale: textScale,
            justification: textJustification.right,
            wrap: textWrap
        };

        AddTextEntry(this._textGxtName, text);
    }

    get text(): string {
        return this._text;
    }

    get textColor(): [number, number, number, number] {
        return this.textDrawParams.color;
    }

    set text(value: string) {
        this._text = value;
        AddTextEntry(this._textGxtName, value);
    }

    set textColor(value: ColorValue) {
        this.textDrawParams.color = getColorFromValue(value);
    }

    set color(value: ColorValue) {
        this.titleColor = value;
        this.textColor = value;
    }

    draw(y: number): void {
        super.draw(y);

        y += textOffset;
        drawTextLabel(this._text, [initialX, y], this.textDrawParams);
    }

    resetGxt(): void {
        super.resetGxt();
        ClearAdditionalText(0, true);
    }
}
