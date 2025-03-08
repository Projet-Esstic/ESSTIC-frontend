
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const addHeader = (doc, pageTitle = '') => {
  // Add logo (smaller size: 25x25)
  const logoPath = require('@/assets/images/esstic-logo.png');
  doc.addImage(logoPath, 'PNG', 15, 10, 25, 25);

  // Add header text (start after logo + margin)
  const textStartX = 50;
  doc.setFontSize(14);
  doc.setTextColor(41, 128, 185);
  
  const pageWidth = doc.internal.pageSize.width;
  const textWidth = pageWidth - (textStartX + 15);
  const centerX = textStartX + (textWidth / 2);
  
  doc.text('ÉCOLE SUPÉRIEURE DES SCIENCES ET TECHNOLOGIES', centerX, 15, { align: 'center' });
  doc.text('DE L\'INFORMATION ET DE LA COMMUNICATION', centerX, 22, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('ADVANCED SCHOOL OF MASS COMMUNICATION', centerX, 29, { align: 'center' });
  
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(15, 35, doc.internal.pageSize.width - 15, 35);

  if (pageTitle) {
    doc.setFontSize(14);
    doc.text(pageTitle, doc.internal.pageSize.width / 2, 45, { align: 'center' });
  }
};

export const generateCandidateList = (candidates, fields, formatDate) => {
  const doc = new jsPDF();
  
  // Title Page
  addHeader(doc);
  
  doc.setFontSize(22);
  doc.setTextColor(0);
  doc.text('ENTRANCE EXAMINATION 2024', doc.internal.pageSize.width / 2, 60, { align: 'center' });
  
  doc.setFontSize(18);
  doc.text('List of Eligible Candidates', doc.internal.pageSize.width / 2, 75, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.width / 2, 90, { align: 'center' });
  
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(50, 80, doc.internal.pageSize.width - 50, 80);
  
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.text('ESSTIC - Excellence in Information and Communication Technology Education', 
    doc.internal.pageSize.width / 2, pageHeight - 20, { align: 'center' });

  // Generate pages for each field
  fields.forEach(field => {
    const fieldCandidates = candidates
      .filter(c => c.fieldId === field.id && c.status === 'validated')
      .sort((a, b) => a.name.localeCompare(b.name));

    if (fieldCandidates.length > 0) {
      doc.addPage();
      addHeader(doc, field.name);

      const tableData = fieldCandidates.map((candidate, idx) => [
        (idx + 1).toString(),
        candidate.registrationNumber,
        candidate.name,
        formatDate(candidate.registrationDate)
      ]);

      doc.autoTable({
        startY: 55,
        head: [['Site No.', 'Registration No.', 'Candidate Name', 'Registration Date']],
        body: tableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [41, 128, 185],
          textColor: 255,
          fontSize: 11,
          halign: 'center',
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 6,
          lineColor: [200, 200, 200],
          lineWidth: 0.1
        },
        alternateRowStyles: {
          fillColor: [245, 250, 254]
        },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 40 },
          2: { cellWidth: 80 },
          3: { cellWidth: 40 }
        }
      });

      // Add footer
      doc.setDrawColor(41, 128, 185);
      doc.setLineWidth(0.5);
      doc.line(15, pageHeight - 25, doc.internal.pageSize.width - 15, pageHeight - 25);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('ESSTIC Entrance Examination 2024', 15, pageHeight - 15);
      doc.text(
        `Total Eligible Candidates: ${fieldCandidates.length}`,
        doc.internal.pageSize.width / 2,
        pageHeight - 15,
        { align: 'center' }
      );
      doc.text(
        `Page ${doc.internal.getCurrentPageInfo().pageNumber}`,
        doc.internal.pageSize.width - 15,
        pageHeight - 15,
        { align: 'right' }
      );
    }
  });

  return doc;
};
