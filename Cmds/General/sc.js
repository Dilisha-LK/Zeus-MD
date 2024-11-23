module.exports = async (context) => {
  const { client, m } = context;

  // Fetch repository data from GitHub
  const response = await fetch("https://api.github.com/repos/Dilisha-LK/Zeus-MD");
  const repoData = await response.json();

  // Extract relevant information
  const repoInfo = {
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    lastUpdate: repoData.updated_at,
    owner: repoData.owner.login,
    createdAt: repoData.created_at,
    url: repoData.html_url
  };

  // Format dates
  const createdDate = new Date(repoInfo.createdAt).toLocaleDateString("en-GB");
  const lastUpdateDate = new Date(repoInfo.lastUpdate).toLocaleDateString("en-GB");

  // Construct message caption
  const messageCaption = `
   *Hello ,,,👋This is AKIO MD*
 the best bot in the universe developed by DILISHA TECH🪀,,fork and give a star 🌟 to my repo 
  ╭────────────────
  │✨️ *Stars:* ${repoInfo.stars}    
  │🧧 *Forks:* ${repoInfo.forks}   
  │📆 *Release Date:* ${createdDate}   
  │⏰ *Last Update:* ${lastUpdateDate}    
  │🥰 *Owner:* ${repoInfo.owner}
  │📚 *Repository:* ${repoInfo.url}
  ╰─────────────────── 
  `;

  // Prepare the image URL
  const image = {
    url: "https://imgur.com/a/uSVVXmn"
  };

  // Prepare the message object
  const message = {
    image: image,
    caption: messageCaption
  };

  // Send the message
  await client.sendMessage(m.chat, message, { quoted: m });
};

