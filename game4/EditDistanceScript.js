/* filepath: /c:/Users/lloye/Downloads/games-for-games/game4/EditDistanceScript.js */
function generateRandomString(length) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let s = generateRandomString(Math.floor(Math.random() * 6) + 5);
let t = generateRandomString(Math.floor(Math.random() * 6) + 5);
let steps = [];
let currentStep = 0;
let trials = 3;
let minOperations = 0;

document.getElementById("problem").innerText = s;
document.getElementById("target").innerText = t;

function editDistance(s, t) {
    let n = s.length, m = t.length;
    let dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        dp[0][i] = i;
    }
    for (let i = 0; i <= n; i++) {
        dp[i][0] = i;
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    minOperations = dp[n][m];

    let i = n, j = m;
    while (i > 0 && j > 0) {
        if (s[i - 1] === t[j - 1]) {
            i--; j--;
        } else if (dp[i][j] === 1 + dp[i - 1][j]) {
            steps.push("DELETE " + i);
            i--;
        } else if (dp[i][j] === 1 + dp[i][j - 1]) {
            steps.push("INSERT " + (i + 1) + " " + t[j - 1]);
            j--;
        } else {
            steps.push("REPLACE " + i + " " + t[j - 1]);
            i--; j--;
        }
    }
    while (i > 0) {
        steps.push("DELETE " + i);
        i--;
    }
    while (j > 0) {
        steps.push("INSERT " + (i + 1) + " " + t[j - 1]);
        j--;
    }
}

function checkGuess() {
    let guess = parseInt(document.getElementById("guess").value);
    if (guess === minOperations) {
        document.getElementById("message").innerText = "Correct! The minimum number of operations is " + minOperations;
    } else {
        trials--;
        if (trials > 0) {
            document.getElementById("message").innerText = "Incorrect. You have " + trials + " trials left.";
        } else {
            document.getElementById("message").innerText = "You have lost. The correct answer is " + minOperations;
            document.getElementById("guess").disabled = true;
            document.getElementById("checkGuess").disabled = true;
        }
    }
}

function applyNextStep() {
    if (currentStep < steps.length) {
        let step = steps[currentStep];
        let [action, index, char] = step.split(" ");
        let string1 = document.getElementById("problem").innerText;

        if (action === "DELETE") {
            string1 = string1.slice(0, index - 1) + string1.slice(index);
        } else if (action === "INSERT") {
            string1 = string1.slice(0, index - 1) + char + string1.slice(index - 1);
        } else if (action === "REPLACE") {
            string1 = string1.slice(0, index - 1) + char + string1.slice(index);
        }

        document.getElementById("problem").innerText = string1;
        currentStep++;
    }
}

editDistance(s, t);