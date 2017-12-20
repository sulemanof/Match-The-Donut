class Game {
    constructor() {
        this.template = '';
        this.difficulty = '';
        this.lastCard;
        this.gameTime;
        this.openedCards = 0;
        this.deck = 0;
    }

    gameInit() {
        let controlTab = document.querySelector('.control-buttons'),
            templatesList = document.querySelector('.templates-list'),
            difficultyList = document.querySelector('.difficulty-list'),
            newGame = document.querySelector('.new-game'),
            tryAgain = document.querySelector('.winner-buttons').children[0],
            mainMenu = document.querySelector('.winner-buttons').children[1];

        controlTab.addEventListener('click', this.showList);
        templatesList.addEventListener('click', this.selectTemplate.bind(this));
        difficultyList.addEventListener('click', this.selectDifficulty.bind(this));
        newGame.addEventListener('click', this.startGame.bind(this));
        tryAgain.addEventListener('click', this.restart.bind(this));
        mainMenu.addEventListener('click', this.mainPage.bind(this));
    }

    showList(e) {
        let target = e.target;
        if (target.nextElementSibling) {
            target.nextElementSibling.classList.toggle('visible');
        }
    }

    selectTemplate(e) {
        if (e.target.classList.contains('templates-list')) return;
        if (this.template) {
            let arr = e.target.parentNode.children;
            for (let i = 0; i < arr.length; i++) {
                arr[i].classList.remove('choosen');
            }
        }
        this.template = e.target.id.split('-')[1];
        e.target.classList.add('choosen');
    }

    selectDifficulty(e) {
        if (e.target.classList.contains('difficulty-list')) return;
        if (this.difficulty) {
            let arr = e.target.parentNode.children;
            for (let i = 0; i < arr.length; i++) {
                arr[i].classList.remove('choosen');
            }
        }
        this.difficulty = e.target.id.split('-')[1];
        e.target.classList.add('choosen');
    }

    startGame() {
        if (!this.template) {
            alert('Please, choose a template!');
            return;
        }

        if (!this.difficulty) {
            alert('Please, choose a difficulty!');
            return;
        }else {
            let size = 'level-' + this.difficulty;
            document.querySelector('.game-area').classList.add(size);
        }

        let array = [],
            index,
            result = '';

        for (let i = 0; i < this.difficulty/2; i++) {        
            array.push(i);
            array.push(i);
        }

        for (let i = 0; i < this.difficulty; i++) {
            index = parseInt(Math.random() * array.length);
            result += `<div class="wrap"><div class="card"><figure class="template-${this.template}"></figure><figure class="donut-${array[index]}"></figure></div></div>`;
            array.splice(index, 1);
        }

        let cardField = document.querySelector('.game-area');
        document.querySelector(".rules-area").classList.add('invisible');
        cardField.innerHTML = result;
        cardField.addEventListener('click', this.cardClick.bind(this));
        this.timer(0);
    }

    timer(arg) {
        if (this.deck == this.difficulty) {
            document.getElementById('timer').innerHTML = '';
            return;
        }
        this.gameTime = arg;
        document.getElementById('timer').innerHTML = `<span>Your time: </span> ${this.gameTime}`;
        this.gameTime++;
        setTimeout(this.timer.bind(this, this.gameTime), 1000);
    }

    cardClick(e) {
        if(this.openedCards == 2 || e.target === this.lastCard  || !e.target.nextElementSibling) return;
        e.target.parentNode.classList.add('flipped');
        
        function flipCards() {
            e.target.parentNode.classList.remove('flipped');
            this.lastCard.parentNode.classList.remove('flipped');
            this.lastCard = '';
            this.openedCards = 0;
        }

        function hideCards() {
            e.target.parentNode.children[1].classList.add('invisible');
            this.lastCard.parentNode.children[1].classList.add('invisible');
            this.lastCard = '';
            this.openedCards = 0;
            this.deck += 2;
            if (this.deck == this.difficulty) {
                this.finishGame();
            }
        }

        if (!this.lastCard) {
            this.lastCard = e.target;
            this.openedCards = 1;
        } else if (this.lastCard.nextElementSibling.className === e.target.nextElementSibling.className) {
            if (e.target === this.lastCard) return;
            this.openedCards = 2;
            setTimeout(hideCards.bind(this), 800);                
        } else {
            this.openedCards = 2;
            setTimeout(flipCards.bind(this), 700);
        }
    }

    finishGame() {
        document.querySelector('.game-area').innerHTML = '';
        document.querySelector('.game-area').className = 'game-area';
        document.querySelector('#time-score').innerHTML = `Your time is ${this.gameTime} sec!`;
        document.querySelector('.winner-message').classList.add('visible');
    }

    restart() {
        this.lastCard = '';
        this.gameTime = 0;
        this.openedCards = 0;
        this.deck = 0;
        document.querySelector('.winner-message').classList.remove('visible');
        this.startGame();
    }

    mainPage() {
        document.querySelector('.winner-message').classList.remove('visible');
        let buttons = document.querySelectorAll('.buttons');
        if (buttons[0].children[1].classList.contains('visible')) {
            buttons[0].children[1].classList.remove('visible');
        }
        if (buttons[1].children[1].classList.contains('visible')) {
            buttons[1].children[1].classList.remove('visible');
        }
        document.querySelector(".rules-area").classList.remove('invisible');
        this.template = '';
        this.difficulty = '';
        this.lastCard = 0;
        this.gameTime = 0;
        this.openedCards = 0;
        this.deck = 0;
    }
}
