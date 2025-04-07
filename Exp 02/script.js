function runGame(){
    number = Math.floor(Math.random()*101);
    user_no = prompt("Enter a number from 0 to 100.");
    let chances = 4;
    while(chances!=0){
        if(user_no == number){
            alert("Correct answer!");
            break; 
        }
        else if(user_no < number){
            if(number-user_no <= 10){
                user_no = prompt(`${number}Very close! Enter a slightly larger number.\nChances remaining:${chances}`)
                
            }
            else{
                user_no = prompt(`Not very close...Enter a larger number.\nChances remaining:${chances}`);
            }
            chances -=1;
        }
        else if(user_no > number){
            if(user_no-number <= 10){
                user_no = prompt(`Very close! Enter a slightly smaller number.\nChances remaining:${chances}`)
            }
            else{
                user_no = prompt(`Not very close...Enter a smaller number.\nChances remaining:${chances}`);
            }
            chances -=1;
        }
    }
    if(chances == 0) {
        alert("Game over! The correct number was " + number);
    }
}