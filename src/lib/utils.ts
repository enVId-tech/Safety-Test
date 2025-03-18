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