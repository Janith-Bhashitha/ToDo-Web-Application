// Utility function to format date string without timezone issues
// Takes a date string like "2025-12-10" and formats it for display
export function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return 'No date';

    // Parse the date parts directly to avoid timezone conversion
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return `${months[month - 1]} ${day}, ${year}`;
}

// Format date as short version (e.g., "12/10/2025")
export function formatDateShort(dateString: string | null | undefined): string {
    if (!dateString) return 'No date';

    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${month}/${day}/${year}`;
}

// Check if a date string matches today's date
export function isToday(dateString: string | null | undefined): boolean {
    if (!dateString) return false;

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    return dateString === todayStr;
}

// Get today's date as a string in YYYY-MM-DD format
export function getTodayString(): string {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}
