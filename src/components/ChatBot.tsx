'use client'

import { JSX, useState } from 'react'
import Spinner from './Spinner'

interface ChatBotProps {
	className?: string
}

enum Message {
	QUERY,
	RESPONSE,
}

interface LogNode {
	logType: Message
	content: string
}

export default function ChatBot({ className }: ChatBotProps): JSX.Element {
	const [loading, setLoading] = useState<boolean>(false)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [log, setLog] = useState<LogNode[]>([])

	async function handleSubmit(query: string) {
		setLoading(true)
		// hydrate()
		const response = await fetch(`/api/inference?query=${query}`)

		const result = await response.json()

		const sent: LogNode = {
			logType: Message.QUERY,
			content: query,
		}
		const received: LogNode = {
			logType: Message.RESPONSE,
			content: result?.responseString,
		}

		setLog((prev) => [...prev, sent, received])

		setSearchQuery(() => '')

		setLoading(false)
	}

	function hydrate() {
		const logs: LogNode[] = [
			{ logType: Message.QUERY, content: "What's up? 1 (SENT)" },
			{
				logType: Message.RESPONSE,
				content: 'Nothing much yo 1 (RECEIVED)',
			},
			{ logType: Message.QUERY, content: "What's up? 2 (SENT)" },
			{
				logType: Message.RESPONSE,
				content: 'Nothing much yo 2 (RECEIVED)',
			},
			{ logType: Message.QUERY, content: "What's up? 3 (SENT)" },
			{
				logType: Message.RESPONSE,
				content: 'Nothing much yo 3 (RECEIVED)',
			},
		]

		setLog(logs)
	}

	return (
		<div className="w-1/2 mx-auto p-2">
			<div className="h-4/5 text-white rounded border border-stone-700 p-4 overflow-auto">
				{log?.map((l: LogNode, i: number) => {
					const isQuery = l.logType === Message.QUERY

					return (
						<>
							<div
								key={i}
								className={`my-4 ${
									isQuery
										? 'text-right text-black'
										: 'text-left'
								}`}
							>
								<span
									className={`${
										isQuery ? 'bg-neutral-300' : ''
									} p-2 rounded`}
								>
									{l.content}
								</span>
							</div>
							{!isQuery ? (
								<hr className="border-stone-800" />
							) : null}
						</>
					)
				})}
			</div>

			<div className="flex gap-5 mt-4">
				<textarea
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Message LegacyTheApp"
					className="w-full rounded-full h-20 outline-none p-4"
				/>
				<button
					onClick={() => handleSubmit(searchQuery)}
					className={`rounded-full p-2 font-bold ${
						searchQuery?.length <= 0
							? 'bg-stone-200'
							: 'bg-green-700 text-white'
					}`}
					disabled={searchQuery?.length === 0}
				>
					{loading ? <Spinner /> : '->'}
				</button>
			</div>
		</div>
	)
}
