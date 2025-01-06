const { Pool } = require('pg')
import { type NextRequest } from 'next/server'

const pool = new Pool({
	connectionString: process.env.DB_CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false,
	},
})

export async function GET(request: NextRequest) {
	const client = await pool.connect()

	const searchParams = request.nextUrl.searchParams
	const query = searchParams.get('query')

	try {
		if (!query || query.trim() === '') {
			return new Response(
				JSON.stringify({ error: 'Query cannot be empty' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			)
		}

		const result = await client.query(
			`
      SELECT context, response
      FROM records
      WHERE context ILIKE $1 OR response ILIKE $1
      `,
			[`%${query}%`]
		)

		return new Response(JSON.stringify(result.rows), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		console.error('Error executing search:', err)
		return new Response(JSON.stringify({ error: 'Search failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	} finally {
		client.release()
	}
}
