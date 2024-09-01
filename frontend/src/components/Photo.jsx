import styles from './Photo.module.css';
import Navbar from './Navbar';

const Photo = () => {
  	return (
    		<div className={styles.photo}>
                <Navbar />
                <div className={styles.crimewatch}>crimewatch</div>
      			<div className={styles.photoChecker}>photo checker</div>
      			<div className={styles.checkIfThe}>check if the image you have is real</div>
      			<div className={styles.photoChild} />
      			<div className={styles.rectangleParent}>
        				<div className={styles.groupChild} />
        				<div className={styles.upload}>upload</div>
      			</div>
      			<div className={styles.skibidiToiletjpg}>skibidi_toilet.jpg</div>
    		</div>);
};

export default Photo;
