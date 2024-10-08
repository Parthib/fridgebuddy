import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DeleteAccount.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function DeleteAccountPage() {
  const [statusMessage, setStatusMessage] = useState('Your account is being deleted...');
  const [isProcessing, setIsProcessing] = useState(true);
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

          const data = await response.json();

          if (response.ok) {
            setStatusMessage(`The account associated with the email ${data.email} was successfully deleted!`);
          } else if (response.status === 404) {
            setStatusMessage(`The user associated with the email ${data.email} was not found (it was probably deleted already!). For any questions, reach out to fridgebuddyapp@gmail.com.`);
          } else {
            setStatusMessage('There was an issue deleting your account. Please contact support - fridgebuddyapp@gmail.com.');
          }
        } catch (error) {
          setStatusMessage('There was an error processing your request. Please contact support - fridgebuddyapp@gmail.com.');
        } finally {
          setIsProcessing(false);
        }
      };

      deleteAccount();
    } else {
      setStatusMessage('Invalid or missing token. Unable to delete account.');
      setIsProcessing(false);
    }
  }, [token]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <h1>Fridge Buddy</h1>
      </div>
      <div className={styles.body}>
        {isProcessing && <div className={styles.spinner}></div>}
        <p>{statusMessage}</p>
      </div>
    </div>
  );
}

export default DeleteAccountPage;
