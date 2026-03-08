from openai import OpenAI
from config.settings import settings

DEV_MODE = True  # Change to False when you enable OpenAI billing


class OpenAIService:

    def __init__(self):
        if not DEV_MODE:
            self.client = OpenAI(api_key=settings.OPENAI_API_KEY)

    def generate_text(self, prompt: str):

        if DEV_MODE:
            return f"[DEV MODE AI RESPONSE] Example output for prompt: {prompt}"

        response = self.client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are an AI assistant for lead generation."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        return response.choices[0].message.content


openai_service = OpenAIService()