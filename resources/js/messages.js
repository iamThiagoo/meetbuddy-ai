/**
 * 
 * @param {string} message 
 * @returns 
 */
export function addUserMessage(message) {
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
 * 
 * @param {string} message 
 * @returns 
 */
export function createOpenAiResponseHtml(message) {
    let html = `
    <div class="flex justify-start mb-4">
        <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" class="object-cover w-8 h-8 rounded-full" alt="" />
        <div class="px-4 py-3 ml-2 text-white bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl">
            ${message}
        </div>
    </div>`;

    return html;
}