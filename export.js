// Export Module
const Export = {
    // Export data to CSV
    toCSV: function(data, filename) {
        if (!data || data.length === 0) {
            console.error('No data to export');
            return;
        }
        
        // Extract headers
        const headers = Object.keys(data[0]);
        
        // Create CSV content
        let csvContent = headers.join(',') + '\n';
        
        data.forEach(item => {
            const row = headers.map(header => {
                // Escape quotes and handle nested objects/arrays
                let value = item[header];
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                return `"${String(value).replace(/"/g, '""')}"`;
            });
            csvContent += row.join(',') + '\n';
        });
        
        // Create download link
        this.downloadFile(csvContent, filename || 'export.csv', 'text/csv;charset=utf-8;');
    },
    
    // Export data to Excel
    toExcel: function(data, filename) {
        // In a real app, you would use a library like SheetJS
        console.log('Exporting to Excel:', data);
        alert('Excel export would be implemented with a library like SheetJS');
    },
    
    // Export data to PDF
    toPDF: function(data, filename) {
        // In a real app, you would use a library like jsPDF or pdfmake
        console.log('Exporting to PDF:', data);
        alert('PDF export would be implemented with a library like jsPDF');
    },
    
    // Generic file download
    downloadFile: function(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },
    
    // Export employee data
    exportEmployees: function(format = 'csv') {
        const employees = DB.getAllEmployees();
        
        switch (format.toLowerCase()) {
            case 'csv':
                this.toCSV(employees, 'employees.csv');
                break;
            case 'excel':
                this.toExcel(employees, 'employees.xlsx');
                break;
            case 'pdf':
                this.toPDF(employees, 'employees.pdf');
                break;
            default:
                console.error('Unsupported export format:', format);
        }
    },
    
    // Export payroll data
    exportPayroll: function(month, year, format = 'csv') {
        const payroll = DB.getAllPayroll().filter(p => {
            return (!month || p.month === month) && (!year || p.year === year);
        });
        
        switch (format.toLowerCase()) {
            case 'csv':
                this.toCSV(payroll, `payroll_${month}_${year}.csv`);
                break;
            case 'excel':
                this.toExcel(payroll, `payroll_${month}_${year}.xlsx`);
                break;
            case 'pdf':
                this.toPDF(payroll, `payroll_${month}_${year}.pdf`);
                break;
            default:
                console.error('Unsupported export format:', format);
        }
    },
    
    // Export attendance report
    exportAttendance: function(startDate, endDate, format = 'csv') {
        const attendance = DB.getAllAttendance().filter(a => {
            const date = new Date(a.date);
            return (!startDate || date >= new Date(startDate)) && 
                   (!endDate || date <= new Date(endDate));
        });
        
        switch (format.toLowerCase()) {
            case 'csv':
                this.toCSV(attendance, `attendance_${startDate}_to_${endDate}.csv`);
                break;
            case 'excel':
                this.toExcel(attendance, `attendance_${startDate}_to_${endDate}.xlsx`);
                break;
            case 'pdf':
                this.toPDF(attendance, `attendance_${startDate}_to_${endDate}.pdf`);
                break;
            default:
                console.error('Unsupported export format:', format);
        }
    }
};