from pydantic import BaseModel


class GenerateLeadsRequest(BaseModel):
    industry: str
    country: str
    city: str | None = None
    company_size: str | None = None
    keywords: str | None = None
    limit: int = 20