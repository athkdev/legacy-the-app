'use client'

import { JSX } from 'react'

// interface InsightsProps {
// 	className?: string
// }

export default function Insights(): JSX.Element {
	// function handleSubmit(query: string) {
	// 	console.log(query)
	// }

	return (
		<div className="w-1/2 mx-auto p-2 text-white">
			{/* <h2 className="text-3xl font-bold">Search for similar insights</h2> */}

			<input
				type="text"
				placeholder="Search for similar insights"
				className="p-3 px-5 rounded-full outline-none min-w-full mt-5 text-black"
			/>
		</div>
	)
}
