import axios from 'axios';

//<----##################################################################        FUNCIONES            ###############################################################---->

//This one, get de Insult from an api in Spanish
async function conseguirInsultoEs(ctx) {
    axios.get("https://evilinsult.com/generate_insult.php?lang=es&type=json")
        .then(res => ctx.reply(`${res.data.insult.toUpperCase()} 🤬`))
        .catch(err => console.log(err));
}

//This one, get de Insult from an api in English
async function conseguirInsultoEn(ctx) {
    axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
        .then(res => ctx.reply(`${res.data.insult.toUpperCase()} 🤬`))
        .catch(err => console.log(err));
}

//This one, get a compliment from an api in English.
const conseguirCumplido = (ctx) => {
    axios.get("https://complimentr.com/api")
        .then(res => ctx.reply(`${res.data.compliment}. ✨`))
        .catch(err => console.log(err));
}

//This one, get a bad joke
const conseguirChiste = async (ctx) => {
    const payload = {
        method: 'GET',
        url: 'https://dad-jokes.p.rapidapi.com/random/joke/png',
        headers: {
            'x-rapidapi-key': '714960d542msh31c5ebef0587ad3p137c5djsnefd7172a4251',
            'x-rapidapi-host': 'dad-jokes.p.rapidapi.com'
        }
    };
    const info = await axios.request(payload);
    const {setup, punchline, image} = info.data.body
    const chisteText = `${setup} \n${punchline}.`;
    ctx.reply(`${chisteText} 🤡`)
}

//throws tails or head, flip a coin.
const getFlip = async (ctx) => {
    const configuracion = {
        method: 'GET',
        url: 'https://coin-flip1.p.rapidapi.com/headstails',
        headers: {
            'x-rapidapi-key': '714960d542msh31c5ebef0587ad3p137c5djsnefd7172a4251',
            'x-rapidapi-host': 'coin-flip1.p.rapidapi.com'
        }
    };
    const info = await axios.request(configuracion);
    const { outcome } = info.data
    const coinText = `La moneda ha caído en: ${outcome == "Heads" ? "Cara." : "Cruz."}`;
    ctx.reply(coinText);
}

//This function get a number between 0 and 1.
function getRandomArbitrary() {
    return Math.random();
}


//With this function we can ban a member from the group.
async function kick(ctx) {
    await ctx.reply('Usted se la acaba de beber');
    for (let i = 3; i > 0; i--) {
        await ctx.reply(`${i}`);
    }
    try {
        await ctx.kickChatMember(ctx.message.reply_to_message.from.id)
    } catch (error) {
        ctx.reply("ERROR");
    }

}

//delete message, just for admins.
const deleteMessage = ctx => {
    if (ctx.message.reply_to_message) {
        ctx.getChatMember(ctx.message.from.id).then(res => {
            if (res.status == "creator" || res.status == "administrator" || ctx.message.chat.type == "private") {
                ctx.deleteMessage(ctx.message.reply_to_message.message_id)
                ctx.deleteMessage(ctx.message.message_id);
            } else {
                ctx.reply("Te falta calle 😈");
            }
        })
    } else {
        ctx.reply("MAMAÑEMA, DEBES RESPONDER UN MENSAJE PARA ELIMINARLO, ANIMAL. 🤬")
    }
}

//random quotes from Game Of Thrones
const getGOTquote = async (ctx) => {
    const configuracion = {
        method: 'GET',
        url: 'https://game-of-thrones-quotes.herokuapp.com/v1/random'
    };
    const info = await axios.request(configuracion);
    const { sentence, character } = info.data
    const { name } = character
    const Text = `"${sentence}"\n~ ${name} ❄️`;
    ctx.reply(Text);
}

//random quotes from anime
const getAnimequote = async (ctx) => {
    const configuracion = {
        method: 'GET',
        url: 'https://animechan.vercel.app/api/random'
    };
    const info = await axios.request(configuracion);
    const { anime, quote, character } = info.data
    const Text = `"${quote}"\n\n⛩️ ${character} from ${anime} ⛩️`;
    ctx.reply(Text);
}

const getCrypto = async (ctx) => {
    const config = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd'
    }
    const info = await axios.request(config);
    const { data } = info;
    const { usd } = data['shiba-inu'];
    ctx.reply("El precio de shiba es de: " + usd + "$ 🐐")
}

//Look an image from the request value
const imageSearch = async (ctx) =>{
    let message="Parodiadera memes";
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    if(inputArray.length>1){
        inputArray.shift();
        message = inputArray.join(" ");
    }
    var options = {
    method: 'GET',
    url: 'https://bing-image-search1.p.rapidapi.com/images/search',
    params: {q: message},
    headers: {
        'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com',
        'x-rapidapi-key': '714960d542msh31c5ebef0587ad3p137c5djsnefd7172a4251'
    }
    };

    const info =  await axios.request(options);
    const { contentUrl, name } = info.data.value[0];
    ctx.replyWithPhoto(contentUrl, {caption: `[🔭] He encontrado esta imagen:\n\n${name}`});
}
//Links
const linkparalela = async (ctx) =>{
    ctx.reply("El link de la clase programación paralela es: https://meet.google.com/gcs-jwgg-tch?authuser=0");
}
const linkingenieria = async (ctx) =>{
    ctx.reply("El link de la clase Ingeniería de Software es: https://meet.google.com/asr-jzyw-hmn");
}
export { conseguirInsultoEs, conseguirInsultoEn, conseguirCumplido, conseguirChiste, getFlip, getRandomArbitrary, kick, getGOTquote, getAnimequote, deleteMessage, getCrypto, linkparalela,linkingenieria, imageSearch };