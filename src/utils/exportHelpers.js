import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

// Export dashboard as PDF
export const exportPDF = async (containerSelector, filename = 'healthdash-report.pdf') => {
  try {
    const input = document.querySelector(containerSelector);
    if (!input) {
      throw new Error('Container not found');
    }

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

// Export dashboard as PNG
export const exportPNG = async (containerSelector, filename = 'healthdash-dashboard.png') => {
  try {
    const input = document.querySelector(containerSelector);
    if (!input) {
      throw new Error('Container not found');
    }

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error exporting PNG:', error);
    throw error;
  }
};

// Export data as CSV
export const downloadCSV = (data, filename = 'healthdash-data.csv') => {
  try {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
};