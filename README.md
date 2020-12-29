Para este ejercicio decidí afrontarlo con distintas fuentes, después de investigar decidí usar la api de mercado pago ya que tomé como referencia el ejercicio de preventa para ahondar más en el producto.

Flujo:

1- Cliente interactua con checkout y realiza el submit

2- Se genera la preferencia con los datos que se proporciona + los montos a cobrar

3- Capturo payment_id random para usarlo despues en las referencias

4- Cliente termina el pago en MP

5- El cliente puede elegir 2 opciones, pago con tarjeta/pago efectivo

5.1- Pago con tarjeta: me llega por get con back_url success

5.2- Pago con efectivo: me llega por get con back_url 

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

**Caso Preventa**

Intentaría ir por el lado de que checkout api permite mas flexibilidad a la hora de generar la ventana de pago, da mejor aprobación, cobertura de contracargos y medios de pago(todos o solo los que elija el cliente). Ya que el checkout pro es una solucion generalizada para la mayoría de los comercios, Checkout API es una solucion mucho mas robusta para empresas grandes con necesidades especificas.
