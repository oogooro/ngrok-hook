import undici from 'undici';
import { EmbedBuilder, WebhookClient } from 'discord.js';
import { config } from 'dotenv';
import { NgrokAPIRequestSuccess, ServerStatusAPIRequestSuccess } from './types';
config();

const hook = new WebhookClient({ url: process.env.HOOK_URL, });
let previousHostport = '';
let serverOnline = null;

const fetch = async () => {
    const ngrokData: NgrokAPIRequestSuccess = await (await undici.request('https://api.ngrok.com/endpoints', {
        headers: [
            'Ngrok-Version', '2',
            'Authorization', `Bearer ${process.env.NGROK_KEY}`,
        ],
    })).body.json();
    
    if (ngrokData.endpoints.length) {
        const currentHostport = ngrokData.endpoints[0].hostport;

        console.log(ngrokData.endpoints[0].hostport);

        const serverStatus: ServerStatusAPIRequestSuccess = await (await undici.request(`https://api.mcsrvstat.us/2/${currentHostport}`)).body.json();

        if ((serverStatus.online !== serverOnline) || (currentHostport !== previousHostport)) {
            previousHostport = currentHostport;
            serverOnline = serverStatus.online;

            const embed = new EmbedBuilder()
                .setTitle(currentHostport)
                .setDescription(`Serwer jest ${serverOnline ? `**ONLINE**\nGraczy: **${serverStatus.players.online}**` : '**OFFLINE**'}`)
                .setColor(serverOnline ? '#00ff00' : '#ff0000')
            
            hook.send({
                embeds: [ embed ],
            });
        }
    }
}

fetch()
    .then(() => setInterval(() => fetch().catch(console.error), 30000))
    .catch(console.error);