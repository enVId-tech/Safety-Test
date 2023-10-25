import React from 'react';
import styles from '../../styles/responses.module.scss';
import PageTitle from '@/styles/Assets/PageTitle';

interface UserResponse {
    Name: string;
    Category: string;
    Team: string;
    Score: number;
    Type: string;
    Pass: boolean;
    Time: string;
}

interface fileDataResponse {
    fileData: UserResponse[];
}

interface downloadFileResponse {
    fileData: string;
}

export default function Responses(): React.JSX.Element {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const [responses, setResponses] = React.useState<UserResponse[]>([]);
    const [timeToNextRefresh, setTimeToNextRefresh] = React.useState<number>(2);
    const [userRefreshTime, setUserRefreshTime] = React.useState<number>(2);
    const [responsesType, setResponsesType] = React.useState<string>("responsesAll");

    React.useEffect((): void => {
        try {
            const loggedIn: string | null = sessionStorage.getItem("admin");
            if (loggedIn === "isAdmin[@98duN@9xSW(SJ)]") {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
                window.location.href = "/admin/login";
            }

            getDataConst();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, []);

    React.useEffect((): void => {
        try {
            if (timeToNextRefresh <= 0) {
                setTimeToNextRefresh(userRefreshTime);
                getDataConst();
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, [timeToNextRefresh, userRefreshTime]);

    React.useEffect(() => {
        try {
            const interval: NodeJS.Timeout = setInterval((): void => {
                setTimeToNextRefresh(timeToNextRefresh - 0.01);
            }, 10);

            // Clear interval on unmount
            return (): void => {
                clearInterval(interval);
            }
        } catch (error: unknown) {
            console.error(error as string);
        }
    }, [timeToNextRefresh]);

    const getDataConst = async (): Promise<void> => {
        try {
            const responsesConst: Response = await fetch("http://localhost:19640/admin/get/responses");
            const responsesJSON: fileDataResponse = await responsesConst.json();
            setResponses(responsesJSON.fileData);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    // Download available on the same level as the responses page
    const downloadFile = async (responseType: string): Promise<void> => {
        try {
            const downloadFile: Response = await fetch("http://localhost:19640/admin/get/responses");
            const downloadFileJSON: downloadFileResponse = await downloadFile.json();
            const downloadFileData: string = downloadFileJSON.fileData;

            const downloadFileDataString: string = JSON.stringify(downloadFileData);

            const downloadFileDataBlob: Blob = new Blob([downloadFileDataString], { type: "application/json" });

            const downloadFileDataBlobURL: string = URL.createObjectURL(downloadFileDataBlob);

            const downloadFileDataBlobURLAnchor: HTMLAnchorElement = document.createElement("a");
            downloadFileDataBlobURLAnchor.href = downloadFileDataBlobURL;
            downloadFileDataBlobURLAnchor.download = "responses.json";
            downloadFileDataBlobURLAnchor.click();
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    const switchData = (): void => {
        try {
            if (responsesType === "responsesPassed") {
                setResponsesType("responsesAll");
                return;
            }
            setResponsesType("responsesPassed");
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    return (
        <>
            {
                loggedIn ? (
                    <div className={styles.responsePage}>
                        <PageTitle title="Responses" />
                        <div className={styles.responsesContainer}>
                            <h1 className={styles.topTitle}>
                                {
                                    responsesType === "responsesAll" ? (
                                        "All Responses"
                                    ) : (
                                        "Passed Responses"
                                    )
                                }
                            </h1>
                            <a className={styles.downloadButton} onClick={() => downloadFile(responsesType)}>
                                {
                                    responsesType === "responsesAll" ? (
                                        "Download all responses"
                                    ) : (
                                        "Download all passed responses"
                                    )
                                }
                            </a>
                            <hr />
                            <table className={styles.responsesTable}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Team</th>
                                        <th>Score</th>
                                        <th>Type</th>
                                        <th>Pass</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        responses.sort((a: UserResponse, b: UserResponse) => {
                                            if (b.Score === a.Score) {
                                                return new Date(b.Time).getTime() - new Date(a.Time).getTime();
                                            }
                                            return b.Score - a.Score;
                                        })
                                            .map((response: UserResponse, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{response.Name}</td>
                                                        <td>{response.Category}</td>
                                                        <td>{response.Team}</td>
                                                        <td>{response.Score}</td>
                                                        <td>{response.Type}</td>
                                                        <td>{response.Pass}</td>
                                                        <td>{response.Time}</td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.statisticsContainer}>
                            <div className={styles.statisticsBar}>
                                <h1 className={styles.statisticsTitle}>Statistics</h1>
                                <hr />
                                <button className={styles.switchDataButton} onClick={switchData}>
                                    Switch data table
                                </button>
                                <h1 className={styles.numberOfResponses}># of Responses: {responses.length}</h1>
                                <h1 className={styles.latestResponse}>Latest: {responses[responses.length - 1]?.Name}</h1>
                                <h1 className={styles.timeToNextRefresh}>Time to next refresh: {timeToNextRefresh.toFixed(2)}s</h1>
                                <span>
                                    <input
                                        type="number"
                                        className={styles.refreshTime}
                                        value={userRefreshTime}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                            try {
                                                const value = parseInt(e.target.value);
                                                if (!isNaN(value) && value >= 1 && value <= 60) {
                                                    setUserRefreshTime(value);
                                                }
                                            } catch (error: unknown) {
                                                console.error(error as string);
                                            }
                                        }}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => { if (e.key === "Enter") setTimeToNextRefresh(userRefreshTime) }}
                                    />
                                    <p className={styles.refreshTimeLabel}>Press enter for immediate refresh</p>
                                </span>
                            </div>
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