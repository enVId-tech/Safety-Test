import {getSettings} from "@/src/lib/settings";

export const shuffleItems = <T>(array: T[]): T[] => {
    try {
        const newArray = [...array];
        let currentIndex = newArray.length;
        let randomIndex: number;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [newArray[currentIndex], newArray[randomIndex]] =
                [newArray[randomIndex], newArray[currentIndex]];
        }

        return newArray;
    } catch (error) {
        console.error("Error shuffling items:", error);
        return [...array];
    }
};

export function getOneSetting(folderName: string, settingIndex: number, splitIndex?: string): string | null | string[] {
    try {
        const settings = getSettings(folderName);
        const settingString = settings.slice(2)[settingIndex - 1];

        if (settingString) {
            const settingValue = settingString.split(':')[1].trim().split("#")[0].trim();
            if (splitIndex) {
                return settingValue.split(splitIndex);
            }
            return settingValue;
        }
        return null;
    } catch (error) {
        console.error(`Error getting setting ${settingIndex} for ${folderName}:`, error);
        return null;
    }
}