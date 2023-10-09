import React from 'react';
import { Helmet as Head, HelmetProvider as HTML } from "react-helmet-async";

interface ClassHelmetProps {
    title?: string;
}



const PageTitle: React.FC<ClassHelmetProps> = (props: ClassHelmetProps) => {
    if (props.title === undefined) {
        return (
            <HTML>
                <Head>
                    <title>OA Robotics - Testing</title>
                </Head>
            </HTML>
        );
    } else {
        return (
            <HTML>
                <Head>
                    <title>OA Robotics - {props.title}</title>
                </Head>
            </HTML>
        );
    }
}

export default PageTitle;