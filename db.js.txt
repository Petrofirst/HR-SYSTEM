// Database functions for HRMS system

// Employees Collection
function getEmployees() {
    return JSON.parse(localStorage.getItem('employees') || '[]');
}

function getEmployeeById(id) {
    const employees = getEmployees();
    return employees.find(e => e.employeeId === id);
}

function addEmployee(employee) {
    const employees = getEmployees();
    employee.employeeId = generateId('EMP');
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
    return employee.employeeId;
}

function updateEmployee(id, employee) {
    const employees = getEmployees();
    const index = employees.findIndex(e => e.employeeId === id);
    
    if (index !== -1) {
        employee.employeeId = id; // Ensure ID remains the same
        employees[index] = employee;
        localStorage.setItem('employees', JSON.stringify(employees));
        return true;
    }
    
    return false;
}

function deleteEmployee(id) {
    let employees = getEmployees();
    employees = employees.filter(e => e.employeeId !== id);
    localStorage.setItem('employees', JSON.stringify(employees));
    return true;
}

// Jobs Collection
function getJobs() {
    return JSON.parse(localStorage.getItem('jobs') || '[]');
}

function getJobById(id) {
    const jobs = getJobs();
    return jobs.find(j => j.jobId === id);
}

function addJob(job) {
    const jobs = getJobs();
    job.jobId = generateId('JOB');
    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    return job.jobId;
}

function updateJob(id, job) {
    const jobs = getJobs();
    const index = jobs.findIndex(j => j.jobId === id);
    
    if (index !== -1) {
        job.jobId = id; // Ensure ID remains the same
        jobs[index] = job;
        localStorage.setItem('jobs', JSON.stringify(jobs));
        return true;
    }
    
    return false;
}

function deleteJob(id) {
    let jobs = getJobs();
    jobs = jobs.filter(j => j.jobId !== id);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    return true;
}

// Leave Requests Collection
function getLeaveRequests() {
    return JSON.parse(localStorage.getItem('leaveRequests') || '[]');
}

function getLeaveRequestById(id) {
    const leaves = getLeaveRequests();
    return leaves.find(l => l.leaveId === id);
}

function addLeaveRequest(leave) {
    const leaves = getLeaveRequests();
    leave.leaveId = generateId('LEAVE');
    leaves.push(leave);
    localStorage.setItem('leaveRequests', JSON.stringify(leaves));
    return leave.leaveId;
}

function updateLeaveRequest(id, leave) {
    const leaves = getLeaveRequests();
    const index = leaves.findIndex(l => l.leaveId === id);
    
    if (index !== -1) {
        leave.leaveId = id; // Ensure ID remains the same
        leaves[index] = leave;
        localStorage.setItem('leaveRequests', JSON.stringify(leaves));
        return true;
    }
    
    return false;
}

function deleteLeaveRequest(id) {
    let leaves = getLeaveRequests();
    leaves = leaves.filter(l => l.leaveId !== id);
    localStorage.setItem('leaveRequests', JSON.stringify(leaves));
    return true;
}

// Performance Reviews Collection
function getPerformanceReviews() {
    return JSON.parse(localStorage.getItem('performanceReviews') || '[]');
}

function getPerformanceReviewById(id) {
    const reviews = getPerformanceReviews();
    return reviews.find(r => r.reviewId === id);
}

function addPerformanceReview(review) {
    const reviews = getPerformanceReviews();
    review.reviewId = generateId('REVIEW');
    reviews.push(review);
    localStorage.setItem('performanceReviews', JSON.stringify(reviews));
    return review.reviewId;
}

function updatePerformanceReview(id, review) {
    const reviews = getPerformanceReviews();
    const index = reviews.findIndex(r => r.reviewId === id);
    
    if (index !== -1) {
        review.reviewId = id; // Ensure ID remains the same
        reviews[index] = review;
        localStorage.setItem('performanceReviews', JSON.stringify(reviews));
        return true;
    }
    
    return false;
}

function deletePerformanceReview(id) {
    let reviews = getPerformanceReviews();
    reviews = reviews.filter(r => r.reviewId !== id);
    localStorage.setItem('performanceReviews', JSON.stringify(reviews));
    return true;
}

// Users Collection
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function getUserById(id) {
    const users = getUsers();
    return users.find(u => u.id === id);
}

function getUserByUsername(username) {
    const users = getUsers();
    return users.find(u => u.username === username);
}

function addUser(user) {
    const users = getUsers();
    user.id = generateId('USER', false);
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return user.id;
}

function updateUser(id, user) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index !== -1) {
        user.id = id; // Ensure ID remains the same
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    
    return false;
}

