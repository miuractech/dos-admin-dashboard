import { ContentCopy, Delete, Redo, Undo } from '@mui/icons-material'
import { Button, Paper, Tooltip } from '@mui/material'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from '../../../../store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { copyObject, redo, removeObject, undo } from '../store/objects'
import RightInfo from './rightInfo';
import StyleBar from './styleBar';


type Props = {
  selectedId: string | null,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  previews: boolean,
  setPreviews: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RightPanel({ selectedId, setSelectedId, setLoading, previews, setPreviews }: Props) {
  const dispatch = useDispatch()
  const { currentObjects, history } = useSelector((state: RootState) => state.objects)

  return (
    <div
      className="flex vertical-center justify-center "
      style={{ minHeight: 450, margin: 'auto' }}
    >
      <div
      // className="grey-bg full-width r5"
      >
        <div className='flex justify-evenly'>
          {
            [{ icon: <Undo />, name: 'undo', onClick: () => dispatch(undo()) },
            { icon: <Redo />, name: 'redo', onClick: () => dispatch(redo()) },
            { icon: <ContentCopy />, name: 'copy', onClick: () => {
              if(selectedId){
                setLoading(true)
                dispatch(copyObject(selectedId))
                setTimeout(() => {
                  setLoading(false)
                }, 50);
              }
            } },
            {
              icon: <Delete />, name: 'delete', onClick: () => {
                if (selectedId) {
                  setLoading(true)
                  dispatch(removeObject(selectedId))
                  setTimeout(() => {
                    setLoading(false)
                  }, 100);
                }
              }
            },
            ].map(({ icon, name, onClick }) => (
              <Tooltip title={name} onClick={onClick} key={name} >
                <div className='margin1 pointer-cursor'>
                  {icon}
                </div>
              </Tooltip>
            ))
          }
        </div>
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
            previews={previews}
            setPreviews={setPreviews}
          />
        </div>
      </div>
    </div>
  )
}