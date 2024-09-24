const html =  document.querySelector("html");
const bt = document.querySelectorAll(".app__card-button");
const imagem = document.querySelector(".app__image");
const titulo = document.querySelector('.app__title');
const audio = new Audio('sons/videoplayback.m4a');
const audioPlay = new Audio('sons/play.wav');
const audioPause = new Audio('sons/pause.mp3');
const audioFim = new Audio('sons/beep.mp3');
const btnMusica = document.querySelector(".toggle-checkbox");
const start = document.querySelector("#start-pause");
const divTimer = document.querySelector("#timer");
let context = 'foco';
audio.loop = true;
audio.volume = 0.2;

let tempoDecorrido = 1500;
let intervaloId;

btnMusica.addEventListener('change', function(){
    if(this.checked){
        audio.play();
    }else{
        audio.pause();
    }
});

bt.forEach((btn, key) => {
    btn.addEventListener('click', () => {
        const ctx = btn.getAttribute('data-contexto');
        context = ctx;
        html.setAttribute('data-contexto', ctx);
        imagem.setAttribute('src', `Fokus/imagens/${ctx}.png`);
       
        bt.forEach((r) => {
            r.classList.remove('active');
        });
        btn.classList.add('active');
        switch(ctx){
            case 'foco':
                tempoDecorrido = 1500;
                titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
                mostraTempo();
            break;
            case 'descanso-curto':
                tempoDecorrido = 300;
                titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
                mostraTempo();
            break;
            case 'descanso-longo':
                tempoDecorrido = 900;
                titulo.innerHTML = `Hora de voltar à superfície,<br>
                <strong class="app__title-strong">faça uma pausa longa.</strong>`;
                mostraTempo();
            break;
            default:
                break;
        }
    });

});

const contagemRegressiva = () => {
    tempoDecorrido -= 1;
    
    if(tempoDecorrido == 0){
        audioFim.play();
        tempoDecorrido = context == 'descanso-curto' ? 300 : context == 'descanso-longo' ? 900 : 1500;
        mostraTempo();
        zerar();
        start.innerHTML = '<img class="app__card-primary-butto-icon" src="Fokus/imagens/play_arrow.png" alt=""><span>Começar</span>';
        return;
    }
    mostraTempo();
    
}

start.addEventListener('click', iniciar);

function iniciar(){
    start.innerHTML = '<img class="app__card-primary-butto-icon" src="Fokus/imagens/pause.png" alt=""><span>Pausar</span>';
    if(intervaloId){
        audioPause.play();
        zerar();
        start.innerHTML = '<img class="app__card-primary-butto-icon" src="Fokus/imagens/play_arrow.png" alt=""><span>Começar</span>';
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}
function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}
function mostraTempo(){
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
     divTimer.innerHTML = tempoFormatado;
}
mostraTempo();

