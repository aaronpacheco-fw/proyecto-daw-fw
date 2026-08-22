import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-compras.html',
  styleUrl: './mis-compras.css',
})
export class MisCompras implements OnInit {
  compras: any[] = [];

  ngOnInit(): void {
    this.cargarMisCompras();
  }

  cargarMisCompras(): void {
    const historial = localStorage.getItem('mis_compras');
    if (historial) {
      this.compras = JSON.parse(historial);
    }
  }

  descargarBoleta(compra: any): void {

    const ventanaImpresion = window.open('', '_blank', 'width=800,height=600');
    if (!ventanaImpresion) return;


    const subtotal = compra.productos.reduce((acc: number, item: any) => acc + (item.precio * item.cantidad), 0);
    const costoEnvio = 15.00;


    const contenidoHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Boleta Electrónica - ${compra.numeroFactura}</title>
        <style>
          body { font-family: 'Courier New', Courier, monospace; color: #000; margin: 20px; background: #fff; }
          .boleta-container { width: 100%; max-width: 400px; margin: 0 auto; border: 1px dashed #000; padding: 20px; }
          .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
          .title { font-size: 16px; font-weight: bold; }
          .info-row { display: flex; justify-content: space-between; margin: 4px 0; font-size: 13px; }
          .table-header { border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 5px 0; font-weight: bold; display: flex; justify-content: space-between; font-size: 13px; margin-top: 10px;}
          .item-row { display: flex; justify-content: space-between; margin: 5px 0; font-size: 13px; }
          .totals { border-top: 1px dashed #000; margin-top: 10px; padding-top: 5px; }
          .footer { text-align: center; margin-top: 20px; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="boleta-container">
          <div class="header">
            <div class="title">FOUR WAYS S.A.C.</div>
            <div>RUC: 20601234567</div>
            <div>Av. Javier Prado Este 1234, Lima</div>
            <div class="title" style="margin-top: 8px;">COMPROBANTE ELECTRÓNICO</div>
            <div>${compra.numeroFactura}</div>
          </div>

          <div>
            <div class="info-row"><span>Fecha: ${compra.fecha}</span></div>
            <div class="info-row"><span>Cliente: ${compra.datosEnvio?.nombre || 'Cliente'} ${compra.datosEnvio?.apellido || ''}</span></div>
            <div class="info-row"><span>${compra.datosEnvio?.tipoDocumento || 'DNI'}: ${compra.datosEnvio?.documento || '---'}</span></div>
            <div class="info-row"><span>Método de Pago: ${compra.metodoPago}</span></div>
          </div>

          <div class="table-header">
            <span>Descripción</span>
            <span>Total</span>
          </div>

          ${compra.productos.map((item: any) => `
            <div class="item-row">
              <span>${item.cantidad}x ${item.nombre}</span>
              <span>S/ ${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
          `).join('')}

          <div class="item-row">
            <span>Costo de envío</span>
            <span>S/ ${costoEnvio.toFixed(2)}</span>
          </div>

          <div class="totals">
            <div class="info-row"><span>SUBTOTAL:</span><span>S/ ${subtotal.toFixed(2)}</span></div>
            <div class="info-row"><span>ENVÍO:</span><span>S/ ${costoEnvio.toFixed(2)}</span></div>
            <div class="info-row" style="font-weight: bold; font-size: 15px; margin-top: 5px;">
              <span>TOTAL A PAGAR:</span>
              <span>S/ ${compra.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>¡Gracias por su compra en Four Ways!</p>
            <p>Representación impresa de comprobante electrónico</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.close();
          }
        </script>
      </body>
      </html>
    `;

    ventanaImpresion.document.write(contenidoHTML);
    ventanaImpresion.document.close();
  }
}
