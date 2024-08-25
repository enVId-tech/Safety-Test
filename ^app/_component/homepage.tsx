"use client";
import React from 'react';
import styles from '@/styles/home.module.scss';

export default function HomePage(): React.JSX.Element {
	const [selectedValue, setSelectedValue] = React.useState<string>("Safety-Test");
	const [availableSelections, setAvailableSelections] = React.useState<string[]>(["Safety Test"]);
	const [errorMessage, setErrorMessage] = React.useState<string>("");
	const [pageClosed, setPageClosed] = React.useState<boolean>(false);
	return (
		<div className={styles.homePage}>
			<h1>Home</h1>
		</div>
	);
}