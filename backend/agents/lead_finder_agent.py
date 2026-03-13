from typing import List, Dict


class LeadFinderAgent:

    async def find_leads(self, search_params: Dict) -> List[Dict]:
        """
        Find companies based on search criteria.
        DEV MODE: returns mock companies.
        """

        industry = search_params.get("industry", "business")
        city = search_params.get("city", "New York")
        limit = search_params.get("requested_limit", 5)

        leads = []

        for i in range(limit):

            leads.append({
                "company": f"{industry.title()} Company {i+1}",
                "website": f"https://company{i+1}.com",
                "email": f"contact@company{i+1}.com",
                "linkedin": f"https://linkedin.com/company/company{i+1}",
                "score": 0,
                "status": "discovered"
            })

        return leads


lead_finder_agent = LeadFinderAgent()