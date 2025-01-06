'use client'

import { JSX, useEffect, useState } from 'react'
import { TRecord } from '@/shared/types'
import RecordsTable from './RecordsTable'

// interface InsightsProps {
// 	className?: string
// }

export default function Insights(): JSX.Element {
	// function handleSubmit(query: string) {
	// 	console.log(query)
	// }

	const [records, setRecords] = useState<TRecord[]>([])
	const [isFetching, setIsFetching] = useState<boolean>(false)

	async function fetchRecords() {
		setIsFetching(true)
		const response = await fetch('/api/insights/records', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ topics: [] }), // Example topics
		})
		const data = await response.json()

		console.log(data)
		setRecords(
			data.map((record: any, index: number) => ({
				id: index + 1,
				...record,
			}))
		)

		setIsFetching(false)
	}

	useEffect(() => {
		fetchRecords()
	}, [])

	return (
		<div className="w-1/2 mx-auto p-2 text-white">
			{/* <h2 className="text-3xl font-bold">Search for similar insights</h2> */}

			<input
				type="text"
				placeholder="Search for similar insights"
				className="p-3 px-5 rounded-full outline-none min-w-full mt-5 text-black"
			/>

			<RecordsTable records={records} loading={isFetching} />
		</div>
	)
}
