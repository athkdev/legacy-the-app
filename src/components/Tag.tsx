import { ReactNode } from 'react'

interface TagProps {
	children?: ReactNode
	className?: string
	topic: any
	isSelected: boolean
	setSelectedTopics: any
}

export default function Tag({
	children,
	topic,
	className,
	isSelected,
	setSelectedTopics,
}: TagProps) {
	function handleClick() {
		setSelectedTopics((prevSelected: any) => {
			if (prevSelected.includes(topic)) {
				return prevSelected.filter((t: any) => t !== topic)
			} else {
				return [...prevSelected, topic]
			}
		})
	}

	return (
		<div
			className={`rounded-full text-xs p-2 border border-stone-800 hover:cursor-pointer ${
				isSelected ? 'bg-neutral-700' : ''
			}`}
			onClick={() => handleClick()}
		>
			{topic}
		</div>
	)
}
