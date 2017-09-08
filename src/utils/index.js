export const API_URL = process.env.READABLE_SERVER || 'http://localhost:5001';
export const AUTHORIZATION_PARAM = process.env.READABLE_AUTHORIZATION_PARAM || 'nygilgp';

export function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}