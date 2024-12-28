export const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval === 1) return `1 day ago`; // Handle singular case
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval === 1) return `1 hour ago`; // Handle singular case
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval === 1) return `1 minute ago`; // Handle singular case
    if (interval > 1) return `${interval} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);


    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};


export const formatTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string provided");
    }

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12';

    return `${hours}:${minutes} ${ampm}`;
};