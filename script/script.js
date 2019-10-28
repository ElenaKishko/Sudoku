let len = 9;
let selectedLevel = 0;
let asciiOffset = 97;
let validUser = {
    userName: "abcd",
    userPassword: "1234"
};

let generatedSudokuMat = [[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0]];

let gameSudokuMat = [[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0]];

let matRows = [[1,2,3,4,5,6,7,8,9],
               [1,2,3,4,5,6,7,8,9],
               [1,2,3,4,5,6,7,8,9],
               [1,2,3,4,5,6,7,8,9],
               [1,2,3,4,5,6,7,8,9],
               [1,2,3,4,5,6,7,8,9],
               [1,2,3,4,5,6,7,8,9],
               [1,2,3,4,5,6,7,8,9],
               [1,2,3,4,5,6,7,8,9]];

let matCols = [[1,2,3,4,5,6,7,8,9], //col 1
               [1,2,3,4,5,6,7,8,9], //col 2
               [1,2,3,4,5,6,7,8,9], //col 3
               [1,2,3,4,5,6,7,8,9], //col 4
               [1,2,3,4,5,6,7,8,9], //col 5
               [1,2,3,4,5,6,7,8,9], //col 6
               [1,2,3,4,5,6,7,8,9], //col 7
               [1,2,3,4,5,6,7,8,9], //col 8
               [1,2,3,4,5,6,7,8,9]];//col 9

let matMats = [[1,2,3,4,5,6,7,8,9], // 97 <= row <= 99 && 1 <= col <= 3 
               [1,2,3,4,5,6,7,8,9], // 97 <= row <= 99 && 4 <= col <= 6
               [1,2,3,4,5,6,7,8,9], // 97 <= row <= 99 && 7 <= col <= 9
               [1,2,3,4,5,6,7,8,9], // 100 <= row <= 102 && 1 <= col <= 3
               [1,2,3,4,5,6,7,8,9], // 100 <= row <= 102 && 4 <= col <= 6
               [1,2,3,4,5,6,7,8,9], // 100 <= row <= 102 && 7 <= col <= 9
               [1,2,3,4,5,6,7,8,9], // 103 <= row <= 105 && 1 <= col <= 3
               [1,2,3,4,5,6,7,8,9], // 103 <= row <= 105 && 4 <= col <= 6
               [1,2,3,4,5,6,7,8,9]];// 103 <= row <= 105 && 7 <= col <= 9

let matMatsAfterFill = [[],[],[],[],[],[],[],[],[]];

function generateSudoku(){
    let randomIndex = 0;
    let cellValue = 0;
    let matMatsIndex = 0;
    let whileCounter = 0;
    let ifCounter = 0;

    for(let row = 97; row <= 105 ; row++){
        for(let col = 1; col <= len; col++){
            whileCounter = 0;
            //take random available value from row
            randomIndex = randomIndexGenerator(row);
            cellValue = matRows[row-97][randomIndex];

            //find out and save matMats index
            matMatsIndex = smallMatrixSelector(row,col);

            //find not used value in column and 3x3 matrix
            while(matCols[col-1].indexOf(cellValue) == -1 || matMats[matMatsIndex].indexOf(cellValue) == -1){
                randomIndex = randomIndexGenerator(row);         
                cellValue = matRows[row-97][randomIndex];
                whileCounter++;

                //reset current row (if generated random index 20 times and it doesn't fit)
                if(whileCounter > 20){
                    ifCounter++;
                    whileCounter = 0;
                    matRows[row-97] = [1,2,3,4,5,6,7,8,9];
                    for(let k = (col-2) ; k >= 0 ; k-- ){
                        let tempValue = generatedSudokuMat[row-97][k];
                        generatedSudokuMat[row-97][k] = 0;  
                        matCols[k].push(tempValue);
                        matMatsIndex = smallMatrixSelector(row,k+1);
                        matMats[matMatsIndex].push(tempValue);
                    }                    
                    col = 1;
                }

                //reset previous row (if reset to current row was done 10 times)
                if(ifCounter > 10){
                    ifCounter = 0;
                    matRows[row-97-1] = [1,2,3,4,5,6,7,8,9];
                    for(let k = 8 ; k >= 0 ; k-- ){
                        let tempValue = generatedSudokuMat[row-97-1][k];
                        generatedSudokuMat[row-97-1][k] = 0;
                        matCols[k].push(tempValue);
                        matMatsIndex = smallMatrixSelector(row-1,k+1);
                        matMats[matMatsIndex].push(tempValue);
                    }                    
                    col = 1;
                    row--;
                }
            } 

            //remove used value from row, column and matrix 3x3
            matRows[row-97] = shrinkArray(matRows[row-97], randomIndex);
            matCols[col-1] = shrinkArray(matCols[col-1], matCols[col-1].indexOf(cellValue));
            matMats[matMatsIndex] = shrinkArray(matMats[matMatsIndex], matMats[matMatsIndex].indexOf(cellValue));
            
            //save values to html and generatedSudokuMat
            generatedSudokuMat[row-97][col-1] = cellValue;
        }
    }  
}

function randomIndexGenerator(row){
    return Math.floor(Math.random() * matRows[row-97].length);
}

//function removes used value and shrinks the array
function shrinkArray(array,index){
    array[index] = array[array.length - 1];

    array.pop();
    return array;
}

