import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import styles from './miurac-image.module.css';


export interface MiuracImageProps {
  app:FirebaseApp,
  authComponent:React.ReactElement

}

export function MiuracImage({app,authComponent}: MiuracImageProps) {
  const user = getAuth(app).currentUser
  if(user){
    return <>image modal</>
  }else{
    return <div>
      <h2>
        image upload modal
      </h2>
      {authComponent}
    </div>
  }
  

}

export default MiuracImage;



