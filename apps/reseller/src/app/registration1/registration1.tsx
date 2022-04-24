import styles from './registration1.module.css';
import InputField from "../../UI/input-field/input-field"

/* eslint-disable-next-line */
export interface Registration1Props { }

export function Registration1(props: Registration1Props) {

  const params = new URLSearchParams(window.location.search)
  const storeName = params.get("storeName")
  console.log(storeName);

  return (
    <div className={styles['container']}>
      <InputField type="text" />
      <InputField type="text" value={storeName ? storeName : "" } />
    </div>
  );
}

export default Registration1;
