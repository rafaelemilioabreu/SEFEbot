//Permite importar y usar require. Se especifica "type":"module" en el package.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
//Importamos telegraf
const { Telegraf } = require("telegraf");
const quotes = require("./public/quotes.json");
import { datos } from "./public/info.js";
import {
  linkDesarrollo,
  conseguirInsultoEs,
  conseguirInsultoEn,
  conseguirCumplido,
  conseguirChiste,
  getFlip,
  getRandomArbitrary,
  kick,
  getGOTquote,
  getAnimequote,
  deleteMessage,
  getCrypto,
  linkparalela,
  linkingenieria,
  linkIoT,
  imageSearch,
  getNews,
  getTechNews,
  getEntertaimentNews,
} from "./public/functions.js";
import { time } from "console";
//Definimos Token de nuestro Bot
const Token = "2074747800:AAGlVnEtQLdWQ5FkfzhBlftJD_78EzuAgIg";

//Instanciamos la clase Telegraf que recibe nuestro Token como parámetro
const bot = new Telegraf(Token);

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
    `SEFEbot Commands:
/start - muestra mensaje de bienvenida
/horario - muestra el horario de clases
/all - menciona a todos los miembros del grupo
/Cuenta - muestra cuenta del mensajero
/diselo - muestra mensaje de te la bebiste
/links - muestra menú con links de las clases
/insulto - responde con una ofensa
/cumplido - \`responde\` con un halago
/pin - destacada un mensaje
/unpin - quita mensaje de destacado
/chiste - responde con una broma
/anime - responde con una frase random de anime
/GOT - responde con frase random de GOT
/kick - elimina miembro el cual se le respondió un mensaje
/flipcoin - dice cara o cruz
/shiba - muestra precio actual de shiba en USD
/delete - borra mensaje al que se responda
/img \`<Texto>\` - devuelve imagen según petición
`,
    {
      parse_mode: "Markdown",
    }
  );
});

//Mention all the people in the group
bot.command(
  [
    "everyone",
    "Everyone",
    "All",
    "ALL",
    "all",
    "toElMundazo",
    "toelmundo",
    "venganTo",
    "VenganTo",
    "venganto",
    "VENGANTO",
    "LISTA",
    "lista",
    "Lista",
  ],
  (ctx) => {
    ctx.reply(
      `Vengan to' mmñ @RafaelEmilioAbreu @dereckhidalgo @Lisandro6 @iamvilllalona @Pieritax @JenrryMonegro @Etiwal @BinanceFuturo`
    );
  }
);

//throws the schedule
bot.command(
  [
    "clasesNormales",
    "clases",
    "CLASES",
    "Clases",
    "Horario",
    "horario",
    "HORARIO",
  ],
  (ctx) => {
    ctx.reply(`
    \n
    \n⚜️           Horario de clases            ⚜️
    \n___________________________________
    \n                              Lunes:
    \n           Desarrollo Emprendedores. 
    \n                              (7-9pm)
    \n___________________________________
    \n                             Martes:        
    \n              Programación Paralela. 
    \n                              (8-10pm)
    \n___________________________________
    \n                            Miércoles:    
    \n                          IoT (6-10pm)
    \n___________________________________
    \n                               Jueves:          
    \n         Ingeniería de Software. (6-8pm)
    \n                      DevOps (8-10pm)
    \n___________________________________
    `);
  }
);

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

//It's supossed to be, a menu with the links of the classes
bot.command("links", (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "Estos son los diferentes links para sus clases: \n ¿Cuál desea obtener?",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Programación Paralela", callback_data: "paralela" },
            { text: "Ingeniería de Software", callback_data: "ingenieria" },
          ],
          [
            { text: "Desarrollo Emp.", callback_data: "desarrollo" },
            { text: "DevOps", callback_data: "devops" },
          ],
          [
            { text: "IoT", callback_data: "iot" },
            { text: "Volver", callback_data: "volver" },
          ],
        ],
      },
    }
  );
  ctx.deleteMessage(ctx.message.message_id);
});
//Define an action for the options
bot.action("paralela", (ctx) => {
  ctx.answerCbQuery();
  ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  linkparalela(ctx);
});
bot.action("iot", (ctx) => {
  ctx.answerCbQuery();
  ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  linkIoT(ctx);
});
//Define an action for the options
bot.action("ingenieria", (ctx) => {
  ctx.answerCbQuery();
  ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  linkingenieria(ctx);
});
bot.action("desarrollo", (ctx) => {
  ctx.answerCbQuery();
  ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  linkDesarrollo(ctx);
});
//Define an action for the options
bot.action("volver", (ctx) => {
  ctx.answerCbQuery();
  ctx.deleteMessage(ctx.callbackQuery.message.message_id);
});

// This command get a insult, use conseguirInsultoEs and ConseguirInsultoEn functions.
bot.command(["Insulto", "INSULTO", "insulto"], (ctx) => {
  let valor = getRandomArbitrary(0, 1);
  if (valor >= 0.5) {
    conseguirInsultoEs(ctx);
  } else {
    conseguirInsultoEn(ctx);
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
  conseguirCumplido(ctx);
});

// This command get  a bad joke, use conseguirChiste function.
bot.command(["Chiste", "CHISTE", "chiste"], (ctx) => {
  conseguirChiste(ctx);
});

// This command ban  a member from group, use de kick function.
bot.command(["kick", "ban", "palloby", "pafuera"], (ctx) => {
  ctx.getChatMember(ctx.message.from.id).then((res) => {
    if (res.status == "creator" || res.status == "administrator") {
      kick(ctx);
    } else {
      ctx.reply("Te falta calle 😈");
    }
  });
});
//Get heads or tails
bot.command(["flipcoin", "coin", "flip"], (ctx) => {
  getFlip(ctx);
});

//call the got quote
bot.command("GOT", (ctx) => {
  getGOTquote(ctx);
});

//throws a quote from a random anime
bot.command(["anime", "ANIME", "otaku", "OTAKU"], (ctx) => {
  getAnimequote(ctx);
});
//Delete a message, just for admins.
bot.command(["delete", "borrao"], (ctx) => {
  deleteMessage(ctx);
});

bot.command(["shiba", "shib"], (ctx) => {
  getCrypto(ctx);
});

bot.command(["news", "noticias"], (ctx) => {
  getNews(ctx);
});
bot.command(["technews", "tecnologia"], (ctx) => {
  getTechNews(ctx);
});
bot.command(["entertaimentnews", "entretenimiento"], (ctx) => {
  getEntertaimentNews(ctx);
});

bot.command(["image", "img", "search"], (ctx) => {
  imageSearch(ctx);
  // bot.telegram.sendMessage(ctx.message.chat.id, image);
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
    -1001325613452,
    `“*${quote.text}*” - ${quote.author}`,
    { parse_mode: "Markdown" }
  );
}, 1000 * (3600 * 2));

//working on it
// setInterval((ctx) => {
//   bot.telegram.sendMessage(-1001325613452, getNews());
// }, 36000);

//launc the bot
bot.launch();
