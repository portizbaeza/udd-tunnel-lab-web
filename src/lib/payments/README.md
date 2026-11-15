# Pagos de packs de apoyo (Fase 2)

Hoy la sección **Apoya al equipo** (`src/components/Apoyo.astro`) muestra los packs de
`src/config/packs.ts` con `pagosActivos = false`: no se cobra nada y el botón lleva al contacto.

## ¿Se puede usar cualquier medio de pago con Vercel?

Sí. Vercel solo aloja el sitio y ejecuta funciones serverless (como `src/pages/api/contacto.ts`).
Una función puede llamar a la API de cualquier proveedor. Opciones habituales en Chile:

| Proveedor | Qué cobra | Notas |
|---|---|---|
| **Mercado Pago** (Checkout Pro) | Tarjetas, débito, saldo MP | SDK oficial `mercadopago`. Muy usado en Chile. |
| **Flow** | Webpay, tarjetas, transferencias | API REST simple; liquida a cuenta chilena. |
| **Transbank Webpay Plus** | Tarjetas chilenas | SDK `transbank-sdk`. Requiere contrato con Transbank. |
| **Khipu** | Transferencia bancaria | Bueno para montos altos sin comisión de tarjeta. |
| **PayPal** | Aportes desde el extranjero | Útil para sumar apoyo internacional. |

Antes de elegir, el equipo debe definir **quién recibe el dinero** (RUT o cuenta) y si los aportes
pasan por la UDD para acogerse a la ley de donaciones. Eso suele decidir el proveedor.

## Contrato para conectar un proveedor

1. Crear `src/lib/payments/<proveedor>.ts` que implemente:

   ```ts
   export interface Comprador { nombre: string; email: string; mensaje?: string }
   export interface ProveedorPago {
     /** Crea el cobro y devuelve la URL a la que se redirige a la persona. */
     createCheckout(pack: Pack, comprador: Comprador, urls: { exito: string; error: string }): Promise<string>;
     /** Valida la notificación del proveedor y devuelve el estado del pago. */
     verifyWebhook(request: Request): Promise<{ packId: string; email: string; estado: "pagado" | "rechazado" | "pendiente" }>;
   }
   ```

2. Agregar dos endpoints con `export const prerender = false`:
   - `src/pages/api/pagos/checkout.ts`: recibe `packId` + datos del comprador, llama a `createCheckout` y responde con la URL.
   - `src/pages/api/pagos/webhook.ts`: recibe la confirmación del proveedor, llama a `verifyWebhook` y registra el aporte
     (por ejemplo, un correo al equipo con Resend, o una fila en una base de datos tipo Supabase si hay que guardar nombres para el documental).
3. Crear las páginas `/apoyar/[pack]` (formulario corto) y `/apoyar/gracias`.
4. Definir montos reales en `src/config/packs.ts` y poner `pagosActivos = true`.
5. Guardar las credenciales del proveedor como variables de entorno en Vercel (nunca en el código).

Cambiar de proveedor después solo requiere escribir otro archivo que implemente `ProveedorPago`.
