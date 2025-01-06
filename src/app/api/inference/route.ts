import { type NextRequest } from 'next/server'
import OpenAI from 'openai'

export async function GET(request: NextRequest) {
	const openai = new OpenAI({
		apiKey: process.env['OPENAI_SECRET_KEY'],
		organization: process.env['OPENAI_ORG_ID'],
		project: process.env['OPENAI_PROJECT_ID'],
	})

	const searchParams = request.nextUrl.searchParams
	const query = searchParams.get('query')

	const response = await openai.chat.completions.create({
		model: 'gpt-4o',
		messages: [
			{
				role: 'developer',
				content: [
					{
						type: 'text',
						text: `
              You are an experienced and empathetic mental health counselor, providing expert guidance to other counselors as they support their patients.
            `,
					},
				],
			},
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: query ?? '',
					},
				],
			},
		],
	})

	const responseString = response?.choices[0]?.message

	return Response.json({ responseString: responseString?.content })
}
