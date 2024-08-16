import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DeleteAccount.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function DeleteAccountPage() {
  const [statusMessage, setStatusMessage] = useState('Your account is being deleted...');
  const query = useQuery();
  const token = query.get('token');

  useEffect(() => {
    if (token) {
      const deleteAccount = async () => {
        try {
          const response = await fetch('https://api-staging.fridgebuddy.io/deleteAccount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            setStatusMessage('Your account has been successfully deleted.');
          } else {
            setStatusMessage('There was an issue deleting your account. Please contact support.');
          }
        } catch (error) {
          setStatusMessage('There was an error processing your request. Please contact support.');
        }
      };

      deleteAccount();
    } else {
      setStatusMessage('Invalid or missing token. Unable to delete account.');
    }
  }, [token]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <h1>Fridge Buddy</h1>
      </div>
      <div className={styles.body}>
        <p>{statusMessage}</p>
      </div>
    </div>
  );
}

export default DeleteAccountPage;