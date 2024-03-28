export function initialMessagesFromBot() {

    // First message
    addOpenAiMessageOnChat('Olá, sou o <strong>Meet</strong>! É um prazer em te conhecer 😄');

    // Second message
    addOpenAiMessageOnChat('Meu objetivo <strong> é ajudar você a anotar tudo sobre a sua Reunião </strong>, para isso indico gravar um aúdio, clicando no botão <strong>"Iniciar gravação de aúdio"</strong>, localizado logo abaixo.');

    // Third message
    addOpenAiMessageOnChat('Quando acabar, clique em <strong>"Enviar aúdio"</strong> que retornarei um resumo completo sobre ela.');

    // Fourth message
    addOpenAiMessageOnChat('Havendo algum ajuste, me avise que ajustaremos para você!');
    
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
            src="/images/bot.png"
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
export function createOpenAiMessageHtml(message) {

    let html = `
    <div class="flex justify-start mb-4 w-6/12 bot-message">
        <img src="/src/images/bot.png" class="ease-out duration-300 relative top-8 object-cover w-10 h-10 rounded-full" alt="" />
        <div class="px-4 py-3 ml-2 text-white bg-cyan-700 rounded-br-3xl rounded-tr-3xl rounded-tl-lg">
            ${message}
        </div>
    </div>`;

    return html;
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
                    currentMessage.insertAdjacentHTML('afterbegin', '<img src="/src/images/bot.png" class="ease-out duration-300 relative top-8 object-cover w-10 h-10 rounded-full" alt="">');
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
export function addOpenAiMessageOnChat(message) {
    if (!message) message = 'Não foi possível receber resposta do ChatGPT';

    let chatElement = document.querySelector("#chat");
    let messageHtml = createOpenAiMessageHtml(message);

    chatElement.insertAdjacentHTML('beforeend', messageHtml);

    addBotPhotoToLastConsecutiveBotMessages();
}