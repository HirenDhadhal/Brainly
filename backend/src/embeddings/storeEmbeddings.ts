import { ContentModel } from '../db';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { HfInference } from '@huggingface/inference';

const OPENAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const hf = new HfInference(process.env.huggingface_api_key);
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pc.Index('content-embeddings');

// Generate embeddings and store in Pinecone
async function storeEmbeddingInPinecone(
  contentId: any,
  embedding: any,
  metadata: any
) {
  await index.upsert([
    {
      id: contentId,
      values: embedding,
      metadata: metadata,
    },
  ]);
}

// Function to search Pinecone and retrieve the best matching content
export async function searchPinecone(query: string) {
  const queryEmbedding = await hf.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: query,
  });

  // Ensure the embedding is a flat array (number[])
  const vector = Array.isArray(queryEmbedding[0])
    ? (queryEmbedding as number[][]).flat()
    : (queryEmbedding as number[]);

  const result = await index.query({
    vector: vector,
    topK: 3, // Get top 3 results
    includeMetadata: true,
  });

  return result.matches.map((match) => match.metadata);
}

export async function processAndStoreContent() {
  const contents = await ContentModel.find({});

  for (const content of contents) {
    const textForEmbedding = `${content.title} ${content.link}`;

    try {
      const embedding = await hf.featureExtraction({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        inputs: textForEmbedding,
      });
      // const embedding = await OPENAI.embeddings.create({
      //   model: 'text-embedding-3-small',
      //   input: textForEmbedding,
      //   encoding_format: 'float',
      // });

      console.log('generated embedding ' + embedding);

      if (!embedding) {
        console.log(
          `Skipping embedding storage for: ${content.link} (Embedding generation failed)`
        );
        continue;
      }

      await storeEmbeddingInPinecone(content._id.toString(), embedding, {
        title: content.title,
        link: content.link,
        type: content.type,
        userId: content.userId.toString(),
      });

      console.log('stored current embedding');
      console.log('All content processed and stored in Pinecone.');
    } catch (error) {
      console.log('generate embedding TryCatch failed' + error);
    }
  }
}

// AI Response Generator
export async function getAIResponse(context: string, userQuery: string) {
  const completion = await OPENAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI assistant providing relevant information based on user queries.',
      },
      {
        role: 'user',
        content: `Context: ${context} \nUser Question: ${userQuery}`,
      },
    ],
  });

  return completion.choices[0].message.content;
}
