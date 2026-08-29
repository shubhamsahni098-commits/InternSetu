import React, { useState } from "react";
import "./DishaBot.css";
import Disha from "../assets/Disha.png";

export default function DishaBot() {

    const [open, setOpen] = useState(false);

    return (
        <>
            {/* =========================
                FLOATING ASK DISHA BUTTON
            ========================= */}

            {!open && (
                <div
                    className="disha-floating"
                    onClick={() => setOpen(true)}
                >

                    <div className="disha-avatar">
                        <img
                            className="img"
                            src={Disha}
                            alt="Disha"
                        />
                    </div>

                    <span>Ask Disha</span>

                </div>
            )}


            {/* =========================
                DISHA CHAT
            ========================= */}

            {open && (
                <div className="disha-chat">


                    {/* =========================
                        HEADER
                    ========================= */}

                    <div className="disha-header">

                        <div className="disha-title">

                            <div className="disha-avatar">

                                <img
                                    className="img"
                                    src={Disha}
                                    alt="Disha"
                                />

                            </div>

                            <span>Ask Disha</span>

                        </div>


                        <button
                            className="disha-close"
                            onClick={() => setOpen(false)}
                            aria-label="Close Disha"
                        >
                            ×
                        </button>

                    </div>


                    {/* =========================
                        CHAT BODY
                    ========================= */}

                    <div className="disha-body">

                        <div className="disha-welcome">


                            {/* =========================
                                INTRO
                                Avatar + Heading
                            ========================= */}

                            <div className="disha-intro">

                                <div className="big-avatar">

                                    <img
                                        className="b-img"
                                        src={Disha}
                                        alt="Disha"
                                    />

                                </div>


                                <h2>
                                    Namaste! I'm Disha, Your InternSetu Career Assistant.
                                </h2>

                            </div>


                            {/* =========================
                                QUICK QUESTION TITLE
                            ========================= */}

                            <p>
                                Try asking:
                            </p>


                            {/* =========================
                                QUICK QUESTIONS
                            ========================= */}

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


                    {/* =========================
                        INPUT
                    ========================= */}

                    <div className="disha-input">

                        <input
                            type="text"
                            placeholder="Ask anything..."
                        />

                        <button
                            aria-label="Send message"
                        >
                            ➤
                        </button>

                    </div>


                    {/* =========================
                        DISCLAIMER
                    ========================= */}

                    <div className="disha-note">

                        Disha uses AI to generate responses and may occasionally make mistakes.

                    </div>

                </div>
            )}

        </>
    );
}