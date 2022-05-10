import React from 'react'
import { Route, Routes } from 'react-router-dom';
import styles from '../../main/meta/styles/meta.module.scss';
import { Topbar } from '../components/topbar';
import { CMITopbarObject } from './topbatItems';

export const CMI = () => {
    return (
        <div className={styles['root']}>
            <Topbar topbarObject={CMITopbarObject} />
            {/* <Bottombar /> */}
            {/* <Routes> */}
            {/* <Route index element={ }/>
            </Routes> */}
        </div>
    )
}