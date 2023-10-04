import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";

const YouAiOrganizationSecretToken = '827efab7-2615-4784-a85b-4e30572009ac:29b7edb82ba5e3413acb4896b0cf7e54';

const YouAiApiUrl = `https://api.youai.ai/v1/organizations/api/auth/get-token`;

const RawAiUrls: {[index: string]: any} = {
    'social-media-creativity-planner': 'https://youai.ai/ais/social-media-creativity-planner-d70e4f19',
    'content-repurposing-assistant': 'https://youai.ai/ais/content-repurposing-assistant-3b488d38',
    'caption-genius': 'https://youai.ai/ais/caption-genius-092975a2',
    'the-learning-machine': 'https://youai.ai/ais/the-learning-machine-265d456f',
    'gift-ideas': 'https://youai.ai/ais/gift-ideas-20291023',
    'plumbing-expert': 'https://youai.ai/ais/plumbing-expert-c426edf7',
    'help-me-plan': 'https://youai.ai/ais/help-me-plan-d3103dc5',
    'interview-questions-generator': 'https://youai.ai/ais/interview-questions-generator-8cc05b97',
    'brainstorm-content-ideas': 'https://youai.ai/ais/brainstorm-content-ideas-221f3ece',
    'ghostwriter': 'https://youai.ai/ais/ghostwriter-f60cb848',
    'engagement-strategies-assistant': 'https://youai.ai/ais/engagement-strategies-assistant-370ee7c8',
    'personal-tutor': 'https://youai.ai/ais/personal-tutor-031a80f3',
    'ai-at-first-sight': 'https://youai.ai/ais/ai-at-first-sight-1e2a8797',
    'linkedin-article-generator': 'https://youai.ai/ais/linkedin-article-generator--0d132618',
    'meal-planner': 'https://youai.ai/ais/meal-planner-dba2248b',
    'personal-trainer': 'https://youai.ai/ais/personal-trainer-a2813e3e',
    'the-pareto-principle': 'https://youai.ai/ais/the-pareto-principle-4eaf3065',
    'five-whys-technique': 'https://youai.ai/ais/five-whys-technique-44234b60',
    'create-a-content-calendar-ax': 'https://youai.ai/ais/create-a-content-calendar-ax-6906cc22',
    'restaurateur-copilot--ax': 'https://youai.ai/ais/restaurateur-copilot--ax-7e8d00fa',
    'seo-keyword-planner--ax': 'https://youai.ai/ais/seo-keyword-planner--ax-87632b54',
    'ax-hr--ai-assistant-pune-india':'https://youai.ai/ais/ax-hr--ai-assistant-pune-india-b9fe1178'
    'best-houston-restaurants':'https://youai.ai/ais/best-houston-restaurants-d245c343'
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
