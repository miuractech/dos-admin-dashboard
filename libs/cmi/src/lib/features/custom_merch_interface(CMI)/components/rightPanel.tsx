import React from 'react'
import RightInfo from './rightInfo'
import StyleBar from './styleBar'

type Props = {
  selectedId: string | null,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}

export default function RightPanel({ selectedId, setSelectedId }: Props) {

  return (
    <div
      className="flex vertical-center justify-center "
      style={{ minHeight: 450, margin: 'auto' }}
    >
      <div
        className="grey-bg full-width r5"
      >
        <StyleBar
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <RightInfo
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>
    </div>
  )
}