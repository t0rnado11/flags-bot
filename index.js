const { _countries, _caps, _landmarks } = require("./data.js");

const countries = _countries
const caps = _caps
const landmarks = _landmarks

console.log(countries.length)

const express = require("express")
const app = express();

app.listen(3000, () => {
  console.log("Bot is online.");
})

app.get("/", (req, res) => {
  res.send("Hello world!");
})

var ongoingChallenges = [
  {
    "user1": "testuser",
    "user2": "testuser2",
    "mode": "flag",
    "score1": 0,
    "score2": 0,
    "channel": ""
  }
]

var realclist = {}

for (var i = 0; i < countries.length; i++) {
  realclist[countries[i].name] = true
}

const { Client, MessageEmbed, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder, IntentsBitField, ButtonStyle } = require("discord.js")

const client = new Client({ intents: [new IntentsBitField(33281)] });

function getc(correct, min, max) {
  var n = Math.floor(Math.random() * (max - min + 1)) + min
  if (n != correct) {
    return n
  } else {
    return getc(correct, min, max)
  }
}

function genRandomLabels(correct) {
  var nums = []
  nums[0] = countries[getc(correct, 0, 75)].name
  nums[1] = countries[getc(correct, 75, 150)].name
  nums[2] = countries[getc(correct, 150, 250)].name
  return nums
}

function genRandomLabels_c(correct) {
  var nums = []
  nums[0] = caps[getc(correct, 0, 75)].country
  nums[1] = caps[getc(correct, 75, 150)].country
  nums[2] = caps[getc(correct, 150, 243)].country
  return nums
}

var bans = [
  {
    "user": "test",
    "reason": "abc"
  }
]

function banMsg(message, reason) {
  let embed = new MessageEmbed()
    .setTitle("Banned")
    .setDescription("You have been banned for the reason of: " + reason)
    .setColor([255, 77, 77])

  message.reply({embeds: [embed]})
}

var Playing = {}
var PracticeLists = {}

var PracticeSets = {
  /*
  userid: {
    editing: "name",
    name: {
      "type": "flag|capital|shape|other",
      "content": []
    }
  }
  */
}

