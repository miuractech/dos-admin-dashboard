import clsx from 'clsx';
import React, { useState } from 'react';
import styles from '../../main/meta/styles/meta.module.scss';

export type topbarProps = {
    [key: string]: {
        value: string;
        mainComponent: React.FC;
    }
}
type topBarPropTypes = {
    topbarObject: topbarProps
}

export const Topbar = ({ topbarObject }: topBarPropTypes) => {
    const [selected, setSelected] = useState<string>(Object.keys(topbarObject)[0])

    return (
        <div className={styles['topbar']}>
            {Object.keys(topbarObject).map((item) => (
                <div
                    key={item}
                    className={
                        selected === item
                            ? clsx(styles['header-text-container'], styles['text-after'])
                            : styles['header-text-container']
                    }
                    onClick={() => setSelected(item)}
                >
                    <h3>{topbarObject[item].value}</h3>
                </div>
            ))}
        </div>
    );
};


