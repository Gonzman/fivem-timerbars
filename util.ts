const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersLength = characters.length;

export const textJustification = {
    center: 0,
    left: 1,
    right: 2
} as const;

export type ColorValue = number | [number, number, number, number];
export type TextJustification = typeof textJustification[keyof typeof textJustification];

interface TextDrawOptions {
    font?: number;
    color?: [number, number, number, number];
    scale?: number;
    justification?: TextJustification;
    wrap?: number;
    shadow?: boolean;
    outline?: boolean;
}

export function generateRandomString(length: number = 8): string {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * charactersLength)];
    }
    return result;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

export function hideHudComponents(): void {
    HideHudComponentThisFrame(6);
    HideHudComponentThisFrame(7);
    HideHudComponentThisFrame(8);
    HideHudComponentThisFrame(9);
}

export function getColorFromValue(value: ColorValue): [number, number, number, number] {
    if (Array.isArray(value)) {
        return value;
    } else {
        try {
            const result = GetHudColour(value);
            if (result && typeof result === 'object') {
                return [result[0] ?? 255, result[1] ?? 255, result[2] ?? 255, result[3] ?? 255];
            }
            return [255, 255, 255, 255];
        } catch {
            return [255, 255, 255, 255];
        }
    }
}

export function drawTextLabel(label: string, position: [number, number], options?: TextDrawOptions): void {
    const { font = 0, color = [240, 240, 240, 255], scale = 0.5, justification = textJustification.center, wrap, shadow, outline } = options || {};

    SetTextFont(font);
    SetTextScale(0.0, scale);
    SetTextColour(color[0], color[1], color[2], color[3]);
    SetTextJustification(justification);

    if (wrap) {
        SetTextWrap(0.0, wrap);
    }

    if (shadow) {
        SetTextDropshadow(1, 0, 0, 0, 255);
    }

    if (outline) {
        SetTextOutline();
    }

    SetTextEntry("STRING");
    AddTextComponentString(label);
    DrawText(position[0], position[1]);
}
