import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddingFunction } from 'chromadb';

const embedder = new OpenAIEmbeddingFunction({
	openai_api_key: process.env.OPENAI_API_KEY || '',
});

const client = new ChromaClient();

const collection = await client.getCollection({
	name: 'my_collection',
	embeddingFunction: embedder,
});

// await collection.add({
// 	ids: ['id1', 'id2'],
// 	embeddings: undefined,
// 	metadatas: [{ source: 'my_source' }, { source: 'my_source' }],
// 	documents: ['This is a document', 'This is another document'],
// });

const results = await collection.query({
	query_embeddings: undefined,
	n_results: 2,
	where: undefined,
	query_text: ['This is a query document'],
});

// print json results
console.log(`results:`);
console.log(JSON.stringify(results, null, 2));
