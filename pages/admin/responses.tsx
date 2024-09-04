/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from '../../styles/responses.module.scss';
import { Work_Sans } from 'next/font/google';
import Head from 'next/head';

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

const WorkSans300 = Work_Sans({
    weight: "300",
    style: 'normal',
    subsets: ['latin']
});

const WorkSans400 = Work_Sans({
    weight: "400",
    style: 'normal',
    subsets: ['latin']
});

const WorkSans500 = Work_Sans({
    weight: "500",
    style: 'normal',
    subsets: ['latin']
});

const WorkSans600 = Work_Sans({
    weight: "600",
    style: 'normal',
    subsets: ['latin']
});


export default function Responses(): React.JSX.Element {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const [responses, setResponses] = React.useState<UserResponse[]>([]);
    const [timeToNextRefresh, setTimeToNextRefresh] = React.useState<number>(2);
    const [userRefreshTime, setUserRefreshTime] = React.useState<number>(2);
    const [responsesType, setResponsesType] = React.useState<string>("responsesAll");
    const [isFetching, setIsFetching] = React.useState<boolean>(false);

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

    React.useEffect((): void => {
        getDataConst();
    }, [responsesType]);

    React.useEffect(() => {
        try {
            const interval: NodeJS.Timeout = setInterval((): void => {
                setTimeToNextRefresh(timeToNextRefresh - 0.1);
            }, 100);

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
            setIsFetching(true);
            if (responsesType === "responsesAll") {
                const responsesConst: Response = await fetch("/admin/get/responses");
                const responsesJSON: fileDataResponse = await responsesConst.json();

                setResponses(responsesJSON.fileData);
            } else if (responsesType === "responsesPassed") {
                const responsesConst: Response = await fetch("/admin/get/responses/passed");
                const responsesJSON: fileDataResponse = await responsesConst.json();

                setResponses(responsesJSON.fileData);
            } else {
                throw new Error("Invalid responses type");
            }
            setIsFetching(false);
        } catch (error: unknown) {
            console.error(error as string);
        }
    }

    // Download available on the same level as the responses page
    const downloadFile = async (responseType: string): Promise<void> => {
        try {
            let downloadFileDataRes: Response;

            if (responseType === "responsesAll") {
                downloadFileDataRes = await fetch("/admin/get/responses");
            } else if (responseType === "responsesPassed") {
                downloadFileDataRes = await fetch("/admin/get/responses/passed");
            } else {
                throw new Error("Invalid responses type, cannot download");
            }

            const downloadFileJSON: downloadFileResponse = await downloadFileDataRes.json();
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
                        <Head>Responses</Head>
                        <div className={styles.responsesContainer}>
                            <h1 className={`${styles.topTitle} ${WorkSans600.className}`}>
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
                            <table className={`${styles.responsesTable}`}>
                                <thead>
                                    <tr className={`${styles.responsesTableHeader} ${WorkSans400.className}`}>
                                        <th>Name</th>
                                        <th>Team</th>
                                        <th>Score</th>
                                        <th>Type</th>
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
                                                    <tr key={index} className={`${styles.responsesTableRow} ${WorkSans500.className}`}>
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
                                <h1 className={`${styles.statisticsTitle} ${WorkSans400.className}`}>Statistics</h1>
                                <hr />
                                <button className={styles.switchDataButton} onClick={switchData}>
                                    Switch data table
                                </button>
                                <h1 className={`${styles.numberOfResponses} ${WorkSans400.className}`}># of Responses: {responses.length}</h1>
                                <h1 className={styles.latestResponse}>Latest: {responses[responses.length - 1]?.Name}</h1>
                                <h1 className={`${styles.timeToNextRefresh} ${WorkSans500.className}`}>Time to next refresh: {timeToNextRefresh.toFixed(1)}s</h1>
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
                                    <p className={`${styles.refreshTimeLabel} ${WorkSans400.className}`}>{isFetching ? "Fetching Data" : "Press enter for immediate refresh."}</p>
                                </span>
                            </div>
                        </div>
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