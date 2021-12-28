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
            <a className="appleLink" href="https://apps.apple.com/us/app/fridgebuddy/id1591836974#?platform=iphone"><img className="storeBadgeApple" src='images/apple-store-badge.png' alt="Apple Store Download Badge" /></a>
            <a className="androidLink" href="https://play.google.com/store/apps/details?id=io.fridgebuddy.app"><img className="storeBadgeAndroid" src='images/google-play-badge.png' alt="Google Play Download Badge" /></a>
        </div>
        <div className="body">
        Available now!
        </div>
    </div>
  );
}

export default Home;