function deleteUser(id) {
    let users = getUsers();
    users = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// Helper function to generate IDs
function generateId(prefix, isNumber = true) {
    const randomPart = isNumber ? 
        Math.floor(1000 + Math.random() * 9000) :
        Math.random().toString(36).substring(2, 10);
    return `${prefix}-${randomPart}`;
}

// Initialize sample data if empty
function initSampleData() {
    if (getEmployees().length === 0) {
        // Add sample employees
        addEmployee({
            personal: {
                firstName: "محمد",
                middleName: "أحمد",
                lastName: "علي",
                email: "mohamed.ahmed@example.com",
                phone: "0501234567",
                nationality: "UAE",
                idNumber: "784199012345678",
                passportNumber: "A12345678",
                birthDate: "1985-05-15",
                gender: "male",
                maritalStatus: "married",
                address: "دبي، الإمارات العربية المتحدة"
            },
            job: {
                department: "it",
                position: "developer",
                joinDate: "2020-01-15",
                probationPeriod: "3",
                employmentType: "full-time",
                manager: "",
                workLocation: "dubai"
            },
            contract: {
                contractType: "limited",
                contractDuration: "2",
                contractStart: "2020-01-15",
                contractEnd: "2022-01-15",
                basicSalary: "15000",
                housingAllowance: "5000",
                transportationAllowance: "2000",
                otherAllowance: "1000",
                contractNotes: "",
                generateContract: true
            },
            bank: {
                bankName: "ENBD",
                branchName: "دبي الرئيسي",
                accountName: "محمد أحمد علي",
                accountNumber: "123456789",
                iban: "AE070331234567890123456",
                swiftCode: "EBILAEAD"
            },
            status: "active"
        });
        
        addEmployee({
            personal: {
                firstName: "سارة",
                middleName: "خالد",
                lastName: "محمد",
                email: "sara.khaled@example.com",
                phone: "0559876543",
                nationality: "UAE",
                idNumber: "784199076543210",
                passportNumber: "B87654321",
                birthDate: "1990-08-22",
                gender: "female",
                maritalStatus: "single",
                address: "أبو ظبي، الإمارات العربية المتحدة"
            },
            job: {
                department: "finance",
                position: "accountant",
                joinDate: "2021-05-22",
                probationPeriod: "3",
                employmentType: "full-time",
                manager: "",
                workLocation: "abu-dhabi"
            },
            contract: {
                contractType: "limited",
                contractDuration: "2",
                contractStart: "2021-05-22",
                contractEnd: "2023-05-22",
                basicSalary: "12000",
                housingAllowance: "4000",
                transportationAllowance: "1500",
                otherAllowance: "0",
                contractNotes: "",
                generateContract: true
            },
            bank: {
                bankName: "ADCB",
                branchName: "أبو ظبي الرئيسي",
                accountName: "سارة خالد محمد",
                accountNumber: "987654321",
                iban: "AE060331987654321098765",
                swiftCode: "ADCBAEAD"
            },
            status: "active"
        });
    }
    
    if (getJobs().length === 0) {
        // Add sample jobs
        addJob({
            title: "مدير مالي",
            department: "finance",
            location: "dubai",
            type: "full-time",
            salary: "15,000 - 20,000 درهم",
            experience: "5-7 سنوات",
            postDate: "2023-03-01",
            closeDate: "2023-03-15",
            description: "إدارة الشؤون المالية للشركة والتخطيط المالي الاستراتيجي.",
            requirements: "شهادة في المالية أو المحاسبة، خبرة في إدارة الفرق، معرفة بقوانين الضرائب في الإمارات.",
            benefits: "تأمين صحي، بدل سكن، بدل مواصلات، مكافآت سنوية.",
            active: true,
            applicants: 12
        });
        
        addJob({
            title: "مطور ويب",
            department: "it",
            location: "dubai",
            type: "full-time",
            salary: "10,000 - 15,000 درهم",
            experience: "3-5 سنوات",
            postDate: "2023-03-05",
            closeDate: "2023-03-20",
            description: "تطوير وتصميم تطبيقات الويب وفقًا لمتطلبات العمل.",
            requirements: "خبرة في React.js, Node.js, MongoDB، معرفة بمبادئ RESTful APIs.",
            benefits: "تأمين صحي، بدل سكن، تدريب مستمر.",
            active: true,
            applicants: 24
        });
    }
    
    if (getUsers().length === 0) {
        // Add sample users
        addUser({
            username: "admin",
            password: "admin123",
            name: "مسؤول النظام",
            role: "admin",
            email: "admin@company.ae",
            lastLogin: null
        });
        
        addUser({
            username: "hr",
            password: "hr123",
            name: "مسؤول الموارد البشرية",
            role: "hr",
            email: "hr@company.ae",
            lastLogin: null
        });
    }
}

// Initialize sample data when script loads
initSampleData();