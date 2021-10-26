//Importamos telegraf
const {Telegraf} = require('telegraf');

//Definimos Token de nuestro Bot
const Token = '2074747800:AAGlVnEtQLdWQ5FkfzhBlftJD_78EzuAgIg';

//Instanciamos la clase Telegraf que recibe nuestro Token como parámetro
const bot = new Telegraf(Token);


//Cuando el bot inicie, lance mensaje de bienvenido
bot.start((ctx)=>{
    console.log(ctx.chatMember);
    if(ctx.from.first_name =="Lisandro"){
        ctx.reply("Lisandro va de ahí mmñ");
    }else if(ctx.from.first_name =="Dereck"){
        ctx.reply("Bienvenido mi lider supremo");
    }else{
        ctx.reply(`Bienvenido ${ctx.from.first_name} ${ctx.from.last_name}`);
    }
});


//Comando help
bot.help((ctx)=>{
    ctx.reply(`Los comandos habilitados por el momento son:
    1. Llamar a todos: 
    /everyone, /all, /venganto, /toElMundazo, /lista, /toelmundo    
    `);
})


//Crea comando nuevo (nombres, funcion)
bot.command(['everyone', 'Everyone', 'All', 'ALL', 'all', 'toElMundazo', 'toelmundo','venganTo', 'VenganTo','venganto','VENGANTO','LISTA', 'lista', 'Lista'],(ctx)=>{
    ctx.reply(`Vengan to' mmñ @RafaelEmilioAbreu @dereckhidalgo @Lisandro6 @iamvilllalona @Pieritax @JenrryMonegro @Etiwal @BinanceFuturo`);
});

//Escuchar evento
bot.command('clasesNormales',ctx => {
    ctx.reply(`El horario es: 
    Lunes: Desarrollo Emprendedores. (7-9pm),
    Martes: Programación Paralela. (8-10pm),
    Miércoles: IoT (6-10pm),
    Jueves: Ingeniería de Software. (6-8pm)/DevOps (8-10pm),
    `)
});


//Eventos con on
// bot.on('text',ctx=>{
//     ctx.reply('Texteando');
// })


//Escuchar sticker
// bot.on('sticker', ctx => {
//     ctx.reply('Cuidao con losetikel');
// })
//Ejecuta el bot
bot.launch();