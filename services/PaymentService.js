// El service sirve para conectarnos a la api de MP mediante axios  	
const axios = require("axios");

class PaymentService {
  // Guardamos el token de mp
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }
  // Creamos una funcion para poder consumir los datos de nuestro producto
  async createPaymentMercadoPago(name, price, unit, img) {
    // Acortamos toda la url para poder usarla de manera dinamica
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
    
    // Creamos la estructura basica del preference adaptado a lo que piden los requerimientos
    const preferences = {
      items: [
        {
          id: "1234",
          title: name,
          description: "Dispositivo movil de Tienda e-commerce",
          picture_url: "https://images.unsplash.com/photo-1570534536531-c3def02ad855?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          category_id: "1234",
          quantity: parseInt(unit),
          currency_id: "ARS",
          unit_price: parseFloat(price)
        }
      ],
      external_reference: "estradayoel@gmail.com",
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_63274575@testuser.com",
        phone: {
          area_code: "11",
          number: "22223333"
        },
        address: {
          zip_code: "1111",
          street_name: "False",
          street_number: "123"
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        default_installments: 1
      },
      back_urls: {
        success: "https://catrielzz-mp-commerce-nodejs.herokuapp.com/success",
        pending: "https://catrielzz-mp-commerce-nodejs.herokuapp.com/pending",
        failure: "https://catrielzz-mp-commerce-nodejs.herokuapp.com/error"
      },
      notification_url: "https://catrielzz-mp-commerce-nodejs.herokuapp.com/webhook",
      auto_return: "approved"
    };

    // Hacemos el post via axios a la api de MP
    try {
      const request = await axios.post(url, preferences, {
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;
