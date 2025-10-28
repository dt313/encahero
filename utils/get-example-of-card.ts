function getExampleOfCard(ex: string[], word?: string) {
    if (!ex || ex.length === 0) return '';

    const randomIndex = Math.floor(Math.random() * ex.length);

    let randomEx = ex[randomIndex];

    if (word) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi'); // tìm từ nguyên vẹn, ignore case
        randomEx = randomEx.replace(regex, '......');
    }

    return randomEx;
}

export default getExampleOfCard;
