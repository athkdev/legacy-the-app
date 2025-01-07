'use client'

import { JSX, useEffect, useState } from 'react'
import { TRecord } from '@/shared/types'
import RecordsTable from './RecordsTable'
import TagsArea from './TagsArea'

export default function Insights(): JSX.Element {
	const [query, setQuery] = useState<string>('')
	const [records, setRecords] = useState<TRecord[]>([])
	const [filteredRecords, setFilteredRecords] = useState<TRecord[]>([])
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const [selectedTopics, setSelectedTopics] = useState<string[]>([])

	async function fetchRecords() {
		setIsFetching(true)
		const response = await fetch('/api/insights/records', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ topics: selectedTopics }),
		})
		const data = await response.json()

		const _tmp = data.map((record: any, index: number) => ({
			id: index + 1,
			...record,
		}))

		setRecords(_tmp)
		setFilteredRecords(_tmp)

		setIsFetching(false)
	}

	useEffect(() => {
		fetchRecords()
	}, [selectedTopics])

	function handleFilter(q: string) {
		setQuery(q)
	}

	useEffect(() => {
		const lazyTimeout = setTimeout(() => {
			setFilteredRecords(() =>
				records.filter(
					(record) =>
						record.context
							.toLowerCase()
							.includes(query.toLowerCase()) ||
						record.response
							.toLowerCase()
							.includes(query.toLowerCase())
				)
			)
		}, 300)

		return () => clearTimeout(lazyTimeout) // Clear timeout on query change
	}, [query, records])

	return (
		<div className="w-1/2 mx-auto p-2 text-white">
			<input
				type="text"
				placeholder="Search for similar insights"
				className="p-3 px-5 rounded-full outline-none min-w-full mt-5 text-black"
				onChange={(e) => handleFilter(e.target.value)}
			/>

			<TagsArea
				setSelectedTopics={setSelectedTopics}
				selectedTopics={selectedTopics}
			/>

			<RecordsTable records={filteredRecords} loading={isFetching} />
		</div>
	)
}
