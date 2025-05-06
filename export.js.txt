// Export functions for HRMS system

// Export employees to CSV
function exportEmployeesToCSV() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    let csv = 'ID,Name,Department,Position,Join Date,Status\n';
    
    employees.forEach(employee => {
        const name = `${employee.personal.firstName} ${employee.personal.lastName}`;
        const dept = employee.job.department;
        const position = employee.job.position;
        const joinDate = employee.job.joinDate;
        const status = employee.status;
        
        csv += `${employee.employeeId},"${name}","${dept}","${position}","${joinDate}","${status}"\n`;
    });
    
    downloadCSV(csv, 'employees.csv');
}

// Export employees to Excel
function exportEmployeesToExcel() {
    // In a real app, this would use a library like SheetJS
    alert('تصدير إلى Excel سيتطلب إضافة مكتبة متخصصة مثل SheetJS');
}

// Export employees to PDF
function exportEmployeesToPDF() {
    // In a real app, this would use a library like jsPDF
    alert('تصدير إلى PDF سيتطلب إضافة مكتبة متخصصة مثل jsPDF');
}

// Export jobs to CSV
function exportJobsToCSV() {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    let csv = 'ID,Title,Department,Location,Type,Post Date,Close Date,Applicants,Status\n';
    
    jobs.forEach(job => {
        csv += `${job.jobId},"${job.title}","${job.department}","${job.location}","${job.type}","${job.postDate}","${job.closeDate}",${job.applicants || 0},"${job.active ? 'Active' : 'Inactive'}"\n`;
    });
    
    downloadCSV(csv, 'jobs.csv');
}

// Export leave requests to CSV
function exportLeaveRequestsToCSV() {
    const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    let csv = 'ID,Employee,Type,Start Date,End Date,Days,Status,Reason\n';
    
    leaves.forEach(leave => {
        const employee = getEmployeeById(leave.employeeId);
        const employeeName = employee ? `${employee.personal.firstName} ${employee.personal.lastName}` : 'N/A';
        
        csv += `${leave.leaveId},"${employeeName}","${leave.type}","${leave.startDate}","${leave.endDate}",${leave.days},"${leave.status}","${leave.reason}"\n`;
    });
    
    downloadCSV(csv, 'leave_requests.csv');
}

// Helper function to download CSV
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export reports
function exportReport(reportType, format) {
    switch (reportType) {
        case 'employees':
            if (format === 'csv') exportEmployeesToCSV();
            else if (format === 'excel') exportEmployeesToExcel();
            else if (format === 'pdf') exportEmployeesToPDF();
            break;
        case 'jobs':
            if (format === 'csv') exportJobsToCSV();
            break;
        case 'leaves':
            if (format === 'csv') exportLeaveRequestsToCSV();
            break;
        default:
            alert('نوع التقرير غير معروف');
    }
}