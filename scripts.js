// Initialize the HRMS application
document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage
    loadEmployees();
    loadJobs();
    
    // Set up event listeners
    setupNavigation();
    setupEmployeeForm();
    setupJobForm();
    setupLeaveForm();
    setupPerformanceReview();
    
    // Show dashboard by default
    showSection('dashboard');
    
    // Initialize charts
    initDashboardCharts();
});

// Navigation functions
function setupNavigation() {
    // Main navigation links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    // Sidebar menu links
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    // User dropdown
    document.querySelector('.dropdown-toggle').addEventListener('click', function() {
        const dropdown = new bootstrap.Dropdown(this);
        dropdown.toggle();
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('d-none');
    });
    
    // Show selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('d-none');
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Employee Management
function setupEmployeeForm() {
    const employeeForm = document.getElementById('employeeForm');
    const saveEmployeeBtn = document.querySelector('#addEmployeeModal .btn-primary');
    
    saveEmployeeBtn.addEventListener('click', function() {
        if (employeeForm.checkValidity()) {
            const employeeData = collectEmployeeData();
            saveEmployee(employeeData);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
            modal.hide();
            
            // Refresh employee list
            displayEmployees();
        } else {
            employeeForm.reportValidity();
        }
    });
    
    // Calculate contract end date based on start date and duration
    document.getElementById('contractStart').addEventListener('change', function() {
        const startDate = new Date(this.value);
        const duration = parseInt(document.getElementById('contractDuration').value) || 2;
        
        if (!isNaN(startDate.getTime())) {
            const endDate = new Date(startDate);
            endDate.setFullYear(endDate.getFullYear() + duration);
            
            const formattedDate = endDate.toISOString().split('T')[0];
            document.getElementById('contractEnd').value = formattedDate;
        }
    });
    
    document.getElementById('contractDuration').addEventListener('change', function() {
        const startDate = new Date(document.getElementById('contractStart').value);
        const duration = parseInt(this.value) || 2;
        
        if (!isNaN(startDate.getTime())) {
            const endDate = new Date(startDate);
            endDate.setFullYear(endDate.getFullYear() + duration);
            
            const formattedDate = endDate.toISOString().split('T')[0];
            document.getElementById('contractEnd').value = formattedDate;
        }
    });
}

function collectEmployeeData() {
    return {
        personal: {
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            nationality: document.getElementById('nationality').value,
            idNumber: document.getElementById('idNumber').value,
            passportNumber: document.getElementById('passportNumber').value,
            birthDate: document.getElementById('birthDate').value,
            gender: document.getElementById('gender').value,
            maritalStatus: document.getElementById('maritalStatus').value,
            address: document.getElementById('address').value
        },
        job: {
            department: document.getElementById('department').value,
            position: document.getElementById('position').value,
            joinDate: document.getElementById('joinDate').value,
            probationPeriod: document.getElementById('probationPeriod').value,
            employmentType: document.getElementById('employmentType').value,
            manager: document.getElementById('manager').value,
            workLocation: document.getElementById('workLocation').value
        },
        contract: {
            contractType: document.getElementById('contractType').value,
            contractDuration: document.getElementById('contractDuration').value,
            contractStart: document.getElementById('contractStart').value,
            contractEnd: document.getElementById('contractEnd').value,
            basicSalary: document.getElementById('basicSalary').value,
            housingAllowance: document.getElementById('housingAllowance').value,
            transportationAllowance: document.getElementById('transportationAllowance').value,
            otherAllowance: document.getElementById('otherAllowance').value,
            contractNotes: document.getElementById('contractNotes').value,
            generateContract: document.getElementById('generateContract').checked
        },
        bank: {
            bankName: document.getElementById('bankName').value,
            branchName: document.getElementById('branchName').value,
            accountName: document.getElementById('accountName').value,
            accountNumber: document.getElementById('accountNumber').value,
            iban: document.getElementById('iban').value,
            swiftCode: document.getElementById('swiftCode').value
        },
        status: 'active',
        employeeId: generateEmployeeId()
    };
}

function generateEmployeeId() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const lastId = employees.length > 0 ? 
        Math.max(...employees.map(e => parseInt(e.employeeId?.split('-')[1] || 0))) : 0;
    return `EMP-${String(lastId + 1).padStart(4, '0')}`;
}

function saveEmployee(employeeData) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees.push(employeeData);
    localStorage.setItem('employees', JSON.stringify(employees));
}

