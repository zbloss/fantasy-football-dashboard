FROM public.ecr.aws/lambda/python:3.9

COPY data data
COPY src src
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

CMD ["lambda_function.lambda_handler"]