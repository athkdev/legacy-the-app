'use client'

import { JSX, useState } from 'react'

interface ChatBotProps {
	className?: string
}

export default function ChatBot({ className }: ChatBotProps): JSX.Element {
	const [searchQuery, setSearchQuery] = useState<string>('')

	function handleSubmit(query: string) {
		console.log(query)
	}

	return (
		<div className="w-1/2 mx-auto p-2">
			<div className="h-5/6 text-white rounded border border-stone-700 p-4">
				Result window
			</div>

			<div className="flex gap-5 mt-4">
				<textarea
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
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
					{'->'}
				</button>
			</div>
		</div>
	)
}
