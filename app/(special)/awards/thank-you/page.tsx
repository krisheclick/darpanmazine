"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="mb-4">
            <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
          </div>
          <h1 className="mb-3">Thank You!</h1>
          <p className="lead mb-4">
            Your nomination has been successfully submitted. We appreciate your participation in celebrating excellence within the South Asian community.
          </p>
          <p className="mb-4">
            You will be redirected to the awards page in a few seconds, or you can click the button below.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}