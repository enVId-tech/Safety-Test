import React from 'react';
import '../../Assets/scss/admin/responses.scss';
import PageTitle from '../../Assets/ts/pagetitle/pagetitle';

type UserResponse = {
    Name: string;
    Category: string;
    Team: string;
    Score: number;
    Type: string;
    Time: string;
}

const Responses: React.FC = (): React.JSX.Element => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const [responses, setResponses] = React.useState<UserResponse[]>([]);

    const getResponses = async (): Promise<void> => {
        const getResponses: Response = await fetch("/admin/get/responses");

        const getResponsesJSON: { fileData: UserResponse[] } = await getResponses.json();
        setResponses(getResponsesJSON.fileData); // wrap the array in another array

        console.log(getResponsesJSON.fileData[0].Name);
    }

    window.onload = (): void => {
        const loggedIn: string | null = sessionStorage.getItem("admin");
        if (loggedIn === "isAdmin[@98duN@9xSW(SJ)]") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            window.location.href = "/admin";
        }

        getResponses();
    }
    //console.log(responses.fileData[0].Name)
    return (
        <>
            {
                loggedIn ? (
                    <div id="Responses">
                        <PageTitle title="Responses" />
                        <div id="ResponsesContainer">
                            <h1 id="TopTitle">Responses</h1>
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

export default Responses;