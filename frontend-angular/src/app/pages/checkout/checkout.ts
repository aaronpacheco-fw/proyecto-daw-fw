import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private fb = inject(FormBuilder);
  private carritoService = inject(CarritoService);
  private router = inject(Router);

  checkoutForm: FormGroup;
  items: any[] = [];

  constructor() {
    this.checkoutForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoDocumento: ['DNI', Validators.required],
      documento: ['', [Validators.required, Validators.minLength(8)]],
      razonSocial: [''], // <--- Agrégalo aquí abajito del documento
      direccion: ['', Validators.required],
      referencia: [''],
      region: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[9]\\d{8}$')]],
      metodoPago: ['Yape / Plin', Validators.required],
    });
  }

  ngOnInit(): void {
    const productos = this.carritoService.obtenerProductosLocal();
    this.items = productos.map((p: any, index: number) => ({
      id: index,
      ...p,
      cantidad: p.cantidad || 1,
    }));

    if (this.items.length === 0) {
      alert('Tu carrito está vacío.');
      this.router.navigate(['/carrito']);
    }
  }

  calcularSubtotal(): number {
    return this.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  calcularEnvio(): number {
    return this.items.length > 0 ? 15.0 : 0;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularEnvio();
  }

  finalizarCompra(): void {
    if (this.checkoutForm.invalid) {
      alert('Por favor completa todos los campos obligatorios del formulario.');
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const formValues = this.checkoutForm.value;
    const comprasAnteriores = JSON.parse(localStorage.getItem('mis_compras') || '[]');

    const nuevaCompra = {
      id: Date.now(),
      numeroFactura:
        formValues.tipoDocumento === 'RUC'
          ? 'FAC-' + Math.floor(100000 + Math.random() * 900000)
          : 'BOL-' + Math.floor(100000 + Math.random() * 900000),
      fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      metodoPago: formValues.metodoPago,
      productos: this.items,
      total: this.calcularTotal(),
      datosEnvio: formValues,
    };

    comprasAnteriores.push(nuevaCompra);
    localStorage.setItem('mis_compras', JSON.stringify(comprasAnteriores));

    localStorage.removeItem('carrito');

    alert(`¡Compra realizada con éxito! 🎉 Comprobante: ${nuevaCompra.numeroFactura}`);
    this.router.navigate(['/mis-compras']);
  }
}
