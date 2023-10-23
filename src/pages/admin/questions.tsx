import React from 'react';
import '../../Assets/scss/admin/questions.scss';
import PageTitle from '../../Assets/ts/pagetitle/pagetitle';

const Questions: React.FC = (): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    window.onload = (): void => {
        const loggedIn: string | null = sessionStorage.getItem("admin");
        if (loggedIn === "isAdmin[@98duN@9xSW(SJ)]") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            window.location.href = "/admin";
        }
    }

    return (
        <>
            {
                loggedIn ? (
                    <div id="Questions">
                        <PageTitle title="Questions" />
                    </div>
                ) : (
                    <>
                        <PageTitle title="Redirecting..." />
                    </>
                )
            }
        </>
    );
}

export default Questions;