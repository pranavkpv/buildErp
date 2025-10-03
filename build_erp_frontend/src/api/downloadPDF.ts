import jsPDF from "jspdf";
import autoTable, { type UserOptions } from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
    getNumberOfPages: () => number;
  }
}


interface reportData {
  project_name: string;
  budgeted_cost: number;
  actual_expense: number;
}

export const downloadPDF = (data: reportData[]) => {
  if (!data || data.length === 0) {
    alert("No data available to generate PDF");
    return;
  }

  const doc = new jsPDF();

  doc.setProperties({
    title: "Budget Vs Actual Report",
    creator: "Grok",
    author: "xAI",
  });

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Budget Vs Actual Report", 105, 20, { align: "center" });



  const columns = [
    { header: "SL No", dataKey: "slNo" },
    { header: "Project Name", dataKey: "project_name" },
    { header: "Budgeted Cost", dataKey: "budgeted_cost" },
    { header: "Actual Expense", dataKey: "actual_expense" },
    { header: "Variance", dataKey: "variance" },
  ];


  const tableData = data.map((item, index) => {
    const variance = item.budgeted_cost - item.actual_expense;
    return {
      slNo: index + 1,
      project_name: item.project_name,
      budgeted_cost: `${item.budgeted_cost}`,
      actual_expense: `${item.actual_expense}`,
      variance: `${Math.abs(variance)}`,
    };
  });
  autoTable(doc,{
    columns: columns,
    body: tableData,
    startY: 30,
    theme: "grid",
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255], 
      fontSize: 12,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      fontSize: 10,
      textColor: [44, 62, 80], 
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], 
    },
    margin: { top: 30, left: 10, right: 10 },
    styles: {
      lineColor: [44, 62, 80], 
      lineWidth: 0.1,
    },
    columnStyles: {
      slNo: { cellWidth: 20 },
      project_name: { cellWidth: 60 },
      budgeted_cost: { cellWidth: 35 },
      actual_expense: { cellWidth: 35 },
      variance: { cellWidth: 40 },
    },
  });


  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Page ${i} of ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: "center" });
  }

  doc.save("projects.pdf");
};