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

    React.useEffect((): void => {
        const loggedIn: string | null = sessionStorage.getItem("admin");
        if (loggedIn === "isAdmin[@98duN@9xSW(SJ)]") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            window.location.href = "/admin";
        }

        setResponses([
            {
                Name: "Test",
                Category: "Test",
                Team: "Test",
                Score: 0,
                Type: "Test",
                Time: "Test"
            }
        ]);
    }, []);

    const getData = React.useCallback(async (): Promise<UserResponse[]> => {
        const responsesConst = await fetch(
            "http://localhost:19640/admin/get/responses",
            {
                "next": { revalidate: 3 }
            }
        );
        const responsesJSON: UserResponse[] = await responsesConst.json();
        console.log(responsesJSON);
        return responsesJSON;
    }, []);

    React.useEffect((): void => {
        getData().then((responsesConst: UserResponse[]): void => {
            // setResponses(responsesConst.fileData);
            console.log(responsesConst);
        });
    }, [getData]);

    return (
        <>
            {
                loggedIn ? (
                    <div className={styles.responsePage}>
                        <PageTitle title="Responses" />
                        <div className={styles.responsesContainer}>
                            <h1 className={styles.topTitle}>Responses</h1>
                            <hr />
                            <table id="ResponsesTable">
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