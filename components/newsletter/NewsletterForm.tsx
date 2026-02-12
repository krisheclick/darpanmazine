"use client";
import { Button, Col, Form, FormControl } from 'react-bootstrap'
import Styles from './style.module.css';
import { useRef, useState } from 'react';

const NewsletterForm = () => {
    const [user, setUser] = useState({
        name: "",
        email: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const formValidate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!user.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!user.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
            newErrors.email = "Please enter a valid email.";
        }

        setErrors(newErrors);

        if (newErrors.email && emailRef.current) {
            emailRef.current.focus();
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formValidate()) return;

        setIsSubmitting(true);
        setStatusMessage("");

        try {
            const res = await fetch(`${process.env.API_URL}/subscription`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!res.ok) throw new Error("Failed to submit");

            const data = await res.json();
            setStatusMessage(data?.response_message?.msg || "Subscription successful!");
            setUser({ name: "", email: "" });
        } catch (error) {
            setStatusMessage("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Form onSubmit={handleSubmit} className={Styles.subscribeFormWrap}>
            <div className={Styles.formRow}>
                <Col className={Styles.inputColumn}>
                    <div className={Styles.inputColumnGroup}>
                        <FormControl
                            type="text"
                            name="name"
                            id="name"
                            maxLength={80}
                            placeholder="First Name"
                            aria-label="First Name"
                            aria-describedby="subscribe-button"
                            className={Styles.formControl}
                            ref={nameRef}
                            value={user.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                </Col>
                <Col className={Styles.inputColumn}>
                    <div className={Styles.inputColumnGroup}>
                        <FormControl
                            type="email"
                            name="email"
                            id="email"
                            maxLength={80}
                            placeholder="Enter your Email"
                            aria-label="Enter your Email"
                            aria-describedby="subscribe-button"
                            className={Styles.formControl}
                            ref={emailRef}
                            value={user.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                </Col>
                <Col className={Styles.inputColumn} style={{ flex: "inherit" }}>
                    <div className={Styles.inputColumnGroup}>
                        <Button type="submit" id="subscribe-button" className='rj-btn-subscribe' disabled={isSubmitting}>
                            SUBMIT <span className={`rj_spinner${isSubmitting ? ' active' : ''}`}></span>
                        </Button>
                    </div>
                </Col>
            </div>
            
            {isSubmitting && (
                <span className="text-muted mt-1">Submitting your data...</span>
            )}

            {statusMessage && !isSubmitting && (
                <span
                    className={
                        statusMessage.toLowerCase().includes("success") ? "mt-1 text-success" :
                            statusMessage.toLowerCase().includes("error") || statusMessage.toLowerCase().includes("network") ? "mt-1 text-danger" :
                                "mt-1 text-warning"
                    }
                >
                    {statusMessage}
                </span>
            )}
        </Form>
    )
}

export default NewsletterForm
