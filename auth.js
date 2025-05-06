// Authentication functions for HRMS system

// Login function
function login(username, password) {
    // In a real app, this would validate against a server/database
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        return true;
    }
    
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    // Redirect to login page
    // window.location.href = 'login.html';
}

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

// Initialize auth system with sample admin user
function initAuth() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.length === 0) {
        // Add sample admin user
        users.push({
            id: 1,
            username: 'admin',
            password: 'admin123',
            name: 'مسؤول النظام',
            role: 'admin',
            email: 'admin@company.ae',
            lastLogin: null
        });
        
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Change password
function changePassword(username, oldPassword, newPassword) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.username === username && u.password === oldPassword);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    
    return false;
}

// Check if user has permission
function hasPermission(user, permission) {
    // In a real app, this would check user roles/permissions
    if (user.role === 'admin') {
        return true;
    }
    
    const permissions = {
        'view_dashboard': ['admin', 'hr', 'manager'],
        'manage_employees': ['admin', 'hr'],
        'manage_recruitment': ['admin', 'hr'],
        'manage_attendance': ['admin', 'hr', 'manager'],
        'approve_leaves': ['admin', 'hr', 'manager'],
        'view_reports': ['admin', 'hr', 'manager', 'finance']
    };
    
    return permissions[permission]?.includes(user.role) || false;
}

// Initialize auth system when script loads
initAuth();