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
    /**
     * Adds one or more timer bars to the pool for rendering.
     * @param args Timer bar instances to add to the pool
     */
    add(...args: TimerBarBase[]): void {
        const validTimerBars = args.filter((arg): arg is TimerBarBase => arg instanceof TimerBarBase);
        timerBarPool.push(...validTimerBars);
    },

    /**
     * Checks if a timer bar is currently in the pool.
     * @param timerBar The timer bar to check for
     * @returns True if the timer bar is in the pool, false otherwise
     */
    has(timerBar: TimerBarBase): boolean {
        return timerBarPool.includes(timerBar);
    },

    /**
     * Removes a timer bar from the pool.
     * @param timerBar The timer bar to remove
     */
    remove(timerBar: TimerBarBase): void {
        const idx = timerBarPool.indexOf(timerBar);
        if (idx === -1) {
            return;
        }

        timerBarPool.splice(idx, 1);
    },

    /**
     * Removes all timer bars from the pool.
     */
    clear(): void {
        timerBarPool = [];
    }
};

export { default as TimerBarBase } from "./classes/TimerBarBase";
export { default as TextTimerBar } from "./classes/TextTimerBar";
export { default as PlayerTimerBar } from "./classes/PlayerTimerBar";
export { default as CheckpointTimerBar } from "./classes/CheckpointTimerBar";
export { default as BarTimerBar } from "./classes/BarTimerBar";