client.on("messageCreate", message => {
  if (message.content.substring(0, 5).toLowerCase() == "!flag") {
   // if (message.author.id == "944645325715546125") {
      //message.reply("Nope.")
     // return
   // }
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    if (message.content.length > 5) {
      if (message.content.substring(6, message.content.length) != "") {
        var name = message.content.substring(6, message.content.length)
        for (var i = 0; i < countries.length; i++) {
          if (name.toLowerCase() == countries[i].name.toLowerCase()) {
            var img = "https://www.crwflags.com/fotw/images/"+countries[i].code.substring(0,1)+"/" + countries[i].code.toLowerCase() + ".gif"
            message.reply({files: [img], content: "This is the flag of "+countries[i].name})
            break
          }
        }
        return
      }
    } else {
      if (typeof (Playing[message.author.id]) != "object") {
        var btn1 = new ButtonBuilder()
        var btn2 = new ButtonBuilder()
        var btn3 = new ButtonBuilder()
        var btn4 = new ButtonBuilder()
        var row = new ActionRowBuilder()
        var correct = Math.floor(Math.random() * countries.length)
        var correctBtn = Math.floor(Math.random() * 4)
        var y = genRandomLabels(correct)
  
        Playing[message.author.id] = {
          button1: btn1,
          button2: btn2,
          button3: btn3,
          button4: btn4
        }
  
        if (correctBtn == 0) {
          btn1.setCustomId("correctFlag")
          btn1.setLabel(countries[correct].name)
  
          btn2.setLabel(y[0])
          btn3.setLabel(y[1])
          btn4.setLabel(y[2])
          btn2.setCustomId("incorrectFlag2")
          btn3.setCustomId("incorrectFlag3")
          btn4.setCustomId("incorrectFlag4")
        } else if (correctBtn == 1) {
          btn2.setCustomId("correctFlag")
          btn2.setLabel(countries[correct].name)
  
          btn1.setLabel(y[0])
          btn3.setLabel(y[1])
          btn4.setLabel(y[2])
          btn1.setCustomId("incorrectFlag1")
          btn3.setCustomId("incorrectFlag3")
          btn4.setCustomId("incorrectFlag4")
        } else if (correctBtn == 2) {
          btn3.setCustomId("correctFlag")
          btn3.setLabel(countries[correct].name)
  
          btn2.setLabel(y[0])
          btn1.setLabel(y[1])
          btn4.setLabel(y[2])
          btn2.setCustomId("incorrectFlag2")
          btn1.setCustomId("incorrectFlag1")
          btn4.setCustomId("incorrectFlag4")
        } else if (correctBtn == 3) {
          btn4.setCustomId("correctFlag")
          btn4.setLabel(countries[correct].name)
  
          btn2.setLabel(y[0])
          btn3.setLabel(y[1])
          btn1.setLabel(y[2])
          btn2.setCustomId("incorrectFlag2")
          btn3.setCustomId("incorrectFlag3")
          btn1.setCustomId("incorrectFlag1")
        }
  
        btn1.setStyle(ButtonStyle.Primary)
        btn2.setStyle(ButtonStyle.Primary)
        btn3.setStyle(ButtonStyle.Primary)
        btn4.setStyle(ButtonStyle.Primary)
  
        row.addComponents(
          btn1,
          btn2,
          btn3,
          btn4
        )
  
        message.reply({ files: ["https://www.crwflags.com/fotw/images/"+countries[correct].code.substring(0,1)+"/" + countries[correct].code.toLowerCase() + ".gif"], components: [row] })
      } else {
        message.reply("Please complete the current challenge first or type !skip.")
      }
    }
  }
  if (message.content.substring(0, 6).toLowerCase() == "!shape") {
   // if (message.author.id == "944645325715546125") {
      //message.reply("Nope.")
      //return
    //}
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    if (message.content.length > 6) {
      if (message.content.substring(7, message.content.length) != "") {
        var name = message.content.substring(7, message.content.length)
        for (var i = 0; i < countries.length; i++) {
          if (name.toLowerCase() == countries[i].name.toLowerCase()) {
            var img = "https://raw.githubusercontent.com/djaiss/mapsicon/master/all/"+countries[i].code.toLowerCase()+"/1024.png"
            message.reply({files: [img], content: "This is the shape of "+countries[i].name})
            break
          }
        }
        return
      }
    } else {
    if (typeof(Playing[message.author.id]) != "object") {
      var btn1 = new ButtonBuilder()
      var btn2 = new ButtonBuilder()
      var btn3 = new ButtonBuilder()
      var btn4 = new ButtonBuilder()
      var row = new ActionRowBuilder()
      var correct = Math.floor(Math.random() * countries.length)
      var correctBtn = Math.floor(Math.random() * 4)
      var y = genRandomLabels(correct)

      Playing[message.author.id] = {
        button1: btn1,
        button2: btn2,
        button3: btn3,
        button4: btn4
      }

      if (correctBtn == 0) {
        btn1.setCustomId("correctFlag")
        btn1.setLabel(countries[correct].name)

        btn2.setLabel(y[0])
        btn3.setLabel(y[1])
        btn4.setLabel(y[2])
        btn2.setCustomId("incorrectFlag2")
        btn3.setCustomId("incorrectFlag3")
        btn4.setCustomId("incorrectFlag4")
      } else if (correctBtn == 1) {
        btn2.setCustomId("correctFlag")
        btn2.setLabel(countries[correct].name)

        btn1.setLabel(y[0])
        btn3.setLabel(y[1])
        btn4.setLabel(y[2])
        btn1.setCustomId("incorrectFlag1")
        btn3.setCustomId("incorrectFlag3")
        btn4.setCustomId("incorrectFlag4")
      } else if (correctBtn == 2) {
        btn3.setCustomId("correctFlag")
        btn3.setLabel(countries[correct].name)

        btn2.setLabel(y[0])
        btn1.setLabel(y[1])
        btn4.setLabel(y[2])
        btn2.setCustomId("incorrectFlag2")
        btn1.setCustomId("incorrectFlag1")
        btn4.setCustomId("incorrectFlag4")
      } else if (correctBtn == 3) {
        btn4.setCustomId("correctFlag")
        btn4.setLabel(countries[correct].name)

        btn2.setLabel(y[0])
        btn3.setLabel(y[1])
        btn1.setLabel(y[2])
        btn2.setCustomId("incorrectFlag2")
        btn3.setCustomId("incorrectFlag3")
        btn1.setCustomId("incorrectFlag1")
      }

      btn1.setStyle(ButtonStyle.Primary)
      btn2.setStyle(ButtonStyle.Primary)
      btn3.setStyle(ButtonStyle.Primary)
      btn4.setStyle(ButtonStyle.Primary)

      row.addComponents(btn1, btn2, btn3, btn4)

      
      console.log(countries[correct].code.toLowerCase())

      var img = "https://raw.githubusercontent.com/djaiss/mapsicon/master/all/"+countries[correct].code.toLowerCase()+"/1024.png"

      if (countries[correct].code.toLowerCase() == "ps") {
        img = "https://raw.githubusercontent.com/djaiss/mapsicon/master/all/il/1024.png"
      }
      
      message.reply({ files: ["https://raw.githubusercontent.com/djaiss/mapsicon/master/all/"+countries[correct].code.toLowerCase()+"/1024.png"], components: [row] })
    } else {
      message.reply("Please complete the current challenge first or type !skip.")
    }
    }
  }
  if (message.content.substring(0, 8).toLowerCase() == "!capital") {
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    if (message.content.length > 8) {
      if (message.content.substring(9, message.content.length) != "") {
        var name = message.content.substring(9, message.content.length)
        for (var i = 0; i < caps.length; i++) {
          if (name.toLowerCase() == caps[i].country.toLowerCase()) {
            message.reply({content: "The capital of "+caps[i].country+" is "+caps[i].city})
            break
          }
        }
        return
      }
    } else {
      if (typeof(Playing[message.author.id]) != "object") {
        var btn1 = new ButtonBuilder()
        var btn2 = new ButtonBuilder()
        var btn3 = new ButtonBuilder()
        var btn4 = new ButtonBuilder()
        var row = new ActionRowBuilder()
        var correct = Math.floor(Math.random() * caps.length)
        var correctBtn = Math.floor(Math.random() * 4)
        var y = genRandomLabels_c(correct)
  
        Playing[message.author.id] = {
          button1: btn1,
          button2: btn2,
          button3: btn3,
          button4: btn4
        }
  
        if (correctBtn == 0) {
          btn1.setCustomId("correctFlag")
          btn1.setLabel(caps[correct].country)
  
          btn2.setLabel(y[0])
          btn3.setLabel(y[1])
          btn4.setLabel(y[2])
          btn2.setCustomId("incorrectFlag2")
          btn3.setCustomId("incorrectFlag3")
          btn4.setCustomId("incorrectFlag4")
        } else if (correctBtn == 1) {
          btn2.setCustomId("correctFlag")
          btn2.setLabel(caps[correct].country)
  
          btn1.setLabel(y[0])
          btn3.setLabel(y[1])
          btn4.setLabel(y[2])
          btn1.setCustomId("incorrectFlag1")
          btn3.setCustomId("incorrectFlag3")
          btn4.setCustomId("incorrectFlag4")
        } else if (correctBtn == 2) {
          btn3.setCustomId("correctFlag")
          btn3.setLabel(caps[correct].country)
  
          btn2.setLabel(y[0])
          btn1.setLabel(y[1])
          btn4.setLabel(y[2])
          btn2.setCustomId("incorrectFlag2")
          btn1.setCustomId("incorrectFlag1")
          btn4.setCustomId("incorrectFlag4")
        } else if (correctBtn == 3) {
          btn4.setCustomId("correctFlag")
          btn4.setLabel(caps[correct].country)
  
          btn2.setLabel(y[0])
          btn3.setLabel(y[1])
          btn1.setLabel(y[2])
          btn2.setCustomId("incorrectFlag2")
          btn3.setCustomId("incorrectFlag3")
          btn1.setCustomId("incorrectFlag1")
        }
  
        btn1.setStyle(ButtonStyle.Primary)
        btn2.setStyle(ButtonStyle.Primary)
        btn3.setStyle(ButtonStyle.Primary)
        btn4.setStyle(ButtonStyle.Primary)
  
        row.addComponents(btn1, btn2, btn3, btn4)
  
        message.reply({ content: "Which country has a capital named "+caps[correct].city+"?", components: [row] })
      } else {
        message.reply("Please complete the current challenge first or type !skip.")
      }
    }
  }
  if (message.content.toLowerCase() == "!landmark") {
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    if (typeof(Playing[message.author.id]) != "object") {
      var btn1 = new ButtonBuilder()
      var btn2 = new ButtonBuilder()
      var btn3 = new ButtonBuilder()
      var btn4 = new ButtonBuilder()
      var row = new ActionRowBuilder()
      var correct = Math.floor(Math.random() * landmarks.length)
      var correctBtn = Math.floor(Math.random() * 4)
      var y = genRandomLabels(correct)

      Playing[message.author.id] = {
        button1: btn1,
        button2: btn2,
        button3: btn3,
        button4: btn4
      }

      if (correctBtn == 0) {
        btn1.setCustomId("correctFlag")
        btn1.setLabel(landmarks[correct].country)

        btn2.setLabel(y[0])
        btn3.setLabel(y[1])
        btn4.setLabel(y[2])
        btn2.setCustomId("incorrectFlag2")
        btn3.setCustomId("incorrectFlag3")
        btn4.setCustomId("incorrectFlag4")
      } else if (correctBtn == 1) {
        btn2.setCustomId("correctFlag")
        btn2.setLabel(landmarks[correct].country)

        btn1.setLabel(y[0])
        btn3.setLabel(y[1])
        btn4.setLabel(y[2])
        btn1.setCustomId("incorrectFlag1")
        btn3.setCustomId("incorrectFlag3")
        btn4.setCustomId("incorrectFlag4")
      } else if (correctBtn == 2) {
        btn3.setCustomId("correctFlag")
        btn3.setLabel(landmarks[correct].country)

        btn2.setLabel(y[0])
        btn1.setLabel(y[1])
        btn4.setLabel(y[2])
        btn2.setCustomId("incorrectFlag2")
        btn1.setCustomId("incorrectFlag1")
        btn4.setCustomId("incorrectFlag4")
      } else if (correctBtn == 3) {
        btn4.setCustomId("correctFlag")
        btn4.setLabel(landmarks[correct].country)

        btn2.setLabel(y[0])
        btn3.setLabel(y[1])
        btn1.setLabel(y[2])
        btn2.setCustomId("incorrectFlag2")
        btn3.setCustomId("incorrectFlag3")
        btn1.setCustomId("incorrectFlag1")
      }

      btn1.setStyle(ButtonStyle.Primary)
      btn2.setStyle(ButtonStyle.Primary)
      btn3.setStyle(ButtonStyle.Primary)
      btn4.setStyle(ButtonStyle.Primary)

      row.addComponents(btn1, btn2, btn3, btn4)

      message.reply({ content: "Which country has the landmark "+landmarks[correct].landmark+"?", components: [row] })
    } else {
      message.reply("Please complete the current challenge first or type !skip.")
    }
  }
  if (message.content.toLowerCase() == "!help") {
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    let embed = new MessageEmbed()
    .setTitle("Help page")
    .setDescription("Flags Bot help page\n")
    .setColor([255, 77, 77])
    .addFields(
      {"name": "Commands", "value": "!help - Opens the help menu.\n!flag: Gives you the flag of a random country which you have to guess.\n!shape: Gives you the shape of a random country which you have to guess.\n!capital: Gives you the capital city of a random country which you have to guess.\n!skip: Skips the current game (You cannot start a new game if one is already active)"}
    )
    message.reply({embeds: [embed]})
  }
  if (message.content.toLowerCase() == "!skip") {
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    //if (message.author.id == "944645325715546125") {
      //message.reply("Nope.")
      //return
    //}
    if (typeof (Playing[message.author.id]) == "object") {
      Playing[message.author.id] = undefined
      message.reply("Skipped game.")
    } else {
      message.reply("There is no game to skip.")
    }
  }
  if (message.content.toLowerCase() == "!opinion") {
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    if (message.author.id == "555067421212409857") {
      message.reply("Very Very Very Epic Gamer 😎😎😎😎😎")
    } else {
      var answers = [
        "Very Epic Gamer",
        "Epic Gamer",
        "Cool",
        "Meh",
        "Bad",
        "Trash",
        "Worst Person To Exist Since James Charles"
      ]
      var n = Math.floor(Math.random()*answers.length)
      message.reply(answers[n])
    }
  }
  if (message.content.toLowerCase() == "!moai") {
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    message.reply({files: ["https://c.tenor.com/B09HrKxf_i8AAAAC/moai.gif"]})
  }
  if (message.content.toLowerCase() == "!geomdash") {
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    message.reply({files: ["https://cdn.discordapp.com/attachments/977266095515918339/1001211245896151100/gdfrs.gif"]})
  }
  if (message.content.toLowerCase().substring(0, "!say".length) == "!say") {
    for (var i = 0; i < bans.length; i++) {
      if (bans[i].user == message.author.id) {
        banMsg(message, bans[i].reason)
        return
      }
    }
    if (message.author.id == "555067421212409857") {
      var txt = message.content.substring("!say".length+1, message.content.length)
      message.channel.send(txt)
    } else {
      message.reply("you cant do that Hahahahahahahaha")
    }
  }
  if (message.content.toLowerCase().substring(0, "!challenge".length) == "!challenge") {
    var inChallenge = false
    for (var i = 0; i < ongoingChallenges.length; i++) {
      if (ongoingChallenges[i].user1 == message.author.id || ongoingChallenges[i].user2 == message.author.id) {
        inChallenge = true
        break
      }
    } 
    var inChallenge2 = false
    for (var i = 0; i < ongoingChallenges.length; i++) {
      if (ongoingChallenges[i].user1 == message.content.substring(";challenge".length+1, message.content.length) || ongoingChallenges[i].user2 == message.content.substring(";challenge".length+1, message.content.length)) {
        inChallenge2 = true
        break
      }
    } 
    if (inChallenge) {
      message.reply("You are already in a challenge. Type !skipchallenge to skip it.")
    } else if (inChallenge2) {
      message.reply("That user is already in a challenge. Type !skipchallenge to skip it.")
    } else {
      var target = message.content.substring(";challenge".length+1, message.content.length)
        var row = new ActionRowBuilder()
          .addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("challengeMode")
              .setPlaceholder("Select mode")
              .addOptions(
                {
                  "label": "Flags",
                  "description": "Flags gamemode",
                  "value": "flag"
                },
                {
                  "label": "Capitals",
                  "description": "Capitals gamemode",
                  "value": "capital"
                },
                {
                  "label": "Shapes",
                  "description": "Shapes gamemode",
                  "value": "shape"
                },
                {
                  "label": "Landmarks",
                  "description": "Landmarks gamemode",
                  "value": "landmark"
                }
              )
          )
      message.reply({content: "You are challenging " + target, components: [row]})
    }
  }
  if (message.content.toLowerCase().substring(0, "!devcommands".length) == "!devcommands") {
    if (message.author.id == "555067421212409857" || message.author.id == "944645325715546125") {
      if (message.content.toLowerCase().substring("!devcommands".length+1, "!devcommands".length+1+"ban".length) == "ban") {
        var target = message.content.toLowerCase().substring("!devcommands ban ".length, message.content.length)
        
      }
    } else {
      message.reply("You do not have permission to use Developer Commands.")
    }
  }
  if (message.content.toLowerCase().substring(0, "!pset".length) == "!pset") {
    var sC = message.content.toLowerCase().split(" ")
    if (sC[1] == "create") {
      var name = sC[2]

      if (typeof(practiceSets[msg.author.id]) != "undefined") {
        if (typeof(practiceSets[msg.author.id][selected]) == "undefined") {
          interaction.message.reply("That practice set already exists!")
          return
        } else {
          practiceSets[msg.author.id][name] = {}
          practiceSets[msg.author.id].editing = name
          
          var row = new ActionRowBuilder()
          var dropdown = new StringSelectMenuBuilder()
          dropdown.setCustomId("practiceMode")
          dropdown.setPlaceholder("Select mode")
          dropdown.addOptions(
            {
              "label": "Flags",
              "description": "Flags gamemode",
              "value": "flag"
            },
            {
              "label": "Capitals",
              "description": "Capitals gamemode",
              "value": "capital"
            },
            {
              "label": "Shapes",
              "description": "Shapes gamemode",
              "value": "shape"
            }
          )
          row.addComponents(dropdown)
          message.reply("Select a mode to create a practice set for.", {components: [row], ephemeral: true})
        }
      }
    } else if (sC[1] == "add") {
      var set = sC[2]
      var c = sC.substring(0, ("!pset add "+set+" ").length).split(",")
      if (practiceSets[msg.author.id][set].type == "flag" || practiceSets[msg.author.id][set].type == "shape") {
        for (var i = 0; i < c.length; i++) {
          if (typeof(countries[i]) == "undefined") {
            
          }
        }
      }
    }
  }
})

