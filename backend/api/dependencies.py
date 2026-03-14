from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client
from config.settings import settings


# create supabase client using service role
supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY
)

# Swagger / FastAPI security scheme
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:
        # validate token with Supabase
        response = supabase.auth.get_user(token)

        if not response or not response.user:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

        return response.user.id

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Authentication failed"
        )
