import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";

const YouAiOrganizationSecretToken = '827efab7-2615-4784-a85b-4e30572009ac:29b7edb82ba5e3413acb4896b0cf7e54';

const YouAiApiUrl = `https://api.youai.ai/v1/organizations/api/auth/get-token`;

const RawAiUrls: {[index: string]: any} = {
    'social-media-creativity-planner': 'https://youai.ai/ais/social-media-creativity-planner-d70e4f19/use',
    'content-repurposing-assistant': 'https://youai.ai/ais/content-repurposing-assistant-3b488d38/use',
    'caption-genius': 'https://youai.ai/ais/caption-genius-092975a2/use',
    'stock-image-assistant': 'https://youai.ai/ais/stock-image-assistant-35352b22/use',
    'social-media': 'https://youai.ai/ais/social-media-post-writer-547206d3/use',
};

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username');
    const aiName = req.nextUrl.searchParams.get('aiName');
    if (!username || !aiName) {
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    /**
     * Use the provided username (DO NOT DO THIS IN PRODUCTION! Get the user's
     * ID securely from your backend and pass it into this request) and the
     * YouAi organization secret token to generate a short-lived authorization
     * token for your user. 
     * 
     * We then use that short-lived authorization token to
     * build a unique signed URL that your user can use to access the embedded
     * AI.
     */
    const tokenRequest = await fetch(YouAiApiUrl, {
        method: 'POST',
        headers: {
            Authorization: YouAiOrganizationSecretToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: username,
        }),
    });
    const { token } = await tokenRequest.json();
    
    if (!token) {
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    return NextResponse.json({
        url: `${RawAiUrls[aiName]}?__authOverride=${token}&__displayContext=embedded`,
    });
}
