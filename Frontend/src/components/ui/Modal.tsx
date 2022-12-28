import styles from "./Modal.module.css"

type ModalMessage={
  winner?:string;
}



const Modal=({winner}:ModalMessage)=>{
  if(winner){
      return(
        <div className={styles.overlay}>
          <div className={styles.text}>
            <p>Congratulations,{winner}</p>
          </div>
        </div>
      )
  }else{
      return(
        <div className={styles.overlay}>
          <div className={styles.text}>
            <p>Waiting for user</p>
          </div>
        </div>
      )
  }
}

export default Modal;
