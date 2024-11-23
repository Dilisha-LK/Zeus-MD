module.exports = async (context) => {
  const { client, m } = context;


  const messageCaption = `
   *Follow my channels and join my  groups for more updates*
   
 ╭━━〔 *DILISHA TECH🪀* 〕━━┈⊷
│▸      ──────────
│▸ *Channel*
│▸ https://whatsapp.com/channel/0029VaoPSh9HrDZdNIpYes0s
│▸ 
│▸ *Instagram* 
│▸ https://Instagram.com/@kingsico
│▸ 
│▸ *Telegram* 
│▸ https://t.me/w.s.d.g senavirathna 
│▸ 
│▸ *YouTube*
│▸ https://www.youtube.com/@srilanka-no1AWM-FF
╰──────────────┈⊷
  `;

  // Prepare the image URL
  const image = {
    url: "https://imgur.com/a/uSVVXmn'"
  };

  // Prepare the message object
  const message = {
    image: image,
    caption: messageCaption
  };

  // Send the message
  await client.sendMessage(m.chat, message, { quoted: m });
};

