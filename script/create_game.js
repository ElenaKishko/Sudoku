const init = function(e){
    let btn = document.querySelector('#playBtn');
    
    btn.addEventListener('click', function(){
        let level = Number(document.getElementById('level').innerHTML);
        
        if(level == 0){
            alert("Please select level ;)");
        }
        else{
            window.document.location = './game.html' + '?Level=' + document.getElementById('level').innerHTML;
        }
    });
};

document.addEventListener('DOMContentLoaded', function(){
    init();
});