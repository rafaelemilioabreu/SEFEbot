
//Permite importar y usar require. Se especifica "type":"module" en el package.json
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
//Importamos telegraf
const { Telegraf } = require('telegraf');
const quotes = require('./public/quotes.json');
import { conseguirInsultoEs, conseguirInsultoEn, 
    conseguirCumplido, conseguirChiste, getFlip, 
    getRandomArbitrary, kick, getGOTquote, getAnimequote } from './public/functions.js';

//Definimos Token de nuestro Bot
const Token = '2074747800:AAGlVnEtQLdWQ5FkfzhBlftJD_78EzuAgIg';

//Instanciamos la clase Telegraf que recibe nuestro Token como parámetro
const bot = new Telegraf(Token);

//<----##################################################################        COMANDOS            ###############################################################---->

//Say something custom by a person. (Beta Version of this command)
bot.start((ctx) => {
    if (ctx.from.first_name == "Lisandro") {
        ctx.reply("Llego la para, llego la grasa");
    } else if (ctx.from.first_name == "Dereck") {
        ctx.reply("Bienvenido mi lider supremo");
    } else if (ctx.from.first_name == "Marlon") {
        ctx.reply
            (`SE ACEPTAN TRANSFERENCIAS,
            
    Cédula: 402-0961415-1 Marlon Villalona

    Banco: Asociación Popular de Ahorros y Préstamos
    Cuenta de ahorros: 1023880512

    -------------------------------------------

    Banco: Popular
    Cuenta corriente: 823359237

    ----------------------------------------

    Banco: Promerica 
    Cuenta de ahorros: 11910200002107

    ----------------------------------------

    Binance Pay ID: 287625501`)
    }
    else {
        ctx.reply(`Bienvenido ${ctx.from.first_name} ${ctx.from.last_name}`);
    }
});


//Throws a message with the command list
bot.help((ctx) => {
    ctx.reply(`Los comandos habilitados por el momento son: 
1. Llamar a todos: 
/everyone, /all, /venganto, /toElMundazo, /lista, /toelmundo.
2. Horario:
/Clases, /Horario, /clasesNormales. 
`);
})

//Mention all the people in the group
bot.command(['everyone', 'Everyone', 'All', 'ALL', 'all', 'toElMundazo', 'toelmundo', 'venganTo', 'VenganTo', 'venganto', 'VENGANTO', 'LISTA', 'lista', 'Lista'], (ctx) => {
    ctx.reply(`Vengan to' mmñ @RafaelEmilioAbreu @dereckhidalgo @Lisandro6 @iamvilllalona @Pieritax @JenrryMonegro @Etiwal @BinanceFuturo`);
});

//throws the schedule
bot.command(['clasesNormales', 'clases', 'CLASES', 'Clases', 'Horario', 'horario', 'HORARIO'], ctx => {
    ctx.reply(`
    \n
    \n⚜️              Horario de clases              ⚜️
    \n#############################
    \n                              Lunes:
    \n    Desarrollo Emprendedores. (7-9pm)
    \n#############################
    \n                             Martes:        
    \n        Programación Paralela. (8-10pm)
    \n#############################
    \n                            Miércoles:    
    \n                          IoT (6-10pm)
    \n#############################
    \n                               Jueves:          
    \n         Ingeniería de Software. (6-8pm)
    \n                      DevOps (8-10pm)
    \n#############################
    `)
});

//throws a message: "Te la bebiste" + the name of the person you replied to.
bot.command(["DiseloTuBot", "diselotubot","DISELOTUBOT","diselo"], ctx => {
    if(ctx.message.reply_to_message){
        ctx.reply(`Te la bebiste ${ctx.message.reply_to_message.from.first_name}. 😈`);
    }else{
        ctx.reply("Se la bebieron toito. 😈");
    }
    
})

////gets the Parallel programming link
bot.command(["linkParalela", "LinkParalela", "linkparalela", "LINKPARALELA", "Linkparalela"], ctx => {
    ctx.reply("El link de la clase programación paralela es: https://meet.google.com/gcs-jwgg-tch?authuser=0");
})

//gets the Software Engineering link
bot.command(["linkIngenieria", "LinkIngenieria", "linkingenieria", "LINKINGENIERIA", "linkEvanyeline", "LinkEvanyeline", "linkevanyeline", "LINKEVANYELINE", "linkevangelion", "linkEvangelion", "LinkEvangelion"], ctx => {
    ctx.reply("El link de la clase Ingeniería de Software es: https://meet.google.com/asr-jzyw-hmn");
})

//It's supossed to be, a menu with the links of the classes 
bot.command("links", ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Estos son los diferentes links para sus clases: \n ¿Cuál desea obtener?', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Programación Paralela", callback_data: "linkParalela" }, { text: "Ingeniería de Software", callback_data: "linkingenieria" }]
            ]
        }
    })
})


// This command get a insult, use conseguirInsultoEs and ConseguirInsultoEn functions.
bot.command(["Insulto", "INSULTO", "insulto"], ctx => {
    let valor = getRandomArbitrary(0, 1);
    if (valor >= 0.5) {
        conseguirInsultoEs(ctx);
    } else {
        conseguirInsultoEn(ctx);
    }

})

//Pin a message with a reply in the target
bot.command("pin", ctx=>{
    try{
        ctx.pinChatMessage(ctx.message.reply_to_message.message_id);
    }catch(error){
        ctx.reply("MAMAÑEMA, DEBES RESPONDER UN MENSAJE PARA PINEARLO, ANIMAL. 🤬");
    }
    
})

//Unpin a message with a reply in the target
bot.command("unpin", ctx=>{
    try{
        ctx.unpinChatMessage(ctx.message.reply_to_message.message_id);
    }catch(error){
        ctx.reply("MAMAÑEMA, DEBES RESPONDER UN MENSAJE PARA UNPINEARLO, ANIMAL. 🤬");
    }
})

//This command get  a compliment, use conseguirCumplido function.
bot.command(["Cumplido", "CUMPLIDO", "cumplido"], ctx => {
    conseguirCumplido(ctx);
})

// This command get  a bad joke, use conseguirChiste function.
bot.command(["Chiste", "CHISTE", "chiste"], ctx => {
    conseguirChiste(ctx);
})

// This command ban  a member from group, use de kick function.
bot.command(['kick','ban','palloby','pafuera'], ctx => {
    ctx.getChatMember(ctx.message.from.id).then(res => {
        if (res.status == 'creator' || res.status == 'administrator') {
            kick(ctx);
        }
        else {
            ctx.reply('Te falta calle 😈')
        }
    });
})
//Get heads or tails
bot.command(["flipcoin", "coin","flip"], ctx =>{
    getFlip(ctx);
})

//call the got quote
bot.command("GOT", (ctx)=>{
    getGOTquote(ctx);
})

//throws a quote from a random anime
bot.command(["anime","ANIME","otaku","OTAKU"], ctx=>{
    getAnimequote(ctx);
})

//this function throws a Quote every 6 hours.
let quote = null;
setInterval(() => {
	 quote = quotes[Object.keys(quotes)[Math.floor(Math.random()*Object.keys(quotes).length)]];
	bot.telegram.sendMessage(-1001325613452, `“*${quote.text}*” - ${quote.author}`, {parse_mode: "Markdown"});
}, 1000 * (3600 * 2)); 

//launc the bot
bot.launch();