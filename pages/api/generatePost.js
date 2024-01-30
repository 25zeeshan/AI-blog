// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { OpenAIApi, Configuration } from "openai";
import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function generatePost(req, res) {
  const { user } = await getSession(req, res);

  const client = await clientPromise;
  const db = client.db("blog_standard");

  const dbUser = await db.collection("users").findOne({ auth0Id: user.sub });
  if (!dbUser?.availableTokens) {
    console.log("0 tokens available");
    res.status(403).json({ err: "Buy tokens before generate" });
    return;
  }

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const { topic, keyword: keywords } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are an seo freindly blog post generator called IntelliBlog 1.0. You are designed to output markdown without formatter. ",
      },
      {
        role: "user",
        content: `
                  Generate me a blog post on the following topic delimited by triple hyphen(-): 
                  ---
                  ${topic}
                  ---
                  Targeting the following comma seperated keywords delimited by triple hyphens - 
                  ---
                  ${keywords}
                  ---
  
                  It should contain headings and sub-headings, lists and paragraphs for different sections with good readability.
              `,
      },
    ],
  });

  const postContent = response.data.choices[0]?.message?.content;

  const SEOResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are an seo freindly blog post generator called IntelliBlog 1.0. You are designed to output JSON. Do not include HTML tags in your output",
      },
      {
        role: "user",
        content: `
              Generate an SEO friendly title and meta description in JSON for the following blog post.
              ${postContent}
              ---
              output json must be in following format:
              {
                  title: title,
                  description: meta_description
              }
          `,
      },
    ],
    response_format: { type: "json_object" },
  });

  const choices = SEOResponse.data.choices;
  const message = choices ? choices[0]?.message : undefined;
  const content = message ? message.content : undefined;

  const { title, description } = JSON.parse(content) || {};

  const imageRespose = await openai.createImage({
    model: "dall-e-3",
    prompt: `generate a heading image for a blog post with the tile : ${title} 
              and description : ${description}`,
    n: 1,
    size: "1792x1024",
  });
  const image_url = imageRespose.data?.data[0]?.url;

  await db
    .collection("users")
    .updateOne({ auth0Id: user.sub }, { $inc: { availableTokens: -1 } });

  const post = await db.collection("posts").insertOne({
    postContent,
    title,
    description,
    topic,
    keywords,
    image_url,
    userId: dbUser._id,
    createdDate: new Date(),
  });

  res.status(200).json({ postId: post.insertedId.toString() });
});
