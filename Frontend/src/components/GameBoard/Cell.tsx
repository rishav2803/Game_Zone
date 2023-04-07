import styles from "./Board.module.css"
  const Cell=({value,onClick,disabled}:{
    value:string|null,
    onClick:()=>void,
    disabled:boolean
  })=>{
    return <button className={`${styles.grid_item} ${value==="X"?styles.green:styles.grid_item}`} disabled={disabled} onClick={onClick}>{value}</button>
  }

  export default Cell;
