document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];

    // Define winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Create the Tic-Tac-Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
    }

    const resetButton = document.getElementById("reset-button"); // Define resetButton here

    // Function to handle a player's move
    function makeMove(index) {
        if (boardState[index] === "" && !checkWinner()) {
            boardState[index] = currentPlayer;
            board.children[index].textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus();

            if (checkWinner()) {
                highlightWinningCells();
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                status.textContent = `Player ${boardState[a]} wins!`;
                return true;
            }
        }

        if (!boardState.includes("")) {
            status.textContent = "It's a draw!";
            return true;
        }

        return false;
    }

    // Function to highlight the winning cells
    function highlightWinningCells() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                board.children[a].style.backgroundColor = 'rgba(89, 143, 188, 0.30)';
                board.children[b].style.backgroundColor = 'rgba(89, 143, 188, 0.30)';
                board.children[c].style.backgroundColor = 'rgba(89, 143, 188, 0.30)';
            }
        }
    }

    // Function to update the game status
    function updateStatus() {
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Event listener for the reset button
    resetButton.addEventListener("click", resetGame);

    // Function to reset the game
    function resetGame() {
        currentPlayer = "X";
        boardState = ["", "", "", "", "", "", "", "", ""];
        board.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
            cell.style.backgroundColor = ''; // Reset background color
        });
        updateStatus();
    }

    // Initialize the game
    updateStatus();
});

document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    const accountLink = document.getElementById("account-icon");
  
    if (isAuthenticated === 'true') {
        // User is logged in, show the account page
        accountLink.href = "/account-section/main-account-section/index.html";
    } else {
        // User is not logged in, show the make an account page
        accountLink.href = "/account-section/index.html";
    }
  });