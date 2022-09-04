import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import cardsUrl from "../helpers/cardsUrl.js";

export default {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('Example of response with image'),
    async execute(interaction) {
        const description = "You get Ambassador & Contessa";

        const firstCard = new MessageEmbed()
            .setURL("https://example.org/")
            .setImage(cardsUrl.ambassador)
            .setTitle("And... here are your cards!")
            .setDescription(description);

        const secondCard = new MessageEmbed()
            .setURL("https://example.org/")
            .setImage(cardsUrl.contessa)
            .setDescription('');

        const embeds = [
            firstCard,
            secondCard,
        ];

        interaction
            .reply({ embeds, ephemeral: true })
            .then(() => console.log('Reply sent.'))
            .catch(console.error);
    }
};