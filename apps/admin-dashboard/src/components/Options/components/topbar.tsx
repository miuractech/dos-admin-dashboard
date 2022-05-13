import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import styles from '../../main/meta/styles/meta.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'apps/admin-dashboard/src/store';
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
    // const [selected, setSelected] = useState<string>(Object.keys(topbarObject)[0])
    const selected = useSelector((state: RootState) => state.topbar.path)
    const navigate = useNavigate()

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
                    onClick={() => {
                        navigate(`/cmi/${item}`)
                    }}
                >
                    <h3>{topbarObject[item].value}</h3>
                </div>
            ))}
        </div>
    );
};


