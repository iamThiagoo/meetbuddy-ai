'use strict';

import OpenAI from 'openai';
import {initialMessagesFromBot, addUserMessageOnChat } from './message';

async function main() {
    
    const openai = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: import.meta.env['VITE_OPENAI_API_KEY'],
    });
    
    function onForm() {
        let form = document.querySelector('#prompt-form');
    
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            let prompt = document.querySelector('#prompt').value;
            
            addUserMessageOnChat(prompt);

            // const chatCompletion = await openai.chat.completions.create({
            //     messages: [{ role: 'user', content: 'Say this is a test' }],
            //     model: 'gpt-3.5-turbo',
            // });

            // for await (const chunk of stream) {
            //     process.stdout.write(chunk.choices[0]?.delta?.content || '');
            // }

            document.querySelector('#prompt').value = '';
        });
    }
    
    onForm();
    initialMessagesFromBot();
}

main();