//choose with which matrix 3x3 to work
function smallMatrixSelector(row,col){
    if( row >= 97 && row <= 99 ){
        if( col >= 1 && col <= 3 ){
            return 0;
        }
        else if( col >= 4 && col <= 6 ){
            return 1;
        }
        else{
            return 2;
        }
    }
    else if( row >= 100 && row <= 102 ){
        if( col >= 1 && col <= 3 ){
            return 3;
        }
        else if( col >= 4 && col <= 6 ){
            return 4;
        }
        else{
            return 5;
        }
    }
    else{
        if( col >= 1 && col <= 3 ){
            return 6;
        }
        else if( col >= 4 && col <= 6 ){
            return 7;
        }
        else{
            return 8;
        }
    }
}

//selects how many cells to display
function levelSelector(level){
    generateSudoku();
    let numberOfCellsToDisplay = 0;
    if(level == 1){
        numberOfCellsToDisplay = 60;
    }
    else if(level == 2){
        numberOfCellsToDisplay = 40;
    }
    else{
        numberOfCellsToDisplay = 20;
    }
    fillMatAccordingToLevel(numberOfCellsToDisplay);
    copyMatFromJsToHtml();
}

//dislay part of Sudoku to player
function copyMatFromJsToHtml(){
    for(let row = 97; row <= 105 ; row++){
        for(let col = 1; col <= len; col++){
            if(gameSudokuMat[row-97][col-1] != 0){
                document.getElementById(String.fromCharCode(row) + col).value = gameSudokuMat[row-97][col-1];
                document.getElementById(String.fromCharCode(row) + col).readOnly = true;
                document.getElementById(String.fromCharCode(row) + col).style.backgroundColor = '#E8F1BF';
            }
        }
    }
}

//fill in matrix gameSudokuMat
function fillMatAccordingToLevel(numberOfCellsToDisplay){
    let cellCounter = 0;
    let i = 0;
    let j = 0;

    while (cellCounter < numberOfCellsToDisplay){
        i = Math.floor(Math.random() * 9);
        j = Math.floor(Math.random() * 9);
        if(gameSudokuMat[i][j] == 0){
            gameSudokuMat[i][j] = generatedSudokuMat[i][j];
            cellCounter++;
        }
    }
}

//check if Sudoku is valid
function checkSudoku(){
    let len = 9;
    let validCounter = 0;
    let message = "You WIN! Sudoku is valid!";
    fill3MatsOfResult();

    //sort arrays of rows, cols and mats
    for(let i = 0;i < len;i++){
       matRows[i].sort();
       matCols[i].sort();
       matMatsAfterFill[i].sort();
    }

    for(let j = 0;j < len;j++){
        for(let k = 0;k < len - 1;k++){
            if(matRows[j][k] == matRows[j][k + 1] || matCols[j][k] == matCols[j][k + 1] || matMatsAfterFill[j][k] == matMatsAfterFill[j][k + 1]){
                message = "You lose. Try again!";
                break;
            }
        }                   
    }

    //show result to player and take to select level page
    alert(message);
    window.history.back();
}

//fill 3 mats of result
function fill3MatsOfResult(){
    let matMatsIndex = 0;
    let cellValue = 0;
    for(let row = 97; row <= 105 ; row++){
        for(let col = 1; col <= len; col++){
            cellValue = Number(document.getElementById(String.fromCharCode(row) + col).value);
            matRows[row-97][col-1] = cellValue;
            matCols[col-1][row-97] = cellValue;
            matMatsIndex = smallMatrixSelector(row,col);
            matMatsAfterFill[matMatsIndex].push(cellValue);
        }
    }
}
//check if user name and login are valid
function checkUserCredentials(){
    if(document.getElementById('userName').value == validUser.userName && document.getElementById('userPassword').value == validUser.userPassword){
        window.location.href = "create_game.html";
    }
    else {
        if(document.getElementById('userName').value != validUser.userName){
            document.getElementById('InvalidUsename').style.visibility = 'visible';
        }
        if(document.getElementById('userPassword').value != validUser.userPassword){
            document.getElementById('invalidPassword').style.visibility = 'visible';
        }
    }

    document.getElementById('userName').value = '';
    document.getElementById('userPassword').value = '';
}

//check which level was selected and call function levelSelector
function checkLevelSelection(){
    selectedLevel = document.location.search.replace(/^.*?\=/,'');

    if(selectedLevel == 1){
        levelSelector(1);
    }
    else if(selectedLevel == 2){
        levelSelector(2);
    }
    else{
        levelSelector(3);
    }   
}

//save selected level value
function setLevel(num){
    selectedLevel = num;
    document.getElementById('level').innerHTML = num;
    console.log('p:' + document.getElementById('level').innerHTML);
    
}

//fill sudoku again when pressed Again button
function fillAgain(){
    for(let row = 97; row <= 105 ; row++){
        for(let col = 1; col <= len; col++){
            if(gameSudokuMat[row-97][col-1] != 0){
                document.getElementById(String.fromCharCode(row) + col).value = gameSudokuMat[row-97][col-1];
                document.getElementById(String.fromCharCode(row) + col).readOnly = true;
                document.getElementById(String.fromCharCode(row) + col).style.backgroundColor = '#E8F1BF';
            }
            else{
                document.getElementById(String.fromCharCode(row) + col).value = '';
            }
        }
    }
}

//uncheck selected level
function uncheck(){
    document.getElementById('easy').checked = false;
    document.getElementById('medium').checked = false;
    document.getElementById('hard').checked = false;
}