import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './RequestAccountDeletion.module.css';

function AccountDeletionForm() {
  const [email, setEmail] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [formStatus, setFormStatus] = useState('');
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

    const requestData = {
      recipientEmail: email,
      recaptchaResponse: recaptchaToken,
    };

    try {
      const response = await fetch('https://api-staging.fridgebuddy.io/requestDeleteAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setFormStatus('If the account exists, an email was sent! Please check your inbox.');
      } else {
        setFormStatus('There was an error submitting your request.');
      }
    } catch (error) {
      setFormStatus('There was an error submitting your request. Please reach out to fridgebuddyapp@gmail.com');
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
          <button type="submit">Submit</button>
        </form>
        {formStatus && <p>{formStatus}</p>}
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
