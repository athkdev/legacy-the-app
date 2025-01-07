'use client'

import { TRecord } from '@/shared/types'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import Tag from './Tag'

interface TagsAreaProp {
	selectedTopics: string[]
	setSelectedTopics: any
}

const TagsArea: React.FC<TagsAreaProp> = ({
	setSelectedTopics,
	selectedTopics,
}) => {
	const [topics, setTopics] = useState<string[]>([])
	const [isFetching, setIsFetching] = useState<boolean>(false)

	async function fetchTopics() {
		setIsFetching(true)
		try {
			const response = await fetch('/api/insights/tags', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})

			const topics = await response.json()
			const sortedTopics = topics
				.sort((a: string, b: string) => b.length - a.length)
				.slice(0, 15)

			setTopics(sortedTopics)
			setIsFetching(false)
		} catch (err) {
			console.error('Error fetching topics:', err)
		}
	}

	useEffect(() => {
		fetchTopics()
	}, [])

	return (
		<div className="mt-10 rounded">
			Tags area (top 15 tags extracted for this data)
			<div className="flex flex-wrap gap-3 py-2">
				{isFetching ? (
					<>
						<p>Fetching tags, please wait</p>
						<Spinner />
					</>
				) : (
					<>
						{topics.map((t, i) => (
							<Tag
								key={i}
								topic={t}
								isSelected={selectedTopics.includes(t)}
								setSelectedTopics={setSelectedTopics}
							/>
						))}
					</>
				)}
			</div>
		</div>
	)
}

export default TagsArea
