import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const onLoginButtonClick = useCallback(() => {
    navigate('/main'); // Navigate to the /main route
  }, [navigate]);

  const onRegisterButtonClick = useCallback(() => {
    // Add your code here for the register button
  }, []);

  return (
    <div className={styles.landingPage}>
      <div className={styles.crimewatch}>crimewatch</div>
      <div className={styles.yourComprehensiveSolutionContainer}>
        <p className={styles.yourComprehensiveSolution}>{`your comprehensive solution `}</p>
        <p className={styles.yourComprehensiveSolution}>for detecting online disinformation</p>
      </div>
      <div className={styles.registerButton} onClick={onRegisterButtonClick}>
        <div className={styles.registerButtonChild} />
        <div className={styles.register}>register</div>
      </div>
      <div 
        className={styles.loginButton} 
        onClick={onLoginButtonClick} 
        aria-label="Login"
      >
        <div className={styles.loginButtonChild} />
        <div className={styles.login}>login</div>
      </div>
    </div>
  );
};

export default LandingPage;
