Para este ejercicio decidí afrontarlo con distintas fuentes, separé la logica 





**Requerimiento:**
**Medios de Pago**
El cliente quiere que los pagos con tarjeta de crédito se puedan pagar permitiendo como
**máximo 6 cuotas** (mensualidades). A su vez, **no quiere permitir pagos con tarjetas
American Express (amex) ni tampoco con medios de pago del tipo cajero automático (atm)**.

Para esto aplicamos ciertos filtros

```
payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        default_installments: 1
      }
```
