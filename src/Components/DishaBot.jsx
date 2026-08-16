import React, { useState } from "react";
import "./DishaBot.css";
import Disha from '../assets/Disha.png'

export default function DishaBot() {

    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating Ask Disha button */}
            {!open && (
                <div
                    className="disha-floating"
                    onClick={() => setOpen(true)}
                >
                    <div className="disha-avatar">
                        <img className="img" src={Disha}/>
                    </div>

                    <span>Ask Disha</span>
                </div>
            )}

            {/* Chatbot */}
            {open && (
                <div className="disha-chat">

                    <div className="disha-header">
                        <div className="disha-title">
                            <div className="disha-avatar">
                                <img className="img" src={Disha}/>
                            </div>

                            <span>Ask Disha</span>
                        </div>

                        <button
                            className="disha-close"
                            onClick={() => setOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="disha-body">

                        <div className="disha-welcome">
                            <div className="big-avatar">
                                <img className="b-img" src={Disha}/>
                            </div>

                            <h2>
                                Namaste! I'm Disha, Your InternSetu Career Assistant.
                            </h2>

                            <p>Try asking:</p>

                            <div className="quick-questions">

                                <button>
                                    Find internships for me
                                </button>

                                <button>
                                    Show internships in Mumbai
                                </button>

                                <button>
                                    Help me with my resume
                                </button>

                                <button>
                                    Give me career guidance
                                </button>

                            </div>
                        </div>

                    </div>

                    <div className="disha-input">

                        <input
                            type="text"
                            placeholder="Ask anything..."
                        />

                        <button>
                            ➤
                        </button>

                    </div>

                    <div className="disha-note">
                        Disha uses AI to generate responses and may occasionally make mistakes.
                    </div>

                </div>
            )}
        </>
    );
}