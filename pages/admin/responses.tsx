import React from 'react';
import styles from '../../styles/responses.module.scss';
import PageTitle from '@/styles/Assets/PageTitle';

type UserResponse = {
    Name: string;
    Category: string;
    Team: string;
    Score: number;
    Type: string;
    Time: string;
}

export default function Responses(): React.JSX.Element {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const [responses, setResponses] = React.useState<UserResponse[]>([]);

    let url: string;

    React.useEffect((): void => {
        const loggedIn: string | null = sessionStorage.getItem("admin");
        if (loggedIn === "isAdmin[@98duN@9xSW(SJ)]") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            window.location.href = "/admin/login";
        }

        getDataConst();

        setInterval(() => {
            getDataConst();
        }, 10000);
    }, []);

    const getDataConst = async (): Promise<void> => {
        const responsesConst = await fetch("http://localhost:19640/admin/get/responses");
        const responsesJSON = await responsesConst.json();
        console.log(responsesJSON);
        setResponses(responsesJSON.fileData);
    }

    // Work on fixing download later (mainly bc im too tired/lazy to do it right now)

    return (
        <>
            {
                loggedIn ? (
                    <div className={styles.responsePage}>
                        <PageTitle title="Responses" />
                        <div className={styles.responsesContainer}>
                            <h1 className={styles.topTitle}>Responses</h1>
                            <a href="responses.json" download={true} className={styles.downloadButton}>Download Responses</a>
                            <hr />
                            <table className={styles.responsesTable}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Team</th>
                                        <th>Score</th>
                                        <th>Type</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        responses.map((response: UserResponse, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{response.Name}</td>
                                                    <td>{response.Category}</td>
                                                    <td>{response.Team}</td>
                                                    <td>{response.Score}</td>
                                                    <td>{response.Type}</td>
                                                    <td>{response.Time}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
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