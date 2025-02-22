import { useCharsList } from 'entities/chars-list'
import styles from './styles.module.scss'

export function App() {
  const { data } = useCharsList()

  return (
    <div className={styles.test}>
      I work
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
