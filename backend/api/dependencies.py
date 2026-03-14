from fastapi import Header, HTTPException
from supabase import create_client
from config.settings import settings


# create supabase client using service role
supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY
)


async def get_current_user(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Missing Authorization header"
        )

    try:
        scheme, token = authorization.split()

        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication scheme"
            )

        # validate token with Supabase
        response = supabase.auth.get_user(token)

        if not response or not response.user:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

        return response.user.id

    except ValueError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header format"
        )

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Authentication failed"
        )
