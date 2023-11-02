import React from 'react';
import '../../styles/questions.module.scss';
import Head from 'next/head';

const Questions: React.FC = (): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    React.useEffect((): void => {
        try {
            const loggedIn: string | null = sessionStorage.getItem("admin");
            if (loggedIn === "isAdmin[@98duN@9xSW(SJ)]") {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
                window.location.href = "/admin/login";
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, []);

    return (
        <>
            {
                loggedIn ? (
                    <div id="Questions">
                        <Head>Questions</Head>
                    </div>
                ) : (
                    <>
                        <Head>Redirecting...</Head>
                    </>
                )
            }
        </>
    );
}

export default Questions;