let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-Btn");
let msgCon = document.querySelector(".msgCon");
let msg = document.querySelector("#msg");

let turno = true;


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turno = true;
    enableBoxes();
    msgCon.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "O";
            box.classList.add("o");
            turno = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turno = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o"); // Remove the X and O classes when resetting
    }
};


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Cogratulations! The Winner is ${winner}`;
    msgCon.classList.remove("hide");
};

const checkWinner = () => {
    let isTie = true;

    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val);
                showWinner(pos1val);
                disableBoxes();  // Disable the boxes if there is a winner
                return;
            }
        }
    }

    // Check if all boxes are filled
    for (let box of boxes) {
        if (box.innerText === "") {
            isTie = false;
            break;
        }
    }

    if (isTie) {
        msg.innerText = "Oh, It's a tie!";
        msgCon.classList.remove("hide");
        disableBoxes();  // Disable the boxes if it's a tie
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);