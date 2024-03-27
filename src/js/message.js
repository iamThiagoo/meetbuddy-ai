/**
 * create html user message
 * 
 * @param {string} message 
 * @returns 
 */
export function createUserMessageHtml(message) {
    let html = `
    <div class="flex justify-end mb-4">
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
    let chatElementContent = document.querySelector("#chat").value;

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
    <div class="flex justify-start mb-4">
        <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" class="object-cover w-8 h-8 rounded-full" alt="" />
        <div class="px-4 py-3 ml-2 text-white bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl">
            ${message}
        </div>
    </div>`;

    return html;
}

/**
 * Add OpenAi response on chat (left)
 * 
 * @param {string} message
 * @returns 
 */
export function addOpenAiMessageOnChat(message) {

    if (message == '') message = 'Não foi possível receber resposta do ChatGPT';

    let chatElement = document.querySelector("#chat");
    let messageHtml = createOpenAiMessageHtml(message);

    chatElement.innerHTML = chatElementContent + messageHtml;
}