function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (employees.length === 0) {
        // Add sample data if empty
        const sampleEmployees = [
            {
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
                status: "active",
                employeeId: "EMP-1001"
            },
            {
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
                status: "active",
                employeeId: "EMP-1002"
            }
        ];
        
        localStorage.setItem('employees', JSON.stringify(sampleEmployees));
    }
}

function displayEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const tbody = document.querySelector('#employees table tbody');
    tbody.innerHTML = '';
    
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        
        // Map department and position to display names
        const departments = {
            'finance': 'المالية',
            'hr': 'الموارد البشرية',
            'marketing': 'التسويق',
            'it': 'التقنية'
        };
        
        const positions = {
            'manager': 'مدير',
            'accountant': 'محاسب',
            'developer': 'مطور ويب'
        };
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.employeeId}</td>
            <td>${employee.personal.firstName} ${employee.personal.lastName}</td>
            <td>${departments[employee.job.department] || employee.job.department}</td>
            <td>${positions[employee.job.position] || employee.job.position}</td>
            <td>${formatDate(employee.job.joinDate)}</td>
            <td><span class="badge bg-success">${employee.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary view-employee" data-id="${employee.employeeId}"><i class="bi bi-eye"></i></button>
                <button class="btn btn-sm btn-outline-secondary edit-employee" data-id="${employee.employeeId}"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger delete-employee" data-id="${employee.employeeId}"><i class="bi bi-trash"></i></button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.view-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            viewEmployee(this.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('.edit-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            editEmployee(this.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('.delete-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteEmployee(this.getAttribute('data-id'));
        });
    });
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG');
}

function viewEmployee(employeeId) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const employee = employees.find(e => e.employeeId === employeeId);
    
    if (employee) {
        // Show employee details in a modal or dedicated view
        alert(`عرض بيانات الموظف: ${employee.personal.firstName} ${employee.personal.lastName}`);
    }
}

function editEmployee(employeeId) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const employee = employees.find(e => e.employeeId === employeeId);
    
    if (employee) {
        // Fill the form with employee data
        document.getElementById('firstName').value = employee.personal.firstName;
        document.getElementById('middleName').value = employee.personal.middleName;
        document.getElementById('lastName').value = employee.personal.lastName;
        document.getElementById('email').value = employee.personal.email;
        document.getElementById('phone').value = employee.personal.phone;
        document.getElementById('nationality').value = employee.personal.nationality;
        document.getElementById('idNumber').value = employee.personal.idNumber;
        document.getElementById('passportNumber').value = employee.personal.passportNumber;
        document.getElementById('birthDate').value = employee.personal.birthDate;
        document.getElementById('gender').value = employee.personal.gender;
        document.getElementById('maritalStatus').value = employee.personal.maritalStatus;
        document.getElementById('address').value = employee.personal.address;
        
        document.getElementById('department').value = employee.job.department;
        document.getElementById('position').value = employee.job.position;
        document.getElementById('joinDate').value = employee.job.joinDate;
        document.getElementById('probationPeriod').value = employee.job.probationPeriod;
        document.getElementById('employmentType').value = employee.job.employmentType;
        document.getElementById('manager').value = employee.job.manager;
        document.getElementById('workLocation').value = employee.job.workLocation;
        
        document.getElementById('contractType').value = employee.contract.contractType;
        document.getElementById('contractDuration').value = employee.contract.contractDuration;
        document.getElementById('contractStart').value = employee.contract.contractStart;
        document.getElementById('contractEnd').value = employee.contract.contractEnd;
        document.getElementById('basicSalary').value = employee.contract.basicSalary;
        document.getElementById('housingAllowance').value = employee.contract.housingAllowance;
        document.getElementById('transportationAllowance').value = employee.contract.transportationAllowance;
        document.getElementById('otherAllowance').value = employee.contract.otherAllowance;
        document.getElementById('contractNotes').value = employee.contract.contractNotes;
        document.getElementById('generateContract').checked = employee.contract.generateContract;
        
        document.getElementById('bankName').value = employee.bank.bankName;
        document.getElementById('branchName').value = employee.bank.branchName;
        document.getElementById('accountName').value = employee.bank.accountName;
        document.getElementById('accountNumber').value = employee.bank.accountNumber;
        document.getElementById('iban').value = employee.bank.iban;
        document.getElementById('swiftCode').value = employee.bank.swiftCode;
        
        // Store employee ID for update
        document.getElementById('employeeForm').dataset.employeeId = employeeId;
        
        // Change save button text
        document.querySelector('#addEmployeeModal .btn-primary').textContent = 'تحديث البيانات';
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
        modal.show();
    }
}

