//Importamos telegraf
const { Telegraf } = require('telegraf');
const axios = require('axios');
//Definimos Token de nuestro Bot
const Token = '2074747800:AAGlVnEtQLdWQ5FkfzhBlftJD_78EzuAgIg';

//Instanciamos la clase Telegraf que recibe nuestro Token como parámetro
const bot = new Telegraf(Token);

//<----##################################################################        COMANDOS            ###############################################################---->
//Cuando el bot inicie, lance mensaje de bienvenido
bot.start((ctx) => {
    if (ctx.from.first_name == "Lisandro") {
        ctx.reply("Llego la para, llego la grasa");
    } else if (ctx.from.first_name == "Dereck") {
        ctx.reply("Bienvenido mi lider supremo");
    } else if (ctx.from.first_name == "Marlon"){
        ctx.reply
        ("SE ACEPTAN TRANSFERENCIAS",
            
        "Cédula: 402-0961415-1 Marlon Villalona",

        "Banco: Asociación Popular de Ahorros y Préstamos",
        "Cuenta de ahorros: 1023880512",

        "-------------------------------------------",

        "Banco: Popular",
        "Cuenta corriente: 823359237",

         "----------------------------------------",

         "Banco: Promerica Cuenta de ahorros: 11910200002107",

         "----------------------------------------",


         "Binance Pay ID: 287625501")
    }
     else {
        ctx.reply(`Bienvenido ${ctx.from.first_name} ${ctx.from.last_name}`);
    }
});


//Comando help
bot.help((ctx) => {
    ctx.reply(`Los comandos habilitados por el momento son: 
1. Llamar a todos: 
/everyone, /all, /venganto, /toElMundazo, /lista, /toelmundo.
2. Horario:
/Clases, /Horario, /clasesNormales. 
`);
})


//Crea comando nuevo (nombres, funcion)
bot.command(['everyone', 'Everyone', 'All', 'ALL', 'all', 'toElMundazo', 'toelmundo', 'venganTo', 'VenganTo', 'venganto', 'VENGANTO', 'LISTA', 'lista', 'Lista'], (ctx) => {
    ctx.reply(`Vengan to' mmñ @RafaelEmilioAbreu @dereckhidalgo @Lisandro6 @iamvilllalona @Pieritax @JenrryMonegro @Etiwal @BinanceFuturo`);
});

//Escuchar evento
bot.command(['clasesNormales', 'clases', 'CLASES', 'Clases', 'Horario', 'horario', 'HORARIO'], ctx => {
    ctx.reply(`El horario es: 
    Lunes: Desarrollo Emprendedores. (7-9pm),
    Martes: Programación Paralela. (8-10pm),
    Miércoles: IoT (6-10pm),
    Jueves: Ingeniería de Software. (6-8pm)/DevOps (8-10pm),
    `)
});

bot.command("DiseloTuBot", ctx => {
    ctx.reply("Te la bebiste Eduardo");
})
bot.command(["linkParalela", "LinkParalela", "linkparalela", "LINKPARALELA", "Linkparalela"], ctx => {
    ctx.reply("El link de la clase programación paralela es: https://meet.google.com/gcs-jwgg-tch?authuser=0");
})
bot.command(["linkIngenieria", "LinkIngenieria", "linkingenieria", "LINKINGENIERIA", "linkEvanyeline", "LinkEvanyeline", "linkevanyeline", "LINKEVANYELINE", "linkevangelion", "linkEvangelion", "LinkEvangelion"], ctx => {
    ctx.reply("El link de la clase Ingeniería de Software es: https://meet.google.com/asr-jzyw-hmn");
})


bot.command("links", ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Estos son los diferentes links para sus clases: \n ¿Cuál desea obtener?', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Programación Paralela", callback_data: "linkParalela" }, { text: "Ingeniería de Software", callback_data: "linkingenieria" }]
            ]
        }
    })
})

bot.command(["Insulto","INSULTO","insulto"], ctx => {
    let valor = getRandomArbitrary();
    if(valor >= 0.5){
        conseguirInsultoEs(ctx);
    }else{
        conseguirInsultoEn(ctx);
    }
    
})

bot.command(["Cumplido","CUMPLIDO","cumplido"], ctx => {
    
    conseguirCumplido(ctx);
   
        
    
    
bot.command(["ban", "BAN","Ban", "sacar","Sacar"], ctx=>{
    (async () => {
		await bot.sendMessage(ctx.message.chat.id, say(ctx.value), options(ctx.message));
	})();
})


//<----##################################################################        FUNCIONES            ###############################################################---->
conseguirInsultoEs = (ctx)=>{
    axios.get("https://evilinsult.com/generate_insult.php?lang=es&type=json")
    .then(res => ctx.reply(res.data.insult.toUpperCase()))
}
conseguirCumplido = (ctx)=>{
    axios.get("https://complimentr.com/api")
    .then(res => ctx.reply(res.data.compliment))
}
conseguirInsultoEn = (ctx)=>{
    axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
    .then(res => ctx.reply(res.data.insult.toUpperCase()))
}
//Numero random, XD.
function getRandomArbitrary() {
    return Math.random();
  }


  async function ban(bot, message, value) {
	const user = await bot.getChatMember(message.chat.id, message.from.id);
	if(message.reply_to_message == undefined){
		return;
	}
	if((user.status == 'creator') || (user.status == 'administrator')){
		try{
		bot.kickChatMember(message.chat.id, message.reply_to_message.from.id, {until_date : Math.round((Date.now() + ms(value[1] + " days"))/1000)});
			bot.deleteMessage(message.chat.id, message.message_id);
			bot.sendMessage(message.chat.id, `El usuario ${message.reply_to_message.from.username === undefined ? message.reply_to_message.from.first_name : '@'+message.reply_to_message.from.username} ha sido baneado durante: *${value[1]} dias.*`,options(message));
		}catch{bot.sendMessage(message.chat.id, `No he podido banear al usuario.`, options(message));}
	}else{
		bot.sendMessage(message.chat.id, "No eres administrador.");
	}
};

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