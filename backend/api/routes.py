from fastapi import APIRouter, Depends
from api.schemas import GenerateLeadsRequest
from services.lead_service import generate_leads
from services.analytics_service import (
    get_leads_per_day,
    get_score_distribution,
    get_top_industries
)
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
# Analytics — Leads Per Day
# -------------------------------------------------------

@router.get("/analytics/leads-per-day")
async def leads_per_day_endpoint(
    user_id: str = Depends(get_current_user)
):

    data = await get_leads_per_day(user_id)

    return {
        "success": True,
        "data": data
    }


# -------------------------------------------------------
# Analytics — Score Distribution
# -------------------------------------------------------

@router.get("/analytics/score-distribution")
async def score_distribution_endpoint(
    user_id: str = Depends(get_current_user)
):

    data = await get_score_distribution(user_id)

    return {
        "success": True,
        "data": data
    }


# -------------------------------------------------------
# Analytics — Top Industries
# -------------------------------------------------------

@router.get("/analytics/top-industries")
async def top_industries_endpoint(
    user_id: str = Depends(get_current_user)
):

    data = await get_top_industries(user_id)

    return {
        "success": True,
        "data": data
    }
