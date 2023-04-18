import { bot } from "./public/config.js";
import { quotes } from "./public/HardData/quotes.js";
import { datos, infoComandos } from "./public/HardData/info.js";
import functions from "./public/functions.js";
import { getTodayDate } from "./Utils/utils.js";

//<----##################################################################        COMANDOS            ###############################################################---->

//Say something custom by a person. (Beta Version of this command)
bot.start((ctx) => {
  const { first_name, last_name } = ctx.from;
  const { Bienvenida } = datos[first_name];
  !Bienvenida
    ? ctx.reply(`Bienvenid@ ${first_name} ${last_name}`)
    : ctx.reply(Bienvenida);
});
//Show BankAccount
bot.command(["Deposito", "Cuenta", "cuenta", "deposita", "deposito"], (ctx) => {
  const { first_name } = ctx.from;
  const { Cuenta } = datos[first_name];
  !Cuenta
    ? ctx.reply(`Su cuenta no ha sido registrada en nuestro sistema...`)
    : ctx.reply(Cuenta);
});

//Throws a message with the command list
bot.help((ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    infoComandos,
    {
      parse_mode: "Markdown",
    }
  );
});

bot.command(["All", "ALL", "all"], (ctx) => {
  functions.getUser(ctx);

});


//throws a message: "Te la bebiste" + the name of the person you replied to.
bot.command(["DiseloTuBot", "diselotubot", "DISELOTUBOT", "diselo"], (ctx) => {
  if (ctx.message.reply_to_message) {
    ctx.reply(
      `Te la bebiste ${ctx.message.reply_to_message.from.first_name}. 😈`
    );
  } else {
    ctx.reply("Se la bebieron toito. 😈");
  }
});

// This command get a insult, use conseguirInsultoEs and ConseguirInsultoEn functions.
bot.command(["Insulto", "INSULTO", "insulto"], (ctx) => {
  let valor = functions.getRandomArbitrary(0, 1);
  if (valor >= 0.5) {
    functions.conseguirInsultoEs(ctx);
  } else {
    functions.conseguirInsultoEn(ctx);
  }
});

//Pin a message with a reply in the target
bot.command("pin", (ctx) => {
  try {
    ctx.pinChatMessage(ctx.message.reply_to_message.message_id);
  } catch (error) {
    ctx.reply("MAMAÑEMA, DEBES RESPONDER UN MENSAJE PARA PINEARLO, ANIMAL. 🤬");
  }
});

//Unpin a message with a reply in the target
bot.command("unpin", (ctx) => {
  try {
    ctx.unpinChatMessage(ctx.message.reply_to_message.message_id);
  } catch (error) {
    ctx.reply(
      "MAMAÑEMA, DEBES RESPONDER UN MENSAJE PARA UNPINEARLO, ANIMAL. 🤬"
    );
  }
});

//This command get  a compliment, use conseguirCumplido function.
bot.command(["Cumplido", "CUMPLIDO", "cumplido"], (ctx) => {
  functions.conseguirCumplido(ctx);
});



// This command get  a bad joke, use conseguirChiste function.
bot.command(["Chiste", "CHISTE", "chiste"], (ctx) => {
  functions.conseguirChiste(ctx);
});


// This command ban  a member from group, use de kick function.
bot.command(["kick", "ban", "palloby", "pafuera"], (ctx) => {
  ctx.getChatMember(ctx.message.from.id).then((res) => {
    if (res.status == "creator" || res.status == "administrator") {
      console.log(ctx.message);
      functions.kick(ctx);
    } else {
      ctx.reply("Te falta calle 😈");
    }
  });
});
//Get heads or tails
bot.command(["flipcoin", "coin", "flip"], (ctx) => {
  functions.getFlip(ctx);
});

//call the got quote
bot.command("GOT", (ctx) => {
  functions.getGOTquote(ctx);
});

//throws a quote from a random anime
bot.command(["anime", "ANIME", "otaku", "OTAKU"], (ctx) => {
  functions.getAnimequote(ctx);
});
//Delete a message, just for admins.
bot.command(["delete", "borrao"], (ctx) => {
  functions.deleteMessage(ctx);
});

bot.command(["shiba", "shib"], (ctx) => {
  functions.getCrypto(ctx);
});

bot.command(["news", "noticias"], (ctx) => {
  functions.getNews(ctx);
});
bot.command(["technews", "tecnologia"], (ctx) => {
  functions.getTechNews(ctx);
});
bot.command(["entertaimentnews", "entretenimiento"], (ctx) => {
  functions.getEntertaimentNews(ctx);
});

bot.command(["image", "img", "search"], (ctx) => {
  functions.imageSearch(ctx);
});

//Agregar un evento
bot.command(["addEvento","ADDEVENTO"], (ctx) => {
  functions.AddEvents(ctx);
});

//Listar los eventos 
bot.command(["Eventos","EVENTOS", "eventos"], (ctx) => {
  functions.GetEvents(ctx);
});

bot.command(["addPrueba", "ADDPRUEBA", "AddPrueba", "addprueba"], (ctx) => {
  functions.addPrueba(ctx);
});

bot.command(["pruebas", "PRUEBAS"], (ctx) => {
  functions.getPrueba(ctx);
});

//this function throws a Quote every 6 hours.
let quote = null;
setInterval(() => {
  quote =
    quotes[
    Object.keys(quotes)[
    Math.floor(Math.random() * Object.keys(quotes).length)
    ]
    ];
  bot.telegram.sendMessage(
    -936000899,
    `“*${quote.text}*” - ${quote.author}`,
    { parse_mode: "Markdown" }
  );
}, 1000 * (3600 * 6));

bot.on('new_chat_members', async (ctx) => {

  const user = ctx.message.new_chat_members[0];
  const {first_name, last_name, username} = user;
  let messageToShow = `🔥 BIENVENIDO ${first_name} ${last_name}`

  messageToShow += username?`, @${username} 🔥`:' 🔥';
  ctx.reply(messageToShow)

});

setInterval( async() => {
  const { todayHour, todayMinute } = getTodayDate();
  console.log(todayHour,todayMinute)
  if (todayHour == "0" && todayMinute =="0") {
    const response = await getBirthDay();
    response.forEach(element => {
      const { USER } = element;
      bot.telegram.sendMessage(
        -936000899,
        `FELIZ CUMPLEAÑOS ${USER}`
       );
    });
  }

}, 1000 * (3600 * 1));

//launc the bot
bot.launch();
