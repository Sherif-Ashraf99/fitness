import styles from './index.module.css'

function GameCard({ gameLogo, gameTitle }) {
    return (
        <div className={styles['game-card']}>
            <img src={gameLogo} alt="ahly Logo" />
            <h3>{gameTitle}</h3>
        </div>
    )
}

export default GameCard