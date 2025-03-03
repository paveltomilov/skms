import styles from "./page.module.scss"

export default function Home () {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Тренажёр</h1>
            <div className={styles.wrapper}></div>
        </main>
    )
}