FROM python:3.10-slim
WORKDIR /app
COPY . .
COPY src ./src
RUN pip install -r requirements.txt
EXPOSE 5001
ENV RUNNING_IN_DOCKER=true
CMD python src/app.py