function deleteEmployee(employeeId) {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟ لا يمكن التراجع عن هذه العملية.')) {
        let employees = JSON.parse(localStorage.getItem('employees') || '[]');
        employees = employees.filter(e => e.employeeId !== employeeId);
        localStorage.setItem('employees', JSON.stringify(employees));
        displayEmployees();
    }
}

// Job Management
function setupJobForm() {
    const jobForm = document.getElementById('jobForm');
    const saveJobBtn = document.querySelector('#addJobModal .btn-primary');
    
    saveJobBtn.addEventListener('click', function() {
        if (jobForm.checkValidity()) {
            const jobData = collectJobData();
            saveJob(jobData);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addJobModal'));
            modal.hide();
            
            // Refresh job list
            displayJobs();
        } else {
            jobForm.reportValidity();
        }
    });
}

function collectJobData() {
    return {
        title: document.getElementById('jobTitle').value,
        department: document.getElementById('jobDepartment').value,
        location: document.getElementById('jobLocation').value,
        type: document.getElementById('jobType').value,
        salary: document.getElementById('jobSalary').value,
        experience: document.getElementById('jobExperience').value,
        postDate: document.getElementById('jobPostDate').value,
        closeDate: document.getElementById('jobCloseDate').value,
        description: document.getElementById('jobDescription').value,
        requirements: document.getElementById('jobRequirements').value,
        benefits: document.getElementById('jobBenefits').value,
        active: document.getElementById('jobActive').checked,
        jobId: generateJobId()
    };
}

function generateJobId() {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const lastId = jobs.length > 0 ? 
        Math.max(...jobs.map(j => parseInt(j.jobId?.split('-')[1] || 0))) : 0;
    return `JOB-${String(lastId + 1).padStart(4, '0')}`;
}

