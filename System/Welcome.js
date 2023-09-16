const {checkWelcome}= require('./MongoDB/MongoDb_Core');

module.exports = async (Atlas, anu) => {
  try {
    let metadata = await Atlas.groupMetadata(anu.id);
    let participants = anu.participants;
    let desc = metadata.desc;
    if (desc == undefined) desc = "No Description";

    for (let num of participants) {
      try {
        ppuser = await Atlas.profilePictureUrl(num, "image");
      } catch {
        ppuser = botImage4;
      }

      if (anu.action == "add") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Joined/Got Added in: ${
            metadata.subject
          }\n`
        );
        Atlastext = `◈┏「 ʜɪ, @${WAuserName.split("@")[0]} 」◈
┏┫ sᴇɴᴘᴀɪ ɪ'ᴍ ʜɪɴᴀᴛᴀ ʜʏᴜɢᴀ. 
║┗━━━━━━━━━━━━━━━┉❖
║           🎗 *ɢʀᴏᴜᴘ ɪɴғᴏ*⚡
╠━━━━━━━≪ °❈° ≫━━━━━┉❖
║
║ ㅤㅤ 🎃 𝐖𝚵𝐋𝐂𝚯𝚳𝚵  𝚻𝚯 ✨
║ ㅤ    *${metadata.subject}*
║   
╚━━━━━━━≪ °❈° ≫━━━━━━┉❖

🀄 *Ｇ𝚁𝙾𝚄𝙿 Ｄ𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽* 🀄

${desc}

〘 ʜᴏᴘᴇ ʏᴏᴜ'ʟʟ 𝙵ᴏʟʟᴏᴡ ʀᴜʟᴇs ᴀɴᴅ ᴇɴᴊᴏʏ ʏᴏᴜʀ sᴛᴀʏ 〙

*➢ @${WAuserName.split("@")[0]}*

ㅤ 🔰𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 : *Nᥱꪎꪎᥱʀ  ꢺᴀϻᴀ妥*`;
        if (WELstatus) {
          await Atlas.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Atlastext,
            mentions: [num],
          });
        }
      } else if (anu.action == "remove") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Left/Got Removed from: ${
            metadata.subject
          }\n`
        );
        Atlastext = `┌ ─❖── ⋆⋅☆⋅⋆ ───ᯓ
│「 @${WAuserName.split("@")[0]}  」
│  *V𝚒𝚛𝚐𝚒𝚗* 𝙻𝚎𝚏𝚝  𝚃𝚑𝚎
└ ┬❖「 *${metadata.subject}* 」
ㅤ└──────────────┈❖
ㅤ│ 
ㅤ│ *_I𝙵  T𝙷𝙴  S𝚃𝙰𝚁𝚂  W𝙷𝙴𝚁𝙴  T𝙾  F𝙰𝙻𝙻_*
ㅤ│ *_F𝚁𝙾𝙼  H𝙴𝙰𝚅𝙴𝙽  T𝙾  D𝙴𝚂𝙲𝚁𝙸𝙱𝙴_*
ㅤ│ *_Y𝙾𝚄𝚁 B𝙴𝙰𝚄𝚃𝚈...✨_*
ㅤ│ *_N𝙾  S𝚃𝙰𝚁  W𝙾𝚄𝙻𝙳 L𝙴𝙵𝚃_*
ㅤ│ *_T𝙷𝙴  H𝙴𝙰𝚅𝙴𝙽  T𝙷𝙰𝚃  D𝙰𝚈...✨🗿_*
ㅤ│
ㅤ└─────────────────┈ ⳹

ㅤㅤㅤ╭━━╮
ㅤㅤㅤ┃╭╮┃
ㅤㅤㅤ┃╰╯╰┳╮╱╭┳━━╮
ㅤㅤㅤ┃╭━╮┃┃╱┃┃┃━┫
ㅤㅤㅤ┃╰━╯┃╰━╯┃┃━┫
ㅤㅤㅤ╰━━━┻━╮╭┻━━╯
ㅤㅤㅤ╱╱╱╱╭━╯┃
ㅤㅤㅤ╱╱╱╱╰━━╯

    🔰𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 : *Nᥱꪎꪎᥱʀ  ꢺᴀϻᴀ妥*`;
        if (WELstatus) {
          await Atlas.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Atlastext,
            mentions: [num],
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
