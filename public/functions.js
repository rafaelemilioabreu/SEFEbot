import axios from 'axios';

//<----##################################################################        FUNCIONES            ###############################################################---->

//This one, get de Insult from an api in Spanish
async function conseguirInsultoEs(ctx){
    axios.get("https://evilinsult.com/generate_insult.php?lang=es&type=json")
        .then(res => ctx.reply(`${res.data.insult.toUpperCase()} 🤬`))
        .catch(err => console.log(err));
}

//This one, get de Insult from an api in English
async function conseguirInsultoEn(ctx){
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
		method : 'GET',
		url : 'https://dad-jokes.p.rapidapi.com/random/joke/png',
		headers : {
			'x-rapidapi-key': '714960d542msh31c5ebef0587ad3p137c5djsnefd7172a4251',
            'x-rapidapi-host': 'dad-jokes.p.rapidapi.com'
		}
	};
    const info = await axios.request(payload);
    const {setup, punchline, image} = info.data.body
    const chisteText = `${setup} \n${punchline}`;
    ctx.reply(`${setup}\n${punchline}. 🤡`)
}

//throws tails or head, flip a coin.
const getFlip = async (ctx) => {
    const configuracion = {
		method : 'GET',
		url : 'https://coin-flip1.p.rapidapi.com/headstails',
		headers : {
			'x-rapidapi-key': '714960d542msh31c5ebef0587ad3p137c5djsnefd7172a4251',
            'x-rapidapi-host': 'coin-flip1.p.rapidapi.com'
		}
	};
    const info = await axios.request(configuracion);
    const {outcome} = info.data
    const coinText = `La moneda ha caído en: ${outcome=="Heads"?"Cara.":"Cruz."}`;
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
    try{
        await ctx.kickChatMember(ctx.message.reply_to_message.from.id)
    }catch(error){
        ctx.reply("ERROR");
    }
    
}

//random quotes from Game Of Thrones
const getGOTquote = async (ctx) =>{
    const configuracion = {
		method : 'GET',
		url : 'https://game-of-thrones-quotes.herokuapp.com/v1/random'
	};
    const info = await axios.request(configuracion);
    const {sentence, character} = info.data
    const {name} = character
    const Text = `"${sentence}"\n~ ${name} ❄️`;
    ctx.reply(Text);    
}

//random quotes from anime
const getAnimequote = async (ctx) =>{
    const configuracion = {
		method : 'GET',
		url : 'https://animechan.vercel.app/api/random'
	};
    const info = await axios.request(configuracion);
    const {anime,quote, character} = info.data
    const Text = `"${quote}"\n\n⛩️ ${character} from ${anime} ⛩️`;
    ctx.reply(Text);    
}
export { conseguirInsultoEs, conseguirInsultoEn, conseguirCumplido, conseguirChiste, getFlip, getRandomArbitrary, kick, getGOTquote, getAnimequote };