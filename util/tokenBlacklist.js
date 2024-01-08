// In-memory token blacklist
const tokenBlacklist = new Set();

// Function to add a token to the blacklist
function addTokenToBlacklist(token) {
    tokenBlacklist.add(token);
}

// Function to check if a token is blacklisted
function isTokenBlacklisted(token) {
    return tokenBlacklist.has(token);
}

// Function to remove a token from the blacklist (optional)
function removeTokenFromBlacklist(token) {
    tokenBlacklist.delete(token);
}

// Export the functions
export { addTokenToBlacklist, isTokenBlacklisted, removeTokenFromBlacklist };
