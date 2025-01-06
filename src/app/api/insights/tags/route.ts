const { Pool } = require('pg')

export async function GET() {
	const pool = new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: {
			rejectUnauthorized: false,
		},
	})

	const client = await pool.connect()
	try {
		const result = await client.query('SELECT name FROM topics')

		const tags = result.rows.map((row: any) => {
			const name = row.name
			const firstQuote = name.indexOf("'")
			const secondQuote = name.indexOf("'", firstQuote + 1)

			return firstQuote !== -1 && secondQuote !== -1
				? name.slice(firstQuote + 1, secondQuote)
				: name
		})

		return new Response(JSON.stringify(tags), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		console.error('Error fetching tags:', err)

		return new Response(JSON.stringify({ error: 'Failed to fetch tags' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	} finally {
		client.release()
	}
}
