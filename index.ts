import { hideHudComponents } from "./util";
import { gfxAlignWidth, gfxAlignHeight, initialY, initialBusySpinnerY, timerBarMargin, timerBarThinMargin } from "./coordsAndSizes";
import TimerBarBase from "./classes/TimerBarBase";

let timerBarPool: TimerBarBase[] = [];

RequestStreamedTextureDict("timerbars", true);

setTick(() => {
    const max = timerBarPool.length;
    if (max === 0) {
        return;
    }

    hideHudComponents();

    SetScriptGfxAlign(82, 66);
    SetScriptGfxAlignParams(0.0, 0.0, gfxAlignWidth, gfxAlignHeight);

    for (let i = 0, drawY = (BusyspinnerIsOn() ? initialBusySpinnerY : initialY); i < max; i++) {
        timerBarPool[i].draw(drawY);
        drawY -= (timerBarPool[i] as any)._thin ? timerBarThinMargin : timerBarMargin;
    }

    ResetScriptGfxAlign();
});

export const TimerBars = {
    add(...args: TimerBarBase[]): void {
        const validTimerBars = args.filter((arg): arg is TimerBarBase => arg instanceof TimerBarBase);
        timerBarPool.push(...validTimerBars);
    },

    has(timerBar: TimerBarBase): boolean {
        return timerBarPool.includes(timerBar);
    },

    remove(timerBar: TimerBarBase): void {
        const idx = timerBarPool.indexOf(timerBar);
        if (idx === -1) {
            return;
        }

        timerBarPool.splice(idx, 1);
    },

    clear(): void {
        timerBarPool = [];
    }
};

export { default as TimerBarBase } from "./classes/TimerBarBase";
export { default as TextTimerBar } from "./classes/TextTimerBar";
export { default as PlayerTimerBar } from "./classes/PlayerTimerBar";
export { default as CheckpointTimerBar } from "./classes/CheckpointTimerBar";
export { default as BarTimerBar } from "./classes/BarTimerBar";
