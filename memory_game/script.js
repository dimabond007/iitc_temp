
$( document ).ready(function() {
    let gameBoard = $( '#gameBoard' );
    let infoUser = null;
    let divSizes = null;
    let userName = null;
    let size = null;
    let uniquePlace = [];



    function createOptionsInfo(){
        gameBoard.append('<div class="info_user"></div>')
        infoUser = $('.info_user');
        infoUser.append('<h1>Welcome to the memory game!</h1>')
        infoUser.append('<input type="text" placeholder="Please enter your name">')
        infoUser.append('<div>Please choose the size of the board</div>');
        infoUser.append('<div id="sizes"></div>');
        divSizes = $('#sizes');

        for (let i = 4; i <= 10 ; i++) {
            if(i*i%2==0){
                divSizes.append(`<button class="size" data-size="${i}">${i}x${i}</button>`);
            }
        }

        $('.size').on('click',function(e) {
            $('.size').attr('checked', false);
            $(this).attr('checked', true);
        });

        infoUser.append('<button id="startGame">Start Game</button>');
        $('#startGame').on('click',function(e) {
            userName = infoUser.find('input').val();
            size = divSizes.find('button[checked]').attr( "data-size" );

            if (size!=null && userName!="") {
                infoUser.remove();
                startGame();
            }
            else {
                alert('Please enter your name and choose the size of the board');
            }
        });
    }

    function startGame(){
        createGameBoard();
    }

    function createGameBoard(){
        gameBoard.addClass('startGame');
        genereteBoard();
        let indexOfPlace = 0;
        for (var i=0; i<size; i++) {
            gameBoard.append('<div class="row"></div>');
            for (var j=0; j<size; j++) {
                gameBoard.find('.row').last().append(`<div class="flip-container cell" data-index-image="${uniquePlace[indexOfPlace]}">
                <div class="flipper">
                    <div class="front">
                        
                    </div>
                    <div class="back">
                        <img src="./images/img${uniquePlace[indexOfPlace]}.jpg"/>
                    </div>
                </div>
            </div>`);
            indexOfPlace ++;
            }
        }
        $('.cell').on('click', function clickCell() {

            console.log($('.cell.hover:not([right="true"])'));
            console.log($(this));
            console.log($('.cell.hover:not([right="true"])') != $(this));
            console.log($('.cell:not([right="true"])').hasClass('hover') && $('.cell.hover:not([right="true"])') != $(this));
            if($('.cell:not([right="true"])').hasClass('hover') && $('.cell.hover:not([right="true"])') != $(this)){
                $('.cell').unbind();

                let dataOfFirst = $('.cell.hover:not([right="true"])').data('index-image');
                let dataOfSecond = $(this).data('index-image');
                this.classList.toggle('hover');
                
                if (dataOfFirst === dataOfSecond){
                    $('.cell[data-index-image='+dataOfFirst+']').attr('right', true);
                    $('.cell[data-index-image='+dataOfFirst+']').unbind();
                    if ($('.cell[right="true"]').length == $('.cell').length){
                        setTimeout(gemeOver, 500);
                    }
                }
                else{
                    setTimeout(function() {
                        $('.cell:not([right="true"])').removeClass('hover');
                        $('.cell:not([right="true"])').bind('click',clickCell);
                    }, 1000);

                }
            }   
            else{
                if(!this.classList.contains('hover')){
                    this.classList.add('hover');
                }
            }
        });
    }
    
    function countInArray(array, what) {
        return array.filter(item => item == what).length;
    }

    function genereteBoard() {
        while   (uniquePlace.length < size*size) {
            let num = Math.floor(Math.random() * (size*size/2));
            
            if (countInArray(uniquePlace,num) < 2) {
                uniquePlace.push(num);
            }
        }
    }

    function gemeOver() {
        alert(`Congratulations, ${userName}!`);
        gameBoard.removeClass('startGame');
        gameBoard.empty();
        createOptionsInfo();
    }
    

    createOptionsInfo()
});