"use client";
import { FormControl } from "react-bootstrap";
import { useRef, useState } from "react";

type Props = {
    className?: string;
};

const NewsletterFormFooter = ({ className }: Props) => {
    const [form, setForm] = useState({ name: "", email: "" });
    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

    const validate = () => {
        const newErrors: { [k: string]: string } = {};
        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.email.trim()) newErrors.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Please enter a valid email.";
        setErrors(newErrors);
        if (newErrors.email && emailRef.current) emailRef.current.focus();
        else if (newErrors.name && nameRef.current) nameRef.current.focus();
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusMessage("");
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name.trim(), email: form.email.trim() }),
            });
            if (!res.ok) throw new Error("Failed to submit");
            const data = await res.json();
            setStatusMessage(data?.response_message || "Subscription successful!");
            setForm({ name: "", email: "" });
        } catch (err) {
            setStatusMessage("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`subscribeForm ${className ?? ""}`}>
            <div className="subscribeInput d-flex align-items-start">
                <div style={{ flex: 1, marginRight: 8 }}>
                    <FormControl
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="rounded-0 bg-white"
                        value={form.name}
                        onChange={handleChange}
                        ref={nameRef}
                        disabled={isSubmitting}
                    />
                    {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
                </div>

                <div style={{ flex: 1, marginRight: 8 }}>
                    <FormControl
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        className="rounded-0 bg-white"
                        value={form.email}
                        onChange={handleChange}
                        ref={emailRef}
                        disabled={isSubmitting}
                    />
                    {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                </div>

                <button type="submit" className="rj-btn-subscribe transparent-btn text-white" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Subscribe Now"}
                </button>
            </div>

            {statusMessage && (
                <div className={`mt-1 ${statusMessage.toLowerCase().includes("success") ? "text-success" : "text-danger"}`}>
                    {statusMessage}
                </div>
            )}
        </form>
    );
};

export default NewsletterFormFooter;
