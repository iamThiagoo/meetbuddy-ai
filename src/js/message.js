export async function initialMessagesFromBot() {
    // First message
    await addOpenAiMessageOnChat('Olá, sou o Meet! É um prazer em te conhecer 😄');

    // Second message
    await addOpenAiMessageOnChat('Meu objetivo  é ajudar você a anotar tudo sobre a sua Reunião, para isso indico gravar um aúdio, clicando no botão "Iniciar gravação de aúdio", localizado logo abaixo.');

    // Third message
    await addOpenAiMessageOnChat('Quando acabar, clique em "Enviar aúdio" que retornarei um resumo completo sobre ela.');

    // Fourth message
    await addOpenAiMessageOnChat('Havendo algum ajuste, me avise que ajustaremos para você!');
}


/**
 * create html user message
 * 
 * @param {string} message 
 * @returns 
 */
export function createUserMessageHtml(message) {
    let html = `
    <div class="flex justify-end w-6/12 mb-4 user-message">
        <div class="px-4 py-3 mr-2 text-white bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"> ${message} </div>
        <img
            src="/images/bot.jpg"
            class="object-cover w-8 h-8 rounded-full"
            alt=""
        />
    </div>`;

    return html;
}


/**
 * Add user message on chat (right)
 * 
 * @param {string} message
 * @returns {void}
 */
export function addUserMessageOnChat(message) {

    if (message == '') message = 'Não foi possível receber resposta do ChatGPT';
    
    let chatElement = document.querySelector("#chat");
    let chatElementContent = document.querySelector("#chat").innerHTML ?? '';
    let messageHtml = createUserMessageHtml(message);

    chatElement.innerHTML = chatElementContent + messageHtml;
}


/**
 * Create html user message
 * 
 * @param {string} message 
 * @returns {string}
 */
export function createOpenAiBoxMessageHtml() {

    let html = `
    <div class="flex justify-start mb-4 w-6/12 bot-message">
        <img src="/src/images/bot.jpg" class="ease-out duration-300 relative top-8 object-cover w-10 h-10 rounded-full" alt="" />
        <div class="message px-4 py-3 ml-2 text-white bg-cyan-700 rounded-br-3xl rounded-tr-3xl rounded-tl-lg" style="width: 10%">
            
            <!-- Dots Loaders -->
            <span class="block py-1.5 dots-loader">
                <div class="snippet" data-title="dot-flashing">
                    <div class="stage">
                        <div class="dot-flashing"></div>
                    </div>
                </div>
            </span>

        </div>
    </div>`;

    return html;
}


/**
 * 
 */
export async function insertMessageInBoxOpenAi(message) {
    return new Promise(resolve => {
        setTimeout(() => {
            let messages = document.querySelectorAll('.bot-message .message');
            let lastMessage = messages[messages.length - 1];

            let dots = lastMessage.querySelector('.dots-loader');

            if (dots) {
                dots.remove();
            }

            typeMessage(lastMessage, message, 40).then( () => {
                resolve();
            });
        }, 2000);
    });
}
    
    
async function typeMessage(element, message, delay) {    
    element.classList.add('type-anim');
    element.style.removeProperty('width');
    element.style.maxWidth = '100%';
    
    for (let i = 0; i < message.length; i++) {
        element.innerHTML += message[i];
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}


/**
 * 
 */
function addBotPhotoToLastConsecutiveBotMessages() {
    
    let chatElement = document.getElementById('chat');
    let messages = chatElement.querySelectorAll('.bot-message');

    let lastMessageIndex = messages.length - 1;

    // Verifica se há pelo menos duas mensagens do bot para processar
    if (lastMessageIndex >= 1) {

        // Loop reverso através das mensagens para encontrar a última mensagem consecutiva do bot
        for (let i = lastMessageIndex - 1; i >= 0; i--) {
            // Verifica se a mensagem atual é do bot
            let currentMessage = messages[i];
            let isBotMessage = currentMessage.classList.contains('bot-message');

            if (isBotMessage) {
                // Verifica se a próxima mensagem também é do bot
                let nextMessage = messages[i + 1];
                let isNextMessageBot = nextMessage && nextMessage.classList.contains('bot-message');

                if (isNextMessageBot) {
                    // Remove a foto do bot da mensagem atual
                    let botPhoto = currentMessage.querySelector('img');
                    if (botPhoto) {
                        botPhoto.remove();
                        currentMessage.querySelector('div').classList.add('ml-12');
                        currentMessage.querySelector('div').classList.add('rounded-bl-lg');
                    }
                } else {
                    // Adiciona a foto do bot na última mensagem consecutiva
                    currentMessage.insertAdjacentHTML('afterbegin', '<img src="/src/images/bot.jpg" class="ease-out duration-300 relative top-8 object-cover w-10 h-10 rounded-full" alt="">');
                    break;
                }
            }
        }
    }
}


/**
 * Add OpenAi response on chat (left)
 * 
 * @param {string} message
 * @returns 
 */
export async function addOpenAiMessageOnChat(message) {
    return new Promise(resolve => {
        if (!message) message = 'Não foi possível receber resposta do ChatGPT';

        let chatElement = document.querySelector("#chat");

        // Insere a box da mensagem com dots
        chatElement.insertAdjacentHTML('beforeend', createOpenAiBoxMessageHtml());

        // Verifica se é uma mensagem consecutiva do bot para esconder foto
        addBotPhotoToLastConsecutiveBotMessages();
        
        // Insere a mensagem no box realizando a substituição dos dots
        insertMessageInBoxOpenAi(message).then(() => {
            resolve();
        });
    });
}