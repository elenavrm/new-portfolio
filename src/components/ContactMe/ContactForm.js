import React, { useEffect, useState, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import style from './ContactMe.module.scss';
import contactIcon from '../../assets/images/contactIcon.png';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

function ContactForm() {
    const [state, handleSubmit] = useForm("xaykzqwk");
    const [showForm, setShowForm] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false);

    const formRef = useRef(null);

    const handleFormIntersection = () => {
        formRef.current.classList.add(style.slideInForm);
    };

    useIntersectionObserver(formRef, handleFormIntersection, {
        threshold: 0.1, 
    });

    useEffect(() => {
        if (state.succeeded) {
            setShowForm(false);
            setShowOverlay(true);

            const timer = setTimeout(() => {
                window.location.reload();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [state.succeeded]);

    return (
        <>
            {showOverlay && (
                <div className={style.overlay}>
                    <p className={style.message}>
                        Thank you! <br />
                        Your message was received
                    </p>
                    <img src={contactIcon} 
                    alt='contact me icon' 
                    className={style.contactIcon} />
                </div>
            )}
            {showForm && (
                <form onSubmit={handleSubmit} 
                className={style.form} 
                ref={formRef}>
                    <label>
                        Your Name: <br />
                        <input 
                        type="text" 
                        name="name" 
                        required placeholder="Your name..." />
                    </label>
                    <label>
                        Your Email:<br />
                        <input 
                        type="email" 
                        name="email" 
                        required placeholder="Your email..." />
                    </label>
                    <label>
                        Your Message:
                        <textarea 
                        name="message" 
                        required cols="30" 
                        rows="6" 
                        placeholder="Type your message...">
                        </textarea>
                    </label>

                    <ValidationError 
                    prefix="Message" 
                    field="message" 
                    errors={state.errors} />

                    <button 
                    type="submit" 
                    disabled={state.submitting} 
                    id="cta">send message
                    </button>
                </form>
            )}
        </>
    );
}

export default ContactForm;