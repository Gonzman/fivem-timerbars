import { textJustification, drawTextLabel } from "../util";
import { initialX, textOffset, playerTitleOffset, playerTitleScale, titleWrap } from "../coordsAndSizes";
import TextTimerBar from "./TextTimerBar";

export default class PlayerTimerBar extends TextTimerBar {
    constructor(title: string, text: string) {
        super(title, text);

        this.titleDrawParams = {
            font: 4,
            color: [240, 240, 240, 255],
            scale: playerTitleScale,
            justification: textJustification.right,
            wrap: titleWrap,
            shadow: true
        };
    }

    draw(y: number): void {
        super.drawBackground(y);

        drawTextLabel(this._titleGxtName, [initialX, y + playerTitleOffset], this.titleDrawParams);
        drawTextLabel(this._textGxtName, [initialX, y + textOffset], this.textDrawParams);
    }
}
