"use client";

import { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

interface Props {
    show: boolean;
    onHide: () => void;
}

export default function DoorstepModal({ show, onHide }: Props) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        payment: "credit",
        agree: false,
        newsletter: false,
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        let err: any = {};
        if (!form.firstName) err.firstName = "Required";
        if (!form.email) err.email = "Required";
        if (!form.mobile) err.mobile = "Required";
        if (!form.address) err.address = "Required";
        if (!form.agree) err.agree = "You must accept terms";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    useEffect(() => {
        if (!show) {
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                address: "",
                pincode: "",
                city: "",
                state: "",
                payment: "credit",
                agree: false,
                newsletter: false,
            });

            setErrors({});
            setApiError("");
        }
    }, [show]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setApiError("");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/doorstep`;

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.response_code === true) {
                    setForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        mobile: "",
                        address: "",
                        pincode: "",
                        city: "",
                        state: "",
                        payment: "credit",
                        agree: false,
                        newsletter: false,
                    });
                    setErrors({});
                    onHide();
                    console.log("Form Data Submitted:", data);
                } else {
                    setApiError(data.message || data.response_message || "Something went wrong");
                }
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                setApiError("Failed to submit form. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            contentClassName="p-4 doorstep-modal"
        >
            <a href="javascript:void(0);"
                type="button"
                className="btn-close position-absolute end-0 top-0 m-3"
                onClick={onHide}
                style={{"position": "absolute","display": "block","zIndex": 9}}
            ></a>
            <Modal.Body>
                
                <Form onSubmit={handleSubmit}>
                    <Row className="g-4">

                        {apiError && (
                            <Col md={12}>
                                <div className="alert alert-danger" role="alert">
                                    {apiError}
                                </div>
                            </Col>
                        )}

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className="border-0 border-bottom"
                                />
                                {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className="border-0 border-bottom"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="border-0 border-bottom"
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    name="mobile"
                                    value={form.mobile}
                                    onChange={handleChange}
                                    className="border-0 border-bottom"
                                />
                                {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Delivery Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="border-0 border-bottom"
                                />
                                {errors.address && <small className="text-danger">{errors.address}</small>}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    name="pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                    className="border-0 border-bottom"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    className="border-0 border-bottom"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                    className="border-0 border-bottom"
                                />
                            </Form.Group>
                        </Col>

                        {/* Payment */}
                        <Col md={12} className="mt-3">
                            <strong>Payment method</strong>

                            <div className="mt-2">
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Credit Card"
                                    name="payment"
                                    value="credit"
                                    checked={form.payment === "credit"}
                                    onChange={handleChange}
                                />

                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Debit Card / Net Banking & Others"
                                    name="payment"
                                    value="debit"
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>

                        {/* Checkboxes */}
                        <Col md={12} className="mt-3">
                            <Form.Check
                                type="checkbox"
                                label="I agree to Terms & Conditions"
                                name="agree"
                                onChange={handleChange}
                            />
                            {errors.agree && <small className="text-danger d-block">{errors.agree}</small>}
                        </Col>

                        {/* Button */}
                        <Col md={12} className="text-end mt-4">
                            <Button type="submit" className="px-4" disabled={loading}>
                                {loading ? "PROCESSING..." : "PROCEED TO PAY"}
                            </Button>
                        </Col>

                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}