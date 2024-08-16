import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './RequestAccountDeletion.module.css';

function AccountDeletionForm() {
  const [email, setEmail] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setFormStatus('Please complete the reCAPTCHA.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('');

    const requestData = {
      recipientEmail: email,
      recaptchaResponse: recaptchaToken,
    };

    let dots = '';
    const intervalId = setInterval(() => {
      dots = dots.length < 3 ? dots + '.' : '';
      setFormStatus(`Working${dots}`);
    }, 1000);

    try {
      const response = await fetch('https://api-staging.fridgebuddy.io/requestDeleteAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      clearInterval(intervalId); // Clear the interval when the request completes

      if (response.ok) {
        setFormStatus('If the account exists, an email was sent! Please check your inbox.');
        setIsSuccess(true);
      } else if (response.status === 429) {
        setFormStatus('Too many requests. Please try again later.');
        setIsSuccess(false);
      } else {
        setFormStatus('There was an error submitting your request. Please reach out to fridgebuddyapp@gmail.com');
        setIsSuccess(false);
      }
    } catch (error) {
      clearInterval(intervalId);
      setFormStatus('There was an error submitting your request. Please reach out to fridgebuddyapp@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className='title'>
        <div className='logo'>
          <h1>Fridge Buddy</h1>
        </div>
      </div>
      <div className="body">
        So you want to delete your account?
        <br/>
        Too bad!
        <br/>
        Jk, we'll miss you.
      </div>
      <div className={styles.formContainer}>
        <h2>Request Account Deletion</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.recaptchaContainer}>
            <ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={handleRecaptchaChange}
            />
          </div>
          <button type="submit" disabled={isSubmitting} className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}>
            <span className={styles.spinner} style={{ display: isSubmitting ? 'inline-block' : 'none' }}></span>
            <span style={{ display: isSubmitting ? 'none' : 'inline-block' }}>Submit</span>
          </button>
        </form>
        {formStatus && <p className={isSuccess ? styles.successMessage : styles.errorMessage}>{formStatus}</p>}
      </div>
      <div className="footer">
        <br/>
        You'll get an email just to make sure it's you.
        <br/>
      </div>
    </div>
  );
}

export default AccountDeletionForm;
