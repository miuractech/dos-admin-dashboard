import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import styles from '../../main/meta/styles/meta.module.scss';
import { Topbar } from '../components/topbar';
import { CMITopbarObject } from './topBarContents';

export const CMI = () => {
    
    return (
        <div className={styles['root']}>
            <Topbar topbarObject={CMITopbarObject} />
            <Outlet />
        </div>
    )
}