import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import SSLCommerzPayment from "sslcommerz-lts";
import { urlencoded } from "express";
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.post("/payment/init", async (req, res) => {
  // const {amount} = req.body

  // database theke product ber kore anbo price

  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: "REF123", // use unique tran_id for each api call
    success_url: "http://localhost:3000/payment/success",
    fail_url: "http://localhost:3000/payment/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  // ssl strore setup
  const sslcz = new SSLCommerzPayment(
    process.env.SSL_STORE_ID,
    process.env.SSL_STORE_PASSWORD,
    false,
  );

  const apiResponse = await sslcz.init(data);
  // console.log(apiResponse);

  res.json({
    message: "Successful",
    url: apiResponse.GatewayPageURL,
    success: true,
  });
});

app.post("/payment/success", async (req, res) => {
  console.log("Payment successful hoiche...");
  console.log(req.body);

  // validate korte hoy really payment hoiche kina
  const sslcz = new SSLCommerzPayment(
    process.env.SSL_STORE_ID,
    process.env.SSL_STORE_PASSWORD,
    false,
  );

  // database a save korben

  res.redirect(
    "https://search.brave.com/images?q=success+page&context=W3sic3JjIjoiaHR0cHM6Ly9pbWFnZXMwMS5uaWNlcGFnZWNkbi5jb20vcGFnZS83OS8zNS9jc3MtdGVtcGxhdGUtNzkzNTguanBnIiwidGV4dCI6IlN1Y2Nlc3MgQ29hY2hpbmcgVGFibGUgQ1NTIFRlbXBsYXRlIiwicGFnZV91cmwiOiJodHRwczovL25pY2VwYWdlLmNvbS9rL3N1Y2Nlc3MtY3NzLXRlbXBsYXRlcyJ9XQ%3D%3D&sig=404133da51eb5300fb666663c28cbb4a084434e00e4f2d5ea32bd8dfc6aef132&nonce=7c0d1d87c8018b4e6f23a1ee5dfb88d9",
  );
});

app.post("/payment/fail", (req, res) => {
  console.log("Apnar payment ti failed amra database a safe korbo na");
  res.redirect("https://www.memberstack.com/webflow/failed-payment-page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
