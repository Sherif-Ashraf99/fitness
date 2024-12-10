import styles from './index.module.css';






function NotFoundSection({title}) { 
    return <>
 
 <div className={`${styles['notFound']} notFound`}><h3>{title}</h3></div>

</>
}

export default NotFoundSection