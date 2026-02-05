import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center p-4">
      <div className="bg-white shadow p-5 rounded">
        <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
        <h2 className="fw-semibold mb-3">Oops! Page Not Found 😢</h2>
        <p className="text-muted mb-4">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/`} className="rj-btn-home">
            <i className="bi bi-house-door me-2"></i> Return Home
          </Link>
        </div>
      </div>

      <footer className="mt-5 text-muted small">
        &copy; {new Date().getFullYear()} <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/`} target="_blank">Darpan Magazine</Link>. All rights reserved.
      </footer>
    </div>
  )
}

export default NotFoundPage
