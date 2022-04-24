import styles from './registration1.module.css';

/* eslint-disable-next-line */
export interface Registration1Props { }

export function Registration1(props: Registration1Props) {

  const params = new URLSearchParams(window.location.search)
  const storeName = params.get("storeName")
  console.log(storeName);

  return (
    <div className={styles['container']}>
      <input type="text" />
      <input type="text" value={storeName ? storeName : ""} />
    </div>
  );
}

export default Registration1;
