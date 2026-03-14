from fastapi import APIRouter
from api.schemas import GenerateLeadsRequest
from services.lead_service import generate_leads
from database.supabase_client import supabase

router = APIRouter()


@router.post("/generate-leads")
async def generate_leads_endpoint(payload: GenerateLeadsRequest):

    leads = await generate_leads(payload.dict())

    return {
        "success": True,
        "leads": leads
    }


@router.get("/leads")
async def get_leads():

    # Temporary mock data
    return {
        "success": True,
        "leads": [
            {
                "company": "Bright Dental Clinic",
                "website": "https://brightdental.com",
                "email": "contact@brightdental.com",
                "linkedin": "https://linkedin.com/company/brightdental",
                "score": 82,
                "status": "new"
            }
        ]
    }


# -------------------------------------------------------
# Analytics Endpoint (Dashboard Charts)
# -------------------------------------------------------

@router.get("/analytics")
async def get_analytics():

    response = supabase.table("leads").select("*").execute()

    leads = response.data or []

    leads_per_day = {}
    score_distribution = {
        "0-20": 0,
        "20-40": 0,
        "40-60": 0,
        "60-80": 0,
        "80-100": 0
    }
    industries = {}

    for lead in leads:

        # Leads per day
        created_at = lead.get("created_at", "")
        day = created_at[:10]

        leads_per_day[day] = leads_per_day.get(day, 0) + 1

        # Score distribution
        score = lead.get("score", 0)

        if score < 20:
            score_distribution["0-20"] += 1
        elif score < 40:
            score_distribution["20-40"] += 1
        elif score < 60:
            score_distribution["40-60"] += 1
        elif score < 80:
            score_distribution["60-80"] += 1
        else:
            score_distribution["80-100"] += 1

        # Industries
        industry = lead.get("industry", "Other")

        industries[industry] = industries.get(industry, 0) + 1

    return {
        "success": True,
        "leads_per_day": [
            {"date": k, "leads": v} for k, v in leads_per_day.items()
        ],
        "score_distribution": [
            {"score": k, "count": v} for k, v in score_distribution.items()
        ],
        "industries": [
            {"name": k, "value": v} for k, v in industries.items()
        ]
    }