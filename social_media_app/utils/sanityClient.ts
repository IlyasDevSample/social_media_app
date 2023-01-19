import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: "jije1z5f",
    dataset: "production",
    apiVersion: "2021-03-25",
    useCdn: true,
    token: process.env.SANITY_TOKEN,
});

// console.log("Sanity Client Initialized", process.env.SANITY_TOKEN);
