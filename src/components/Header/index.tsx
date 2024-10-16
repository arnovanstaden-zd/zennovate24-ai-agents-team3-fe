import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          {/* Logo Icon */}
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              <img
                src='/apple.svg'
                alt='Apple Logo'
                className={styles.navIcon}
              />
            </a>
          </li>
          {/* Navigation Links */}
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              Store
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              Mac
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              iPad
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              iPhone
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              Watch
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              Vision
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              AirPods
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              TV & Home
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              Entertainment
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              Accessories
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='#' className={styles.navLink}>
              Support
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
