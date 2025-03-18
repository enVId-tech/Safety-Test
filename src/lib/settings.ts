import fs from 'fs';
import path from 'path';

const mainTestPath = path.join(process.cwd(), "Tests");
const folderSplit = "\r\n" || "\n";

// Cache for settings to avoid repeated file reads
const settingsCache = new Map<string, string[]>();

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