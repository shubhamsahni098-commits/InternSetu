import React, {
    useEffect,
    useRef,
    useState
} from "react";

import "./DishaBot.css";
import Disha from "../assets/Disha.png";


const DISHA_API_URL =
    "http://localhost:5001/disha";


export default function DishaBot() {

    // =========================================================
    // UI STATE
    // =========================================================

    const [open, setOpen] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [loading, setLoading] =
        useState(false);


    // =========================================================
    // Session ID
    // =========================================================

    const [sessionId, setSessionId] =
        useState(() => {

            const savedSession =
                sessionStorage.getItem(
                    "disha_session_id"
                );

            if (savedSession) {
                return savedSession;
            }

            const newSession =
                crypto.randomUUID();

            sessionStorage.setItem(
                "disha_session_id",
                newSession
            );

            return newSession;

        });


    // =========================================================
    // Auto scroll
    // =========================================================

    const messagesEndRef =
        useRef(null);


    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);


    // =========================================================
    // Send message to Disha
    // =========================================================

    const sendMessage = async (
        customMessage = null
    ) => {

        const text =
            (
                customMessage ??
                message
            ).trim();


        if (!text || loading) {
            return;
        }


        // -----------------------------------------------------
        // Add user message immediately
        // -----------------------------------------------------

        setMessages((previous) => [

            ...previous,

            {
                role: "user",
                text,
            },

        ]);


        setMessage("");


        try {

            setLoading(true);


            const response =
                await fetch(
                    `${DISHA_API_URL}/chat`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            message: text,
                            session_id:
                                sessionId,
                        }),
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data?.error ||
                    "Disha could not respond."
                );

            }


            // -------------------------------------------------
            // Backend may return session_id
            // -------------------------------------------------

            if (
                data?.session_id &&
                data.session_id !== sessionId
            ) {

                setSessionId(
                    data.session_id
                );

                sessionStorage.setItem(
                    "disha_session_id",
                    data.session_id
                );

            }


            // -------------------------------------------------
            // Add Disha response
            // -------------------------------------------------

            setMessages((previous) => [

                ...previous,

                {
                    role: "disha",
                    text:
                        data?.reply ||
                        "Sorry, I could not generate a response.",
                },

            ]);

        } catch (error) {

            console.error(
                "Disha error:",
                error
            );


            setMessages((previous) => [

                ...previous,

                {
                    role: "disha",
                    text:
                        "Sorry, I'm unable to connect right now. Please try again.",
                },

            ]);

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // Quick question
    // =========================================================

    const handleQuickQuestion = (
        question
    ) => {

        sendMessage(question);

    };


    // =========================================================
    // Input key
    // =========================================================

    const handleKeyDown = (
        event
    ) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    };


    // =========================================================
    // Reset chat
    // =========================================================

    const resetChat = async () => {

        try {

            await fetch(
                `${DISHA_API_URL}/chat/reset`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        session_id:
                            sessionId,
                    }),
                }
            );

        } catch (error) {

            console.error(
                "Disha reset error:",
                error
            );

        }


        const newSession =
            crypto.randomUUID();


        sessionStorage.setItem(
            "disha_session_id",
            newSession
        );


        setSessionId(
            newSession
        );


        setMessages([]);

    };


    // =========================================================
    // Render
    // =========================================================

    return (
        <>

            {/* =================================================
                FLOATING ASK DISHA BUTTON
            ================================================= */}

            {!open && (

                <div
                    className="disha-floating"
                    onClick={() =>
                        setOpen(true)
                    }
                >

                    <div className="disha-avatar">

                        <img
                            className="img"
                            src={Disha}
                            alt="Disha"
                        />

                    </div>


                    <span>
                        Ask Disha
                    </span>

                </div>

            )}


            {/* =================================================
                DISHA CHAT
            ================================================= */}

            {open && (

                <div className="disha-chat">


                    {/* =========================================
                        HEADER
                    ========================================= */}

                    <div className="disha-header">

                        <div className="disha-title">

                            <div className="disha-avatar">

                                <img
                                    className="img"
                                    src={Disha}
                                    alt="Disha"
                                />

                            </div>


                            <span>
                                Ask Disha
                            </span>

                        </div>


                        <div className="disha-header-actions">

                            <button
                                className="disha-reset"
                                onClick={
                                    resetChat
                                }
                                type="button"
                                title="New conversation"
                            >
                                ↻
                            </button>


                            <button
                                className="disha-close"
                                onClick={() =>
                                    setOpen(false)
                                }
                                aria-label="Close Disha"
                                type="button"
                            >
                                ×
                            </button>

                        </div>

                    </div>


                    {/* =========================================
                        CHAT BODY
                    ========================================= */}

                    <div className="disha-body">


                        {/* =====================================
                            WELCOME
                        ===================================== */}

                        {messages.length === 0 && (

                            <div className="disha-welcome">


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


                                <p>
                                    Try asking:
                                </p>


                                <div className="quick-questions">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuickQuestion(
                                                "Find internships for me"
                                            )
                                        }
                                    >
                                        Find internships for me
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuickQuestion(
                                                "Show internships in Mumbai"
                                            )
                                        }
                                    >
                                        Show internships in Mumbai
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuickQuestion(
                                                "Help me with my resume"
                                            )
                                        }
                                    >
                                        Help me with my resume
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuickQuestion(
                                                "Give me career guidance"
                                            )
                                        }
                                    >
                                        Give me career guidance
                                    </button>

                                </div>

                            </div>

                        )}


                        {/* =====================================
                            CHAT MESSAGES
                        ===================================== */}

                        {messages.length > 0 && (

                            <div className="disha-messages">

                                {messages.map(
                                    (chatMessage, index) => (

                                        <div
                                            key={index}
                                            className={
                                                `disha-message ${
                                                    chatMessage.role ===
                                                    "user"
                                                        ? "user-message"
                                                        : "disha-message"
                                                }`
                                            }
                                        >

                                            {chatMessage.role ===
                                                "disha" && (

                                                <div className="message-avatar">

                                                    <img
                                                        src={Disha}
                                                        alt="Disha"
                                                    />

                                                </div>

                                            )}


                                            <div className="message-content">

                                                {chatMessage.text}

                                            </div>

                                        </div>

                                    )
                                )}


                                {/* Loading */}

                                {loading && (

                                    <div className="disha-message disha-message">

                                        <div className="message-avatar">

                                            <img
                                                src={Disha}
                                                alt="Disha"
                                            />

                                        </div>


                                        <div className="message-content disha-typing">

                                            <span></span>
                                            <span></span>
                                            <span></span>

                                        </div>

                                    </div>

                                )}


                                <div
                                    ref={
                                        messagesEndRef
                                    }
                                />

                            </div>

                        )}

                    </div>


                    {/* =========================================
                        INPUT
                    ========================================= */}

                    <div className="disha-input">

                        <input
                            type="text"
                            value={message}
                            onChange={(event) =>
                                setMessage(
                                    event.target.value
                                )
                            }
                            onKeyDown={
                                handleKeyDown
                            }
                            placeholder="Ask anything..."
                            disabled={loading}
                        />


                        <button
                            aria-label="Send message"
                            type="button"
                            onClick={() =>
                                sendMessage()
                            }
                            disabled={
                                !message.trim() ||
                                loading
                            }
                        >
                            ➤
                        </button>

                    </div>


                    {/* =========================================
                        DISCLAIMER
                    ========================================= */}

                    <div className="disha-note">

                        Disha uses AI to generate responses
                        and may occasionally make mistakes.

                    </div>

                </div>

            )}

        </>
    );
}