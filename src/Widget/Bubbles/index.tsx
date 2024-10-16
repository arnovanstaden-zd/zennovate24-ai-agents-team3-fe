import classNames from 'classnames';
import styles from './Bubbles.module.scss';

const Bubbles: React.FC = () => {
  return (
    <div className={styles.Bubbles}>
      <div className={classNames(styles.bubble, styles.bubble)}></div>
      <div className={classNames(styles.bubble, styles.bubble2)}></div>
      <div className={classNames(styles.bubble, styles.bubble3)}></div>
    </div>
  );
};

export default Bubbles;
