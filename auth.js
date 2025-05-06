// Authentication Module
const Auth = {
    // Check if user is logged in
    isAuthenticated: function() {
        return localStorage.getItem('hrms_auth_token') !== null;
    },
    
    // Login function
    login: function(username, password, callback) {
        // In a real app, this would be an API call to your backend
        // Simulating API call with timeout
        setTimeout(() => {
            if (username === 'admin' && password === 'admin123') {
                // Store token in localStorage
                localStorage.setItem('hrms_auth_token', 'simulated_token_12345');
                localStorage.setItem('hrms_user', JSON.stringify({
                    id: 1,
                    name: 'مدير النظام',
                    role: 'admin',
                    department: 'الموارد البشرية'
                }));
                
                callback(true);
            } else {
                callback(false, 'اسم المستخدم أو كلمة المرور غير صحيحة');
            }
        }, 1000);
    },
    
    // Logout function
    logout: function() {
        localStorage.removeItem('hrms_auth_token');
        localStorage.removeItem('hrms_user');
        window.location.href = 'index.html';
    },
    
    // Get current user
    getCurrentUser: function() {
        const user = localStorage.getItem('hrms_user');
        return user ? JSON.parse(user) : null;
    },
    
    // Check user permissions
    hasPermission: function(permission) {
        const user = this.getCurrentUser();
        if (!user) return false;
        
        // In a real app, you would check the user's role/permissions
        // This is a simplified version
        if (user.role === 'admin') return true;
        
        // Add more permission checks based on roles
        return false;
    }
};

// Protect routes
function protectRoute() {
    if (!Auth.isAuthenticated() && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Initialize auth check on page load
protectRoute();