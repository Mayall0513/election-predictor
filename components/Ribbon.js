import React from "react";
import { useRouter } from "next/router";

export default function Ribbon(props) {
    const { user } = props;
    const router = useRouter();
    
    return (
        <div className="ribbon-container">
            <div className="ribbon">
                <div className="ribbon-item">
                    {"<website name here>"}
                </div>
                <div className="ribbon-item flex-4">
                    <button 
                        type="button" 
                        className="link-button"
                        onClick={(e) => {
                            router.replace("/governors", undefined, { shallow: true });
                        }}>
                        Gubernatorial races
                    </button>
                    <button 
                        type="button" 
                        className="link-button padding-left-1"
                        onClick={(e) => {
                            router.replace("/senators", undefined, { shallow: true });
                        }}>
                        Senate races
                    </button>
                </div>
                <div className="ribbon-item account-section"> 
                    { user ?
                        <>
                            <p className="extra-info">Balance: {user.xp}</p>
                            <div className="account-details-section">
                                { user.username }
                                <button 
                                    type="button" 
                                    className="link-button"
                                    onClick={(e) => {
                                        router.replace("/api/auth/signout", undefined, { shallow: true });
                                    }}>
                                    Sign out
                                </button>
                            </div>
                            <img className="avatar" width="64" height="64" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=80`}/>
                        </> :
                        <button 
                            type="button" 
                            className="link-button"
                            onClick={(e) => {
                                router.replace("/api/auth/signin", undefined, { shallow: true });
                            }}>
                            Sign in
                        </button>
                    }
                </div>
            </div>
        </div>
    )
};
