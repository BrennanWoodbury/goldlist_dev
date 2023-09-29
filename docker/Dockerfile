from ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y python3-pip && \
    apt-get clean 

COPY /home/dev/goldlist-dev/backend/ /app

WORKDIR /app/backend

RUN pip install -r requirements.txt

RUN apt-get install uvicorn

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
