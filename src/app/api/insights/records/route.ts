import { type NextRequest } from 'next/server'
const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DB_CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false,
	},
})

export async function POST(request: NextRequest) {
	const client = await pool.connect()

	try {
		const body = await request.json()
		const { topics } = body

		let query
		let values = []

		if (!topics || topics.length === 0) {
			query = `
        SELECT DISTINCT r.context, r.response
        FROM records r
      `
		} else {
			const likeClauses = topics
				.map(
					(_: any, i: number) =>
						`REGEXP_REPLACE(t.name, '\\[|\\]|''', '', '') LIKE $${
							i + 1
						}`
				)
				.join(' OR ')

			query = `
        SELECT DISTINCT r.context, r.response
        FROM records r
        JOIN record_topics rt ON r.id = rt.record_id
        JOIN topics t ON rt.topic_id = t.id
        WHERE ${likeClauses}
      `

			values = topics.map((topic: string) => `%${topic}%`)
		}

		const result = await client.query(query, values)

		return new Response(JSON.stringify(result.rows), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		console.error('Error fetching records by topics:', err)
		return new Response(
			JSON.stringify({ error: 'Failed to fetch records' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	} finally {
		client.release()
	}
}
