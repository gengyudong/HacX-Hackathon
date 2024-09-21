const axios = require('axios');
const cheerio = require('cheerio');

async function fetchRedditPostDetails(postUrl) {
    try {
        // Fetch the Reddit page content using axios
        const response = await axios.get(postUrl);

        if (response.status !== 200) {
            console.error(`Failed to fetch page. Status code: ${response.status}`);
            return null;
        }

        const html = response.data;
        const $ = cheerio.load(html);

        // Extract the post title
        const postTitle = $('h1[id^="post-title"]').text().trim();

        // Extract paragraphs
        const paragraphTexts = [];
        $('p').each((i, element) => {
            const paragraph = $(element).text().trim();
            if (paragraph) {
                paragraphTexts.push(paragraph);
            }
        });

        // Filter out default messages
        const filteredParagraphs = paragraphTexts.filter(paragraph => {
            // Add conditions to exclude unwanted paragraphs
            return !paragraph.includes('By continuing') &&
                   !paragraph.includes('User Agreement') &&
                   !paragraph.includes('two-factor authentication') &&
                   !paragraph.includes('Reddit is anonymous') &&
                   !paragraph.includes('Need help?') &&
                   !paragraph.includes('link to reset your password');
        });

        // Extract the username
        const userElement = $('a[href*="/user/"]');
        const username = userElement.text().trim();
        const userProfileLink = `https://www.reddit.com${userElement.attr('href')}`;

        // Prepare post details object
        const postDetails = {
            post_title: postTitle,
            paragraph_texts: filteredParagraphs, // Use filtered paragraphs
            user_name: username,
            user_profile_link: userProfileLink
        };

        return postDetails;

    } catch (error) {
        console.error(`Error fetching post details: ${error}`);
        return null;
    }
}

// Export the function
module.exports = fetchRedditPostDetails;

// You can create a separate function to export postDetails if needed
async function getPostDetails(postUrl) {
    const details = await fetchRedditPostDetails(postUrl);
    return details;
}

// Export the getPostDetails function
module.exports.getPostDetails = getPostDetails;
