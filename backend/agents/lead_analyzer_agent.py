from typing import Dict
from services.openai_service import openai_service


class LeadAnalyzerAgent:

    async def analyze_leads(self, context: Dict):

        leads = context["leads"]

        analyzed_leads = []

        for lead in leads:

            prompt = f"""
            Analyze the following company as a potential sales lead.

            Company: {lead['company']}
            Website: {lead['website']}

            Determine if this is a good B2B lead and give a score from 0-100.
            Return only the number.
            """

            ai_response = openai_service.generate_text(prompt)

            try:
                score = int(str(ai_response).strip())
            except:
                import random
                # DEV MODE fallback scoring
                company_name = lead["company"].lower()

                if "marketing" in company_name:
                    score = random.randint(70, 90)
                elif "dental" in company_name:
                    score = random.randint(60, 80)
                else:
                    score = random.randint(40, 75)

            lead["score"] = score
            lead["status"] = "analyzed"

            analyzed_leads.append(lead)

        context["leads"] = analyzed_leads

        return context


lead_analyzer_agent = LeadAnalyzerAgent()