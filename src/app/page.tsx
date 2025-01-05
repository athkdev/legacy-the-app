'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
	const [searchQuery, setSearchQuery] = useState<string>('')

	function handleSubmit(query: string) {
		console.log(query)
	}

	return (
		<section className="min-h-screen flex justify-between text-black">
			<div className="w-1/2 mx-auto p-2">
				{/* chat window */}
				<div className="h-5/6">Result window</div>

				<div className="bg-stone-400 flex gap-5 mt-4">
					<textarea
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="min-w-full rounded h-20 outline-none p-2 text-code"
					/>
					<button
						onClick={() => handleSubmit(searchQuery)}
						className={`bg-stone-500 rounded-full p-2 ${
							searchQuery.length === 0
								? 'bg-stone-500'
								: 'bg-green-700'
						}`}
						disabled={searchQuery.length === 0}
					>
						{'->'}
					</button>
				</div>
			</div>
		</section>
	)
}
