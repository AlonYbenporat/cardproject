import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const handlePrint = () => {
  window.print();
};

export const handleExportCSV = (filteredItems) => {
  const csvContent = "data:text/csv;charset=utf-8," +
    filteredItems.map(item => Object.values(item).join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "table_data.csv");
  document.body.appendChild(link);
  link.click();
};

export const generatePdf = (items) => {
  const doc = new jsPDF();
  doc.autoTable({ html: '.items' }); // Assuming your table has the class 'items'
  doc.save('table.pdf');
};
export const generateUsersPdf = (filteredUsers) => {
  const doc = new jsPDF();
  doc.autoTable({
    head: [['Name', 'Phone', 'Email', 'City', 'Admin', 'Business', 'Created At']],
    body: filteredUsers.map(user => [
      `${user.name.first} ${user.name.middle} ${user.name.last}`,
      user.phone,
      user.email,
      user.address.city,
      user.isAdmin ? 'Yes' : 'No',
      user.isBusiness ? 'Yes' : 'No',
      new Date(user.createdAt).toLocaleString()
    ]),
  });
  doc.save('users.pdf');
};