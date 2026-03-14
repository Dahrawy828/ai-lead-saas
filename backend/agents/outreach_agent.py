from typing import Dict, Any, List
from services.openai_service import openai_service


class OutreachAgent:
    """
    Agent responsible for generating outreach messages
    for leads using AI.

    Generates:
    - cold email
    - LinkedIn message
    """

    def run(self, context: Dict[str, Any]) -> Dict[str, Any]:

        leads: List[Dict] = context.get("leads", [])

        enriched_leads: List[Dict] = []

        for lead in leads:

            company = lead.get("company")
            website = lead.get("website")

            prompt = f"""
Generate a personalized cold outreach email for the following company.

Company: {company}
Website: {website}

The email should:
- introduce our lead generation SaaS
- be short and professional
- encourage booking a demo
"""

            email_text = openai_service.generate_text(prompt)

            linkedin_prompt = f"""
Write a short LinkedIn outreach message for the company:

Company: {company}
Website: {website}

The message should be friendly and professional.
"""

            linkedin_message = openai_service.generate_text(linkedin_prompt)

            lead["cold_email"] = email_text
            lead["linkedin_message"] = linkedin_message

            enriched_leads.append(lead)

        context["leads"] = enriched_leads

        context.setdefault("logs", []).append(
            f"OutreachAgent generated outreach messages for {len(enriched_leads)} leads"
        )

        return context


outreach_agent = OutreachAgent()