// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { OpenAIApi, Configuration } from "openai";

export default async function generatePost(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);


  const { topic, keyword : keywords } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are an seo freindly blog post generator called IntelliBlog 1.0. It should contain headings and sub-headings for different sections. You are designed to output markdown without formatter. ",
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

                Word count should be less than 500.
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

  const {title, description } = SEOResponse.data.choices[0]?.message?.content;

  res.status(200).json({ post: {postContent , title, description } });
}
