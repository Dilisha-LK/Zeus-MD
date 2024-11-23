module.exports = async (messageDetails) => {
  const { client: botClient, m: message, text: queryText } = messageDetails;

  const ytSearch = require('yt-search');
  const fetch = require('node-fetch');

  try {
    // Ensure that the queryText is not empty
    if (!queryText || queryText.trim().length === 0) {
      return message.reply("What song do you want to download?");
    }

    // Search for videos on YouTube based on the query text
    const searchResults = await ytSearch(queryText);
    if (searchResults && searchResults.videos.length > 0) {
      const firstVideo = searchResults.videos[0];
      const videoUrl = firstVideo.url;

      const chat = message.chat;

      // Fetch download link from an external API (without apikey)
      const response = await fetch(`https://dark-yasiya-api-new.vercel.app/download/ytmp3?url=${encodeURIComponent(videoUrl)}`);
      const downloadData = await response.json();

      if (downloadData.status === 200 && downloadData.success) {
        const downloadUrl = downloadData.result.download_url;

        // Send message indicating that the download has started
        await botClient.sendMessage(chat.id, { text: "*Downloading...*" }, { quoted: message });

        // Send thumbnail and video info
        const videoInfoMessage = {
          image: { url: firstVideo.thumbnail },
          caption: `*Zeus-MD AUDIO PLAYER*\n\n╭───────────────◆\n│ *Title:* ${downloadData.result.title}\n│ *Duration:* ${firstVideo.timestamp}\n│ *Artist:* ${firstVideo.author.name}\n╰────────────────◆`
        };
        await botClient.sendMessage(chat.id, videoInfoMessage, { quoted: message });

        // Send the audio file
        await botClient.sendMessage(chat.id, {
          audio: { url: downloadUrl },
          mimetype: "audio/mp3"
        }, { quoted: message });

        // Optionally, send the audio as a downloadable file
        await botClient.sendMessage(chat.id, {
          document: { url: downloadUrl },
          mimetype: "audio/mp3",
          fileName: `${downloadData.result.title}.mp3`
        }, { quoted: message });

        // Final message to the user after download is complete
        await message.reply(`*${downloadData.result.title}*\n\n*Downloaded successfully. Keep using Zeus-MD*`);
      } else {
        message.reply("Failed to download audio. Please try again later.");
      }
    } else {
      message.reply("No audio found.");
    }
  } catch (error) {
    message.reply(`Download failed\n${error}`);
  }
};
