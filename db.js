// Database Simulation Module
const DB = {
    // Employees data
    employees: [
        {
            id: 1,
            employeeId: 'EMP-1001',
            name: 'أحمد محمد',
            nationality: 'مصري',
            birthDate: '1985-05-15',
            emiratesId: '784-1985-1234567-1',
            emiratesIdExpiry: '2025-12-31',
            residenceNumber: '123456789',
            residenceExpiry: '2024-06-30',
            unifiedNumber: 'U123456789',
            workPermitNumber: 'WP123456',
            workPermitExpiry: '2024-06-30',
            sponsoringCompany: 'شركة دبي للتكنولوجيا',
            basicSalary: 15000,
            housingAllowance: 5000,
            transportationAllowance: 2000,
            joiningDate: '2020-01-15',
            contractEndDate: '2025-01-14',
            healthInsurance: true,
            healthInsuranceNumber: 'HI123456',
            healthInsurancePolicy: 'POL123456',
            healthInsuranceExpiry: '2024-12-31',
            healthInsuranceCompany: 'شركة أبوظبي للتأمين',
            unemploymentInsurance: true,
            unemploymentInsuranceNumber: 'UI123456',
            unemploymentInsuranceExpiry: '2024-12-31',
            unemploymentInsuranceCompany: 'شركة دبي للتأمين',
            drivingLicense: true,
            drivingLicenseNumber: 'DL123456',
            drivingLicenseExpiry: '2025-05-14',
            drivingLicenseIssued: 'دبي',
            department: 'تكنولوجيا المعلومات',
            position: 'مدير تكنولوجيا المعلومات',
            status: 'active'
        },
        // More employee records...
    ],
    
    // Contracts data
    contracts: [
        {
            id: 1,
            employeeId: 1,
            contractType: 'محدد المدة',
            startDate: '2020-01-15',
            endDate: '2025-01-14',
            probationPeriod: 3,
            noticePeriod: 1,
            salary: 22000,
            benefits: 'تأمين صحي، بدل سكن، بدل مواصلات',
            status: 'active',
            document: 'contract_1.pdf'
        },
        // More contract records...
    ],
    
    // Attendance data
    attendance: [
        {
            id: 1,
            employeeId: 1,
            date: '2023-11-01',
            checkIn: '08:15',
            checkOut: '17:30',
            status: 'present',
            notes: ''
        },
        // More attendance records...
    ],
    
    // Leaves data
    leaves: [
        {
            id: 1,
            employeeId: 1,
            type: 'سنوية',
            startDate: '2023-11-15',
            endDate: '2023-11-20',
            days: 5,
            status: 'pending',
            reason: 'إجازة سنوية',
            notes: ''
        },
        // More leave records...
    ],
    
    // Payroll data
    payroll: [
        {
            id: 1,
            employeeId: 1,
            month: 11,
            year: 2023,
            basicSalary: 15000,
            housingAllowance: 5000,
            transportationAllowance: 2000,
            overtime: 1500,
            bonuses: 1000,
            deductions: 500,
            netSalary: 24000,
            status: 'pending'
        },
        // More payroll records...
    ],
    
    // Recruitment data
    recruitment: [
        {
            id: 1,
            candidateName: 'سارة أحمد',
            position: 'محاسب',
            department: 'المالية',
            applicationDate: '2023-10-15',
            status: 'interview',
            interviewDate: '2023-11-05',
            notes: 'مرشحة قوية للوظيفة'
        },
        // More recruitment records...
    ],
    
    // Training data
    training: [
        {
            id: 1,
            title: 'ورشة عمل عن قانون العمل الجديد',
            description: 'ورشة عمل عن التعديلات الجديدة في قانون العمل الإماراتي',
            trainer: 'د. خالد محمد',
            date: '2023-11-20',
            time: '10:00 - 13:00',
            location: 'قاعة الاجتماعات الرئيسية',
            participants: [1, 2, 3, 4],
            status: 'upcoming'
        },
        // More training records...
    ],
    
    // Performance reviews
    performance: [
        {
            id: 1,
            employeeId: 1,
            reviewDate: '2023-10-01',
            reviewer: 'مدير الموارد البشرية',
            criteria: [
                { name: 'جودة العمل', score: 4.5 },
                { name: 'الإنتاجية', score: 4 },
                { name: 'العمل الجماعي', score: 5 },
                { name: 'المبادرة', score: 4 }
            ],
            overallScore: 4.4,
            comments: 'أداء ممتاز في جميع المجالات',
            status: 'completed'
        },
        // More performance records...
    ],
    
    // Company documents
    companyDocuments: [
        {
            id: 1,
            type: 'رخصة تجارية',
            number: 'TR123456',
            issuedBy: 'دائرة التنمية الاقتصادية - دبي',
            issueDate: '2015-01-15',
            expiryDate: '2025-01-14',
            document: 'trade_license.pdf'
        },
        // More company documents...
    ],
    
    // Get all employees
    getAllEmployees: function() {
        return this.employees;
    },
    
    // Get employee by ID
    getEmployeeById: function(id) {
        return this.employees.find(emp => emp.id === id);
    },
    
    // Add new employee
    addEmployee: function(employeeData) {
        const newId = this.employees.length > 0 ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
        employeeData.id = newId;
        this.employees.push(employeeData);
        return employeeData;
    },
    
    // Update employee
    updateEmployee: function(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees[index] = { ...this.employees[index], ...employeeData };
            return this.employees[index];
        }
        return null;
    },
    
    // Delete employee
    deleteEmployee: function(id) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            return this.employees.splice(index, 1)[0];
        }
        return null;
    },
    
    // Get all contracts
    getAllContracts: function() {
        return this.contracts;
    },
    
    // Get contract by employee ID
    getContractByEmployeeId: function(employeeId) {
        return this.contracts.find(contract => contract.employeeId === employeeId);
    },
    
    // Add new contract
    addContract: function(contractData) {
        const newId = this.contracts.length > 0 ? Math.max(...this.contracts.map(c => c.id)) + 1 : 1;
        contractData.id = newId;
        this.contracts.push(contractData);
        return contractData;
    },
    
    // Update contract
    updateContract: function(id, contractData) {
        const index = this.contracts.findIndex(contract => contract.id === id);
        if (index !== -1) {
            this.contracts[index] = { ...this.contracts[index], ...contractData };
            return this.contracts[index];
        }
        return null;
    },
    
    // Get all attendance records
    getAllAttendance: function() {
        return this.attendance;
    },
    
    // Get attendance by employee ID
    getAttendanceByEmployeeId: function(employeeId) {
        return this.attendance.filter(record => record.employeeId === employeeId);
    },
    
    // Add attendance record
    addAttendance: function(attendanceData) {
        const newId = this.attendance.length > 0 ? Math.max(...this.attendance.map(a => a.id)) + 1 : 1;
        attendanceData.id = newId;
        this.attendance.push(attendanceData);
        return attendanceData;
    },
    
    // Get all leaves
    getAllLeaves: function() {
        return this.leaves;
    },
    
    // Get leaves by employee ID
    getLeavesByEmployeeId: function(employeeId) {
        return this.leaves.filter(leave => leave.employeeId === employeeId);
    },
    
    // Add new leave
    addLeave: function(leaveData) {
        const newId = this.leaves.length > 0 ? Math.max(...this.leaves.map(l => l.id)) + 1 : 1;
        leaveData.id = newId;
        this.leaves.push(leaveData);
        return leaveData;
    },
    
    // Update leave status
    updateLeaveStatus: function(id, status) {
        const index = this.leaves.findIndex(leave => leave.id === id);
        if (index !== -1) {
            this.leaves[index].status = status;
            return this.leaves[index];
        }
        return null;
    },
    
    // Get all payroll records
    getAllPayroll: function() {
        return this.payroll;
    },
    
    // Get payroll by employee ID
    getPayrollByEmployeeId: function(employeeId) {
        return this.payroll.filter(p => p.employeeId === employeeId);
    },
    
    // Add payroll record
    addPayroll: function(payrollData) {
        const newId = this.payroll.length > 0 ? Math.max(...this.payroll.map(p => p.id)) + 1 : 1;
        payrollData.id = newId;
        this.payroll.push(payrollData);
        return payrollData;
    },
    
    // Get all recruitment records
    getAllRecruitment: function() {
        return this.recruitment;
    },
    
    // Get recruitment by status
    getRecruitmentByStatus: function(status) {
        return this.recruitment.filter(r => r.status === status);
    },
    
    // Add recruitment record
    addRecruitment: function(recruitmentData) {
        const newId = this.recruitment.length > 0 ? Math.max(...this.recruitment.map(r => r.id)) + 1 : 1;
        recruitmentData.id = newId;
        this.recruitment.push(recruitmentData);
        return recruitmentData;
    },
    
    // Get all training records
    getAllTraining: function() {
        return this.training;
    },
    
    // Get training by status
    getTrainingByStatus: function(status) {
        return this.training.filter(t => t.status === status);
    },
    
    // Add training record
    addTraining: function(trainingData) {
        const newId = this.training.length > 0 ? Math.max(...this.training.map(t => t.id)) + 1 : 1;
        trainingData.id = newId;
        this.training.push(trainingData);
        return trainingData;
    },
    
    // Get all performance reviews
    getAllPerformanceReviews: function() {
        return this.performance;
    },
    
    // Get performance reviews by employee ID
    getPerformanceReviewsByEmployeeId: function(employeeId) {
        return this.performance.filter(p => p.employeeId === employeeId);
    },
    
    // Add performance review
    addPerformanceReview: function(performanceData) {
        const newId = this.performance.length > 0 ? Math.max(...this.performance.map(p => p.id)) + 1 : 1;
        performanceData.id = newId;
        this.performance.push(performanceData);
        return performanceData;
    },
    
    // Get all company documents
    getAllCompanyDocuments: function() {
        return this.companyDocuments;
    },
    
    // Add company document
    addCompanyDocument: function(documentData) {
        const newId = this.companyDocuments.length > 0 ? Math.max(...this.companyDocuments.map(d => d.id)) + 1 : 1;
        documentData.id = newId;
        this.companyDocuments.push(documentData);
        return documentData;
    }
};