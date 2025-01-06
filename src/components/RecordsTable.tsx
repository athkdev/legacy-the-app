'use client'

import { TRecord } from '@/shared/types'
import React from 'react'
import Spinner from './Spinner'

interface RecordsTableProps {
	records: TRecord[]
	loading: boolean
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records, loading }) => {
	return (
		<div className="overflow-auto h-3/4 mt-10 rounded overflow-x-hidden">
			{loading ? (
				<div className="flex gap-5">
					<p>Fetching records, please wait</p>
					<Spinner />
				</div>
			) : (
				<table className="min-w-full text-white border border-gray-700">
					<thead>
						<tr>
							<th className="py-2 px-4 border-b border-gray-700 text-left">
								ID
							</th>
							<th className="py-2 px-4 border-b border-gray-700 text-left">
								Context
							</th>
							<th className="py-2 px-4 border-b border-gray-700 text-left">
								Response
							</th>
						</tr>
					</thead>
					<tbody>
						{records.map((record) => (
							<tr key={record.id} className="hover:bg-gray-700">
								<td className="py-2 px-4 border-b border-gray-700">
									{record.id}
								</td>
								<td className="py-2 px-4 border-b border-gray-700 max-w-96">
									{record.context}
								</td>
								<td className="py-2 px-4 border-b border-gray-700 max-w-96">
									{record.response}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default RecordsTable
