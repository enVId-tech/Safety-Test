import fs from 'fs';
import path from 'path';

export const mainTestPath = path.join(process.cwd(), "Tests");
export const folderSplit = "\n";

// Cache for settings to avoid repeated file reads
const settingsCache = new Map<string, string[]>();

interface ISettings {
    folderName: string;
    settings: string[];
}

export class GlobalSettings {
    private static folderName: string;
    private static settingsArr: string[];

    constructor(folderName: string) {
        GlobalSettings.folderName = folderName;
        GlobalSettings.settingsArr = getSettings(folderName);
    }

    public getSetting(settingIndex: number, splitIndex?: string): string | null | string[] {
        const settingString = GlobalSettings.settingsArr.slice(2)[settingIndex - 1];

        if (settingString) {
            const settingValue = settingString.split(':')[1].trim().split("#")[0].trim();
            if (splitIndex) {
                return settingValue.split(splitIndex);
            }
            return settingValue;
        }
        return null;
    }

    get settings(): string[] {
        return GlobalSettings.settingsArr;
    }

    set settings(settings: string[]) {
        GlobalSettings.settingsArr = settings;
    }

    set folderName(folderName: string) {
        GlobalSettings.folderName = folderName;
    }

    get folderName(): string {
        return GlobalSettings.folderName;
    }
}

export function getSettings(folderName: string): string[] {
    // Check if settings are in cache
    if (settingsCache.has(folderName)) {
        return settingsCache.get(folderName)!;
    }

    // Read settings from file
    try {
        const folderPath = path.join(mainTestPath, folderName);
        const settingsPath = path.join(folderPath, 'settings.yml');
        const settingsYML = fs.readFileSync(settingsPath, 'utf8');
        const settings = settingsYML.split(folderSplit);

        // Store in cache
        settingsCache.set(folderName, settings);

        return settings;
    } catch (error) {
        console.error(`Error reading settings for ${folderName}:`, error);
        return [];
    }
}

