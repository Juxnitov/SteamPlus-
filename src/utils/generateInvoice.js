// Función para generar factura PDF
export const generateInvoicePDF = (items, total, clientName, invoiceNumber) => {
  // Verificar si jsPDF está disponible
  if (typeof window === 'undefined') {
    console.error('jsPDF solo está disponible en el cliente');
    return;
  }

  // Importación dinámica de jsPDF
  import('jspdf').then((jsPDF) => {
    const { jsPDF: PDF } = jsPDF;
    const doc = new PDF();

    // Configuración del documento
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Colores
    const primaryColor = [128, 0, 128]; // Purple
    const darkGray = [64, 64, 64];
    const lightGray = [200, 200, 200];

    // Encabezado
    doc.setFillColor(...primaryColor);
    doc.rect(margin, yPosition, maxWidth, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Steam+', margin + 10, yPosition + 20);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Tu plataforma de juegos mejorada', margin + 10, yPosition + 28);

    yPosition += 40;

    // Información de la factura
    doc.setTextColor(...darkGray);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURA DE COMPRA', margin, yPosition);

    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Número de Factura: ${invoiceNumber}`, margin, yPosition);
    yPosition += 6;
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`, margin, yPosition);
    yPosition += 6;
    doc.text(`Cliente: ${clientName || 'Cliente'}`, margin, yPosition);

    yPosition += 15;

    // Línea separadora
    doc.setDrawColor(...lightGray);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Encabezados de la tabla
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    
    doc.text('Producto', margin, yPosition);
    doc.text('Cantidad', margin + 80, yPosition);
    doc.text('Precio Unit.', margin + 120, yPosition);
    doc.text('Subtotal', margin + 170, yPosition);

    yPosition += 8;
    doc.setDrawColor(...lightGray);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Items de la factura
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    items.forEach((item) => {
      const itemName = doc.splitTextToSize(item.nombre, 60);
      const itemHeight = itemName.length * 5;
      
      // Verificar si necesitamos una nueva página
      if (yPosition + itemHeight > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        yPosition = margin;
      }

      doc.text(itemName, margin, yPosition);
      doc.text(String(item.cantidad), margin + 80, yPosition);
      doc.text(`$${parseFloat(item.precio).toFixed(2)}`, margin + 120, yPosition);
      doc.text(`$${(parseFloat(item.precio) * parseInt(item.cantidad)).toFixed(2)}`, margin + 170, yPosition);
      
      yPosition += itemHeight + 5;
    });

    yPosition += 10;

    // Línea separadora antes del total
    doc.setDrawColor(...lightGray);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text('TOTAL:', margin + 120, yPosition);
    doc.text(`$${total.toFixed(2)}`, margin + 170, yPosition);

    yPosition += 20;

    // Pie de página
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    doc.text('Gracias por su compra!', margin, yPosition);
    yPosition += 5;
    doc.text('Steam+ - Tu plataforma de juegos mejorada', margin, yPosition);

    // Guardar el PDF
    doc.save(`factura-${invoiceNumber}-${clientName || 'cliente'}.pdf`);
  }).catch((error) => {
    console.error('Error al generar PDF:', error);
    alert('Error al generar la factura. Por favor, instala jspdf: npm install jspdf');
  });
};

