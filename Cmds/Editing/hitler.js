const canvacord = require("canvacord");

module.exports = async (context) => {
        const { client, m, Tag, botname } = context;

let cap = `Converted By ${botname}`;

try {

        if (m.quoted) {
            try {
                img = await client.profilePictureUrl(m.quoted.sender, 'image')
            } catch {
                img = "https://i.ibb.co/SR76mBh/Pu3-ZYHBS5139.jpg"
            }
                        result = await canvacord.Canvacord.hitler(img);
        } else if (Tag) {
            try {
                ppuser = await client.profilePictureUrl(Tag[0] || m.sender, 'image')
            } catch {
                ppuser = 'https://i.ibb.co/SR76mBh/Pu3-ZYHBS5139.jpg'
            }
                        result = await canvacord.Canvacord.hitler(ppuser);
        } 


        await client.sendMessage(m.chat, { image: result, caption: cap }, { quoted: m });

} catch (e) {

m.reply("Something wrong occured. 😞")  

}
    }