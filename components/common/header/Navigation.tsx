import Link from "next/link";
import { Container } from "react-bootstrap";

type MenuItem = {
    url?: string;
    label?: string;
};

type Props = {
    data?: MenuItem[];
};

const Navigation = ({data}: Props) => {
    return(
        data && data.length > 0 &&(
            <div className="nav_wrapper">
                <Container>
                    <nav className="navMenu noList">
                        <ul className="d-flex align-items-center justify-content-center">
                            {data.map((value, index) => {
                                const {url, label} = value;
                                return(
                                    <li key={index} className="menu-item">
                                        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/${url}`}>{label}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </Container>
            </div>
        )
    )
}

export default Navigation;