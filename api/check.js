export default async function handler(req, res) {
    const { user_id } = req.query;
    const botToken = process.env.BOT_TOKEN; 
    const chatId = '@WorklySupportChannel';

    if (!user_id) return res.status(400).json({ error: "User ID missing" });

    try {
        const url = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${chatId}&user_id=${user_id}`;
        const response = await fetch(url);
        const data = await response.json();

        const isMember = data.ok && ['member', 'administrator', 'creator'].includes(data.result.status);
        res.status(200).json({ isMember });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