client.on("interactionCreate", interaction => {
  if (!interaction.isButton()) {
    return
  }
  var spl = interaction.customId.split("_")
  if (spl[0] == "accept") {
    var user1 = spl[1]
    var user2 = spl[2]
    var mode = spl[3]
    var channel = spl[4]
    ongoingChallenges[user1] = {
      "opponent": user2,
      "score": 0,
      "mode": mode,
      "channel": channel
    }
    ongoingChallenges[user2] = {
      "opponent": user1,
      "score": 0,
      "mode": mode,
      "channel": channel
    }
    return
  }
  if (spl[0] == "decline") {
    var user1 = spl[1]
    var user2 = spl[2]
    
    return
  }
  interaction.message.fetchReference().then(msg => {
    interaction.deferUpdate()
    if (msg.author.id == interaction.user.id) {
      Playing[interaction.user.id] = undefined
      var row = new ActionRowBuilder()
      var btn1 = ButtonBuilder.from(interaction.message.components[0].components[0])
        .setDisabled(true)
      var btn2 = ButtonBuilder.from(interaction.message.components[0].components[1])
        .setDisabled(true)
      var btn3 = ButtonBuilder.from(interaction.message.components[0].components[2])
        .setDisabled(true)
      var btn4 = ButtonBuilder.from(interaction.message.components[0].components[3])
        .setDisabled(true)
      if (interaction.customId == "correctFlag") {
        interaction.message.reply("Correct!")
        for (var i = 0; i <= 3; i++) {
          if (interaction.message.components[0].components[i].customId == "correctFlag") {
            if (i == 0) {
              btn1.setStyle(ButtonStyle.Success)
              btn2.setStyle(ButtonStyle.Secondary)
              btn3.setStyle(ButtonStyle.Secondary)
              btn4.setStyle(ButtonStyle.Secondary)
            }
            if (i == 1) {
              btn1.setStyle(ButtonStyle.Secondary)
              btn2.setStyle(ButtonStyle.Success)
              btn3.setStyle(ButtonStyle.Secondary)
              btn4.setStyle(ButtonStyle.Secondary)
            }
            if (i == 2) {
              btn1.setStyle(ButtonStyle.Secondary)
              btn2.setStyle(ButtonStyle.Secondary)
              btn3.setStyle(ButtonStyle.Success)
              btn4.setStyle(ButtonStyle.Secondary)
            }
            if (i == 3) {
              btn1.setStyle(ButtonStyle.Secondary)
              btn2.setStyle(ButtonStyle.Secondary)
              btn3.setStyle(ButtonStyle.Secondary)
              btn4.setStyle(ButtonStyle.Success)
            }
          }
        }
      } else {
        interaction.message.reply("Incorrect!")
        if (interaction.customId == "incorrectFlag1") {
          btn1.setStyle(ButtonStyle.Danger)
          if (interaction.message.components[0].components[1].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Success)
            btn3.setStyle(ButtonStyle.Secondary)
            btn4.setStyle(ButtonStyle.Secondary)
          }
          if (interaction.message.components[0].components[2].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Secondary)
            btn3.setStyle(ButtonStyle.Success)
            btn4.setStyle(ButtonStyle.Secondary)
          }
          if (interaction.message.components[0].components[3].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Secondary)
            btn3.setStyle(ButtonStyle.Secondary)
            btn4.setStyle(ButtonStyle.Success)
          }
        }
        if (interaction.customId == "incorrectFlag2") {
          btn2.setStyle(ButtonStyle.Danger)
          if (interaction.message.components[0].components[0].customId == "correctFlag") {
            btn1.setStyle(ButtonStyle.Success)
            btn3.setStyle(ButtonStyle.Secondary)
            btn4.setStyle(ButtonStyle.Secondary)
          }
          if (interaction.message.components[0].components[2].customId == "correctFlag") {
            btn1.setStyle(ButtonStyle.Secondary)
            btn3.setStyle(ButtonStyle.Success)
            btn4.setStyle(ButtonStyle.Secondary)
          }
          if (interaction.message.components[0].components[3].customId == "correctFlag") {
            btn1.setStyle(ButtonStyle.Secondary)
            btn3.setStyle(ButtonStyle.Secondary)
            btn4.setStyle(ButtonStyle.Success)
          }
        }
        if (interaction.customId == "incorrectFlag3") {
          btn3.setStyle(ButtonStyle.Danger)
          if (interaction.message.components[0].components[1].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Success)
            btn1.setStyle(ButtonStyle.Secondary)
            btn4.setStyle(ButtonStyle.Secondary)
          }
          if (interaction.message.components[0].components[0].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Secondary)
            btn1.setStyle(ButtonStyle.Success)
            btn4.setStyle(ButtonStyle.Secondary)
          }
          if (interaction.message.components[0].components[3].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Secondary)
            btn1.setStyle(ButtonStyle.Secondary)
            btn4.setStyle(ButtonStyle.Success)
          }
        }
        if (interaction.customId == "incorrectFlag4") {
          btn4.setStyle(ButtonStyle.Danger)
          if (interaction.message.components[0].components[1].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Success)
            btn3.setStyle(ButtonStyle.Secondary)
            btn1.setStyle(ButtonStyle.Secondary)
          }
          if (interaction.message.components[0].components[2].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Secondary)
            btn3.setStyle(ButtonStyle.Success)
            btn1.setStyle(ButtonStyle.Secondary)
          }
          if (interaction.message.components[0].components[0].customId == "correctFlag") {
            btn2.setStyle(ButtonStyle.Secondary)
            btn3.setStyle(ButtonStyle.Secondary)
            btn1.setStyle(ButtonStyle.Success)
          }
        }
      }
      row.addComponents([btn1, btn2, btn3, btn4])
      interaction.message.edit({components: [row]})
    } else {
    }
  })
});

