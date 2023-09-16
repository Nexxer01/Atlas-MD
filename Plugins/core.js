const fs = require("fs");
const axios = require("axios");
const path = require("path");
const package = require("../package.json");
let mergedCommands = [
  "help",
  "h",
  "menu",
  "sc",
  "support",
  "supportgc",
  "script",
  "system",
  "info",
  "about",
];

module.exports = {
  name: "systemcommands",
  alias: [...mergedCommands],
  uniquecommands: ["script", "support", "help", "system", "about"],
  description: "All system commands",
  start: async (
    Atlas,
    m,
    { pushName, prefix, inputCMD, doReact, text, args }
  ) => {
    const pic = fs.readFileSync("./Assets/Atlas.jpg");
    switch (inputCMD) {
      case "script":
      case "sc":
        await doReact("🧣");
        let repoInfo = await axios.get(
          "https://api.github.com/repos/FantoX/Atlas-MD"
        );
        let repo = repoInfo.data;
        console.log(repo);
        let txt = `            🧣 *${botName}'s Script* 🧣\n\n*🎀 Total Forks:* ${
          repo.forks_count
        }\n*⭐ Total Stars:* ${repo.stargazers_count}\n*📜 License:* ${
          repo.license.name
        }\n*📁 Repo Size:* ${(repo.size / 1024).toFixed(
          2
        )} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt }, { quoted: m });
        break;

      case "support":
      case "supportgc":
        await doReact("🔰");
        let txt2 = `ㅤ   ㅤ  🧣 *Owner Group* 🧣\n\n*${botName}* is an bot modified by Nexxer Sama, and we are always happy to help you.\n\n*Link:* chat.whatsapp.com/DF3fnIHbFxWEY3bqUAf7Is\n\n*Note:* Please don't spam in the group, and don't message *Admins directly* without permission. Ask for help inside *Group*.\n\n*Thanks for using ${botName}*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt2 }, { quoted: m });
        break;

      case "help":
      case "h":
      case "menu":
        await doReact("⚡");
        await Atlas.sendPresenceUpdate("composing", m.from);
        function readUniqueCommands(dirPath) {
          const allCommands = [];

          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const subCommands = readUniqueCommands(filePath);
              allCommands.push(...subCommands);
            } else if (stat.isFile() && file.endsWith(".js")) {
              const command = require(filePath);

              if (Array.isArray(command.uniquecommands)) {
                const subArray = [file, ...command.uniquecommands];
                allCommands.push(subArray);
              }
            }
          }

          return allCommands;
        }

        function formatCommands(allCommands) {
          let formatted = "";

          for (const [file, ...commands] of allCommands) {
            const capitalizedFile =
              file.replace(".js", "").charAt(0).toUpperCase() +
              file.replace(".js", "").slice(1);

            formatted += `┎┈┈┈❮ 🧣 *${capitalizedFile}* 🧣 ❯┈┈┈⟢\n`;
            //formatted += `\`\`\`${commands.join("\n")}\`\`\`\n\n\n`;
            // Adding a - before each command
            formatted += `\`\`\`${commands
              .map((cmd) => `┊✗   ${prefix + cmd}`)                   
              .join("\n")}\`\`\`\n`;
            formatted +=  `┕┈┈┈┈┈┈┄┄┄┄┄┄┄┄┄┄⟢\n\n`;
          }

          return formatted.trim();
        }

        const pluginsDir = path.join(process.cwd(), "Plugins");

        const allCommands = readUniqueCommands(pluginsDir);
        const formattedCommands = formatCommands(allCommands);
        var helpText = `\nKonnichiwa *${pushName}* Senpai,\n\nI am *${botName}*, a WhatsApp bot built to take your boring WhatsApp experience into next level.\n\n*🔖 My Prefix is:*  *${prefix}*

🎗 *Here's My List Of Cammands:*\n\n${formattedCommands}\n\n\n
𝟶ཻུ۪۪ꦽꦼ̷⸙‹•══════════════ 〄
│
│ *🔰  ${botName}  🔰*
│ _Powered By:_ *Ɲᴇꪎꪎᴇʀ  ꢺᴀϻᴀ 𓆩×͜×𓆪ꪾ*
│
│🎀 To use any of these commands type 
│ " *${prefix}Command name* ".
│
│🏮 To get Owner number " *${prefix}Mods* ".
│
╰═════ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙`;
        await Atlas.sendMessage(
          m.from,
          { video: { url: botVideo }, gifPlayback: true, caption: helpText },
          { quoted: m }
        );

        break;

      case "system":
      case "info":
      case "about":
        await doReact("🔰");
        let xyz = await axios.get(
          "https://api.github.com/repos/FantoX/Atlas-MD/releases"
        );
        let latest = xyz.data[0].tag_name;
        const version2 = package.version;
        let nodeVersion = process.version;
        let os = process.platform;
        let osVersion = process.release.lts;
        let architecture = process.arch;
        let computername = process.env.COMPUTERNAME;
        let os2 = process.env.OS;
        let cpu2 = process.env.PROCESSOR_IDENTIFIER;
        let core = process.env.NUMBER_OF_PROCESSORS;

        let txt4 = `            🧣 *System Info* 🧣


*〄 Node Version:* ${nodeVersion}

*〄 OS:* ${os2}

*〄 Platform:* ${os}

*〄 Os Version:* ${osVersion}

*〄 Computer Name:* ${computername}

*〄 CPU:* ${cpu2}

*〄 CPU Core:* ${core}

*〄 CPU Architecture:* ${architecture}

*〄 Current Bot version:* ${latest}

*〄 Latest Bot version:* ${latest}
`;

        if (latest.includes(version2) || version2.includes(latest)) {
          txt4 += `\n\n*⚠️ Bot Update Available:*`;
        } else txt4 += `\n\n*🔰 Bot is up to date.*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt4 }, { quoted: m });

        break;

      default:
        break;
    }
  },
};
