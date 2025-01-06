'use client'

import ChatBot from '@/components/ChatBot'
import Insights from '@/components/Insights'
import { JSX, useState } from 'react'

enum Page {
	CHATBOT,
	INSIGHTS,
}

export default function Home(): JSX.Element {
	const [currentPage, setCurrentPage] = useState<Page>(Page.CHATBOT)

	function onPageChange(p: Page) {
		setCurrentPage(() => p)
	}

	return (
		<>
			<div className="flex">
				<div className="rounded-full border border-stone-800 flex gap-2 mx-auto p-2 mt-2">
					<button
						className={`rounded-full px-3 ${
							currentPage === Page.CHATBOT
								? 'bg-neutral-600'
								: 'bg-black hover:bg-neutral-400 '
						}`}
						onClick={() => onPageChange(Page.CHATBOT)}
					>
						Chat bot
					</button>
					<button
						className={`rounded-full px-3 hover:bg-neutral-400 ${
							currentPage === Page.INSIGHTS
								? 'bg-neutral-600'
								: 'bg-black hover:bg-neutral-400'
						}`}
						onClick={() => onPageChange(Page.INSIGHTS)}
					>
						Insights
					</button>
				</div>
			</div>

			<section className={`h-screen flex justify-between text-black`}>
				{currentPage === Page.CHATBOT ? (
					<ChatBot className="" />
				) : (
					<Insights className="" />
				)}
			</section>
		</>
	)
}
