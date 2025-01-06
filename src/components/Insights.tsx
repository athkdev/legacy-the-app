'use client'

import { JSX, useState } from 'react'

interface InsightsProps {
	className?: string
}

export default function Insights({ className }: InsightsProps): JSX.Element {
	function handleSubmit(query: string) {
		console.log(query)
	}

	return <div className="w-1/2 mx-auto p-2 text-white">Insights</div>
}
