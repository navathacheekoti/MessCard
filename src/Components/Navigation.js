import React from 'react';
const Navigation =({onRouteChange,isSignedIn})=>{

        if(isSignedIn){
            return(
                <nav className="black center shadow-5" style={{display:'flex',justifyContent:''}}>
                    <h1 className='black'>Online Mess Card system</h1>
                    <p
                        style={{justifyContent:'flex-end'}}
                        onClick={()=>onRouteChange('signout')}
                        className="f3 link dim black underline pa3 pointer">Sign Out</p>
                </nav>
        );
        }
        else {
            return(
                <nav  className="white shadow-5 center">
                 <h1 >Online Mess Card system</h1>
                    <p
                        style={{justifyContent:'flex-end'}}
                        onClick={()=>onRouteChange('signin')}
                        className="f3 link dim black underline pa3 pointer">Sign In</p>
                </nav>
        );
        }


}


export default Navigation;
