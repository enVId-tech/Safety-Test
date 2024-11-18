export function shuffleItems<T>(array: T[]): T[] {
    try {
        let currentIndex: number = array.length, randomIndex: number;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    } catch (error: unknown) {
        console.error(error as string)
        return array;
    }
}

export function getOneSetting(settings: string[], settingIndex: number, splitIndex?: string): string | string[] | null {
    try {
        const settingString: string = settings.slice(2)[settingIndex - 1]
        if (settingString) {
            const settingValue: string = settingString.split(':')[1].trim().split("#")[0].trim()
            if (splitIndex) {
                return settingValue.split(splitIndex);
            }
            return settingValue;
        }
        return null;
    } catch (error: unknown) {
        console.error(error as string)
        return null;
    }
}