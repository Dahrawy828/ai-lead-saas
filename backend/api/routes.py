from fastapi import APIRouter, Depends
from api.schemas import GenerateLeadsRequest
from services.lead_service import generate_leads
from database.supabase_client import supabase
from api.dependencies import get_current_user

router = APIRouter()


# -------------------------------------------------------
# Generate Leads (secured)
# -------------------------------------------------------

@router.post("/generate-leads")
async def generate_leads_endpoint(
    payload: GenerateLeadsRequest,
    user_id: str = Depends(get_current_user)
):

    leads = await generate_leads(payload.model_dump(), user_id)
    
    return {
        "success": True,
        "leads": leads
    }


# -------------------------------------------------------
# Get Leads (secured)
# -------------------------------------------------------

@router.get("/leads")
async def get_leads(user_id: str = Depends(get_current_user)):

    response = supabase.table("lead_searches") \
        .select("id, leads(*)") \
        .eq("user_id", user_id) \
        .execute()

    searches = response.data or []

    leads = []

    for search in searches:
        leads.extend(search.get("leads", []))

    return {
        "success": True,
        "leads": leads
    }



# -------------------------------------------------------
# Analytics Endpoint (secured)
# -------------------------------------------------------

@router.get("/analytics")
async def get_analytics(user_id: str = Depends(get_current_user)):

    response = supabase.table("lead_searches") \
        .select("id, leads(*)") \
        .eq("user_id", user_id) \
        .execute()
    
    searches = response.data or []

    leads = []

    for search in searches:
        leads.extend(search.get("leads", []))

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

        created_at = lead.get("created_at", "")
        day = created_at[:10]

        leads_per_day[day] = leads_per_day.get(day, 0) + 1

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

        industry = lead.get("industry", "Other")

        industries[industry] = industries.get(industry, 0) + 1

    return {
        "success": True,
        "user_id": user_id,
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