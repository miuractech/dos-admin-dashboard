import styles from './cmi.module.css';
// import Cmi from "../../../../../libs/cmi/src/lib/cmi"
import { CMI } from "@dropout-store/cmi"

/* eslint-disable-next-line */
export interface CMIProps { }

export function CustomMerchInterface(props: CMIProps) {
  return (
    <CMI />
  );
}

export default CustomMerchInterface;
