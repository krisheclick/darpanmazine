"use client";

import { useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPaperPlane,
    faTimes,
    faUser
} from "@fortawesome/free-solid-svg-icons";

interface Props {
    show: boolean;
    onHide: () => void;
}

export default function SubscriptionModal({ show, onHide }: Props) {
    const [user, setUser] = useState({
            name: "",
            email: ''
        });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

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
        } else if (newErrors.name && nameRef.current) {
            nameRef.current.focus();
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
        setStatusMessage("");
        if (!formValidate()) return;
        
        setIsSubmitting(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!res.ok) throw new Error("Failed to submit");
            const data = await res.json();
            
            if(!data.response_code)
            {
                setStatusMessage(data?.response_message);
            }else{
                setStatusMessage(data?.response_message || "Subscription successful!");
                setUser({ name: "", email: "" });
                setTimeout(() => onHide(), 1500);
            }
        } catch (err: unknown) {
            setStatusMessage("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            backdropClassName="yellow-backdrop"
            contentClassName="newsletter-modal"
        >
            <Modal.Body className="position-relative p-3">
                {/* Close */}
                <a className="close-btn" onClick={onHide}>
                    <FontAwesomeIcon icon={faTimes} />
                </a>

                {/* Envelope Left */}
                <div className="envelope">
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>

                {/* Right Content */}
                <div className="content">
                    <h2 className="title">
                        Subscribe to our <br /> Newsletter!
                    </h2>

                    <p className="subtitle">
                        Subscribe to our newsletter and stay updated.
                    </p>

                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <div className="email-box">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                ref={nameRef}
                                type="text"
                                name="name"
                                placeholder="Your name"
                                value={user.name}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                            {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
                        </div>
                        <div className="email-box">
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                placeholder="Your email"
                                value={user.email}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                            {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                        </div>

                        <Button type="submit" className="subscribe-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Subscribe"}
                        </Button>

                        {statusMessage && (
                            <div className={`mt-2 ${statusMessage.toLowerCase().includes("success") ? "text-success" : "text-danger"}`}>
                                {statusMessage}
                            </div>
                        )}
                    </Form>
                </div>

            </Modal.Body>

            <style jsx global>{`

        /* Modal Box */
        .newsletter-modal {
          background: #ededed;
          border-radius: 20px;
          overflow: hidden;
        }

        /* Close */
        .close-btn {
          position: absolute;
          top: 25px;
          right: 30px;
          font-size: 20px;
          cursor: pointer;
        }

        /* Decorative Curve */
        .curve-svg {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* Envelope */
        .envelope {
          position: absolute;
          left: 120px;
          margin-top: auto;
          font-size: 120px;
          color: #f4a62a;
        }

        /* Content */
        .content {
          width: 60%;
          margin-left: auto;
          margin-top: auto;
        }

        .title {
          font-weight: 700;
          font-size: 32px;
          line-height: 1.2;
          margin-bottom: 15px;
        }

        .subtitle {
          color: #555;
          margin-bottom: 25px;
        }

        .email-box {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1px solid #bbb;
          border-radius: 6px;
          padding: 12px 15px;
          margin-bottom: 20px;
        }

        .email-box input {
          border: none;
          outline: none;
          flex: 1;
          margin-left: 10px;
        }

        .subscribe-btn {
          width: 100%;
          padding: 12px;
          background: #3d95b8;
          border: none;
          font-weight: 500;
        }

        .subscribe-btn:hover {
          background: #2f7f9e;
        }

        /* Mobile */
        @media (max-width: 992px) {
          .envelope,
          .plane,
          .curve-svg {
            display: none;
          }

          .content {
            width: 100%;
            margin-top: 60px;
          }
        }
      `}</style>
        </Modal>
    );
}