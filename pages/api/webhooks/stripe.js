import verifyStripe from "@webdeveducation/next-verify-stripe";
import Cors from "micro-cors";
import stripeInit from "stripe";
import clientPromise from "../../../lib/mongodb";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
  if (req.method === "POST") {
    let event;

    try {
      event = await verifyStripe({
        req,
        stripe,
        endpointSecret,
      });
    } catch (error) {
      console.log(error);
    }

    switch (event.type) {
      case "payment_intent.succeeded": {
        
        const client = await clientPromise;
        const db = client.db("blog_standard");

        const payment_intent = event.data.object;
        const auth0Id = payment_intent.metadata.sub;

        console.log('updating user with sub'+auth0Id);

        const userProfle = await db.collection("users").updateOne(
          {
            auth0Id: auth0Id,
          },
          {
            $inc: {
              availableTokens: 10,
            },
            $setOnInsert: {
              auth0Id: auth0Id,
            },
          },
          { upsert: true }
        );
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({received: true})
  }
};

export default cors(handler)
