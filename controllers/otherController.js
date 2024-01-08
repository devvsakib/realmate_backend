export const protectedRoute = async (req, res) => {
    // Implement the logic for the protected route
    // Access authenticated user data through req.user
    res.json({ message: 'Protected route', user: req.user });
};

export const anotherFunctionality = async (req, res) => {
    // Implement the logic for the public route
    res.json({ message: 'Public route' });
};
