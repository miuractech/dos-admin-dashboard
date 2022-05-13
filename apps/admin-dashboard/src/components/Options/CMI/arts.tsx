import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { update } from '../components/top-bar.slice'

export const Art = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(update({ base: 'cmi', path: 'art' }))
    }, [])

    return (
        <div>arts</div>
    )
}
