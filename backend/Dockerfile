# backend/Dockerfile
FROM python:3.11-slim AS build
WORKDIR /app
ENV PIP_NO_CACHE_DIR=1 POETRY_VIRTUALENVS_IN_PROJECT=true
COPY backend/pyproject.toml backend/poetry.lock* ./   # o requirements.txt si usas pip
# RUN pip install -r requirements.txt
RUN pip install --upgrade pip
COPY backend/ .
RUN pip install -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY --from=build /app /app
# crea usuario no root si quieres
EXPOSE 8000
CMD ["gunicorn","config.wsgi:application","--bind","0.0.0.0:8000","--workers","2","--timeout","120"]