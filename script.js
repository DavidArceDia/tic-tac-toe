(() => {
  "use strict";

  //gameboard "module"

  let gameboard = (() => {
    const resetGameboard = () => {
      let gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      console.log;
      return gameboard;
    };

    let gameboard = resetGameboard();

    const spaces = document.getElementsByClassName("space");

    const updateGameboard = () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          Array.from(spaces).forEach((space) => {
            if (space.getAttribute("xy") == `${j}${i}`) {
              gameboard[i][j] = space.innerText;
            }
          });
        }
      }
    };

    const renderGameboard = () => {
      updateGameboard();

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          Array.from(spaces).forEach((space) => {
            if (space.getAttribute("xy") == `${j}${i}`) {
              space.innerText = `${gameboard[i][j]}`;
            }
          });
        }
      }
    };

    const displayWinner = () => {
      let player =
        document.getElementById("playerTurn").getAttribute("playerTurn") == "1"
          ? "O"
          : "X";

      document.getElementById(
        "playerTurn"
      ).innerHTML = `<p>Player ${player} Wins!</p>`;

      document.getElementById("playerTurn").setAttribute("winner", `${player}`);
    };

    const displayDraw = () => {
      document.getElementById("playerTurn").innerHTML = `<p>It's a Draw!</p>`;

      document.getElementById("playerTurn").setAttribute("winner", `Draw`);
    };

    const checkForWinner = () => {
      if (
        gameboard[0][0] == gameboard[1][1] &&
        gameboard[0][0] == gameboard[2][2] &&
        gameboard[0][0] != ""
      ) {
        displayWinner();
        return;
      } else if (
        gameboard[0][2] == gameboard[1][1] &&
        gameboard[0][2] == gameboard[2][0] &&
        gameboard[0][2] != ""
      ) {
        displayWinner();
        return;
      }
      for (let i = 0; i < 3; i++) {
        if (
          gameboard[i][0] == gameboard[i][1] &&
          gameboard[i][0] == gameboard[i][2] &&
          gameboard[i][0] != ""
        ) {
          displayWinner();
          return;
        } else if (
          gameboard[0][i] == gameboard[1][i] &&
          gameboard[0][i] == gameboard[2][i] &&
          gameboard[0][i] != ""
        ) {
          displayWinner();
          return;
        } else {
          let columnCount = 0;

          for (let i = 0; i < 3; i++) {
            if (
              gameboard[0][i] != "" &&
              gameboard[1][i] != "" &&
              gameboard[2][i] != ""
            ) {
              columnCount += 1;
              if (columnCount == 3) {
                displayDraw();
              }
            }
          }
        }
      }
    };

    return { renderGameboard, checkForWinner, resetGameboard, gameboard };
  })();

  gameboard.renderGameboard();

  // Player factory function

  const Player = (playerNumber) => {
    const isPlayerTurn = (playerNumber) => {
      if (
        `${playerNumber}` ==
        document.getElementById("playerTurn").getAttribute("playerTurn")
      ) {
        return true;
      } else {
        return false;
      }
    };

    const switchPlayerTurn = (playerNumber) => {
      if (playerNumber == 1) {
        document.getElementById("playerTurn").setAttribute("playerTurn", "2");
        document.getElementById("playerTurn").innerHTML =
          "<p>It's Player O's Turn</p>";
      } else {
        document.getElementById("playerTurn").setAttribute("playerTurn", "1");
        document.getElementById("playerTurn").innerHTML =
          "<p>It's Player X's Turn</p>";
      }
    };

    const isSpaceTaken = (e) => {
      if (e.target.innerText == "X" || e.target.innerText == "O") {
        return true;
      } else {
        return false;
      }
    };

    const isGameOver = () => {
      if (
        document.getElementById("playerTurn").getAttribute("winner") !=
        undefined
      ) {
        return true;
      } else {
        return false;
      }
    };

    const chooseSpace = (e) => {
      if (
        !isSpaceTaken(e) &&
        isGameOver() == false &&
        isPlayerTurn(playerNumber)
      ) {
        let space = e.target;
        if (playerNumber == 1) {
          space.innerText = "X";
          switchPlayerTurn(playerNumber);
        } else {
          space.innerText = "O";
          switchPlayerTurn(playerNumber);
        }
      } else {
        return;
      }
    };

    return { chooseSpace };
  };

  const playerX = Player(1);
  const playerO = Player(2);

  document.getElementById("innerBoard").addEventListener("click", (e) => {
    if (e.target.className == "space") {
      playerX.chooseSpace(e);
      playerO.chooseSpace(e);

      gameboard.renderGameboard();
      gameboard.checkForWinner();
    }
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    let spaces = document.getElementsByClassName("space");

    Array.from(spaces).forEach((space) => {
      space.innerText = "";
    });

    document.getElementById("playerTurn").setAttribute("playerTurn", "1");
    document.getElementById("playerTurn").innerHTML =
      "<p>It's Player X's Turn</p>";
    document.getElementById("playerTurn").removeAttribute("winner");

    gameboard.renderGameboard();
  });
})();
