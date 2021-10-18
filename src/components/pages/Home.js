import React from 'react';
import '../../App.css';

function Home() {
  return (
    <div className='home'>
        <img className="icon" src='images/icon-1000x1000.png' alt="Logo Icon" />
        <div className='title'>
            <div className='logo'>
                <h1>Fridge Buddy</h1>
            </div>
        </div>
        <div className="body">
            Ever have to throw out food you forgot about because it expired? 
            <br/>
            <br/>
            Fridge Buddy can help. 
            
            <br/>
            <br/>

            Use our app to scan receipts and get notifications for when food is about to expire.

            <br/>
            <br/>

            Share your list to notify others too!

        </div>
        <div className="platformLinks">
            <img className="storeBadgeApple" src='images/apple-store-badge.svg' alt="Apple Store Download Badge" />
            <img className="storeBadgeAndroid" src='images/google-play-badge.png' alt="Google Play Download Badge" />
        </div>
        <div className="body">
        Coming to an app store near you December 2021
        </div>
    </div>
  );
}

export default Home;