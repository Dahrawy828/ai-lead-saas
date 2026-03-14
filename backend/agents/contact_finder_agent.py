from typing import Dict, Any, List


class ContactFinderAgent:
    """
    Agent responsible for extracting contact information
    from company websites.

    DEV MODE:
    Generates mock contact data.

    Future implementation:
    - scrape website
    - extract emails
    - find linkedin profiles
    - detect contact pages
    """

    def run(self, context: Dict[str, Any]) -> Dict[str, Any]:

        leads: List[Dict] = context.get("leads", [])

        enriched_leads: List[Dict] = []

        for lead in leads:

            website = lead.get("website", "")

            domain = (
                website.replace("https://", "")
                .replace("http://", "")
                .replace("www.", "")
                .split("/")[0]
            )

            # DEV MODE mock extraction
            email = f"info@{domain}"

            linkedin = lead.get("linkedin") or f"https://linkedin.com/company/{domain}"

            contact_page = f"{website.rstrip('/')}/contact"

            lead["email"] = email
            lead["linkedin"] = linkedin
            lead["contact_page"] = contact_page

            enriched_leads.append(lead)

        context["leads"] = enriched_leads

        context.setdefault("logs", []).append(
            f"ContactFinderAgent enriched {len(enriched_leads)} leads with contact info"
        )

        return context


contact_finder_agent = ContactFinderAgent()