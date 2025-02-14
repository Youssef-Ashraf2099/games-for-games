let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */
  updateScoreElement(); 
  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    let choose='';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
    }

    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));
    document.querySelector('.js-button').innerHTML=result;
    document.querySelector('.js-round').innerHTML=`You ${
    `<img src="images/${playerMove}-emoji.png"  class="move-icon">`}<img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
    updateScoreElement();
//         alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
// Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
  }
  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  }
  function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper');
    } else if (event.key === 's') {
      playGame('scissors');
    } else if (event.key === 'a') {
      autoplay();
    }else if(event.key==='Backspace'){
      ResetScore();
    }
  });
   document.querySelector('.reset')
   .addEventListener('click',()=>{
    ResetScore();
   });
   function ResetScore() {
    const acceptRefuseHTML = `
      <p>
        Are you sure you want to reset the score? 
        <button class="js-accept-button">Yes</button> 
        <button class="js-refuse-button">No</button>
      </p>`;
    document.querySelector('.js-ac-re-output').innerHTML = acceptRefuseHTML;
  
    document.querySelector('.js-ac-re-output').addEventListener('click', (event) => {
      if (event.target.classList.contains('js-accept-button')) {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.js-ac-re-output').innerHTML = '';
      } else if (event.target.classList.contains('js-refuse-button')) {
        document.querySelector('.js-ac-re-output').innerHTML = '';
      }
    });
  }
  
  let intervalId;
   document.querySelector('.js-auto-button')
    .addEventListener('click',()=>{
      autoplay();
    });
  function autoplay(){
    const buttonElement=document.querySelector('.js-auto-button');
    if(buttonElement.innerHTML==='Auto play'){
      intervalId= setInterval(function (){
        const computerMove = pickComputerMove();
        const playerMove=pickComputerMove();
        let result = '';
        let choose='';
    
        if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
            result = 'You lose.';
          } else if (computerMove === 'paper') {
            result = 'You win.';
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
          }
    
        } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
            result = 'You win.';
          } else if (computerMove === 'paper') {
            result = 'Tie.';
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
          }
          
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie.';
          } else if (computerMove === 'paper') {
            result = 'You lose.';
          } else if (computerMove === 'scissors') {
            result = 'You win.';
          }
        }
    
        if (result === 'You win.') {
          score.wins += 1;
        } else if (result === 'You lose.') {
          score.losses += 1;
        } else if (result === 'Tie.') {
          score.ties += 1;
        }
        localStorage.setItem('score', JSON.stringify(score));
        document.querySelector('.js-button').innerHTML=result;
        document.querySelector('.js-round').innerHTML=`You ${
        `<img src="images/${playerMove}-emoji.png"  class="move-icon">`}<img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
        updateScoreElement();
    //         alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
    // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
      },1000);
      buttonElement.innerHTML='Stop playing';
    }else{
      clearInterval(intervalId);
      buttonElement.innerHTML='Auto play';
    }
  }
 
