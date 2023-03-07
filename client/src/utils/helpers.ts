export const truncateString = (summary: string | undefined, limit=20) => {
    if (!summary) return;
    if (summary.length <= limit) return summary;
    return summary.substring(0, limit) + ' ...'
}