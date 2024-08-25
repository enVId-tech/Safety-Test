"use server";
function validateUsername(username: string): boolean {
	try {
		switch (true) {
			case username === "":
				console.error("Please enter a username");
				return false;
			case !username.includes(" "):
				console.error("You must have a first and last name");
				return false;
			case username.split(" ")[0].length > 20 || username.split(" ")[1].length > 25:
				console.error("First name must be less than 20 characters and last name must be less than 25 characters");
				return false;
			case username.split(" ")[0].length < 1 || username.split(" ")[1].length < 1:
				console.error("First name must be more than 2 characters and last name must be more than 1 character");
				return false;
			case username.split(" ")[2] !== undefined:
				console.error("You can only have a first and last name");
				return false;
			case username.split(" ")[0][0] !== username.split(" ")[0][0].toUpperCase() || username.split(" ")[1][0] !== username.split(" ")[1][0].toUpperCase():
				console.error("First and last name must be capitalized");
				return false;
			default:
				return true;
		}
	} catch (error: unknown) {
		console.error("Function validateUsername failed");
		console.error(error as string);
		return false;
	}
}

async function saveUser(usernameVal: string): Promise<void> {
	try {
		if (!validateUsername(usernameVal)) {
			return;
		} else {
			const username: string = usernameVal;
			const saveUser: Response = await fetch("/home/save/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ username })
			});
			const response: string = await saveUser.text();
			console.log(response);
		}
	} catch (error: unknown) {
		console.error("Function saveUser failed");
		console.error(error as string);
	}
}

const mainFuncs: object = {
	validateUsername,
	saveUser
}

export {
	validateUsername,
	saveUser
}

export default mainFuncs;