function saveJob(jobData) {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    jobs.push(jobData);
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

function loadJobs() {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    if (jobs.length === 0) {
        // Add sample data if empty
        const sampleJobs = [
            {
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
                jobId: "JOB-1001",
                applicants: 12
            },
            {
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
                jobId: "JOB-1002",
                applicants: 24
            }
        ];
        
        localStorage.setItem('jobs', JSON.stringify(sampleJobs));
    }
}

function displayJobs() {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const tbody = document.querySelector('#recruitment table tbody');
    tbody.innerHTML = '';
    
    jobs.forEach((job, index) => {
        const row = document.createElement('tr');
        
        // Map department to display name
        const departments = {
            'finance': 'المالية',
            'hr': 'الموارد البشرية',
            'marketing': 'التسويق',
            'it': 'التقنية'
        };
        
        // Map job type to display name
        const jobTypes = {
            'full-time': 'دوام كامل',
            'part-time': 'دوام جزئي',
            'contract': 'عقد',
            'internship': 'تدريب'
        };
        
        // Map location to display name
        const locations = {
            'dubai': 'دبي',
            'abu-dhabi': 'أبو ظبي',
            'sharjah': 'الشارقة',
            'remote': 'عن بُعد'
        };
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${job.title}</td>
            <td>${departments[job.department] || job.department}</td>
            <td>${locations[job.location] || job.location}</td>
            <td>${jobTypes[job.type] || job.type}</td>
            <td>${formatDate(job.postDate)}</td>
            <td>${formatDate(job.closeDate)}</td>
            <td>${job.applicants || 0}</td>
            <td><span class="badge ${job.active ? 'bg-success' : 'bg-secondary'}">${job.active ? 'نشط' : 'غير نشط'}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary view-job" data-id="${job.jobId}"><i class="bi bi-eye"></i></button>
                <button class="btn btn-sm btn-outline-secondary edit-job" data-id="${job.jobId}"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger delete-job" data-id="${job.jobId}"><i class="bi bi-trash"></i></button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.view-job').forEach(btn => {
        btn.addEventListener('click', function() {
            viewJob(this.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('.edit-job').forEach(btn => {
        btn.addEventListener('click', function() {
            editJob(this.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('.delete-job').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteJob(this.getAttribute('data-id'));
        });
    });
}

function viewJob(jobId) {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const job = jobs.find(j => j.jobId === jobId);
    
    if (job) {
        // Show job details in a modal or dedicated view
        alert(`عرض تفاصيل الوظيفة: ${job.title}`);
    }
}

function editJob(jobId) {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const job = jobs.find(j => j.jobId === jobId);
    
    if (job) {
        // Fill the form with job data
        document.getElementById('jobTitle').value = job.title;
        document.getElementById('jobDepartment').value = job.department;
        document.getElementById('jobLocation').value = job.location;
        document.getElementById('jobType').value = job.type;
        document.getElementById('jobSalary').value = job.salary;
        document.getElementById('jobExperience').value = job.experience;
        document.getElementById('jobPostDate').value = job.postDate;
        document.getElementById('jobCloseDate').value = job.closeDate;
        document.getElementById('jobDescription').value = job.description;
        document.getElementById('jobRequirements').value = job.requirements;
        document.getElementById('jobBenefits').value = job.benefits;
        document.getElementById('jobActive').checked = job.active;
        
        // Store job ID for update
        document.getElementById('jobForm').dataset.jobId = jobId;
        
        // Change save button text
        document.querySelector('#addJobModal .btn-primary').textContent = 'تحديث الوظيفة';
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addJobModal'));
        modal.show();
    }
}

function deleteJob(jobId) {
    if (confirm('هل أنت متأكد من حذف هذه الوظيفة؟ سيتم حذف جميع المتقدمين المرتبطين بها.')) {
        let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        jobs = jobs.filter(j => j.jobId !== jobId);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        displayJobs();
    }
}

// Leave Management
function setupLeaveForm() {
    const leaveForm = document.getElementById('leaveRequestForm');
    const submitLeaveBtn = document.querySelector('#leaveRequestModal .btn-primary');
    
    submitLeaveBtn.addEventListener('click', function() {
        if (leaveForm.checkValidity()) {
            const leaveData = collectLeaveData();
            saveLeaveRequest(leaveData);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('leaveRequestModal'));
            modal.hide();
            
            // Refresh leave list
            displayLeaveRequests();
        } else {
            leaveForm.reportValidity();
        }
    });
    
    // Calculate leave days based on start and end dates
    document.getElementById('leaveStart').addEventListener('change', calculateLeaveDays);
    document.getElementById('leaveEnd').addEventListener('change', calculateLeaveDays);
}

function calculateLeaveDays() {
    const startDate = new Date(document.getElementById('leaveStart').value);
    const endDate = new Date(document.getElementById('leaveEnd').value);
    
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('leaveDays').value = diffDays;
    }
}

function collectLeaveData() {
    return {
        type: document.getElementById('leaveType').value,
        startDate: document.getElementById('leaveStart').value,
        endDate: document.getElementById('leaveEnd').value,
        days: document.getElementById('leaveDays').value,
        status: 'pending',
        reason: document.getElementById('leaveReason').value,
        attachment: document.getElementById('leaveAttachment').value,
        employeeId: 'EMP-1001', // In a real app, this would be the logged-in user's ID
        requestDate: new Date().toISOString().split('T')[0],
        leaveId: generateLeaveId()
    };
}

function generateLeaveId() {
    const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const lastId = leaves.length > 0 ? 
        Math.max(...leaves.map(l => parseInt(l.leaveId?.split('-')[1] || 0))) : 0;
    return `LEAVE-${String(lastId + 1).padStart(4, '0')}`;
}

function saveLeaveRequest(leaveData) {
    const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    leaves.push(leaveData);
    localStorage.setItem('leaveRequests', JSON.stringify(leaves));
}

function displayLeaveRequests() {
    // Implementation for displaying leave requests
}

// Performance Review
function setupPerformanceReview() {
    const reviewForm = document.getElementById('performanceReviewForm');
    const saveReviewBtn = document.querySelector('#performanceReviewModal .btn-primary');
    
    saveReviewBtn.addEventListener('click', function() {
        if (reviewForm.checkValidity()) {
            const reviewData = collectReviewData();
            savePerformanceReview(reviewData);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('performanceReviewModal'));
            modal.hide();
            
            // Refresh reviews list
            displayPerformanceReviews();
        } else {
            reviewForm.reportValidity();
        }
    });
    
    // Calculate overall score when criteria ratings change
    document.querySelectorAll('#performanceReviewForm select').forEach(select => {
        select.addEventListener('change', calculateOverallScore);
    });
}

function collectReviewData() {
    return {
        employeeId: document.getElementById('reviewEmployee').value,
        period: document.getElementById('reviewPeriod').value,
        date: document.getElementById('reviewDate').value,
        reviewer: document.getElementById('reviewer').value,
        criteria: [
            {
                name: "جودة العمل",
                weight: 30,
                rating: document.querySelector('#performanceReviewForm select:nth-of-type(1)').value,
                notes: document.querySelector('#performanceReviewForm input:nth-of-type(1)').value
            },
            {
                name: "إنتاجية العمل",
                weight: 25,
                rating: document.querySelector('#performanceReviewForm select:nth-of-type(2)').value,
                notes: document.querySelector('#performanceReviewForm input:nth-of-type(2)').value
            },
            {
                name: "المعرفة والمهارات",
                weight: 20,
                rating: document.querySelector('#performanceReviewForm select:nth-of-type(3)').value,
                notes: document.querySelector('#performanceReviewForm input:nth-of-type(3)').value
            },
            {
                name: "العمل الجماعي",
                weight: 15,
                rating: document.querySelector('#performanceReviewForm select:nth-of-type(4)').value,
                notes: document.querySelector('#performanceReviewForm input:nth-of-type(4)').value
            },
            {
                name: "الالتزام بالمواعيد",
                weight: 10,
                rating: document.querySelector('#performanceReviewForm select:nth-of-type(5)').value,
                notes: document.querySelector('#performanceReviewForm input:nth-of-type(5)').value
            }
        ],
        overallScore: document.getElementById('overallScore').value,
        performanceLevel: document.getElementById('performanceLevel').value,
        recommendation: document.getElementById('recommendation').value,
        strengths: document.getElementById('strengths').value,
        improvements: document.getElementById('improvements').value,
        comments: document.getElementById('comments').value,
        reviewId: generateReviewId()
    };
}

function calculateOverallScore() {
    let totalScore = 0;
    let totalWeight = 0;
    
    document.querySelectorAll('#performanceReviewForm tbody tr').forEach(row => {
        const weight = parseInt(row.cells[1].textContent);
        const rating = parseInt(row.querySelector('select').value);
        
        totalScore += (weight * rating) / 5; // Assuming 5 is max rating
        totalWeight += weight;
    });
    
    const overallScore = (totalScore / totalWeight * 100).toFixed(2);
    document.getElementById('overallScore').value = overallScore;
    
    // Determine performance level
    let performanceLevel = '';
    if (overallScore >= 90) {
        performanceLevel = 'ممتاز';
    } else if (overallScore >= 80) {
        performanceLevel = 'جيد جدًا';
    } else if (overallScore >= 70) {
        performanceLevel = 'جيد';
    } else if (overallScore >= 60) {
        performanceLevel = 'مقبول';
    } else {
        performanceLevel = 'ضعيف';
    }
    
    document.getElementById('performanceLevel').value = performanceLevel;
}

function generateReviewId() {
    const reviews = JSON.parse(localStorage.getItem('performanceReviews') || '[]');
    const lastId = reviews.length > 0 ? 
        Math.max(...reviews.map(r => parseInt(r.reviewId?.split('-')[1] || 0))) : 0;
    return `REVIEW-${String(lastId + 1).padStart(4, '0')}`;
}

function savePerformanceReview(reviewData) {
    const reviews = JSON.parse(localStorage.getItem('performanceReviews') || '[]');
    reviews.push(reviewData);
    localStorage.setItem('performanceReviews', JSON.stringify(reviews));
}

function displayPerformanceReviews() {
    // Implementation for displaying performance reviews
}

// Dashboard Charts
function initDashboardCharts() {
    // Employees by Department Chart
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const departments = {};
    
    employees.forEach(employee => {
        const dept = employee.job.department;
        departments[dept] = (departments[dept] || 0) + 1;
    });
    
    const deptCtx = document.createElement('canvas');
    deptCtx.id = 'deptChart';
    document.querySelector('#dashboard .row').insertAdjacentElement('afterend', deptCtx);
    
    new Chart(deptCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(departments).map(dept => {
                const deptNames = {
                    'finance': 'المالية',
                    'hr': 'الموارد البشرية',
                    'marketing': 'التسويق',
                    'it': 'التقنية'
                };
                return deptNames[dept] || dept;
            }),
            datasets: [{
                label: 'عدد الموظفين',
                data: Object.values(departments),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'توزيع الموظفين حسب الأقسام',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Attendance Trend Chart
    const attendanceCtx = document.createElement('canvas');
    attendanceCtx.id = 'attendanceChart';
    deptCtx.insertAdjacentElement('afterend', attendanceCtx);
    
    new Chart(attendanceCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'نسبة الحضور',
                data: [95, 93, 97, 96, 98, 94],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'اتجاه الحضور خلال الأشهر الستة الماضية',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    min: 90,
                    max: 100
                }
            }
        }
    });
}

// Utility Functions
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (in a real app, this would be more robust)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        // Redirect to login page (in a real app)
        // window.location.href = 'login.html';
    }
    
    // Load initial data
    loadEmployees();
    loadJobs();
    
    // Display initial data
    displayEmployees();
    displayJobs();
    
    // Initialize charts
    initDashboardCharts();
});