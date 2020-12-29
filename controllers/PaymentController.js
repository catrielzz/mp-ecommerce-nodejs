// Esta clase controller se encarga de ordenar la info que viene desde la api de mercadopago
class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  // Esta función obtiene los datos del producto que queremos vender, llamando a createPaymentMercadoPago
  // Es una función asincrónica porque debe consultar al service
  async getMercadoPagoLink(req, res) {
    const { name, price, unit, img } = req.query;

    try {
      const checkout = await this.paymentService.createPaymentMercadoPago(
        name,
        price,
        unit,
        img
      );
      console.log(checkout, "checkout response");
      return res.redirect(checkout.init_point);
    } catch (err) {
      res.redirect("/");
      return res.status(500).json({
        error: true,
        msg: "Hubo un error con Mercado Pago"
      });
    }
  }

  // Webhook debe devolver 201 o 200 para que mercadopago nos pueda enviar las notificaciones de los pagos
  // Creamos la variable body como elemento para modificarse mientras se recibe la info, como vuelve en chunks tenemos que pasarla a string para que sea legible
  async webhook(req, res) {
    if (req.method === "POST") {
      let body = "";
      req.on("data", chunk => {
        body += chunk.toString();
      });
      req.on("end", () => {
        console.log(body, "webhook response");
        res.end("ok");
      });
    }
    return res.status(201).end;
  }
}

module.exports = PaymentController;