client.on("interactionCreate", interaction => {
  if (!interaction.isStringSelectMenu()) {
    return
  }
  interaction.message.fetchReference().then(msg => {
    if (msg.author.id == interaction.user.id) {
      if (interaction.customId == "challengeMode") {
        var chal = {
          "user1": msg.author.id,
          "user2": msg.content.substring(";challenge".length+1, msg.content.length).replace("@", "").replace("!", "").replace("<", "").replace(">", ""),
          "mode": "",
          "score1": 0,
          "score2": 0,
          "channel": msg.channel.id
        }
        console.log(chal.user1)
        console.log(chal.user2)
        var selected = interaction.values[0]
        var mode = "flag"
        if (selected == "flag") {
          mode = "flag"
        }
        if (selected == "shape") {
          mode = "shape"
        }
        if (selected == "capital") {
          mode = "capital"
        }
        if (selected == "landmark") {
          mode = "landmark"
        }
        interaction.message.edit({content: "You challenged "+client.users.cache.get(chal.user2).username, components: []})

        var row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("accept_"+chal.user1+"_"+chal.user2+"_"+mode+"_"+msg.channel.id)
              .setStyle(ButtonStyle.Success)
              .setLabel("Accept"),
            new ButtonBuilder()
              .setCustomId("decline_"+chal.user1+"_"+chal.user2+"_"+mode+"_"+msg.channel.id)
              .setStyle(ButtonStyle.Danger)
              .setLabel("Decline")
          )
        interaction.message.channel.send({content: "<@"+chal.user2 + "> " + msg.author.username + " has challenged you!", components: [row]})
      } else if (interaction.customId == "practiceMode") {
        var selected = interaction.values[0]
        var s = practiceSets[msg.author.id]
        s[s.editing].type = selected
        s[s.editing].content = []
      }
    }
  })
})

client.on("debug", console.log)

client.on('ready', c => {
  var c = client.channels.cache.get("1109748583126806600")
})

client.login(process.env.token).catch(console.error)
