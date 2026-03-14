from typing import Dict, Any, List


class ContactFinderAgent:
    """
    Agent responsible for extracting contact information
    from company websites.

    Future implementation:
    - scrape website
    - extract emails
    - find linkedin
    - detect contact page
    """

    def run(self, context: Dict[str, Any]) -> Dict[str, Any]:

        leads: List[Dict] = context.get("leads", [])

        enriched_leads = []

        for lead in leads:

            website = lead.get("website")

            # DEV MODE mock extraction
            email = f"info@{website.replace('https://', '').replace('http://', '').replace('www.', '')}"

            linkedin = lead.get("linkedin") or "https://linkedin.com/company/example"

            contact_page = f"{website}/contact"

            lead["email"] = email
            lead["linkedin"] = linkedin
            lead["contact_page"] = contact_page

            enriched_leads.append(lead)

        context["leads"] = enriched_leads

        context["logs"].append(
            f"ContactFinderAgent enriched {len(enriched_leads)} leads with contact info"
        )

        return context


contact_finder_agent = ContactFinderAgent()