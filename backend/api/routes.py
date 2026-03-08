from fastapi import APIRouter
from api.schemas import GenerateLeadsRequest
from services.lead_service import generate_leads

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